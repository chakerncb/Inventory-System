async function getSuplliers() {
    const suplliersSelect = document.getElementById('id_suplliers');

    try {
        const response = await fetch('/wareHouse/api/suplliers');
        const result = await response.json();
        result.forEach(supllier => {
            const option = document.createElement('option');
            option.value = supllier.id_s;
            option.innerText = supllier.name;
            suplliersSelect.appendChild(option);
        });
    } catch (error) {
        console.log(error);
    }

}

getSuplliers();


document.querySelector('#addCategoryForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = document.querySelector('#addCategoryForm');
    const formData = new FormData(form);
    const category = {};
    formData.forEach((value, key) => {
        category[key] = value;
    });
    console.log(category);

    try {
        const response = await fetch('/wareHouse/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        });
    
        const result = await response.json();
        if (result.success) {
            document.querySelector('.message-success').innerText = result.message;
            document.querySelector('.message-success').style.display = 'block';
            document.querySelector('.message-danger').style.display = 'none';
            form.reset();
            setTimeout(() => {
                document.querySelector('.message-success').style.display = 'none';
                document.querySelector('.message-success').innerText = '';
            }
            , 3000);
            getCategories();
        } else if (result.message) {
            document.querySelector('.message-danger').innerText = result.message;
            document.querySelector('.message-danger').style.display = 'block';
            setTimeout(() => {
                document.querySelector('.message-danger').style.display = 'none';
                document.querySelector('.message-danger').innerText = '';
            }
            , 3000);
        }
    } catch (error) {
        console.log(error);
    }
});


async function getProducts() {
    const productsTable = document.getElementById('productsTableBody');
    productsTable.innerHTML = '';

    try {
        const response = await fetch('/wareHouse/api/products');
        const result = await response.json();
        console.log(result);
        let i = 1;
        result.forEach(product => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${i++}</td>
                <td><img src="/storage/products/${product.image}" alt="${product.name}" style="width: 50px; height: 50px;"></td>
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td>${product.quantity}</td>
                <td>${product.id_s}</td>
                <td>${product.id_ctg}</td>
                <td>${product.id_w}</td>
                <td class="text-center d-flex justify-content-around">
                    <a href="#" class="btn btn-sm btn-primary">Edit</a>
                    <a href="#" class="btn btn-sm btn-danger">Delete</a>
                </td>
            `;
            productsTable.appendChild(tr);
        });
    } catch (error) {
        console.log(error);
    }

}

getProducts();



async function getCategories() {
    const categoriesSelect = document.getElementById('id_ctg');
    const categoriesTable = document.getElementById('sidebarCategoriesTableBody');
    categoriesSelect.innerHTML = '';
    categoriesTable.innerHTML = '';

    try {
        const response = await fetch('/wareHouse/api/categories');
        const result = await response.json();
        result.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id_ctg;
            option.innerText = category.name;
            categoriesSelect.appendChild(option);
        });

        let i = 1;
        result.forEach(category => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${i++}</td>
                <td>${category.name}</td>
            `;
            categoriesTable.appendChild(tr);
        });
    } catch (error) {
        console.log(error);
    }

}


getCategories();


async function getWarehouses() {
    const warehousesSelect = document.getElementById('id_warehouse');

    try {
        const response = await fetch('/wareHouse/api/warehouses');
        const result = await response.json();
        result.forEach(warehouse => {
            const option = document.createElement('option');
            option.value = warehouse.id_w;
            option.innerText = 'warehouse ' + warehouse.id_w;
            warehousesSelect.appendChild(option);
        });
    } catch (error) {
        console.log(error);
    }

}

getWarehouses();





document.querySelector('#addProductForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = document.querySelector('#addProductForm');
    const formData = new FormData(form);
    const product = {};
    formData.forEach((value, key) => {
        product[key] = value;
    });
    console.log(product);
    
    try {
        const response = await fetch('/wareHouse/products', {
            method: 'POST',
            body: formData
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
        } else if (result.message) {
            document.querySelector('.message-danger').innerText = result.message;
            document.querySelector('.message-danger').style.display = 'block';
            setTimeout(() => {
                document.querySelector('.message-danger').style.display = 'none';
            }, 3000);
        }
    } catch (error) {
        console.log(error);
    }
});