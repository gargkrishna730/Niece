document.addEventListener('DOMContentLoaded', function() {
    // Updated image data with all your actual photos
    const imageData = [
        {
            src: 'photos/photo1.jpeg',
            caption: 'Welcome to the world, little angel!'
        },
        {
            src: 'photos/photo2.jpeg',
            caption: 'Growing with love and joy'
        },
        {
            src: 'photos/photo3.jpeg',
            caption: 'Precious moments with our little one'
        },
        {
            src: 'photos/photo4.jpeg',
            caption: 'Sweet baby smiles'
        },
        {
            src: 'photos/photo5.jpeg',
            caption: 'Every day brings new adventures'
        },
        {
            src: 'photos/photo6.jpeg',
            caption: 'Tiny hands, big love'
        },
        {
            src: 'photos/photo7.jpeg',
            caption: 'Bundle of happiness'
        },
        {
            src: 'photos/photo8.jpeg',
            caption: 'Our little treasure'
        },
        {
            src: 'photos/photo9.jpeg',
            caption: 'Pure joy and innocence'
        },
        {
            src: 'photos/photo10.jpeg',
            caption: 'Making beautiful memories'
        },
        {
            src: 'photos/photo11.jpeg',
            caption: 'Our little blessing'
        }
    ];

    // Elements
    const slideshow = document.getElementById('slideshow');
    const thumbnailContainer = document.getElementById('thumbnail-container');
    const captionElement = document.getElementById('caption');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const autoPlayBtn = document.getElementById('auto-play');
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    
    // Variables
    let currentSlide = 0;
    let slideInterval;
    let isPlaying = false;
    let isMusicPlaying = true;
    const animationDelay = 4000; // Time each slide is shown in ms

    // Initialize the slideshow
    function initializeSlideshow() {
        // Create slides
        imageData.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            if (index === 0) slide.classList.add('active');
            
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.caption;
            img.loading = 'lazy';
            
            slide.appendChild(img);
            slideshow.appendChild(slide);
            
            // Create thumbnails
            const thumbnail = document.createElement('img');
            thumbnail.src = image.src;
            thumbnail.alt = 'Thumbnail';
            thumbnail.className = 'thumbnail';
            if (index === 0) thumbnail.classList.add('active');
            
            thumbnail.addEventListener('click', () => {
                goToSlide(index);
                resetInterval();
            });
            
            thumbnailContainer.appendChild(thumbnail);
        });
        
        updateCaption();
    }

    // Go to specific slide
    function goToSlide(index) {
        // Remove active class from current slide and add to new slide
        const slides = document.querySelectorAll('.slide');
        const thumbnails = document.querySelectorAll('.thumbnail');
        
        slides[currentSlide].classList.remove('active', 'animate-in');
        slides[currentSlide].classList.add('animate-out');
        
        thumbnails[currentSlide].classList.remove('active');
        
        setTimeout(() => {
            slides[currentSlide].classList.remove('animate-out');
            currentSlide = (index + slides.length) % slides.length;
            
            slides[currentSlide].classList.add('active', 'animate-in');
            thumbnails[currentSlide].classList.add('active');
            
            updateCaption();
        }, 500); // Half of animation duration
    }

    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Update caption text
    function updateCaption() {
        captionElement.textContent = imageData[currentSlide].caption;
        captionElement.style.animation = 'none';
        setTimeout(() => {
            captionElement.style.animation = 'fadeIn 0.5s forwards';
        }, 10);
    }

    // Reset interval when manually changing slides
    function resetInterval() {
        if (isPlaying) {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, animationDelay);
        }
    }

    // Toggle slideshow auto-play
    function toggleAutoPlay() {
        if (isPlaying) {
            clearInterval(slideInterval);
            autoPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            slideInterval = setInterval(nextSlide, animationDelay);
            autoPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    }

    // Initialize music
    function initializeMusic() {
        // Set initial button state
        musicToggle.classList.add('playing');
        musicToggle.querySelector('span').textContent = 'Pause Music';
        musicToggle.querySelector('i').classList.remove('fa-music');
        musicToggle.querySelector('i').classList.add('fa-pause');

        // Try to play music automatically
        backgroundMusic.play().catch(error => {
            console.log('Auto-play prevented by browser:', error);
            // If autoplay is prevented, show a message to the user
            alert('Please click anywhere on the page to start the music');
            
            // Add a one-time click handler to the document to start playing
            document.addEventListener('click', function startMusic() {
                backgroundMusic.play();
                document.removeEventListener('click', startMusic);
            }, { once: true });
        });
    }

    // Toggle music function now only handles pausing
    function toggleMusic() {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicToggle.classList.remove('playing');
            musicToggle.querySelector('span').textContent = 'Resume Music';
            musicToggle.querySelector('i').classList.remove('fa-pause');
            musicToggle.querySelector('i').classList.add('fa-play');
        } else {
            backgroundMusic.play();
            musicToggle.classList.add('playing');
            musicToggle.querySelector('span').textContent = 'Pause Music';
            musicToggle.querySelector('i').classList.remove('fa-play');
            musicToggle.querySelector('i').classList.add('fa-pause');
        }
        isMusicPlaying = !isMusicPlaying;
    }

    // Add event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    
    autoPlayBtn.addEventListener('click', toggleAutoPlay);
    musicToggle.addEventListener('click', toggleMusic);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetInterval();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetInterval();
        } else if (e.key === ' ') { // Spacebar
            toggleAutoPlay();
        } else if (e.key === 'm' || e.key === 'M') {
            toggleMusic();
        }
    });

    // Initialize
    initializeSlideshow();
    initializeMusic();
    
    // Auto-start slideshow
    toggleAutoPlay();
    
    // Add random floating hearts animation
    function createHearts() {
        const main = document.querySelector('main');
        const heart = document.createElement('div');
        
        heart.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 10}px;
            opacity: ${Math.random() * 0.3 + 0.1};
            color: var(--primary-color);
            left: ${Math.random() * 100}%;
            top: -20px;
            z-index: -1;
            animation: floatHeart ${Math.random() * 10 + 5}s linear forwards;
        `;
        
        heart.innerHTML = '❤';
        main.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, 15000);
    }
    
    // Create floating hearts periodically
    setInterval(createHearts, 1000);
    
    // Add animation for floating hearts
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes floatHeart {
            0% {
                transform: translateY(0) rotate(0deg);
            }
            100% {
                transform: translateY(calc(100vh + 20px)) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
}); 