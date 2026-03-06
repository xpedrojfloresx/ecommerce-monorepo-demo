let cart = [];

const cartCountBadge = document.getElementById("cartCountBadge");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartTotal = document.getElementById("cartTotal");
const sendCartBtn = document.getElementById("sendCartBtn");
const cartOffcanvasEl = document.getElementById("cartOffcanvas");
const cartButton = document.querySelector(".fixed-cart-btn");
const cartOffcanvas = document.getElementById("cartOffcanvas");

if (cartOffcanvas && cartButton) {

  cartOffcanvas.addEventListener("show.bs.offcanvas", () => {
    cartButton.style.display = "none";
  });

  cartOffcanvas.addEventListener("hidden.bs.offcanvas", () => {
    cartButton.style.display = "block";
  });

}

function updateCartBadge() {
    if (!cartCountBadge) return;
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCountBadge.textContent = totalItems;
}

function updateCartUI() {
    if (!cartItemsContainer || !cartTotal) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
      <div id="emptyCartMessage" class="text-center text-muted py-5">
        <i class="bi bi-cart-x fs-1 d-block mb-3"></i>
        Tu carrito está vacío
      </div>
    `;
        cartTotal.textContent = "0.00";
        updateCartBadge();
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
    <div class="card mb-3 shadow-sm border-0 cart-item">
      <div class="row g-0 align-items-center">
        <div class="col-4">
          <img
            src="${item.image}"
            alt="${item.name}"
            class="img-fluid rounded-start"
            style="height: 110px; width: 100%; object-fit: cover;"
          >
        </div>
        <div class="col-8">
          <div class="card-body py-2">
            <h6 class="card-title mb-1">${item.name}</h6>
            <p class="card-text mb-1 text-muted">$ ${item.price.toFixed(2)}</p>
            <div class="mt-2 small text-end fw-semibold">
              Cantidad: ${item.quantity}
            </div>
            <div class="mt-1 small text-end fw-semibold">
              Subtotal: $ ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join("");

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    cartTotal.textContent = total.toFixed(2);
    updateCartBadge();
}

function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push(product);
    }

    updateCartUI();

    if (cartOffcanvasEl && window.bootstrap) {
        const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(cartOffcanvasEl);
        offcanvas.show();
    }
}

document.addEventListener("click", function (e) {
    const btn = e.target.closest(".btn-add-to-cart");
    if (!btn) return;

    const product = {
        id: Number(btn.dataset.id),
        name: btn.dataset.name,
        price: Number(btn.dataset.price),
        image: btn.dataset.image,
        quantity: 1
    };

    addToCart(product);
});

if (sendCartBtn) {
    sendCartBtn.addEventListener("click", async function () {
        if (cart.length === 0) {
            alert("El carrito está vacío");
            return;
        }

        try {
            const response = await fetch("/api/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cart)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error al enviar el carrito");
            }

            console.log("Respuesta servidor:", data);

            cart = [];
            updateCartUI();

            alert("Carrito enviado correctamente");
        } catch (error) {
            console.error("Error al enviar carrito:", error);
            alert("Error al enviar carrito");
        }
    });
}