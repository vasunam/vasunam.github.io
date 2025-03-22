/**
 * Victorian Vine Border Effects
 * Implements parallax effect and lazy loading for border elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize border elements
    initBorderEffects();
    
    // Add lazy loading for border elements
    initLazyLoading();
});

/**
 * Initialize parallax effect for border elements
 */
function initBorderEffects() {
    // Get all border elements
    const borders = document.querySelectorAll('.victorian-border, .border-corner');
    
    // Add parallax-border class to all border elements
    borders.forEach(border => {
        border.classList.add('parallax-border');
    });
    
    // Add mouse move event listener for parallax effect
    document.addEventListener('mousemove', function(e) {
        // Get mouse position
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Apply parallax effect to each border
        borders.forEach(border => {
            // Different movement factors for different border elements
            let factorX = 0;
            let factorY = 0;
            
            // Determine movement factors based on border position
            if (border.classList.contains('border-top')) {
                factorX = 10;
                factorY = 5;
            } else if (border.classList.contains('border-right')) {
                factorX = -5;
                factorY = 10;
            } else if (border.classList.contains('border-bottom')) {
                factorX = -10;
                factorY = -5;
            } else if (border.classList.contains('border-left')) {
                factorX = 5;
                factorY = -10;
            } else if (border.classList.contains('corner-top-left')) {
                factorX = 8;
                factorY = 8;
            } else if (border.classList.contains('corner-top-right')) {
                factorX = -8;
                factorY = 8;
            } else if (border.classList.contains('corner-bottom-right')) {
                factorX = -8;
                factorY = -8;
            } else if (border.classList.contains('corner-bottom-left')) {
                factorX = 8;
                factorY = -8;
            }
            
            // Calculate transform values
            const moveX = (mouseX - 0.5) * factorX;
            const moveY = (mouseY - 0.5) * factorY;
            
            // Apply transform with subtle movement
            border.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

/**
 * Initialize lazy loading for border elements
 */
function initLazyLoading() {
    // Get all border elements
    const borders = document.querySelectorAll('.victorian-border, .border-corner');
    
    // Add lazy-border class to all border elements
    borders.forEach(border => {
        border.classList.add('lazy-border');
    });
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add loaded class when element is visible
                entry.target.classList.add('loaded');
                // Stop observing after loading
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '100px',
        threshold: 0.1
    });
    
    // Observe each border element
    borders.forEach(border => {
        observer.observe(border);
    });
}
