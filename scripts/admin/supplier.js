
document.querySelector('form#registrationForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = document.querySelector('form#registrationForm');
    const idField = document.getElementById('supplier_id').value;
    const formData = new FormData(form);

    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }

    // console.log(data);

    if (idField == '') {

    try {
        const response = await fetch('/admin/suppliers', {
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
                document.querySelector('.message-success').innerText = '';
            }, 3000);
            getSuppliers();
        }
        else if (result.message) {
            // Pass the error message to the EJS template
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

    } else {

        try {
            const response = await fetch('/admin/suppliers/update', {
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
                    document.querySelector('.message-success').innerText = '';
                }, 3000);
                getSuppliers();
            }
            else if (result.message) {
                // Pass the error message to the EJS template
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

});


function getSuppliers() {
    const table = document.getElementById('supplierTableBody');
    table.innerHTML = '';
    let id = 1;
    fetch('/admin/api/suppliers')
        .then(response => response.json())
        .then(suppliers => {
            suppliers.forEach(supplier => {
                let row = table.insertRow();
                row.innerHTML = `
                    <td>${id++}</td>
                    <td>${supplier.name}</td>
                    <td>${supplier.email}</td>
                    <td>${supplier.phone}</td>
                    <td>${supplier.description}</td>
                    <td>
                        <button class="btn btn-primary" onclick="editSupplier('${supplier.id}')"><i class="bi bi-pencil-square"></i></button>
                        <button class="btn btn-danger" onclick="deleteSupplier('${supplier.id}')"><i class="bi bi-trash3"></i></button>
                    </td>
                `;
            });
        })
        .catch(error => {
            console.log(error);
        });
}

async function deleteSupplier(id) {

    try {

        const response = await fetch('/admin/suppliers/delete', {
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
            getSuppliers();
        }
        else if (result.message) {
            // Pass the error message to the EJS template
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

async function editSupplier(id) {
    document.querySelector('.form-title').textContent = 'edit Supplier';
    document.getElementById('supplierFormModal').style.display = 'flex';

    const response = await fetch('/admin/suppliers/edit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id }),
    });

    const result = await response.json();
    if (result.success) {
        document.getElementById('supplier_id').value = result.supplier.id;
        document.getElementById('name').value = result.supplier.name;
        document.getElementById('email').value = result.supplier.email;
        document.getElementById('phone').value = result.supplier.phone;
        document.getElementById('description').value = result.supplier.description;
    }
}

getSuppliers();