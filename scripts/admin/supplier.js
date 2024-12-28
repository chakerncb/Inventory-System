
document.querySelector('form#registrationForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = document.querySelector('form#registrationForm');
    const formData = new FormData(form);

    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }

    // console.log(data);

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
            }, 3000);
            getSuppliers();
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
                `;
            });
        })
        .catch(error => {
            console.log(error);
        });
}

getSuppliers();