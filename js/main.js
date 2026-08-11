/* ============================================ */
/* TRAVELWORLD - COMPLETE JAVASCRIPT */
/* ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // NAVBAR
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // NAVBAR SCROLL EFFECT
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.9)';
        }
    });

    // CATEGORIES CLICK
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            categoryCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-category');
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-filter') === category) {
                    btn.classList.add('active');
                }
            });
            currentFilter = category;
            filterDestinations();
            document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // DESTINATIONS FILTER
    const filterButtons = document.querySelectorAll('.filter-btn');
    const destinationCards = document.querySelectorAll('.destination-card');
    const searchInput = document.getElementById('searchInput');
    const noResults = document.getElementById('noResults');

    let currentFilter = 'all';
    let currentSearch = '';

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            filterDestinations();
        });
    });

    searchInput.addEventListener('input', function() {
        currentSearch = this.value.toLowerCase().trim();
        filterDestinations();
    });

    function filterDestinations() {
        let visibleCount = 0;
        destinationCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const name = card.getAttribute('data-name').toLowerCase();
            const matchesCategory = (currentFilter === 'all' || category === currentFilter);
            const matchesSearch = (currentSearch === '' || name.includes(currentSearch));

            if (matchesCategory && matchesSearch) {
                card.classList.remove('hide');
                visibleCount++;
            } else {
                card.classList.add('hide');
            }
        });

        if (visibleCount === 0) {
            noResults.classList.add('show');
        } else {
            noResults.classList.remove('show');
        }
    }

    // BACK TO TOP
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    

    // PRELOADER
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('preloader').classList.add('hide');
        }, 1000);
    });

    // SCROLL ANIMATIONS
    const animatedElements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    animatedElements.forEach(el => observer.observe(el));

    // ACTIVE NAV ON SCROLL
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.scrollY + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ============================================
    // MODAL FUNCTIONALITY
    // ============================================
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalBadge = document.getElementById('modalBadge');
    const modalLocation = document.getElementById('modalLocation');
    const modalTitle = document.getElementById('modalTitle');
    const modalRating = document.getElementById('modalRating');
    const modalDescription = document.getElementById('modalDescription');
    const modalPrice = document.getElementById('modalPrice');
    const modalBookBtn = document.getElementById('modalBookBtn');

    const badgeColors = {
        beach: 'linear-gradient(135deg, #06B6D4, #0891B2)',
        mountains: 'linear-gradient(135deg, #64748B, #475569)',
        historical: 'linear-gradient(135deg, #F59E0B, #D97706)',
        adventure: 'linear-gradient(135deg, #EF4444, #DC2626)',
        cultural: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
        nature: 'linear-gradient(135deg, #10B981, #059669)'
    };

    function openModal(card) {
        const imageEl = card.querySelector('img');
        const badgeEl = card.querySelector('.card-badge') || card.querySelector('.featured-badge');
        const locationEl = card.querySelector('.card-location span') || card.querySelector('.featured-location span');
        const titleEl = card.querySelector('.card-title') || card.querySelector('.featured-title');
        const ratingEl = card.querySelector('.card-rating span') || card.querySelector('.featured-rating span');
        const descEl = card.querySelector('.card-description') || card.querySelector('.featured-description');
        const priceEl = card.querySelector('.card-price strong');

        const image = imageEl ? imageEl.src : '';
        const badge = badgeEl ? badgeEl.innerText.trim() : 'Featured';
        const category = card.getAttribute('data-category') || 'beach';
        const location = locationEl ? locationEl.innerText : 'Location';
        const title = titleEl ? titleEl.innerText : 'Destination';
        const rating = ratingEl ? ratingEl.innerText.split(' ')[0] : '4.8';
        const description = descEl ? descEl.innerText : `Explore ${title} — one of our most amazing destinations with unforgettable experiences.`;
        const price = priceEl ? priceEl.innerText : '$550';

        modalImage.src = image;
        modalImage.alt = title;
        modalBadge.innerText = badge;
        modalBadge.style.background = badgeColors[category] || badgeColors.beach;
        modalLocation.innerText = location;
        modalTitle.innerText = title;
        modalRating.innerText = rating;
        modalDescription.innerText = description;
        modalPrice.innerText = price;

        modalOverlay.classList.add('active');
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    // Explore buttons in destination cards
    document.querySelectorAll('.card-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.destination-card');
            if (card) openModal(card);
        });
    });

    // Explore buttons in featured cards
    document.querySelectorAll('.featured-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.featured-card');
            if (card) openModal(card);
        });
    });

    // Close modal
    modalClose.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    modalBookBtn.addEventListener('click', function() {
        const destination = modalTitle.innerText;
        alert(`🎉 Booking request for ${destination}!\n\nOur team will contact you within 24 hours.`);
        closeModal();
    });

    console.log('✅ TravelWorld loaded successfully!');
});