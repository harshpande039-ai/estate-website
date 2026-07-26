/**
 * Opulent Acres - 3D Elliptical Orbit & Homepage Gallery
 * Core Interactive System
 */

import { properties as propertyData } from './properties.js';

document.addEventListener('DOMContentLoaded', () => {
  // Ensure properties array is loaded
  const propertyList = propertyData || [];
  let filteredData = [...propertyList];

  // DOM Elements
  const ringContainer = document.getElementById('ring-container');
  const ringView = document.getElementById('ring-view');
  const gridView = document.getElementById('grid-view');
  const propertyGrid = document.getElementById('property-grid-container');
  const viewToggleBtn = document.getElementById('view-toggle-btn');
  const filterBtn = document.getElementById('filter-btn');
  const filterOverlay = document.getElementById('filter-overlay');
  const closeFilterBtn = document.getElementById('close-filter-btn');
  const applyFiltersBtn = document.getElementById('apply-filters-btn');
  const resetFiltersBtn = document.getElementById('reset-filters-btn');
  
  // Center Content Elements
  const stateDefault = document.querySelector('.state-default');
  const stateActive = document.querySelector('.state-active');
  const activeTitle = document.getElementById('active-title');
  const activeImage = document.getElementById('active-image');
  const activeMeta = document.getElementById('active-meta');
  const activeCta = document.getElementById('active-cta');
  const interactionHint = document.getElementById('interaction-hint');

  // Custom Cursor Elements
  const cursorDot = document.getElementById('custom-cursor');
  const cursorRing = document.getElementById('custom-cursor-ring');

  // Active view state
  let isGridView = false;

  // Custom Cursor Tracking
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let cursorRingX = 0, cursorRingY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Hover cursor state triggers
  function setupCursorHoverTriggers() {
    const hoverables = document.querySelectorAll('a, button, select, .panel-card, .category-tag');
    hoverables.forEach(item => {
      item.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      item.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // Animation frame loop for custom cursor follower
  function updateCursor() {
    // Lerp dot
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursorDot.style.left = `${cursorX}px`;
    cursorDot.style.top = `${cursorY}px`;

    // Lerp ring with more inertia
    cursorRingX += (mouseX - cursorRingX) * 0.12;
    cursorRingY += (mouseY - cursorRingY) * 0.12;
    cursorRing.style.left = `${cursorRingX}px`;
    cursorRing.style.top = `${cursorRingY}px`;

    requestAnimationFrame(updateCursor);
  }
  requestAnimationFrame(updateCursor);

  // Mobile Menu Controls
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav-overlay');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    // Prevent body scroll when mobile menu is open
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  });

  // Close button inside mobile nav overlay
  const mobileNavClose = document.getElementById('mobile-nav-close');
  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Close mobile nav overlay if open
        if (menuToggle.classList.contains('active')) {
          menuToggle.classList.remove('active');
          mobileNav.classList.remove('active');
          document.body.style.overflow = ''; // restore scroll
        }
        
        // Scroll smoothly to section
        const headerOffset = 80;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Track active section and highlight header links accordingly
  const sections = document.querySelectorAll('main, section');
  const desktopNavLinks = document.querySelectorAll('.nav-link');
  
  const observerOptions = {
    root: null,
    rootMargin: '-120px 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // ==========================================================================
  // 3D ORBIT RING PARAMETERS & RENDER LOGIC
  // ==========================================================================

  let panels = [];
  let panelCount = 140; // Number of panels visually rendered in the ring
  let rotationOffset = 0;
  let targetRotationOffset = 0;
  let rotationSpeed = -0.001; // Auto rotation velocity
  let tiltY = 0;
  let targetTiltY = 0;

  // Drag physics tracking
  let isDragging = false;
  let dragStartAngle = 0;
  let startRotationOffset = 0;
  let lastDragX = 0;
  let dragVelocity = 0;
  let dragVelocityMultiplier = 0.0015;

  // Selected locked property
  let selectedPropertyId = null;
  let activeHoverId = null;

  // Ellipse Orbit Dimensions
  let radiusX = 680;
  let radiusY = 170;
  let perspectiveDist = 1100;

  function updateRadius() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (w < 480) {
      radiusX = 260;
      radiusY = 55;
      perspectiveDist = 700;
      panelCount = 60;
    } else if (w < 768) {
      radiusX = 360;
      radiusY = 85;
      perspectiveDist = 900;
      panelCount = 80;
    } else if (w < 1024) {
      radiusX = 520;
      radiusY = 120;
      perspectiveDist = 1000;
      panelCount = 110;
    } else {
      radiusX = Math.min(760, w * 0.44);
      radiusY = Math.min(200, h * 0.18);
      perspectiveDist = 1200;
      panelCount = 140;
    }
  }


  // Re-build/re-initialize Ring panels
  function buildRing() {
    ringContainer.innerHTML = '';
    panels = [];

    if (filteredData.length === 0) {
      const fallback = document.createElement('div');
      fallback.style.cssText = "color: var(--text-muted); font-size: 14px; letter-spacing: 2px; text-transform: uppercase; margin-top: -50px;";
      fallback.innerText = "No matching landmarks found";
      ringContainer.appendChild(fallback);
      return;
    }

    const itemsToRender = Math.min(panelCount, filteredData.length);

    for (let i = 0; i < itemsToRender; i++) {
      const prop = filteredData[i % filteredData.length];
      const panel = document.createElement('div');
      panel.className = 'panel-card';
      panel.dataset.id = prop.id;

      // Lazy load/Optimized thumbnail image
      const img = document.createElement('img');
      img.src = prop.thumbnail;
      img.alt = prop.title;
      img.loading = 'lazy';
      
      // Fallback background image safety
      img.onerror = () => {
        img.src = 'assets/fallback.svg';
      };

      panel.appendChild(img);
      ringContainer.appendChild(panel);

      panels.push({
        element: panel,
        data: prop,
        index: i,
        total: itemsToRender
      });

      // Hover Interaction handlers
      panel.addEventListener('mouseenter', () => {
        if (isDragging) return;
        activeHoverId = prop.id;
        panels.forEach(p => p.element.classList.remove('hovered'));
        panel.classList.add('hovered');
        updateCenterPreview(prop);
      });

      panel.addEventListener('mouseleave', () => {
        if (isDragging) return;
        panel.classList.remove('hovered');
        activeHoverId = null;
        
        // Return to locked selection or default state
        if (selectedPropertyId) {
          const selectedProp = filteredData.find(p => p.id === selectedPropertyId);
          if (selectedProp) updateCenterPreview(selectedProp, true);
        } else {
          resetCenterDisplay();
        }
      });

      // Click / Lock interaction
      panel.addEventListener('click', (e) => {
        if (isDragging) return;
        e.stopPropagation();
        lockProperty(prop.id);
        
        // Rotate ring to make selected item front-center (angle = -Math.PI / 2)
        const targetAngle = -((i / itemsToRender) * Math.PI * 2);
        // Normalize rotation angle transition path
        const currentAngleNorm = rotationOffset % (Math.PI * 2);
        targetRotationOffset = rotationOffset - (currentAngleNorm - targetAngle);
      });
    }

    setupCursorHoverTriggers();
  }

  // Center display update
  function updateCenterPreview(prop, isLocked = false) {
    stateDefault.classList.remove('active');
    stateActive.classList.add('active');
    
    if (isLocked) {
      stateActive.classList.add('locked');
      interactionHint.innerHTML = `LOCKED: ${prop.title} &middot; <span style="text-decoration: underline; cursor: pointer;" onclick="window.clearLock()">UNLOCK PREVIEW</span>`;
      
      // Center view property button href/action binding
      activeCta.onclick = () => {
        alert(`Navigating to project page for "${prop.title}" (${prop.location})...`);
      };
    } else {
      stateActive.classList.remove('locked');
      interactionHint.innerHTML = "MOVE TO EXPLORE &middot; DRAG TO SPIN &middot; CLICK TO LOCK";
    }

    activeTitle.innerText = prop.title;
    activeMeta.innerText = `${prop.category} &middot; ${prop.location} &middot; ${prop.priceRange || ''}`.replace(/&middot;/g, '·');
    
    // Crossfade image safely
    activeImage.classList.remove('loaded');
    activeImage.src = prop.image;
    activeImage.onload = () => {
      activeImage.classList.add('loaded');
    };
  }

  function resetCenterDisplay() {
    stateActive.classList.remove('active');
    stateActive.classList.remove('locked');
    stateDefault.classList.add('active');
    interactionHint.innerText = "MOVE TO EXPLORE &middot; DRAG TO SPIN &middot; CLICK TO LOCK";
  }

  window.clearLock = function() {
    selectedPropertyId = null;
    panels.forEach(p => p.element.classList.remove('active-selected'));
    resetCenterDisplay();
  };

  function lockProperty(id) {
    selectedPropertyId = id;
    panels.forEach(p => {
      if (p.data.id === id) {
        p.element.classList.add('active-selected');
        updateCenterPreview(p.data, true);
      } else {
        p.element.classList.remove('active-selected');
      }
    });
  }

  // ==========================================================================
  // PHYSICS / MATH ORBIT ROTATION ENGINE
  // ==========================================================================

  function renderOrbitFrame() {
    // Apply default slow spin if no active interactions override it
    if (!isDragging) {
      rotationOffset += (targetRotationOffset - rotationOffset) * 0.1;
      tiltY += (targetTiltY - tiltY) * 0.1;

      // Subtle automatic rotation offset over time
      targetRotationOffset += rotationSpeed;
    } else {
      // Smooth interpolation during dragging
      rotationOffset += (targetRotationOffset - rotationOffset) * 0.25;
    }

    panels.forEach(panel => {
      // Calculate spatial coordinates on the elliptical path
      const baseAngle = (panel.index / panel.total) * Math.PI * 2;
      const angle = baseAngle + rotationOffset;

      const x = Math.cos(angle) * radiusX;
      // Combine y value with perspective height adjustment
      const y = Math.sin(angle) * radiusY + (Math.sin(angle) * (tiltY * 45));
      const zDepth = Math.sin(angle); // Front = 1, Back = -1

      // 3D transformations
      // Map scale based on Z depth position
      let scaleVal = 0.58 + (zDepth + 1) * 0.26; // Range: 0.58 to 1.1

      // Soft opacity adjustment based on perspective depth
      let opacityVal = 0.35 + (zDepth + 1) * 0.325; // Range: 0.35 to 1.0

      // Blur depth effect for panels visually far away
      let blurVal = Math.max(0, (1 - zDepth) * 0.6); // Max 1.2px blur at the very back

      // Layer ordering zIndex
      const zIndexVal = Math.round((zDepth + 1) * 200);

      // Y-axis facing rotation depending on relative orbital layout position
      const rotY = -Math.cos(angle) * 35; 

      // Apply transform styles using GPU-accelerated translate3d
      panel.element.style.transform = `translate3d(${x}px, ${y}px, ${zDepth * 150}px) scale(${scaleVal}) rotateY(${rotY}deg)`;
      panel.element.style.opacity = opacityVal;
      panel.element.style.filter = `blur(${blurVal}px)`;
      panel.element.style.zIndex = zIndexVal;
    });

    requestAnimationFrame(renderOrbitFrame);
  }

  // Initialize Render Orbit Loop
  requestAnimationFrame(renderOrbitFrame);

  // Interactive mouse viewport hover adjustments (tilting and shifting)
  window.addEventListener('mousemove', (e) => {
    if (isGridView || isDragging) return;
    
    // Normalize X/Y coordinates
    const normX = (e.clientX / window.innerWidth) * 2 - 1; // -1 to 1
    const normY = (e.clientY / window.innerHeight) * 2 - 1; // -1 to 1

    // Update target parameters for rotation shift & orbital tilt
    if (!isDragging) {
      targetRotationOffset += normX * 0.003;
      targetTiltY = normY * 0.8;
    }
  });

  // ==========================================================================
  // CLICK AND DRAG INERTIA ENGINE
  // ==========================================================================

  ringView.addEventListener('mousedown', (e) => {
    isDragging = true;
    document.body.classList.add('cursor-drag');
    lastDragX = e.clientX;
    dragVelocity = 0;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastDragX;
    lastDragX = e.clientX;

    // Direct proportional rotation adjustments
    dragVelocity = deltaX * dragVelocityMultiplier;
    rotationOffset += dragVelocity;
    targetRotationOffset = rotationOffset;
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    document.body.classList.remove('cursor-drag');

    // Transfer final drag velocity to auto speed for inertia/momentum decay
    if (Math.abs(dragVelocity) > 0.0005) {
      rotationSpeed = dragVelocity * 0.8;
    } else {
      rotationSpeed = -0.001; // Return to standard slow rotation speed
    }
  });

  // Touch Swipe Interaction support for mobile devices
  ringView.addEventListener('touchstart', (e) => {
    isDragging = true;
    lastDragX = e.touches[0].clientX;
    dragVelocity = 0;
  });

  ringView.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - lastDragX;
    lastDragX = e.touches[0].clientX;
    dragVelocity = deltaX * dragVelocityMultiplier * 1.5; // Stronger swipe sensitivity
    rotationOffset += dragVelocity;
    targetRotationOffset = rotationOffset;
  });

  ringView.addEventListener('touchend', () => {
    isDragging = false;
    if (Math.abs(dragVelocity) > 0.0005) {
      rotationSpeed = dragVelocity * 0.8;
    } else {
      rotationSpeed = -0.001;
    }
  });

  // ==========================================================================
  // EDITORIAL GRID VIEW TOGGLE
  // ==========================================================================

  function buildGridView() {
    propertyGrid.innerHTML = '';

    if (filteredData.length === 0) {
      propertyGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 60px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px;">No landmarks matched your selection.</div>';
      document.getElementById('grid-count').innerText = '0 properties found';
      return;
    }

    document.getElementById('grid-count').innerText = `${filteredData.length} properties found`;

    filteredData.forEach(prop => {
      const card = document.createElement('div');
      card.className = 'grid-card';
      
      card.innerHTML = `
        <div class="grid-card-img-wrap">
          <img src="${prop.image}" alt="${prop.title}" loading="lazy">
          <span class="status-badge ${prop.status === 'Sold Out' ? 'sold-out' : ''}">${prop.status}</span>
        </div>
        <div class="grid-card-content">
          <span class="grid-card-category">${prop.category}</span>
          <h4 class="grid-card-title">${prop.title}</h4>
          <div class="grid-card-footer">
            <span class="grid-card-location">${prop.location}</span>
            <span class="grid-card-price">${prop.priceRange}</span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        alert(`Exploring property detail profile: "${prop.title}" located in ${prop.location}.`);
      });

      propertyGrid.appendChild(card);
    });

    setupCursorHoverTriggers();
  }

  viewToggleBtn.addEventListener('click', () => {
    isGridView = !isGridView;
    if (isGridView) {
      viewToggleBtn.innerHTML = `Ring view <span class="plus">+</span>`;
      ringView.style.opacity = '0';
      setTimeout(() => ringView.classList.add('hidden'), 500);
      
      gridView.classList.remove('hidden');
      buildGridView();
      
      // Smooth fade-in of grid
      gsap.fromTo(gridView, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
      document.getElementById('interaction-hint').innerText = "CLICK A CARD TO DISCOVER DETAILED PROFILES";
    } else {
      viewToggleBtn.innerHTML = `Grid view <span class="plus">+</span>`;
      gridView.classList.add('hidden');
      
      ringView.classList.remove('hidden');
      setTimeout(() => ringView.style.opacity = '1', 50);
      
      document.getElementById('interaction-hint').innerText = "MOVE TO EXPLORE &middot; DRAG TO SPIN &middot; CLICK TO LOCK";
    }
  });

  // ==========================================================================
  // SEARCH / FILTER SYSTEM CONTROLS
  // ==========================================================================

  filterBtn.addEventListener('click', () => {
    filterOverlay.classList.add('active');
    gsap.fromTo('.filter-overlay-content', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
  });

  closeFilterBtn.addEventListener('click', () => {
    filterOverlay.classList.remove('active');
  });

  // Front-end filter execution logic
  function applyFilters() {
    const typeVal = document.getElementById('filter-type').value;
    const locVal = document.getElementById('filter-location').value;
    const budgetVal = document.getElementById('filter-budget').value;
    const statusVal = document.getElementById('filter-status').value;

    filteredData = propertyData.filter(prop => {
      // 1. Category Filter
      if (typeVal && prop.category !== typeVal) return false;
      
      // 2. Location Filter
      if (locVal && prop.location !== locVal) return false;

      // 3. Status Filter
      if (statusVal && prop.status !== statusVal) return false;

      // 4. Budget Range parsing
      if (budgetVal) {
        // Price conversion logic from strings like "$2.5M - $8.0M"
        let minPrice = 0;
        const matches = prop.priceRange.match(/([0-9.]+)/g);
        if (matches) {
          minPrice = parseFloat(matches[0]); // Base evaluation on minimum pricing limit
        }
        if (budgetVal === 'under-1.5m' && minPrice >= 1.5) return false;
        if (budgetVal === '1.5m-3m' && (minPrice < 1.5 || minPrice > 3.0)) return false;
        if (budgetVal === '3m-6m' && (minPrice < 3.0 || minPrice > 6.0)) return false;
        if (budgetVal === 'above-6m' && minPrice <= 6.0) return false;
      }

      return true;
    });

    // Re-render matching datasets
    buildRing();
    if (isGridView) {
      buildGridView();
    }
    
    // Clear lock
    selectedPropertyId = null;
    resetCenterDisplay();

    // Toggle clear filters visibility
    const isFiltered = typeVal || locVal || budgetVal || statusVal;
    const gridClearBtn = document.getElementById('grid-clear-btn');
    if (isFiltered) {
      gridClearBtn.classList.remove('hidden');
    } else {
      gridClearBtn.classList.add('hidden');
    }

    filterOverlay.classList.remove('active');
  }

  applyFiltersBtn.addEventListener('click', applyFilters);

  // Reset Filters Form
  resetFiltersBtn.addEventListener('click', () => {
    document.getElementById('filter-type').value = '';
    document.getElementById('filter-location').value = '';
    document.getElementById('filter-budget').value = '';
    document.getElementById('filter-status').value = '';
    applyFilters();
  });

  // Clear button directly inside grid view header
  document.getElementById('grid-clear-btn').addEventListener('click', () => {
    document.getElementById('filter-type').value = '';
    document.getElementById('filter-location').value = '';
    document.getElementById('filter-budget').value = '';
    document.getElementById('filter-status').value = '';
    applyFilters();
  });

  // ==========================================================================
  // PARALLAX SCROLL ENGINE (EXCLUDES HERO SECTION)
  // ==========================================================================
  
  let ticking = false;

  function updateParallax() {
    const scrollY = window.pageYOffset;
    const viewHeight = window.innerHeight;

    // 1. About Section Image Parallax
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      const rect = aboutSection.getBoundingClientRect();
      if (rect.top < viewHeight && rect.bottom > 0) {
        const aboutImg = aboutSection.querySelector('.about-image-frame img');
        if (aboutImg) {
          const totalDistance = rect.height + viewHeight;
          const progress = (viewHeight - rect.top) / totalDistance;
          const translateY = (progress - 0.5) * 80;
          aboutImg.style.transform = `scale(1.15) translateY(${translateY}px)`;
        }
      }
    }

    // 2. Investment Stats Float Parallax
    const investmentSection = document.getElementById('investment-section');
    if (investmentSection) {
      const rect = investmentSection.getBoundingClientRect();
      if (rect.top < viewHeight && rect.bottom > 0) {
        const statBoxes = investmentSection.querySelectorAll('.stat-box');
        statBoxes.forEach((box, index) => {
          const speed = 0.04 + index * 0.015;
          const relativeScroll = (viewHeight - rect.top) * speed;
          box.style.transform = `translateY(${-relativeScroll}px)`;
        });
      }
    }

    ticking = false;
  }

  // Initialize Lenis Smooth Scroll
  function setupSmoothScroll() {
    if (typeof Lenis === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Dynamic nav scroll transitions bound to Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const id = this.getAttribute('href');
        if (id === '#') {
          lenis.scrollTo(0);
        } else {
          const target = document.querySelector(id);
          if (target) {
            lenis.scrollTo(target, { offset: 0 });
          }
        }
      });
    });
  }

  // Scroll Reveal IntersectionObserver Engine
  function setupScrollReveal() {
    if (typeof IntersectionObserver === 'undefined') return;

    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => observer.observe(el));
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  // Auto-hide navigation bar on scroll, show on top-hover
  function setupNavbarAutoHide() {
    const header = document.querySelector('.main-header');
    if (!header) return;

    let isHovered = false;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 100 && !isHovered) {
        header.classList.add('header-hidden');
      } else if (currentScroll <= 100) {
        header.classList.remove('header-hidden');
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (e.clientY < 40) {
        header.classList.remove('header-hidden');
      }
    });

    header.addEventListener('mouseenter', () => {
      isHovered = true;
      header.classList.remove('header-hidden');
    });

    header.addEventListener('mouseleave', () => {
      isHovered = false;
      if (window.pageYOffset > 100) {
        header.classList.add('header-hidden');
      }
    });
  }

  // Handle responsiveness and window scaling
  window.addEventListener('resize', () => {
    updateRadius();
    buildRing();
  });

  // Initial Boot/Load setup
  function init() {
    updateRadius();
    buildRing();
    setupCursorHoverTriggers();
    setupNavbarAutoHide();
    setupSmoothScroll();
    setupScrollReveal();
    
    // Staggered entrance animation with GSAP
    gsap.fromTo('.logo, .main-nav li', 
      { opacity: 0, y: -10 }, 
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
    );

    gsap.fromTo('.control-btn', 
      { opacity: 0 }, 
      { opacity: 1, duration: 1, delay: 0.6 }
    );

    gsap.fromTo('.center-content-wrapper', 
      { opacity: 0, scale: 0.95 }, 
      { opacity: 1, scale: 1, duration: 1.2, delay: 0.3, ease: 'power3.out' }
    );

    gsap.fromTo('.orbit-gallery-wrap', 
      { opacity: 0, scale: 0.9 }, 
      { opacity: 1, scale: 1, duration: 1.4, delay: 0.5, ease: 'power3.out' }
    );
  }

  init();
});
