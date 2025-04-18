// $(function() {
//     $('section h1, section h2,section h3,section h5,.show-img img').addClass('show-up');
  
//     function checkIfInView() {
//         $('.show-up, .slide-in-left, .slide-in-right, .slide-in-left-img,.slide-in-left-img-flex, .show-up-slow').each(function(index) {
//           const element = $(this);
//           const position = element.offset().top;
//           const scroll = $(window).scrollTop();
//           const windowHeight = $(window).height();
          
//           if (scroll + windowHeight > position) {
//             setTimeout(() => {
//               element.addClass('visible');
//           });
//           }
//         });
//       }
  
//     $(window).on('load scroll', checkIfInView);
//     checkIfInView(); 
  
 
//     $('a[href^="#"]').on('click', function(e) {
//       e.preventDefault();
//       const target = $($(this).attr('href'));
//       if (target.length) {
//         $('html, body').animate({
//           scrollTop: target.offset().top
//         });
//       }
//     });
  // });

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
  
    $(document).ready(function() {
      const $flexContainer = $('.techies #m4 .inner-flex');
      const $items = $('.techies #m4 .inner');
      const $icons = $('.nav-icons .nav-icon');
      
      // Calculate proper scroll positions
      const calculateScroll = () => {
          const containerWidth = $flexContainer.width();
          const itemWidth = containerWidth * 0.4; // 40% width for 2.5 items
          return itemWidth + 20; // Include gap
      };
      
      let itemScrollWidth = calculateScroll();
      
      // Handle icon clicks
      $icons.on('click', function() {
          const index = $(this).data('index');
          const scrollPosition = index * itemScrollWidth;
          
          $flexContainer.animate({
              scrollLeft: scrollPosition
          }, 300);
          
          $icons.removeClass('active');
          $(this).addClass('active');
      });
      
      // Handle scroll events
      $flexContainer.on('scroll', function() {
          const scrollPos = $flexContainer.scrollLeft();
          const activeIndex = Math.round(scrollPos / itemScrollWidth);
          $icons.removeClass('active').eq(activeIndex).addClass('active');
      });
      
      // Adjust on resize
      $(window).on('resize', function() {
          itemScrollWidth = calculateScroll();
      });
  });
  