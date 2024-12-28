// Get all roles and add them to the select element

async function getRoles() {
    const rolesSelect = document.getElementById('role');

    try {
        const response = await fetch('/admin/api/roles');
        const roles = await response.json();

        roles.forEach(role => {
            let option = document.createElement('option');
            option.text = role.role;
            option.value = role.id;
            rolesSelect.appendChild(option);
        });

    }
    catch (error) {
        console.log(error);
    }
}

document.querySelector('form#registrationForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = document.querySelector('form#registrationForm');
    const idField = document.getElementById('employee_id').value;
    const formData = new FormData(form);

    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }

    if (idField === '') {

    try {
        const response = await fetch('/admin/employees', {
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
            getEmployees();
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
     else {
        try {
            const response = await fetch('/admin/employees/update', {
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
                getEmployees();
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


function getEmployees() {
    const table = document.getElementById('employeeTableBody');
    table.innerHTML = '';
    let id = 1;
    fetch('/admin/api/employees')
        .then(response => response.json())
        .then(employees => {
            employees.forEach(employee => {
                let row = table.insertRow();
                row.innerHTML = `
                    <td>${id++}</td>
                    <td>${employee.fname}</td>
                    <td>${employee.email}</td>
                    <td>${employee.phone}</td>
                    <td>${employee.role}</td>
                    <td>
                    <button class="btn btn-primary" onclick="editEmployee('${employee.id}')"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn btn-danger" onclick="deleteEmployee('${employee.id}')"><i class="bi bi-trash3"></i></button>
                    </td>
                `;
            });
        })
        .catch(error => {
            console.log(error);
        });
}

async function deleteEmployee(id) {

    try {

        const response = await fetch('/admin/employees/delete', {
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
            getEmployees();
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

async function editEmployee(id) {
    document.querySelector('.form-title').textContent = 'Edit Employee';    
    document.getElementById('employeeForm').style.display = 'flex';

    const response = await fetch('/admin/employees/edit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id }),
    });

    const result = await response.json();
    if (result.success) {
        document.getElementById('employee_id').value = result.employee.id;
        document.getElementById('fname').value = result.employee.name;
        document.getElementById('email').value = result.employee.email;
        document.getElementById('phone').value = result.employee.phone;
        document.getElementById('password').value = result.employee.password;
        document.getElementById('role').value = result.employee.role;
    }
}


getEmployees();
getRoles();