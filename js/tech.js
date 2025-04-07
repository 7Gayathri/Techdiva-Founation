$(function() {
    $('section h1, section h2,section h3,section p,section h5,.show-img img').addClass('show-up');
  
    function checkIfInView() {
        $('.show-up, .slide-in-left, .slide-in-right, .slide-in-left-img,.slide-in-left-img-flex, .show-up-slow').each(function(index) {
          const element = $(this);
          const position = element.offset().top;
          const scroll = $(window).scrollTop();
          const windowHeight = $(window).height();
          
          if (scroll + windowHeight > position) {
            setTimeout(() => {
              element.addClass('visible');
          }, index * 10);
          }
        });
      }
  
    $(window).on('load scroll', checkIfInView);
    checkIfInView(); 
  
 
    $('a[href^="#"]').on('click', function(e) {
      e.preventDefault();
      const target = $($(this).attr('href'));
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        });
      }
    });
  
    // Auto-scrolling image gallery (from previous implementation)
    const $scrollContainer = $('.scroll-img');
    const scrollSpeed = 2;
    let isScrolling = true;
    
    $scrollContainer.append($scrollContainer.html());
    
    function autoScroll() {
      if (!isScrolling) return;
      
      $scrollContainer[0].scrollLeft += scrollSpeed;
      
      if ($scrollContainer[0].scrollLeft >= $scrollContainer[0].scrollWidth / 2) {
        $scrollContainer[0].scrollLeft = 0;
      }
      
      requestAnimationFrame(autoScroll);
    }
    
    autoScroll();
    
    $scrollContainer.on({
      mouseenter: () => isScrolling = false,
      mouseleave: () => {
        isScrolling = true;
        autoScroll();
      }
    });
  });

$(function() {
    // Initialize animation classes
    $('section h1, section h2, section h3, section p, section h5, .show-img img').addClass('show-up');
    $('.revealed').addClass('outview'); // Start with elements hidden

    let lastScrollTop = 0;

    function checkIfInView() {
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();
        const middleScreen = scrollTop + (windowHeight / 2); // Middle of viewport
        const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
        
        // Standard animations
        $('.show-up, .slide-in-left, .slide-in-right, .slide-in-left-img, .slide-in-left-img-flex, .show-up-slow').each(function(index) {
            const element = $(this);
            const position = element.offset().top;
            
            if (scrollTop + windowHeight > position) {
                setTimeout(() => {
                    element.addClass('visible');
                }, index * 10);
            }
        });

        // Enhanced revealed elements logic
        $('.revealed').each(function() {
            const element = $(this);
            const elementTop = element.offset().top;
            const elementHeight = element.outerHeight();
            const elementMiddle = elementTop + (elementHeight / 2);
            
            // When scrolling UP and element middle reaches screen middle
            if (scrollDirection === 'up' && elementMiddle <= middleScreen) {
                element.removeClass('outview');
            } 
            // When scrolling DOWN and element middle passes screen middle
            else if (scrollDirection === 'down' && elementMiddle > middleScreen) {
                element.addClass('outview');
            }
            // Special case: if element is in view but not yet at middle
            else if (elementTop < scrollTop + windowHeight && elementBottom > scrollTop) {
                // Keep current state
            }
        });

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }

    // Optimized scroll handling
    let isTicking = false;
    $(window).on('scroll', function() {
        if (!isTicking) {
            window.requestAnimationFrame(function() {
                checkIfInView();
                isTicking = false;
            });
            isTicking = true;
        }
    }).trigger('scroll');

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 800);
        }
    });
  
    // Auto-scrolling image gallery
    const $scrollContainer = $('.scroll-img');
    const scrollSpeed = 2;
    let isScrolling = true;
    let animationFrame;
    
    $scrollContainer.append($scrollContainer.html());
    
    function autoScroll() {
        if (!isScrolling) {
            cancelAnimationFrame(animationFrame);
            return;
        }
        
        $scrollContainer[0].scrollLeft += scrollSpeed;
        
        if ($scrollContainer[0].scrollLeft >= $scrollContainer[0].scrollWidth / 2) {
            $scrollContainer[0].scrollLeft = 0;
        }
        
        animationFrame = requestAnimationFrame(autoScroll);
    }
    
    autoScroll();
    
    $scrollContainer.on({
        mouseenter: () => {
            isScrolling = false;
            cancelAnimationFrame(animationFrame);
        },
        mouseleave: () => {
            isScrolling = true;
            autoScroll();
        }
    });
});
