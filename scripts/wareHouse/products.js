 
async function getSuplliers() {
    const suplliersSelect = document.getElementById('id_suplliers');

    try {
        const response = await fetch('/wareHouse/api/suplliers');
        const result = await response.json();
        console.log(result);
        result.forEach(supllier => {
            const option = document.createElement('option');
            option.value = supllier.id;
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
            }
            , 3000);
        } else if (result.message) {
            document.querySelector('.message-danger').innerText = result.message;
            document.querySelector('.message-danger').style.display = 'block';
            setTimeout(() => {
                document.querySelector('.message-danger').style.display = 'none';
            }
            , 3000);
        }
    } catch (error) {
        console.log(error);
    }
});



async function getCategories() {
    const categoriesSelect = document.getElementById('id_ctg');

    try {
        const response = await fetch('/wareHouse/api/categories');
        const result = await response.json();
        console.log(result);
        result.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.innerText = category.name;
            categoriesSelect.appendChild(option);
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
        console.log(result);
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
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
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