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
                <button onclick="openColorModal('${item.imgSrc}')">Couleur</button>
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

    // Modal logic
    const modal = document.getElementById("color-modal");
    const modalImage = document.getElementById("modal-image");
    const span = document.getElementsByClassName("close")[0];

    window.openColorModal = (imgSrc) => {
        modal.style.display = "block";
        modalImage.src = imgSrc;
    };

    span.onclick = () => {
        modal.style.display = "none";
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    window.changeColor = (color) => {
        const imgSrc = modalImage.src;
        const imgBase = imgSrc.substring(0, imgSrc.lastIndexOf('.'));
        const newImgSrc = `${imgBase}_${color}.jpg`; // Assuming the new images follow this naming pattern
        modalImage.src = newImgSrc;
    };
});
