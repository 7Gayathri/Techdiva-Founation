var myHash = new Hash({
    customResultDisplay: {
        'w1': {
            message: "In Worksheet w1, you got ${correctWorksheet} correct out of ${totalWorksheet} questions.",
            'q1': {
                message: "Question q1 was incorrect. The correct answer is ${correctAnswer}.",
                hint: "Hint for Q1: Remember..."
            },
            'q2': {
                message: "Question q2 was incorrect. The correct answer is ${correctAnswer}.",
                hint: "Hint for Q2: Consider..."
            }
            // Additional questions and hints...
        }
        // Additional worksheets...
    }
});



// ========================================== Home Page Start ==========================================



// ========================================== Home Page End ==========================================

// Works but it does not want
// document.addEventListener('DOMContentLoaded', function () {
//     const slider = document.getElementById('slider');
//     const prevBtn = document.getElementById('prev-btn');
//     const nextBtn = document.getElementById('next-btn');
//     const cards = Array.from(document.querySelectorAll('.story-card'));

//     let currentIndex = 0;
//     let isAnimating = false;
//     const animationDuration = 600; // ms
//     const cardsPerView = 2.25;
//     let isForward = true; // ⬅️ Track direction

//     slider.style.position = 'relative';
//     slider.style.overflow = 'hidden';
//     slider.style.display = 'flex';
//     slider.style.height = cards[0].offsetHeight + 'px';

//     const cardWidth = (slider.offsetWidth / cardsPerView) - 10;

//     function positionCards() {
//         cards.forEach((card, index) => {
//             card.style.position = 'absolute';
//             card.style.top = '0';
//             card.style.width = cardWidth + 'px';
//             card.style.transition = `left ${animationDuration}ms ease, opacity ${animationDuration}ms ease, transform ${animationDuration}ms ease`;
//             card.style.pointerEvents = 'none';

//             const position = (index - currentIndex) % cards.length;
//             const normalizedPosition = position < 0 ? position + cards.length : position;

//             if (normalizedPosition >= 0 && normalizedPosition < cardsPerView) {
//                 // Visible cards
//                 card.style.left = (normalizedPosition * (cardWidth + 10)) + 'px';
//                 card.style.opacity = '1';
//                 card.style.visibility = 'visible';

//                 // Dynamically set zIndex based on scroll direction
//                 card.style.zIndex = isForward
//                     ? `${cards.length - normalizedPosition}` // forward: left card on top
//                     : `${normalizedPosition}`;              // backward: right card on top

//                 // Optional 3D scale effect
//                 // card.style.transform = `scale(${1 - normalizedPosition * 0.05})`;

//                 card.style.pointerEvents = 'auto';
//             } else if (normalizedPosition === Math.ceil(cardsPerView)) {
//                 const overflow = (cardsPerView % 1) * cardWidth;
//                 card.style.left = (cardsPerView * (cardWidth + 10) - (cardWidth - overflow)) + 'px';
//                 card.style.opacity = '1';
//                 card.style.visibility = 'visible';
//                 card.style.zIndex = '0';
//                 // card.style.transform = 'scale(0.9)';
//             } else {
//                 // Hidden cards
//                 card.style.left = (normalizedPosition < cardsPerView ?
//                     -cardWidth - 10 :
//                     slider.offsetWidth) + 'px';
//                 card.style.opacity = '0';
//                 card.style.visibility = 'hidden';
//                 card.style.zIndex = '-1';
//                 // card.style.transform = 'scale(0.8)';
//             }
//         });
//     }

//     positionCards();

//     function showNextCards() {
//         if (isAnimating) return;
//         isAnimating = true;
//         isForward = true;

//         cards.forEach(card => {
//             card.style.pointerEvents = 'none';
//         });

//         currentIndex = (currentIndex + 1) % cards.length;
//         positionCards();

