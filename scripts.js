document.addEventListener("DOMContentLoaded", () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    function renderCartItems() {
        const cartItemsContainer = document.getElementById("cart-items");
        cartItemsContainer.innerHTML = "";

        cartItems.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.className = "cart-item";
            itemElement.innerHTML = `
                <img src="${item.imgSrc}" alt="${item.alt}">
                <div class="cart-item-details">
                    <p>${item.alt}</p>
                </div>
                <div class="cart-item-actions">
                    <button onclick="removeFromCart(${index})">Retirer</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    window.addToCart = (imgSrc, alt) => {
        cartItems.push({ imgSrc, alt });
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        alert("Article ajouté au panier !");
    };

    window.removeFromCart = (index) => {
        cartItems.splice(index, 1);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        renderCartItems();
    };

    window.finalizePurchase = () => {
        if (cartItems.length > 0) {
            const items = cartItems.map(item => item.alt).join(', ');
            const message = `Bonjour, je souhaite acheter les modèles suivants: ${items}`;
            const phoneNumber = '+22601368949';
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            alert("Merci pour votre achat !");
            localStorage.removeItem("cartItems");
            renderCartItems();
        } else {
            alert("Votre panier est vide !");
        }
    };

    renderCartItems();
});
