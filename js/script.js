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

// ========================================== Home Page End ==========================================



