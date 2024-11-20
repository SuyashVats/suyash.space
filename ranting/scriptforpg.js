
const menuToggle = document.querySelector('.menu-toggle');
const menuContainer = document.querySelector('.menu-container');
const menuItems = document.querySelectorAll('.menu-item');
const langSwitch = document.querySelector('.lang-switch');

let isMenuOpen = false;

function splitLetters(element) {
    const text = element.textContent;
    element.textContent = '';
    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        element.appendChild(span);
    });
}

menuItems.forEach(splitLetters);

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        gsap.to(menuContainer, {
            opacity: 1,
            visibility: 'visible',
            duration: 0.5
        });

        gsap.from(menuItems, {
            y: 50,
            opacity: 0,
            rotationX: -90,
            stagger: 0.1,
            duration: 0.8,
            ease: 'back.out(1.7)'
        });

        menuItems.forEach(item => {
            gsap.from(item.children, {
                opacity: 0,
                y: 20,
                rotationY: 90,
                stagger: 0.02,
                duration: 0.6,
                ease: 'power2.out'
            });
        });
    } else {
        gsap.to(menuContainer, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                menuContainer.style.visibility = 'hidden';
            }
        });
    }

    gsap.to(menuToggle.children, {
        rotation: isMenuOpen ? 45 : 0,
        y: isMenuOpen ? 8 : 0,
        stagger: 0.1,
        duration: 0.3
    });
}

menuToggle.addEventListener('click', toggleMenu);

menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(item.children, {
            x: -10,
            rotationY: -360,
            color: '#808080',
            stagger: 0.02,
            duration: 0.4
        });
    });

    item.addEventListener('mouseleave', () => {
        gsap.to(item.children, {
            x: 0,
            rotationY: 0,
            color: '#ffffff',
            stagger: 0.02,
            duration: 0.4
        });
    });

    // Add click event to close menu
    item.addEventListener('click', () => {
        if (isMenuOpen) {
            toggleMenu();  // Close menu after clicking an item
        }
    });
});

langSwitch.addEventListener('click', () => {
    gsap.to(langSwitch, {
        rotation: 360,
        scale: 1.2,
        duration: 0.5,
        onComplete: () => {
            gsap.to(langSwitch, {
                scale: 1,
                duration: 0.3
            });
        }
    });
});


