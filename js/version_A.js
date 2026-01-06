let cartTotal = 0;

function showToast(title, message) {
    const toast = document.getElementById('toast');
    const titleEl = document.getElementById('toast-title');
    const msgEl = document.getElementById('toast-message');
    titleEl.textContent = title;
    msgEl.textContent = message;
    toast.classList.remove('translate-y-24');
    setTimeout(() => {
        toast.classList.add('translate-y-24');
    }, 3000);
}

// 1. Agregar al carrito
function addToCart(productName) {
    cartTotal++;
    const badge = document.getElementById('cart-count');
    badge.innerText = cartTotal;
    badge.classList.add('animate-ping');
    setTimeout(() => badge.classList.remove('animate-ping'), 500);
    showToast('¡Agregado al Carrito!', `Has agregado ${productName} exitosamente.`);
}

// 2. Interactuar con filtros
function toggleFeature(name, status) {
    showToast('Filtro Actualizado', `${name} está ahora: ${status}`);
}

// 3. Like / Wishlist
function toggleHeart(btn) {
    const icon = btn.querySelector('svg');
    
    if (btn.classList.contains('text-red-500')) {
        // Desactivar
        btn.classList.remove('text-red-500', 'bg-white');
        btn.classList.add('text-gray-300');
        icon.setAttribute('fill', 'none');
        showToast('Lista de Deseos', 'Producto eliminado de favoritos.');
    } else {
        // Activar
        btn.classList.add('text-red-500', 'bg-white');
        btn.classList.remove('text-gray-300');
        icon.setAttribute('fill', 'currentColor');
        showToast('¡Me encanta!', 'Producto guardado en favoritos.');
    }
}

// 4. Filtrar categorías (Pills)
function filterCategory(btn) {
    const siblings = btn.parentElement.children;
    for (let sib of siblings) {
        sib.classList.remove('bg-brand-600', 'text-white', 'shadow-lg');
        sib.classList.add('bg-gray-800', 'text-gray-400');
    }
    btn.classList.remove('bg-gray-800', 'text-gray-400');
    btn.classList.add('bg-brand-600', 'text-white', 'shadow-lg');
    
    showToast('Categoría', `Filtrando por: ${btn.innerText}`);
}

// 5. Interacciones genéricas
function interact(title, msg) {
    showToast(title, msg);
}

const dropdownMenu = document.getElementById('sort-menu');
const chevronIcon = document.getElementById('chevron-icon');
let isDropdownOpen = false;

// 1. Alternar (Abrir/Cerrar)
function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
    if (isDropdownOpen) {
        dropdownMenu.classList.remove('hidden');
        setTimeout(() => {
            dropdownMenu.classList.remove('opacity-0', 'scale-95');
            dropdownMenu.classList.add('opacity-100', 'scale-100');
        }, 10);
        chevronIcon.classList.add('rotate-180');
    } else {
        closeDropdown();
    }
}

// 2. Cerrar suavemente
function closeDropdown() {
    isDropdownOpen = false;
    dropdownMenu.classList.remove('opacity-100', 'scale-100');
    dropdownMenu.classList.add('opacity-0', 'scale-95');
    chevronIcon.classList.remove('rotate-180');
    setTimeout(() => {
        dropdownMenu.classList.add('hidden');
    }, 200);
}

// 3. Seleccionar una opción
function selectOption(text, btnElement) {
    document.getElementById('selected-option').innerText = text;
    const allOptions = dropdownMenu.querySelectorAll('button');
    allOptions.forEach(opt => {
        opt.classList.remove('bg-gray-700/50', 'border-brand-500', 'font-medium');
        opt.classList.add('border-transparent');
        opt.querySelector('.check-icon').classList.add('opacity-0');
    });

    btnElement.classList.add('bg-gray-700/50', 'border-brand-500', 'font-medium');
    btnElement.classList.remove('border-transparent');
    btnElement.querySelector('.check-icon').classList.remove('opacity-0');
    interact('Ordenamiento', 'Lista reordenada por: ' + text);
    closeDropdown();
}

// 4. Cerrar si hago clic fuera del menú
document.addEventListener('click', function(event) {
    const container = document.getElementById('sort-dropdown-container');
    if (!container.contains(event.target)) {
        if(isDropdownOpen) closeDropdown();
    }
});