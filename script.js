const projects = [
    {
        title: "LogicLab",
        description: "Unleash interactive learning with unique virtual lab experiments in Vedic Maths and JavaScript!",
        image: "img/image.png",
    
        href: "https://vlab-js-vm.netlify.app/"
    },
    {
        title: "Dash",
        description: "An exciting car racing game where players dodge traffic and race to set the highest score!",
        image: "./img/Screenshot 2024-11-12 133625.png",
        
        href: "https://dash-racing.netlify.app/"
    },
    {
        title: "Menia",
        description: "A web-based two-player game lets two players compete or cooperate online in real-time.",
        image: "./img/Screenshot 2024-11-17 032639.png",
        
        href: "https://fighting-menia.netlify.app/"
    },
];

function createProjectCard(project) {
    return `
        <div class="project-card">
            <div class="project-image" style="background-image: url('${project.image}'); background-image: ${project.gradient};"></div>
            <div class="project-content">
                <h2 class="project-title">${project.title}</h2>
                <p class="project-description">${project.description}</p>
                <button class="view-button" onclick="window.location.href='${project.href}'">View Project</button>
            </div>
        </div>
    `;
}

function renderPortfolio() {
    const portfolioGrid = document.getElementById('portfolio-grid');
    portfolioGrid.innerHTML = projects.map(createProjectCard).join('');
}

document.addEventListener('DOMContentLoaded', renderPortfolio);




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




//*************************************** */

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
    { id: 1, title: 'The Future of Web Development', date: '2023-05-15', excerpt: 'Exploring upcoming trends and technologies in web development. From AI-driven design to WebAssembly, the landscape is evolving rapidly.' },
    { id: 2, title: 'Mastering React Hooks', date: '2023-06-02', excerpt: 'A deep dive into React Hooks and how to use them effectively. Learn to manage state and side effects with ease in your functional components.' },
    { id: 3, title: 'CSS Grid vs Flexbox', date: '2023-06-20', excerpt: 'Comparing two powerful layout systems in CSS. Understand when to use Grid for two-dimensional layouts and Flexbox for one-dimensional content flow.' },
];

const blogGrid = document.getElementById('blogGrid');

function createBlogCard(post) {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.innerHTML = `
        <div class="blog-content">
            <h2 class="blog-title">${post.title}</h2>
            <p class="blog-date">${post.date}</p>
            <p class="blog-excerpt">${post.excerpt}</p>
            <a href="#" class="read-more">Read More</a>
        </div>
    `;
    return card;
}

function animateTitle() {
    gsap.to('.title-span', {
        opacity: 1,
        y: 0,
        rotation: 0,
        stagger: 0.1,
        ease: "elastic.out(1, 0.3)",
        duration: 1
    });
}

function init() {
    blogPosts.forEach(post => {
        const card = createBlogCard(post);
        blogGrid.appendChild(card);

        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                rotation: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                boxShadow: '0 10px 20px rgba(255, 255, 255, 0.1)',
                duration: 0.3
            });

            gsap.to(card.querySelector('.blog-title'), {
                y: -5,
                color: '#fff',
                duration: 0.3
            });

            gsap.to(card.querySelector('.blog-excerpt'), {
                maxHeight: '9.6em',
                duration: 0.5
            });

            gsap.to(card.querySelector('.read-more'), {
                x: 5,
                duration: 0.3
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                rotation: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                boxShadow: 'none',
                duration: 0.3
            });

            gsap.to(card.querySelector('.blog-title'), {
                y: 0,
                color: '#fff',
                duration: 0.3
            });

            gsap.to(card.querySelector('.blog-excerpt'), {
                maxHeight: '4.8em',
                duration: 0.5
            });

            gsap.to(card.querySelector('.read-more'), {
                x: 0,
                duration: 0.3
            });
        });
    });

    animateTitle();
}

document.addEventListener('DOMContentLoaded', init);