document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark-theme') {
        body.classList.add('dark-theme');
        themeToggle.checked = true;
    }

    // Theme toggle event
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light-theme');
        }
    });

    // Sidebar Toggle Functionality
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebarClose = document.querySelector('.sidebar-close');
    
    // Check screen size on load
    function checkScreenSize() {
        if (window.innerWidth <= 1024) {
            // Mobile behavior
            sidebar.classList.remove('active');
            sidebarToggle.style.display = 'flex';
        } else {
            // Desktop behavior
            sidebar.classList.add('active');
            sidebarToggle.style.display = 'none';
        }
    }
    
    // Initial check
    checkScreenSize();
    
    // Toggle sidebar on button click
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        sidebarToggle.classList.toggle('active');
    });
    
    // Close sidebar when X is clicked (mobile only)
    sidebarClose.addEventListener('click', () => {
        sidebar.classList.remove('active');
        sidebarToggle.classList.remove('active');
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            const isClickInsideSidebar = sidebar.contains(e.target);
            const isClickOnToggle = sidebarToggle.contains(e.target);
            
            if (!isClickInsideSidebar && !isClickOnToggle) {
                sidebar.classList.remove('active');
                sidebarToggle.classList.remove('active');
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', checkScreenSize);

    // Dynamic Title Animation
    const dynamicTitle = document.querySelector('.dynamic-title');
    const titles = ["Graphic Designer", "Visual Artist", "Photographer"];
    
    // Clear existing content
    dynamicTitle.innerHTML = '';
    
    // Create spans for each title
    titles.forEach((title, index) => {
        const span = document.createElement('span');
        span.textContent = title;
        span.style.animationDelay = `${index * 3}s`;
        dynamicTitle.appendChild(span);
    });

    // Gallery Slider
    const slider = document.querySelector('.gallery-slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.dots-container');
    let currentSlide = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Create dots for each slide
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Function to go to specific slide
    function goToSlide(slideIndex) {
        slider.style.transform = `translateX(-${slideIndex * 100}%)`;
        currentSlide = slideIndex;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Next slide
    function nextSlide() {
        if (currentSlide === slides.length - 1) {
            goToSlide(0);
        } else {
            goToSlide(currentSlide + 1);
        }
    }
    
    // Previous slide
    function prevSlide() {
        if (currentSlide === 0) {
            goToSlide(slides.length - 1);
        } else {
            goToSlide(currentSlide - 1);
        }
    }
    
    // Button event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Touch events for mobile swipe
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const difference = touchStartX - touchEndX;
        if (difference > 50) {
            nextSlide(); // Swipe left
        } else if (difference < -50) {
            prevSlide(); // Swipe right
        }
    }
    
    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Navigation active state
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section');
    
    function updateActiveNav() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Event listeners for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close sidebar on mobile
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
                sidebarToggle.classList.remove('active');
            }
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 20,
                behavior: 'smooth'
            });
        });
    });
    
    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Initialize
    updateActiveNav();

    // Lightbox functionality for portfolio images
    const portfolioImages = document.querySelectorAll('.slide img');
    
    portfolioImages.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function() {
            createLightbox(this);
        });
    });

    function createLightbox(imageElement) {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${imageElement.src}" alt="${imageElement.alt}">
                <span class="lightbox-close">&times;</span>
                <div class="lightbox-nav">
                    <button class="lightbox-prev"><i class="fas fa-chevron-left"></i></button>
                    <button class="lightbox-next"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Close lightbox
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => {
            lightbox.remove();
            document.body.style.overflow = '';
        });
        
        // Close when clicking outside image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.remove();
                document.body.style.overflow = '';
            }
        });
        
        // Navigation between images
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        let currentIndex = Array.from(portfolioImages).indexOf(imageElement);
        
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateLightbox(currentIndex - 1);
        });
        
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateLightbox(currentIndex + 1);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function lightboxKeyHandler(e) {
            if (lightbox.parentNode) {
                if (e.key === 'Escape') {
                    lightbox.remove();
                    document.body.style.overflow = '';
                    document.removeEventListener('keydown', lightboxKeyHandler);
                } else if (e.key === 'ArrowLeft') {
                    navigateLightbox(currentIndex - 1);
                } else if (e.key === 'ArrowRight') {
                    navigateLightbox(currentIndex + 1);
                }
            }
        });
        
        
        function navigateLightbox(newIndex) {
            if (newIndex < 0) newIndex = portfolioImages.length - 1;
            if (newIndex >= portfolioImages.length) newIndex = 0;
            
            const newImg = portfolioImages[newIndex];
            const lightboxImg = lightbox.querySelector('img');
            lightboxImg.src = newImg.src;
            lightboxImg.alt = newImg.alt;
            
            // Update current index for subsequent navigation
            currentIndex = newIndex;
        }
    }
});