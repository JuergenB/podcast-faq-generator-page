/* ==========================================================================
   Podcast FAQ Generator - Main JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    initFaqAccordion();
    
    // Smooth scroll for anchor links
    initSmoothScroll();
    
    // Header scroll effect
    initHeaderScroll();
});

/**
 * FAQ Accordion
 * Toggles FAQ answers open/closed when questions are clicked
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

/**
 * Smooth Scroll
 * Adds smooth scrolling behavior for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (href === '#' || !href) return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Header Scroll Effect
 * Adds a shadow to the header when scrolling
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * Optional: Track CTA clicks for analytics
 * Add your analytics code here
 */
function trackCTAClick(ctaName) {
    // Example: Google Analytics 4
    // gtag('event', 'cta_click', { cta_name: ctaName });
    console.log('CTA clicked:', ctaName);
}