//         setTimeout(() => {
//             isAnimating = false;
//             enablePointerEventsForVisibleCards();
//         }, animationDuration);
//     }

//     function showPrevCards() {
//         if (isAnimating) return;
//         isAnimating = true;
//         isForward = false;

//         cards.forEach(card => {
//             card.style.pointerEvents = 'none';
//         });

//         currentIndex = (currentIndex - 1 + cards.length) % cards.length;
//         positionCards();

//         setTimeout(() => {
//             isAnimating = false;
//             enablePointerEventsForVisibleCards();
//         }, animationDuration);
//     }

//     function enablePointerEventsForVisibleCards() {
//         cards.forEach((card, index) => {
//             const position = (index - currentIndex) % cards.length;
//             const normalizedPosition = position < 0 ? position + cards.length : position;
//             if (normalizedPosition >= 0 && normalizedPosition < cardsPerView) {
//                 card.style.pointerEvents = 'auto';
//             }
//         });
//     }

//     // Swipe support
//     let touchStartX = 0;
//     let touchEndX = 0;

//     function handleSwipe() {
//         const minSwipeDistance = 50;
//         if (touchEndX < touchStartX - minSwipeDistance) {
//             showNextCards();
//         } else if (touchEndX > touchStartX + minSwipeDistance) {
//             showPrevCards();
//         }
//     }

//     prevBtn.addEventListener('click', showPrevCards);
//     nextBtn.addEventListener('click', showNextCards);

//     slider.addEventListener('touchstart', e => {
//         touchStartX = e.changedTouches[0].screenX;
//     });

//     slider.addEventListener('touchend', e => {
//         touchEndX = e.changedTouches[0].screenX;
//         handleSwipe();
//     });

//     window.addEventListener('resize', function () {
//         const newCardWidth = (slider.offsetWidth / cardsPerView) - 10;

//         cards.forEach(card => {
//             card.style.width = newCardWidth + 'px';
//         });

//         positionCards();
//     });
// });


// My code
// document.addEventListener('DOMContentLoaded', function () {
//     const slider = document.getElementById('slider');
//     const prevBtn = document.getElementById('prev-btn');
//     const nextBtn = document.getElementById('next-btn');
//     let cards = Array.from(document.querySelectorAll('.story-card'));

//     const cardsPerView = 2.25;
//     const cardGap = 20; // adjust if you want different spacing between cards
//     let cardWidth = (slider.offsetWidth / cardsPerView) - (cardGap / cardsPerView);

//     let isAnimating = false;
//     const animationDuration = 700;

//     // Set up initial styles
//     slider.style.position = 'relative';
//     slider.style.overflowX = 'hidden';

//     function setupCards() {
//         cardWidth = (slider.offsetWidth / cardsPerView) - (cardGap / cardsPerView);

//         cards.forEach((card, index) => {
//             card.style.position = 'absolute';
//             card.style.width = `${cardWidth}px`;
//             card.style.transition = `left ${animationDuration}ms ease`;
//             card.style.left = `${(cardWidth + cardGap) * index}px`;
//         });
//     }

//     setupCards();

//     // Handle infinite next
//     function showNextCard() {
//         if (isAnimating) return;
//         isAnimating = true;
    
//         cards.forEach((card) => {
//             const currentLeft = parseFloat(card.style.left);
//             card.style.left = `${currentLeft - (cardWidth + cardGap)}px`;
//         });
    
//         setTimeout(() => {
//             const firstCard = cards.shift();
//             const lastCard = cards[cards.length - 1];
//             const newLeft = parseFloat(lastCard.style.left) + cardWidth + cardGap;
    
//             // Move instantly and offscreen without showing
//             firstCard.style.transition = 'none';
//             firstCard.style.left = `${newLeft}px`;
    
//             // Keep in DOM order if needed
//             slider.appendChild(firstCard);
//             cards.push(firstCard);
    
