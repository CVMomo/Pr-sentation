// scripts.js

document.addEventListener("DOMContentLoaded", () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    function renderCartItems() {
        const cartItemsContainer = document.getElementById("cart-items");
        cartItemsContainer.innerHTML = "";

        cartItems.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement
