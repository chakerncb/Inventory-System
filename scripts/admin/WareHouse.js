
document.querySelector('form#registrationForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = document.querySelector('form#registrationForm');
    const idField = document.getElementById('wareHouse_id').value;
    const formData = new FormData(form);

    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }

    console.log(idField);
    if (idField == '') {
    try {
        const response = await fetch('/admin/wareHouses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
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
            getWarehouses();
        }
        else if (result.message) {
            // Pass the error message to the EJS template
            document.querySelector('.message-danger').innerText = result.message;
            document.querySelector('.message-danger').style.display = 'block';
            setTimeout(() => {
                document.querySelector('.message-danger').style.display = 'none';
            }, 3000);
        }  
    } catch (error) {
        console.log(error);
    }

    } else {
        try {
            const response = await fetch('/admin/wareHouses/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
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
                getWarehouses();
            }
            else if (result.message) {
                // Pass the error message to the EJS template
                document.querySelector('.message-danger').innerText = result.message;
                document.querySelector('.message-danger').style.display = 'block';
                setTimeout(() => {
                    document.querySelector('.message-danger').style.display = 'none';
                }, 3000);
            }
        } catch (error) {
            console.log(error);
        }
    }

});


function getWarehouses() {
    const table = document.getElementById('warehouseTableBody');
    table.innerHTML = '';
    let id = 1;
    fetch('/admin/api/wareHouses')
        .then(response => response.json())
        .then(warehouses => {
            warehouses.forEach(warehouse => {
                let row = table.insertRow();
                row.innerHTML = `
                    <td>${id++}</td>
                    <td>${warehouse.capacity}</td>
                    <td>${warehouse.address}</td>
                    <td>${warehouse.description}</td>
                    <td>
                    <a onclick="deleteWarehouse(${warehouse.id_wr})"><i class="bi bi-trash3"></i></a>
                    <a onclick="editWarehouse(${warehouse.id_wr})"><i class="bi bi-pencil-square"></i></a>
                    </td>
                `;
            });
        })
        .catch(error => {
            console.log(error);
        });
}

async function deleteWarehouse(id) {

    try {

        const response = await fetch('/admin/wareHouses/delete', {
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
            }, 3000);
            getWarehouses();
        }
        else if (result.message) {
            // Pass the error message to the EJS template
            document.querySelector('.message-danger').innerText = result.message;
            document.querySelector('.message-danger').style.display = 'block';
            setTimeout(() => {
                document.querySelector('.message-danger').style.display = 'none';
            }, 3000);
        }  
        
    } catch (error) {
        console.log(error);
    
}
}

async function editWarehouse(id) {
    document.getElementById('form-title').innerText = 'Edit Warehouse';
    document.getElementById('warehouseFormModal').style.display = 'flex';

    const response = await fetch('/admin/wareHouses/edit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id }),
    });

    const result = await response.json();
    console.log(result);
    if (result.success) {
        document.querySelector('#wareHouse_id').value = result.warehouse.id_wr;
        document.querySelector('#capacity').value = result.warehouse.capacity;
        document.querySelector('#address').value = result.warehouse.address;
        document.querySelector('#description').value = result.warehouse.description;
    }
}

getWarehouses();
