/* ==========================================================================
   SHARED JAVASCRIPT - LUXDIN
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initActiveNavLink();
  initGlobalCart();
  initEscKeyHandlers();
  initScrollRevealObserver();
});

// ==========================================
// NAVBAR STICKY ACTION
// ==========================================
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function checkScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Check on boot and scroll
  checkScroll();
  window.addEventListener('scroll', checkScroll);
}

// ==========================================
// MOBILE FULLSCREEN MENU
// ==========================================
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navPanel = document.getElementById('mobile-nav-panel');
  const toggleIcon = toggleBtn ? toggleBtn.querySelector('i') : null;

  if (!toggleBtn || !navPanel) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navPanel.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  function openMobileMenu() {
    navPanel.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    if (toggleIcon) {
      toggleIcon.className = 'fa-solid fa-xmark';
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    navPanel.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    if (toggleIcon) {
      toggleIcon.className = 'fa-solid fa-bars';
    }
    document.body.style.overflow = '';
  }

  // Expose close helper globally
  window.closeMobileMenu = closeMobileMenu;
}

// ==========================================
// ACTIVE LINK HIGHLIGHT BASED ON PATHNAME
// ==========================================
function initActiveNavLink() {
  const links = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname;
  
  // Extract filename
  const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === filename) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

// ==========================================
// ESCAPE KEY SHORTCUT HANDLERS
// ==========================================
function initEscKeyHandlers() {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // 1. Close mobile nav
      if (typeof window.closeMobileMenu === 'function') {
        window.closeMobileMenu();
      }
      // 2. Close cart drawer
      const cartBackdrop = document.getElementById('cart-drawer-backdrop');
      if (cartBackdrop && cartBackdrop.classList.contains('open')) {
        cartBackdrop.classList.remove('open');
        document.body.style.overflow = '';
      }
      // 3. Close order checkout modal
      const modalBackdrop = document.getElementById('order-modal-backdrop');
      if (modalBackdrop && modalBackdrop.classList.contains('open')) {
        modalBackdrop.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });
}

// ==========================================
// GLOBAL CART STATE CONTROLLER
// ==========================================
function initGlobalCart() {
  // Update badge immediately on boot
  updateCartBadge();

  // Listen for cart update events
  window.addEventListener('cartStateChanged', () => {
    updateCartBadge();
  });
}

// Get Cart items array
function getCart() {
  try {
    const stored = sessionStorage.getItem('cafe_cart_items');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Cart retrieval failed", e);
    return [];
  }
}

// Save Cart items array
function saveCart(cartItems) {
  try {
    sessionStorage.setItem('cafe_cart_items', JSON.stringify(cartItems));
    // Trigger update broadcast
    window.dispatchEvent(new CustomEvent('cartStateChanged'));
  } catch (e) {
    console.error("Cart persistence failed", e);
  }
}

// Add item to cart
function addToCart(name, price, isVeg, category) {
  let cart = getCart();
  const existing = cart.find(item => item.name === name);
  
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      isVeg: isVeg,
      category: category,
      quantity: 1
    });
  }
  
  saveCart(cart);
  showToast(`${name} added to cart!`, 'success');
}

// Update item quantity
function updateItemQty(name, newQty) {
  let cart = getCart();
  const item = cart.find(item => item.name === name);
  
  if (!item) return;

  if (newQty <= 0) {
    cart = cart.filter(item => item.name !== name);
    showToast(`${name} removed from cart.`, 'info');
  } else {
    item.quantity = newQty;
  }

  saveCart(cart);
}

// Remove item from cart
function removeFromCart(name) {
  let cart = getCart();
  cart = cart.filter(item => item.name !== name);
  saveCart(cart);
  showToast(`${name} removed from cart.`, 'info');
}

// Clear cart contents
function clearCart() {
  saveCart([]);
}

// Update navbar cart badge count
function updateCartBadge() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badges = document.querySelectorAll('#cart-badge-count');
  
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

// Expose Cart methods globally
window.getCart = getCart;
window.saveCart = saveCart;
window.addToCart = addToCart;
window.updateItemQty = updateItemQty;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.updateCartBadge = updateCartBadge;

// ==========================================
// TOAST BANNER NOTIFICATION SYSTEM
// ==========================================
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  
  // Create container if not exists on current page
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let iconClass = 'fa-circle-check';
  if (type === 'error') iconClass = 'fa-circle-exclamation';
  if (type === 'info') iconClass = 'fa-circle-info';

  toast.innerHTML = `
    <i class="fa-solid ${iconClass}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Animate Entrance
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto clean
  setTimeout(() => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => {
      toast.remove();
    });
  }, 3000);
}

// Expose toast globally
window.showToast = showToast;

// ==========================================
// SCROLL REVEAL OBSERVER
// ==========================================
function initScrollRevealObserver() {
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target); // Trigger once
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// ==========================================
// IMAGE FALLBACK HANDLER
// ==========================================
function handleImageError(img, itemName) {
  // Replace broken image with a premium gradient fallback card
  const parent = img.parentElement;
  if (!parent) return;

  // Prevent infinite retry loop
  img.onerror = null;
  img.style.display = 'none';

  const fallback = document.createElement('div');
  fallback.className = 'img-fallback-wrapper';
  
  // Set fallback content with a neat icon and title
  fallback.innerHTML = `
    <div class="img-fallback-icon"><i class="fa-solid fa-plate-wheat"></i></div>
    <div class="img-fallback-text">${itemName.substring(0, 15)}</div>
  `;
  
  parent.appendChild(fallback);
}

window.handleImageError = handleImageError;

// ==========================================
// IMAGE URL GENERATION FALLBACK
// ==========================================
function getImageUrl(itemName, isVeg) {
  const lowercase = itemName.toLowerCase();
  
  // High quality Unsplash food images
  if (lowercase.includes('biryani') || lowercase.includes('rice') || lowercase.includes('pulav')) {
    return 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&fit=crop&q=80'; // Biryani
  }
  if (lowercase.includes('tikka') || lowercase.includes('tandoori') || lowercase.includes('kebab') || lowercase.includes('chicken') || lowercase.includes('murgh')) {
    return 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&fit=crop&q=80'; // Tandoori / Chicken
  }
  if (lowercase.includes('fish') || lowercase.includes('mahi') || lowercase.includes('prawn') || lowercase.includes('jhinga')) {
    return 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&fit=crop&q=80'; // Seafood
  }
  if (lowercase.includes('paneer') || lowercase.includes('cheese') || lowercase.includes('dal') || lowercase.includes('sabzi')) {
    return 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&fit=crop&q=80'; // Indian Veg Curry
  }
  if (lowercase.includes('noodle') || lowercase.includes('chilli') || lowercase.includes('manchurian') || lowercase.includes('spring') || lowercase.includes('momo')) {
    return 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&fit=crop&q=80'; // Chinese / Noodles / Momos
  }
  if (lowercase.includes('dosa') || lowercase.includes('idly') || lowercase.includes('wada') || lowercase.includes('uttapam')) {
    return 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&fit=crop&q=80'; // South Indian Breakfast
  }
  if (lowercase.includes('roti') || lowercase.includes('naan') || lowercase.includes('phulka') || lowercase.includes('paratha')) {
    return 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=600&fit=crop&q=80'; // Breads
  }
  if (lowercase.includes('salad') || lowercase.includes('soup') || lowercase.includes('french')) {
    return 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&fit=crop&q=80'; // Salad / Soup
  }
  if (lowercase.includes('sweet') || lowercase.includes('jamun') || lowercase.includes('halwa') || lowercase.includes('meetha') || lowercase.includes('ice') || lowercase.includes('sundae')) {
    return 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&fit=crop&q=80'; // Desserts
  }
  
  // Generics
  if (isVeg) {
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&fit=crop&q=80'; // General Veg
  }
  return 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&fit=crop&q=80'; // General Food Non-Veg
}

window.getImageUrl = getImageUrl;
