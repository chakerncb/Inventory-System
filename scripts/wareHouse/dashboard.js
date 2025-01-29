async function getLastProducts() {

    const response = await fetch('/warehouse/api/products');
    const data = await response.json();
    const lastProducts = document.querySelector('.latest-Products');

    let i = 0;
    data.reverse().forEach(product => {
        i++;
        if (i > 4) {
            return;
        }
        lastProducts.innerHTML += `
            <div class="d-flex border-top py-2 px-1">
                <div class="col-2">
                    <img src="/storage/products/${product.image}" alt="${product.name}" class="img-size-50">
                </div>
                <div class="col-10">
                    <a href="javascript:void(0)" class="fw-bold">
                        ${product.name}
                        <span class="badge text-bg-warning float-end">
                            $${product.price}
                        </span>
                    </a>
                    <div class="text-truncate">
                        ${product.description}
                    </div>
                </div>
            </div>
        `;	
    });
}


async function CountPendingOrders() {
    const response = await fetch('/warehouse/api/orders/pending');
    const data = await response.json();
    const pendingOrders = document.querySelector('.pending-orders');
    pendingOrders.textContent = data.count;
}

async function CountCompletedOrders() {
    const response = await fetch('/warehouse/api/orders/completed');
    const data = await response.json();
    const completedOrders = document.querySelector('.completed-orders');
    completedOrders.textContent = data.count;
}

document.addEventListener('DOMContentLoaded', () => {
    getLastProducts();
    CountPendingOrders();
    CountCompletedOrders();
});