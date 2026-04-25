// Products and Shopping Cart Functionality

let cart = [];

document.addEventListener('DOMContentLoaded', function() {
    initializeCart();
    setupEventListeners();
});

function initializeCart() {
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateOrderSummary();
    }
}

function setupEventListeners() {
    // Add to cart buttons
    document.querySelectorAll('.btn-add-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-product-id'));
            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            const quantityInput = document.getElementById(`qty-${productId}`);
            const quantity = parseInt(quantityInput.value) || 1;
            
            addToCart(productId, productName, productPrice, quantity);
        });
    });

    // Quantity input changes
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            validateQuantity(this);
        });
    });

    // Confirm order button
    const confirmOrderBtn = document.getElementById('confirmOrderBtn');
    if (confirmOrderBtn) {
        confirmOrderBtn.addEventListener('click', confirmOrder);
    }

    // Reset cart button
    const resetCartBtn = document.getElementById('resetCartBtn');
    if (resetCartBtn) {
        resetCartBtn.addEventListener('click', resetCart);
    }
}

function validateQuantity(input) {
    const value = parseInt(input.value);
    const min = parseInt(input.getAttribute('min')) || 1;
    const max = parseInt(input.getAttribute('max')) || 99;

    if (isNaN(value) || value < min) {
        input.value = min;
        showNotification('Quantité minimum : ' + min, 'warning');
    } else if (value > max) {
        input.value = max;
        showNotification('Quantité maximum : ' + max, 'warning');
    }
}

function addToCart(productId, productName, productPrice, quantity) {
    // Validate quantity
    if (quantity < 1 || quantity > 99) {
        showNotification('Quantité invalide. Veuillez entrer une valeur entre 1 et 99.', 'error');
        return;
    }

    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        // Update quantity if product already in cart
        existingItem.quantity += quantity;
        if (existingItem.quantity > 99) {
            existingItem.quantity = 99;
            showNotification('Quantité maximum atteinte pour ce produit.', 'warning');
        }
    } else {
        // Add new product to cart
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: quantity
        });
    }

    // Save to localStorage
    saveCart();
    
    // Update UI
    updateOrderSummary();
    
    // Visual feedback
    showNotification(`${productName} ajouté au panier !`, 'success');
    
    // Animate button
    const button = document.querySelector(`[data-product-id="${productId}"].btn-add-cart`);
    if (button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 200);
    }
}

function updateOrderSummary() {
    const cartItemsDiv = document.getElementById('cartItems');
    const emptyMessage = document.querySelector('.empty-cart-message');
    const tableBody = document.getElementById('cartTableBody');
    const orderTotal = document.getElementById('orderTotal');
    const confirmBtn = document.getElementById('confirmOrderBtn');
    const resetBtn = document.getElementById('resetCartBtn');

    if (cart.length === 0) {
        // Show empty message
        if (emptyMessage) emptyMessage.style.display = 'block';
        if (cartItemsDiv) cartItemsDiv.style.display = 'none';
        if (confirmBtn) confirmBtn.style.display = 'none';
        if (resetBtn) resetBtn.style.display = 'none';
        return;
    }

    // Hide empty message, show cart
    if (emptyMessage) emptyMessage.style.display = 'none';
    if (cartItemsDiv) cartItemsDiv.style.display = 'block';
    if (confirmBtn) confirmBtn.style.display = 'inline-block';
    if (resetBtn) resetBtn.style.display = 'inline-block';

    // Clear table body
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    let total = 0;

    // Add cart items to table
    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="product-name-cell">${item.name}</td>
            <td class="quantity-cell">
                <input type="number" 
                       class="cart-quantity-input" 
                       value="${item.quantity}" 
                       min="1" 
                       max="99"
                       data-product-id="${item.id}"
                       data-index="${index}">
            </td>
            <td class="price-cell">${item.price.toFixed(2)} DT</td>
            <td class="subtotal-cell">${subtotal.toFixed(2)} DT</td>
            <td class="actions-cell">
                <button class="btn-remove" onclick="removeFromCart(${index})">Retirer</button>
            </td>
        `;
        
        if (tableBody) {
            tableBody.appendChild(row);
        }
    });

    // Update total
    if (orderTotal) {
        orderTotal.textContent = `${total.toFixed(2)} DT`;
    }

    // Add event listeners to quantity inputs in cart
    document.querySelectorAll('.cart-quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const newQuantity = parseInt(this.value) || 1;
            
            if (newQuantity < 1) {
                this.value = 1;
                cart[index].quantity = 1;
            } else if (newQuantity > 99) {
                this.value = 99;
                cart[index].quantity = 99;
                showNotification('La quantité maximum est de 99', 'warning');
            } else {
                cart[index].quantity = newQuantity;
            }
            
            saveCart();
            updateOrderSummary();
        });
    });
}

function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        const itemName = cart[index].name;
        cart.splice(index, 1);
        saveCart();
        updateOrderSummary();
        showNotification(`${itemName} retiré du panier`, 'info');
    }
}

function confirmOrder() {
    if (cart.length === 0) {
        showNotification('Votre panier est vide !', 'warning');
        return;
    }

    // Calculate total
    let total = 0;
    let orderDetails = '<ul style="text-align: left; margin: 1rem 0;">';
    
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        orderDetails += `<li>${item.name} - Qté : ${item.quantity} - ${subtotal.toFixed(2)} DT</li>`;
    });
    
    orderDetails += '</ul>';
    orderDetails += `<p style="font-weight: bold; font-size: 1.2rem; margin-top: 1rem;">Total : ${total.toFixed(2)} DT</p>`;

    // Show confirmation message
    const confirmationDiv = document.getElementById('orderConfirmation');
    const detailsDiv = document.getElementById('confirmationDetails');
    
    if (confirmationDiv && detailsDiv) {
        detailsDiv.innerHTML = orderDetails;
        confirmationDiv.style.display = 'flex';
    }

    // Clear cart after confirmation
    resetCart();
}

function closeConfirmation() {
    const confirmationDiv = document.getElementById('orderConfirmation');
    if (confirmationDiv) {
        confirmationDiv.style.display = 'none';
    }
}

function resetCart() {
    if (cart.length === 0) {
        showNotification('Le panier est déjà vide', 'info');
        return;
    }

    if (confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
        cart = [];
        saveCart();
        updateOrderSummary();
        showNotification('Panier vidé', 'info');
    }
}

function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#6C7A89' : type === 'error' ? '#2E2E2E' : type === 'warning' ? '#D9D9D9' : '#6C7A89'};
        color: ${type === 'warning' ? '#2E2E2E' : '#FFFFFF'};
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

