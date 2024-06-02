// scripts.js

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
                <p>${item.alt}</p>
                <button onclick="removeFromCart(${index})">Retirer</button>
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
            alert("Merci pour votre achat !");
            localStorage.removeItem("cartItems");
            renderCartItems();
        } else {
            alert("Votre panier est vide !");
        }
    };

    renderCartItems();
});
