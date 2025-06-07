document.addEventListener('DOMContentLoaded', function() {
    // Updated image data with all your actual photos
    const imageData = [
        {
            src: 'photos/photo1.jpeg',
            caption: 'Welcome to the world, little angel!',
            type: 'image'
        },
        {
            src: 'photos/photo2.jpeg',
            caption: 'Growing with love and joy',
            type: 'image'
        },
        {
            src: 'photos/photo3.jpeg',
            caption: 'Precious moments with our little one',
            type: 'image'
        },
        {
            src: 'photos/photo4.jpeg',
            caption: 'Sweet baby smiles',
            type: 'image'
        },
        {
            src: 'photos/photo5.jpeg',
            caption: 'Every day brings new adventures',
            type: 'image'
        },
        {
            src: 'photos/photo6.jpeg',
            caption: 'Tiny hands, big love',
            type: 'image'
        },
        {
            src: 'photos/photo7.jpeg',
            caption: 'Bundle of happiness',
            type: 'image'
        },
        {
            src: 'photos/photo8.jpeg',
            caption: 'Our little treasure',
            type: 'image'
        },
        {
            src: 'photos/photo9.jpeg',
            caption: 'Pure joy and innocence',
            type: 'image'
        },
        {
            src: 'photos/photo10.jpeg',
            caption: 'Making beautiful memories',
            type: 'image'
        },
        {
            src: 'photos/photo11.jpeg',
            caption: 'Our little blessing',
            type: 'image'
        },
        {
            src: 'videos/video1.mp4',
            caption: 'Precious moments captured on video',
            type: 'video'
        },
        {
            src: 'photos/photo12.jpeg',
            caption: 'A new addition to the family',
            type: 'image'
        },
        {
            src: 'photos/photo13.jpeg',
            caption: 'Growing bigger every day',
            type: 'image'
        },
        {
            src: 'photos/photo14.jpeg',
            caption: 'Sweetest dreams',
            type: 'image'
        },
        {
            src: 'photos/photo15.jpeg',
            caption: 'Playful moments',
            type: 'image'
        },
        {
            src: 'photos/photo16.jpeg',
            caption: 'Full of wonder',
            type: 'image'
        },
        {
            src: 'videos/video2.mp4',
            caption: 'More precious moments',
            type: 'video'
        },
        {
            src: 'photos/photo17.jpeg',
            caption: 'Another sweet memory',
            type: 'image'
        },
        {
            src: 'videos/video3.mp4',
            caption: 'New video added',
            type: 'video'
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
    let isMusicPlaying = false;
    const animationDelay = 4000; // Time each slide is shown in ms

    // Initialize the slideshow
    function initializeSlideshow() {
        // Create slides
        imageData.forEach((media, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            if (index === 0) slide.classList.add('active');
            
            if (media.type === 'video') {
                const video = document.createElement('video');
                video.src = media.src;
                video.controls = true;
                video.className = 'media-content';
                video.playsInline = true;
                video.muted = true; // Start muted for autoplay
                slide.appendChild(video);
            } else {
                const img = document.createElement('img');
                img.src = media.src;
                img.alt = media.caption;
                img.loading = 'lazy';
                img.className = 'media-content';
                slide.appendChild(img);
            }
            
            slideshow.appendChild(slide);
            
            // Create thumbnails
            const thumbnail = document.createElement('div'); // Use div as a container
            thumbnail.className = 'thumbnail';
            if (index === 0) thumbnail.classList.add('active');
            
            // Conditionally create img or video for thumbnail content
            let thumbnailContent;
            if (media.type === 'video') {
                thumbnailContent = document.createElement('video');
                thumbnailContent.src = media.src;
                thumbnailContent.muted = true; // Mute for thumbnail preview
                thumbnailContent.playsInline = true; // Play inline on iOS
                thumbnailContent.loop = true; // Loop for continuous preview
                thumbnailContent.preload = 'metadata'; // Load metadata only
                thumbnailContent.autoplay = true; // Autoplay for preview
            } else {
                thumbnailContent = document.createElement('img');
                thumbnailContent.src = media.src;
                thumbnailContent.alt = 'Thumbnail';
                thumbnailContent.loading = 'lazy';
            }
            thumbnailContent.className = 'thumbnail-content'; // Add a common class
            thumbnail.appendChild(thumbnailContent);

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
        // Pause current video if it exists
        const slides = document.querySelectorAll('.slide');
        const currentVideo = slides[currentSlide].querySelector('video');
        if (currentVideo) {
            currentVideo.pause();
        }

        // Remove active class from current slide and add to new slide
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

            // If the new slide is a video, handle playback
            const newSlideVideo = slides[currentSlide].querySelector('video');
            if (newSlideVideo) {
                clearInterval(slideInterval); // Stop auto-advance for video
                if (isPlaying) { // Only play if auto-play was active
                    newSlideVideo.play();
                }
                newSlideVideo.onended = () => {
                    if (isPlaying) { // Resume auto-play after video ends, if it was active
                        nextSlide();
                        resetInterval();
                    }
                };
            } else if (isPlaying) { // If it's an image and auto-play is active, restart interval
                resetInterval();
            }

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

    // Reset interval when manually changing slides or video ends
    function resetInterval() {
        // Pause current video if any before resetting interval
        const currentSlideElement = document.querySelectorAll('.slide')[currentSlide];
        const currentVideo = currentSlideElement.querySelector('video');
        if (currentVideo) {
            currentVideo.pause();
        }

        if (isPlaying) {
            clearInterval(slideInterval);
            // Only set interval if the current slide is not a video
            if (imageData[currentSlide].type !== 'video') {
                slideInterval = setInterval(nextSlide, animationDelay);
            }
        }
    }

    // Toggle slideshow auto-play
    function toggleAutoPlay() {
        const currentSlideElement = document.querySelectorAll('.slide')[currentSlide];
        const currentVideo = currentSlideElement.querySelector('video');

        if (isPlaying) {
            clearInterval(slideInterval);
            if (currentVideo) {
                currentVideo.pause();
            }
            autoPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            if (currentVideo) {
                currentVideo.play();
            } else {
                slideInterval = setInterval(nextSlide, animationDelay);
            }
            autoPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    }

    // Simple music toggle function
    function toggleMusic() {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicToggle.classList.remove('playing');
            musicToggle.querySelector('span').textContent = 'Play Music';
            musicToggle.querySelector('i').classList.remove('fa-pause');
            musicToggle.querySelector('i').classList.add('fa-music');
        } else {
            backgroundMusic.play();
            musicToggle.classList.add('playing');
            musicToggle.querySelector('span').textContent = 'Pause Music';
            musicToggle.querySelector('i').classList.remove('fa-music');
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