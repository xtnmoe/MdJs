(function () {
  var pageBase = 'docs/';
  var pageExt = 'md';
  var mainPage = location.search.slice(1).replace(/&.*/, '') || 'aboutme';
  var mainTitle = '';
  var searchIndex = [];

  function config() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false
    });
  }

  function render(data, options, callback) {
    marked(data, options, callback);
  }

  function buildSearchIndex(content, path) {
    var lines = content.split('\n');
    var currentTitle = '';
    lines.forEach(function(line, index) {
      if (line.startsWith('#')) {
        currentTitle = line.replace(/^#+\s*/, '').trim();
        searchIndex.push({
          title: currentTitle,
          content: line,
          path: path,
          type: 'heading',
          line: index + 1 
        });
      } else {
        searchIndex.push({
          title: currentTitle,
          content: line,
          path: path,
          type: 'content',
          line: index + 1 
        });
      }
    });
  }

  function search(query) {
    if (!query) return [];
    query = query.toLowerCase();
    return searchIndex.filter(function(item) {
      return item.content.toLowerCase().includes(query) ||
             item.title.toLowerCase().includes(query);
    }).slice(0, 10); 
  }

  function load(sel, page, isMain, options, callback) {
    isMain = isMain || false;
    var url = pageBase + page + '.' + pageExt;
    
    var cacheBuster = '';
    var lastLoadTime = localStorage.getItem('mdjs_last_load_' + page);
    var now = new Date().getTime();
    var oneDay = 24 * 60 * 60 * 1000; 

    if (!lastLoadTime || (now - parseInt(lastLoadTime, 10) > oneDay)) {
        cacheBuster = '?t=' + now; 
    }

    $.ajax({
      url: url + cacheBuster,
      cache: false, 
      error: onNotFound,
      success: function (data) {
        
        localStorage.setItem('mdjs_last_load_' + page, new Date().getTime());

        if (isMain) {
          buildSearchIndex(data, page);
        }
        render(data, options, function (err, html) {
          if (err && callback) return callback(err);
          var $el = $(sel);
          $el.hide().html(html);

         
          $el.find('[src]').each(function () {
            var $el = $(this);
            $el.attr('src', function (x, old) {
              if (isAbsolute(old)) return old;
              return url.replace(/[^\/]*$/, '') + old;
            });
          });

         
          $el.find('[href]').each(function () {
            var $el = $(this);
            $el.attr('href', function (x, old) {
              if (isAbsolute(old)) {
                $el.attr('target', '_blank');
                return old;
              }
              var regExt = new RegExp('\\.' + pageExt + '$'); 

              var finalPath;
              if (old.startsWith('?')) {
                  finalPath = old.substring(1); 
              } else if (regExt.test(old)) {
                  finalPath = old.replace(regExt, ''); 
              } else {
                  
                  var currentDir = page.substring(0, page.lastIndexOf('/') + 1);
                  
                  var combinedPath = currentDir + old;
                  var parts = combinedPath.split('/');
                  var newParts = [];
                  for (var i = 0; i < parts.length; i++) {
                      if (parts[i] === '..') {
                          newParts.pop(); 
                      } else if (parts[i] !== '.' && parts[i] !== '') {
                          newParts.push(parts[i]);
                      }
                  }
                  finalPath = newParts.join('/');
              }

            
              return '?' + finalPath;
            });
          });

          if (isMain) {
            mainTitle = $el.find('h1:first').text();
            $('title').text(mainTitle + ' - MdJs');
          }

          $el.show();

          
          var hash = location.hash;
          var lineMatch = hash.match(/^#line=(\d+)$/);
          if (lineMatch) {
            var lineNumber = parseInt(lineMatch[1], 10);
            
            var estimatedScrollTop = (lineNumber - 1) * 20; 
            $('#main').scrollTop(estimatedScrollTop);
          }

          if (callback) callback();
        });
      }
    });
  }

  function onNotFound() {
    location.href = '.';
  }

  function setupSearch() {
    var $searchInput = $('#search-input');
    var $searchResults = $('<div class="search-results"></div>');
    $('.search-box').append($searchResults);

    $searchInput.on('input', function() {
      var query = $(this).val();
      var results = search(query);
      
      if (query && results.length > 0) {
        var html = '<ul>';
        results.forEach(function(result) {
        
          html += '<li><a href="?' + result.path + '#line=' + result.line + '">' +
                 (result.type === 'heading' ? result.content : result.title + ': ' + result.content) +
                 '</a></li>';
        });
        html += '</ul>';
        $searchResults.html(html).show();
      } else {
        $searchResults.hide();
      }
    });

  
    $(document).on('click', function(e) {
      if (!$(e.target).closest('.search-box').length) {
        $searchResults.hide();
      }
    });
  }

  function extractLinks(markdownContent) {
    var links = [];
    var linkRegex = /\(?\[([^\]]+)\]\(([^\)]+)\)/g;
    var match;
    while ((match = linkRegex.exec(markdownContent)) !== null) {
    
      var path = match[2].replace(/^\?/, '').replace(/\.md$/, '');
      if (path && path !== 'aboutme') { 
        links.push(path);
      }
    }
    return links;
  }

  function start() {

    load('#sidebar-page', 'sidebar', false, {}, function() {

      var $sidebar = $('.sidebar');
      var $main = $('.main');
      var $hamburgerButton = $('#hamburger-button');
      if ($(window).width() < 768) {
        
        $sidebar.addClass('hidden').removeClass('visible');
        $main.addClass('sidebar-hidden');
        localStorage.setItem('sidebarVisible', 'false');
      } else {
       
        $sidebar.removeClass('hidden').removeClass('visible'); 
        $main.removeClass('sidebar-hidden'); 
      }
      moveHamburgerButton();

      var sidebarContent = $('#sidebar-page').text(); 
      var docLinks = extractLinks(sidebarContent);

      
      load('#main-page', mainPage, true, {}, function(){
        
        docLinks.forEach(function(link) {
          load(null, link, true); 
        });
      });

      setupSearch();

     
      var $hamburgerButton = $('#hamburger-button');
      var $sidebar = $('.sidebar');
      var $main = $('.main');

      
      function moveHamburgerButton() {
        if ($sidebar.hasClass('hidden')) {
          $hamburgerButton.css('left', '10px');
        } else {
          $hamburgerButton.css('left', $sidebar.outerWidth() + 10 + 'px');
        }
       
        if (window.innerWidth <= 767) {
          if ($sidebar.hasClass('visible')) {
            $hamburgerButton.css('left', $sidebar.outerWidth() + 10 + 'px');
          } else {
            $hamburgerButton.css('left', '10px');
          }
        }
      }

      $hamburgerButton.on('click', function() {
        if ($(window).width() < 768) {
         
          $sidebar.toggleClass('visible');
          localStorage.setItem('sidebarVisible', $sidebar.hasClass('visible'));
          
          moveHamburgerButton();
        } else {
        
          $sidebar.toggleClass('hidden');
          $main.toggleClass('sidebar-hidden');
       
          moveHamburgerButton();
        }
      
        moveHamburgerButton();
      });

      钮
      $(window).on('resize', function() {
        if ($(window).width() >= 768) {
         
          if (!$sidebar.hasClass('hidden')) {
            $sidebar.removeClass('visible'); 
            $main.removeClass('sidebar-hidden'); 
          }
        } else {
         
          if (!$sidebar.hasClass('visible')) {
             $sidebar.addClass('hidden');
          }
          $main.removeClass('sidebar-hidden');
        }

        moveHamburgerButton();
      });


      moveHamburgerButton();

    });
  }

  function isAbsolute(url) {
    return !url.indexOf('//') || !!~url.indexOf('://');
  }

  config();
  start();

})();