//             // Force browser to apply changes before transition
//             requestAnimationFrame(() => {
//                 firstCard.style.transition = `left ${animationDuration}ms ease`;
//             });
    
//             isAnimating = false;
//         }, animationDuration);
//     }
    

//     // Handle infinite prev
//     function showPrevCard() {
//         if (isAnimating) return;
//         isAnimating = true;

//         const lastCard = cards.pop();
//         const firstCard = cards[0];
//         const newLeft = parseFloat(firstCard.style.left) - (cardWidth + cardGap);

//         lastCard.style.transition = 'none';
//         lastCard.style.left = `${newLeft}px`;

//         slider.insertBefore(lastCard, firstCard);
//         cards.unshift(lastCard);

//         // Trigger reflow and re-enable transition
//         void lastCard.offsetHeight;
//         lastCard.style.transition = `left ${animationDuration}ms ease`;

//         cards.forEach((card) => {
//             const currentLeft = parseFloat(card.style.left);
//             card.style.left = `${currentLeft + (cardWidth + cardGap)}px`;
//         });

//         setTimeout(() => {
//             isAnimating = false;
//         }, animationDuration);
//     }

//     nextBtn.addEventListener('click', showNextCard);
//     prevBtn.addEventListener('click', showPrevCard);

//     // Resize recalculation
//     window.addEventListener('resize', () => {
//         setupCards();
//     });
// });


document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('slider');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let cards = Array.from(document.querySelectorAll('.story-card'));

    const cardsPerView = 2.25;
    const cardGap = 20;
    let cardWidth = (slider.offsetWidth / cardsPerView) - (cardGap / cardsPerView);

    let isAnimating = false;
    const animationDuration = 700;

    slider.style.position = 'relative';
    // slider.style.overflowX = 'hidden';

    function setupCards() {
        cardWidth = (slider.offsetWidth / cardsPerView) - (cardGap / cardsPerView);

        cards.forEach((card, index) => {
            card.style.position = 'absolute';
            card.style.width = `${cardWidth}px`;
            card.style.transition = `left ${animationDuration}ms ease`;
            card.style.left = `${(cardWidth + cardGap) * index}px`;
        });
    }

    setupCards();

    function showNextCard() {
        if (isAnimating) return;
        isAnimating = true;

        cards.forEach((card) => {
            const currentLeft = parseFloat(card.style.left);
            card.style.left = `${currentLeft - (cardWidth + cardGap)}px`;
        });

        setTimeout(() => {
            const firstCard = cards.shift();
            const lastCard = cards[cards.length - 1];
            const newLeft = parseFloat(lastCard.style.left) + cardWidth + cardGap;

            firstCard.style.transition = 'none';
            firstCard.style.left = `${newLeft}px`;

            slider.appendChild(firstCard);
            cards.push(firstCard);

            requestAnimationFrame(() => {
                firstCard.style.transition = `left ${animationDuration}ms ease`;
            });

            isAnimating = false;
        }, animationDuration);
    }

    function showPrevCard() {
        if (isAnimating) return;
        isAnimating = true;

        const lastCard = cards.pop();
        const firstCard = cards[0];
        const newLeft = parseFloat(firstCard.style.left) - (cardWidth + cardGap);

        lastCard.style.transition = 'none';
        lastCard.style.left = `${newLeft}px`;

        slider.insertBefore(lastCard, firstCard);
        cards.unshift(lastCard);

        requestAnimationFrame(() => {
            lastCard.style.transition = `left ${animationDuration}ms ease`;

            cards.forEach((card) => {
                const currentLeft = parseFloat(card.style.left);
                card.style.left = `${currentLeft + (cardWidth + cardGap)}px`;
            });
        });

        setTimeout(() => {
            isAnimating = false;
        }, animationDuration);
    }

    nextBtn.addEventListener('click', showNextCard);
    prevBtn.addEventListener('click', showPrevCard);

    window.addEventListener('resize', () => {
        setupCards();
    });
});

