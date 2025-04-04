$(function() {
    const $scrollContainer = $('.scroll-img');
    $scrollContainer.html($scrollContainer.html() + $scrollContainer.html());
    
    let scrollSpeed = 2;
    let isScrolling = true;

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
        mouseleave: () => { isScrolling = true; autoScroll(); }
    });
});