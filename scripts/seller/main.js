async function getWareHouse () {

    const warehouseSelect = document.getElementById('warehouseSelect');

    try {
        const response = await fetch('/seller/api/warehouses');
        const data = await response.json();

        data.forEach(warehouse => {
            const option = document.createElement('option');
            option.value = warehouse.id_w;
            option.text = 'warehouse ' + warehouse.id_w;
            warehouseSelect.appendChild(option);
        });

    }
    catch (error) {
        console.log(error);
    }
}

getWareHouse();


async function getProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    const warehouseFilter = document.getElementById('warehouseSelect').value;
    const search = document.getElementById('search-input').value;

    try {
        const response = await fetch('/seller/api/products');
        let products = await response.json();
        
        if (warehouseFilter != 'all') {
            products = products.filter(product => product.id_w == warehouseFilter);
        }
        if (search) {
            products = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
        }

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            const imageSection = document.createElement('div');
            imageSection.classList.add('image-section');

            const productInfo = document.createElement('div');
            productInfo.classList.add('product-info');

            const productImage = document.createElement('img');
            productImage.src = `/storage/products/${product.image}`;
            productImage.alt = product.name;

            const productName = document.createElement('h3');
            productName.textContent = product.name;

            const productPrice = document.createElement('p');
            productPrice.textContent = `${product.price} dz`;

            const buyButton = document.createElement('button');
            buyButton.classList.add('buy-button');
            buyButton.textContent = 'Buy';
            buyButton.onclick = () => {
                buyProduct(product.id_P);
            };

            imageSection.appendChild(productImage);
            productInfo.appendChild(productName);
            productInfo.appendChild(productPrice);
            productInfo.appendChild(buyButton);
            productCard.appendChild(imageSection);
            productCard.appendChild(productInfo);
            productsGrid.appendChild(productCard);
        });
    }
    catch (error) {
        console.log(error);
    }
}

document.getElementById('warehouseSelect').addEventListener('change', getProducts);
document.getElementById('search-input').addEventListener('input', getProducts);
        
getProducts();



document.getElementById('newCustomerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = document.getElementById('newCustomerForm');
    const formData = new FormData(form);

    const customerData = {};
    formData.forEach((value, key) => {
       customerData[key] = value;
    });
    
    console.log(customerData);

    try {
        const response = await fetch('/seller/costumers', {
            method: 'POST',
            body: JSON.stringify(customerData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        if (result.success) {
            document.querySelector('.message-success').innerText = result.message;
            document.querySelector('.message-success').style.display = 'block';
            document.querySelector('.message-danger').style.display = 'none';
            form.reset();
            setTimeout(() => {
                document.querySelector('.message-success').style.display = 'none';
            }, 3000);
            getProducts(); 
        } else if (result.message) {
            document.querySelector('.message-danger').innerText = result.message;
            document.querySelector('.message-danger').style.display = 'block';
            setTimeout(() => {
                document.querySelector('.message-danger').style.display = 'none';
            }, 3000);
        }
    }
    catch (error) {
        console.log(error);
    }
});


async function getCostumers() {
    const costumersSelect = document.getElementById('customerSelect');

    try {
        const response = await fetch('/seller/costumers');
        const data = await response.json();

        data.forEach(costumer => {
            const option = document.createElement('option');
            option.value = costumer.id_c;
            option.text = costumer.name;
            costumersSelect.appendChild(option);
        });

    }
    catch (error) {
        console.log(error);
    }
}

getCostumers();


async function getCategories() {
    const categoriesList = document.getElementById('categoryListItems');
    categoriesList.innerHTML = '';

    try {
        const response = await fetch('/seller/api/categories');
        const data = await response.json();

        data.forEach(category => {
            const categoryItem = document.createElement('li');
            categoryItem.textContent = category.name;
            categoriesList.appendChild(categoryItem);
        });

    }
    catch (error) {
        console.log(error);
    }
}

document.getElementById('categoryListBtn').addEventListener('click', getCategories);


async function buyProduct(id_P) {
    const cartItemsTable = document.getElementById('cartItems');
    let orders = JSON.parse(sessionStorage.getItem('orders')) || [];

    try {
        const response = await fetch(`/seller/api/products/${id_P}`);
        const product = await response.json();

        let existingOrder = orders.find(order => order.id_P === id_P);
        if (existingOrder  && existingOrder.quantity < product.quantity) {
            existingOrder.quantity += 1;
            product.quantity -= 1;
            document.querySelector(`.cart-item${id_P} .quantity-input`).value = existingOrder.quantity;
            document.querySelector(`.cart-item${id_P} .item-total`).innerText = `${existingOrder.price * existingOrder.quantity} dz`;
        } else if (!existingOrder && product.quantity > 0) {
            let qty = 1;
            const cartItem = document.createElement('tr');
            cartItem.innerHTML = `
                <td>${product.name}</td>
                <td>${product.price} dz</td>
                <td><input type="number" value="${qty}" min="1" max="${product.quantity}" class="quantity-input" data-id="${product.id_P}"></td>
                <td class="item-total">${product.price * qty} dz</td>
                <td><button onclick="removeItem(${product.id_P})" class="remove-button">Remove</button></td>
            `;
            cartItem.classList.add('cart-item' + product.id_P);
            cartItemsTable.appendChild(cartItem);

            orders.push({
                id_P: product.id_P,
                id_w: product.id_w,
                name: product.name,
                price: product.price,
                quantity: qty
            });
        }

        sessionStorage.setItem('orders', JSON.stringify(orders));
        updateTotalPrice();

        document.querySelector('.message-success').innerText = 'Product added to cart';
        document.querySelector('.message-success').style.display = 'block';
        setTimeout(() => {
            document.querySelector('.message-success').style.display = 'none';
        }, 3000);

        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const id = e.target.getAttribute('data-id');
                const newQty = parseInt(e.target.value);
                const order = orders.find(item => item.id_P == id);
                if (order) {
                    order.quantity = newQty;
                    e.target.closest('tr').querySelector('.item-total').innerText = `${order.price * newQty} dz`;
                    sessionStorage.setItem('orders', JSON.stringify(orders));
                    updateTotalPrice();
                }
            });
        });

    } catch (error) {
        console.log(error);
    }
}

