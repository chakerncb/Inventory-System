async function getSuplliers() {
    const suplliersSelect = document.getElementById('id_suplliers');

    try {
        const response = await fetch('/wareHouse/api/suplliers');
        let result = await response.json();
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
    const warehouseFilter = document.getElementById('warehouseFilter').value;
    productsTable.innerHTML = '';

    try {
        const response = await fetch('/wareHouse/api/products');    
        let result = await response.json();

        let i = 1;
        if (warehouseFilter != 'all') {
            result = result.filter(product => product.id_w == warehouseFilter);
        }
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
                <td class="text-center d-flex justify-content-around p-4">
                    <a onclick="editProduct(${product.id_P})" class="btn btn-sm btn-primary">Edit</a>
                    <a onclick="deleteProduct(${product.id_P})" class="btn btn-sm btn-danger">Delete</a>
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
    const warehousesFilter = document.getElementById('warehouseFilter');

    try {
        const response = await fetch('/wareHouse/api/warehouses');
        const result = await response.json();
        result.forEach(warehouse => {
            const option = document.createElement('option');
            option.value = warehouse.id_w;
            option.innerText = 'warehouse ' + warehouse.id_w;
            warehousesSelect.appendChild(option);
            warehousesFilter.appendChild(option.cloneNode(true));
        });
    } catch (error) {
        console.log(error);
    }

}

getWarehouses();

document.getElementById('warehouseFilter').addEventListener('change', getProducts);




document.querySelector('#addProductForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = document.querySelector('#addProductForm');
    const idField = document.querySelector('#productId').value;

    if (idField == '') {

        document.getElementById('productId').value = '';
        const formData = new FormData(form);
        const product = {};
        formData.forEach((value, key) => {
            product[key] = value;
        });

        console.log('add');
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
                document.querySelector('.message-success').innerText = '';
            }, 3000);
            getProducts(); 
        } else if (result.message) {
            document.querySelector('.message-danger').innerText = result.message;
            document.querySelector('.message-danger').style.display = 'block';
            setTimeout(() => {
                document.querySelector('.message-danger').style.display = 'none';
                document.querySelector('.message-danger').innerText = '';
            }, 3000);
        }
    } catch (error) {
        console.log(error);
    }

    }
    else {
        
        const formData = new FormData(form);
        const idField = document.querySelector('#productId').value;
        const product = {};
        formData.forEach((value, key) => {
            product[key] = value;
        });

        try {
            const response = await fetch('/wareHouse/products/update', {
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
                    document.querySelector('.message-success').innerText = '';  
                }, 3000);
                getProducts(); 
            } else if (result.message) {
                document.querySelector('.message-danger').innerText = result.message;
                document.querySelector('.message-danger').style.display = 'block';
                setTimeout(() => {
                    document.querySelector('.message-danger').style.display = 'none';
                    document.querySelector('.message-danger').innerText = '';
                }, 3000);
            }
            document.querySelector('.modal-title').innerText = 'Add Product';
            idField.value = '';
        
        } catch (error) {
            console.log(error);
        }
    }
});


async function deleteProduct(id) {

    try {
        const response = await fetch('/wareHouse/products/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id }),
        });

        const result = await response.json();
        if (result.success) {
            document.querySelector('.message-success').innerText = result.message;
            document.querySelector('.message-success').style.display = 'block';
            document.querySelector('.message-danger').style.display = 'none';
            setTimeout(() => {
                document.querySelector('.message-success').style.display = 'none';
                document.querySelector('.message-success').innerText = '';
            }, 3000);
            getProducts(); // Refresh the products list
        } else if (result.message) {
            document.querySelector('.message-danger').innerText = result.message;
            document.querySelector('.message-danger').style.display = 'block';
            setTimeout(() => {
                document.querySelector('.message-danger').style.display = 'none';
                document.querySelector('.message-danger').innerText = '';
            }, 3000);
        }
    } catch (error) {
        console.log(error);
    }
}


async function editProduct(id) {

    document.querySelector('.modal-title').innerText = 'Update Product';


    try {
        const response = await fetch(`/wareHouse/api/products/${id}`);
        const product = await response.json();

        document.querySelector('#productId').value = product.id_P;
        document.querySelector('#productName').value = product.name;
        document.querySelector('#description').value = product.description;
        document.querySelector('#price').value = product.price;
        document.querySelector('#quantity').value = product.quantity;
        document.querySelector('#id_suplliers').value = product.id_s;
        document.querySelector('#id_ctg').value = product.id_ctg;
        document.querySelector('#id_warehouse').value = product.id_w;

        const imagePreview = document.querySelector('#imagePreview');
        imagePreview.src = `/storage/products/${product.image}`;
        imagePreview.style.display = 'block';

        const addProductModal = new bootstrap.Modal(document.getElementById('addProductModal'));
        addProductModal.show();
    } catch (error) {
        console.log(error);
    }
}