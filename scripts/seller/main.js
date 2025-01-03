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

            productCard.appendChild(productImage);
            productCard.appendChild(productName);
            productCard.appendChild(productPrice);
            productCard.appendChild(buyButton);

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