function updateTotalPrice() {
    const orders = JSON.parse(sessionStorage.getItem('orders')) || [];
    const totalPrice = orders.reduce((total, item) => total + (item.price * item.quantity), 0);
    document.getElementById('TotalPrice').value = totalPrice;
}



document.getElementById('resetBtn').addEventListener('click', () => {
    sessionStorage.removeItem('orders');
    document.getElementById('TotalPrice').value = 0;
    const cartItemsTable = document.getElementById('cartItems');
    cartItemsTable.innerHTML = '';
    getProducts();

    document.querySelector('.message-success').innerText = 'Cart cleared';
});

async function removeItem(id_P) {
    const cartItemsTable = document.getElementById('cartItems');
    let orders = JSON.parse(sessionStorage.getItem('orders'));
    const productIndex = orders.findIndex(item => item.id_P == id_P);
    if (productIndex > -1) {
        orders.splice(productIndex, 1);
        sessionStorage.setItem('orders', JSON.stringify(orders));
        document.querySelector('.cart-item' + id_P).remove();
        
        const totalPrice = orders.reduce((total, item) => total + (item.price * item.quantity), 0);
        document.getElementById('TotalPrice').value = totalPrice;
    }
}

document.getElementById('discount').addEventListener('input', () => {
    const discount = document.getElementById('discount').value;
    const orders = JSON.parse(sessionStorage.getItem('orders'));
    const totalPrice = orders.reduce((total, item) => total + (item.price * item.quantity) , 0);
    const discountedPrice = totalPrice - (totalPrice * (discount / 100));
    document.getElementById('TotalPrice').value = discountedPrice;
});



document.getElementById('payBtn').addEventListener('click', () => {
    const orders = JSON.parse(sessionStorage.getItem('orders'));
    const customer = document.getElementById('customerSelect').value;
    const warehouse = document.getElementById('warehouseSelect').value;
    const discount = document.getElementById('discount').value;
    const totalPrice = document.getElementById('TotalPrice').value;

    const orderInfo = `
        <p>Customer: ${customer}</p>
        <p>Warehouse: ${warehouse}</p>
        <p>Discount: ${discount}%</p>
        <p>Total Price: ${totalPrice}</p>
        <h3>Products:</h3>
        <ul>
            ${orders.map(order => `<li>${order.name} - ${order.price} dz</li>`).join('')}
        </ul>
    `;

    document.getElementById('orderInfo').innerHTML = orderInfo;
    document.getElementById('orderValidationModal').style.display = 'block';
});

document.getElementById('confirmOrderBtn').addEventListener('click', async () => {
    const orders = JSON.parse(sessionStorage.getItem('orders'));
    const customer = document.getElementById('customerSelect').value;
    const warehouse = document.getElementById('warehouseSelect').value;
    const discount = document.getElementById('discount').value;
    const totalPrice = document.getElementById('TotalPrice').value;

    const orderData = {
        orders,
        customer,
        warehouse,
        discount,
        totalPrice
    };

    try {
        const response = await fetch('/seller/orders', {
            method: 'POST',
            body: JSON.stringify(orderData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        if (result.success) {
            document.querySelector('.message-success').innerText = result.message;
            document.querySelector('.message-success').style.display = 'block';
            document.querySelector('.message-danger').style.display = 'none';
            setTimeout(() => {
                document.querySelector('.message-success').style.display = 'none';
            }, 3000);
            sessionStorage.removeItem('orders');
            document.getElementById('TotalPrice').innerHTML = '0 dz';
            const cartItemsTable = document.getElementById('cartItems');
            cartItemsTable.innerHTML = '';
            getProducts();
            showInvoice(result.data);
            document.getElementById('printInvoiceBtn').style.display = 'block';
        } else if (result.message) {
            document.querySelector('.message-danger').innerText = result.message;
            document.querySelector('.message-danger').style.display = 'block';
            setTimeout(() => {
                document.querySelector('.message-danger').style.display = 'none';
            }, 3000);
        }
    }
    catch (error) {
        console.log(error);
    }

    document.getElementById('orderValidationModal').style.display = 'none';
});

document.getElementById('cancelOrderBtn').addEventListener('click', () => {
    document.getElementById('orderValidationModal').style.display = 'none';
});

document.addEventListener('DOMContentLoaded', () => {
    sessionStorage.removeItem('orders');
});


document.getElementById('printInvoiceBtn').addEventListener('click', async () => {
    console.log(data.invoicePath);
    // try{
        
    //     const response = await fetch(`/seller/api/invoices/${data.invoicePath}`);
    //     // const product = await response.json();

    // }
    // catch(error){
    //     console.log(error);
    // }
});


