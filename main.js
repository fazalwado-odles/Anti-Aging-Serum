/**
 * Noche Y Dia - Premium Landing Page JS (Wireframe Aligned)
 * Handles: Scroll reveals, Collectible fanned progress cards deck, Interactive ingredient badges
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Scroll Reveal Animations (Intersection Observer)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });


  /* ==========================================================================
     2. Collectible Overlapping Progress Timeline
     ========================================================================== */
  const timelineCards = document.querySelectorAll('.timeline-card');
  const weekTag = document.getElementById('detail-week-tag');
  const weekTitle = document.getElementById('detail-week-title');
  const weekDesc = document.getElementById('detail-week-desc');
  
  // Progress weeks data
  const weekData = [
    {
      tag: "Week 01",
      title: "First Hydration Shift",
      desc: "Active botanical oils penetrate the outer stratum corneum. Skin barrier hydration levels spike, showing initial plumpness and relief of dry texture."
    },
    {
      tag: "Week 02",
      title: "Barrier Alignment",
      desc: "Essential fatty acids from kiwi and citrus repair the lipid envelope. Moisture loss is significantly reduced. Skin feels softer and smoother."
    },
    {
      tag: "Week 03",
      title: "Tone Balancing",
      desc: "Stable Vitamin C begins to disrupt melanin synthesis in dark spots. Uneven patches begin to blend, revealing a more uniform complexion."
    },
    {
      tag: "Week 04",
      title: "Dermal Firming",
      desc: "Deep lipid delivery supports collagen synthesis. Fine lines around eyes and mouth appear softened. Elasticity begins to noticeably bounce back."
    },
    {
      tag: "Week 05",
      title: "Luminous Glass Glow",
      desc: "Old surface cells are completely renewed. Skin achieves a translucent, lit-from-within glow, with optimal firmness and clear tone balance."
    }
  ];

  let currentCardIndex = 0;
  let autoplayTimer = null;

  function updateTimeline(index) {
    currentCardIndex = index;
    
    // Cycle active class
    timelineCards.forEach((card, idx) => {
      if (idx === currentCardIndex) {
        card.classList.add('active-card');
      } else {
        card.classList.remove('active-card');
      }
    });

    // Update description text with soft fade transition
    const data = weekData[currentCardIndex];
    if (weekTag && weekTitle && weekDesc) {
      const detailsContainer = document.querySelector('.active-card-details');
      
      // Fade out
      detailsContainer.style.opacity = '0';
      detailsContainer.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        weekTag.textContent = data.tag;
        weekTitle.textContent = data.title;
        weekDesc.textContent = data.desc;
        
        // Fade in
        detailsContainer.style.opacity = '1';
        detailsContainer.style.transform = 'translateY(0)';
      }, 300);
    }
  }

  // Set click listeners on timeline cards
  timelineCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      stopAutoplay();
      updateTimeline(idx);
    });

    // Also trigger on hover for quick exploration
    card.addEventListener('mouseenter', () => {
      stopAutoplay();
      updateTimeline(idx);
    });
  });

  // Autoplay function (gentle rotation)
  function startAutoplay() {
    autoplayTimer = setInterval(() => {
      let nextIndex = (currentCardIndex + 1) % timelineCards.length;
      updateTimeline(nextIndex);
    }, 6500);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
    }
  }

  // Start autoplay and pause on hover of the section
  const timelineSection = document.querySelector('.transformation-section');
  if (timelineSection) {
    startAutoplay();
    timelineSection.addEventListener('mouseenter', stopAutoplay);
    timelineSection.addEventListener('mouseleave', startAutoplay);
  }

  // Initialize
  updateTimeline(0);


  /* ==========================================================================
     3. Ingredient Badges Interactive Hover Effects
     ========================================================================== */
  const ingredientBadges = document.querySelectorAll('.ingredient-badge');
  const bottleWrapper = document.querySelector('.bottle-wrapper');
  const bottleGlow = document.querySelector('.bottle-glow-backdrop');

  ingredientBadges.forEach(badge => {
    badge.addEventListener('mouseenter', () => {
      // Scale-lift the center bottle slightly on ingredient hover
      if (bottleWrapper) {
        bottleWrapper.style.transform = 'scale(1.03) translateY(-8px)';
      }
      if (bottleGlow) {
        bottleGlow.style.opacity = '0.85';
        bottleGlow.style.filter = 'blur(25px)';
      }
    });

    badge.addEventListener('mouseleave', () => {
      // Restore center bottle state
      if (bottleWrapper) {
        bottleWrapper.style.transform = 'none';
      }
      if (bottleGlow) {
        bottleGlow.style.opacity = '0.45';
        bottleGlow.style.filter = 'blur(35px)';
      }
    });
  });

});
