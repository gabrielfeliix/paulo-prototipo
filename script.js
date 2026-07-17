document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. MOBILE MENU TOGGLE
    // ==========================================================================
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('overflow-hidden');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('overflow-hidden');
            });
        });
    }

    // ==========================================================================
    // 2. BENTO CARDS MOUSE TRACKING GLOW EFFECT
    // ==========================================================================
    const bentoCards = document.querySelectorAll('.bento-card');
    
    bentoCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Mouse X coordinate relative to the card
            const y = e.clientY - rect.top;  // Mouse Y coordinate relative to the card

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // ==========================================================================
    // 3. SCROLL REVEAL EFFECT (INTERSECTION OBSERVER)
    // ==========================================================================
    // Add reveal class to cards and headers dynamically
    const revealElements = [
        ...document.querySelectorAll('.bento-card'),
        ...document.querySelectorAll('.section-header'),
        ...document.querySelectorAll('.hero-content')
    ];

    revealElements.forEach(el => el.classList.add('reveal'));

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once it reveals, we don't need to observe it anymore
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ==========================================================================
    // 4. LEAD FORM SUBMISSION HANDLING & SIMULATION
    // ==========================================================================
    const leadForm = document.getElementById('lead-form');
    const successState = document.getElementById('success-state');

    if (leadForm && successState) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                whatsapp: document.getElementById('whatsapp').value,
                role: document.getElementById('role').value
            };

            // Select submit button and change state
            const submitBtn = leadForm.querySelector('.btn-submit');
            const originalBtnHtml = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span>Enviando dados...</span>
                <svg class="spinner" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
            `;

            // Style rule for spinner animation dynamically in document
            if (!document.getElementById('spinner-style')) {
                const style = document.createElement('style');
                style.id = 'spinner-style';
                style.innerHTML = `
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `;
                document.head.appendChild(style);
            }

            // Simulate server network latency (1.5 seconds)
            setTimeout(() => {
                // Save locally to simulate backend persistence
                const leads = JSON.parse(localStorage.getItem('qwize_leads') || '[]');
                leads.push({ ...formData, date: new Date().toISOString() });
                localStorage.setItem('qwize_leads', JSON.stringify(leads));

                // Fade out form and fade in success screen
                leadForm.style.transition = 'opacity 0.3s ease';
                leadForm.style.opacity = '0';
                
                setTimeout(() => {
                    leadForm.style.display = 'none';
                    successState.style.display = 'flex';
                    successState.style.opacity = '0';
                    
                    // Trigger reflow to enable transition
                    successState.offsetHeight;
                    
                    successState.style.transition = 'opacity 0.5s ease';
                    successState.style.opacity = '1';
                }, 300);

                // Restore button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;

            }, 1500);
        });
    }

    // ==========================================================================
    // 5. MODULES SLIDER (MOBILE ONLY CARD STACK)
    // ==========================================================================
    const sliderContainer = document.querySelector('.modules-slider-container');
    const modulesWrapper = document.querySelector('.modules-wrapper');
    const cards = document.querySelectorAll('.module-card');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    
    if (sliderContainer && modulesWrapper && cards.length > 0 && dotsContainer && prevBtn && nextBtn) {
        let activeIndex = 0;
        let isAnimating = false;
        let startX = 0;
        let endX = 0;
        
        // Generate dots dynamically
        dotsContainer.innerHTML = '';
        cards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Ir para o módulo ${index + 1}`);
            dot.addEventListener('click', () => {
                if (isAnimating || index === activeIndex) return;
                goToCard(index);
            });
            dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.slider-dot');
        
        function updateSlider() {
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                // Assign layout classes to cards based on active index
                cards.forEach((card, index) => {
                    card.classList.remove('card-active', 'card-next-1', 'card-next-2', 'card-hidden');
                    
                    if (index === activeIndex) {
                        card.classList.add('card-active');
                    } else if (index === (activeIndex + 1) % cards.length) {
                        card.classList.add('card-next-1');
                    } else if (index === (activeIndex + 2) % cards.length) {
                        card.classList.add('card-next-2');
                    } else {
                        card.classList.add('card-hidden');
                    }
                });
                
                // Update dots
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === activeIndex);
                });
            } else {
                // Clear slider styles for desktop grid view
                cards.forEach(card => {
                    card.classList.remove('card-active', 'card-next-1', 'card-next-2', 'card-hidden', 'card-swiped-left', 'card-swiped-right');
                });
            }
        }
        
        function nextCard() {
            if (isAnimating) return;
            isAnimating = true;
            
            const activeCard = cards[activeIndex];
            activeCard.classList.add('card-swiped-left');
            
            setTimeout(() => {
                activeIndex = (activeIndex + 1) % cards.length;
                updateSlider();
                activeCard.classList.remove('card-swiped-left');
                isAnimating = false;
            }, 250);
        }
        
        function prevCard() {
            if (isAnimating) return;
            isAnimating = true;
            
            const prevIndex = (activeIndex - 1 + cards.length) % cards.length;
            const prevCardElement = cards[prevIndex];
            
            // 1. Position previous card off-screen to the left (ready to enter)
            prevCardElement.classList.add('card-swiped-left');
            // Force reflow to register offscreen position before transition
            prevCardElement.offsetHeight;
            
            // 2. Set index and update the stack layout
            activeIndex = prevIndex;
            updateSlider();
            
            // 3. Slide it back on top of the stack
            setTimeout(() => {
                prevCardElement.classList.remove('card-swiped-left');
                isAnimating = false;
            }, 250);
        }
        
        function goToCard(index) {
            if (isAnimating) return;
            isAnimating = true;
            
            if (index > activeIndex) {
                // Advance (current card swipes out to the left)
                const activeCard = cards[activeIndex];
                activeCard.classList.add('card-swiped-left');
                
                setTimeout(() => {
                    activeIndex = index;
                    updateSlider();
                    activeCard.classList.remove('card-swiped-left');
                    isAnimating = false;
                }, 250);
            } else {
                // Retrocede (target card slides in from the left)
                const prevCardElement = cards[index];
                prevCardElement.classList.add('card-swiped-left');
                prevCardElement.offsetHeight;
                
                activeIndex = index;
                updateSlider();
                
                setTimeout(() => {
                    prevCardElement.classList.remove('card-swiped-left');
                    isAnimating = false;
                }, 250);
            }
        }
        
        // Navigation button listeners
        nextBtn.addEventListener('click', nextCard);
        prevBtn.addEventListener('click', prevCard);
        
        // Swipe touch & mouse drag listeners
        let isMouseDown = false;

        function handleSwipeEnd() {
            const threshold = 50;
            const diffX = endX - startX;
            
            if (startX !== 0 && endX !== 0) {
                if (diffX < -threshold) {
                    nextCard();
                } else if (diffX > threshold) {
                    prevCard();
                }
            }
            startX = 0;
            endX = 0;
        }

        // Touch events
        modulesWrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        modulesWrapper.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        }, { passive: true });
        
        modulesWrapper.addEventListener('touchend', () => {
            handleSwipeEnd();
        });

        // Mouse drag events
        modulesWrapper.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            startX = e.clientX;
        });
        
        modulesWrapper.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;
            endX = e.clientX;
        });
        
        window.addEventListener('mouseup', () => {
            if (!isMouseDown) return;
            isMouseDown = false;
            handleSwipeEnd();
        });
        
        // Listen for screen resize to update modes
        window.addEventListener('resize', updateSlider);
        
        // Initial setup
        updateSlider();
    }
});

// Reset function to clear success state and show empty form
function resetForm() {
    const leadForm = document.getElementById('lead-form');
    const successState = document.getElementById('success-state');
    
    if (leadForm && successState) {
        leadForm.reset();
        
        successState.style.transition = 'opacity 0.3s ease';
        successState.style.opacity = '0';
        
        setTimeout(() => {
            successState.style.display = 'none';
            leadForm.style.display = 'flex';
            leadForm.style.opacity = '0';
            
            leadForm.offsetHeight; // Reflow
            
            leadForm.style.transition = 'opacity 0.5s ease';
            leadForm.style.opacity = '1';
        }, 300);
    }
}
