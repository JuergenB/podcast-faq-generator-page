/**
 * Podcast FAQ Generator - Main JavaScript
 * Handles smooth scrolling and minor interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Skip if it's just "#"
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Account for fixed header
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Header scroll effect
  const header = document.querySelector('.site-header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 10) {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
  });
  
  // FAQ accordion - ensure only one is open at a time (optional behavior)
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  
  faqItems.forEach(item => {
    item.addEventListener('toggle', function() {
      if (this.open) {
        // Close other open items (optional - remove if you want multiple open)
        faqItems.forEach(otherItem => {
          if (otherItem !== this && otherItem.open) {
            otherItem.open = false;
          }
        });
      }
    });
  });
  
  // Animate elements on scroll (subtle fade-in)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Apply to specific elements
  const animatedElements = document.querySelectorAll('.step, .pricing-card, .comparison-box');
  
  animatedElements.forEach(el => {
    // Only animate if user hasn't set reduced motion preference
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      fadeInObserver.observe(el);
    }
  });
  
});
