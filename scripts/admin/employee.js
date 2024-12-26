// Get all roles and add them to the select element

async function getRoles() {
    const rolesSelect = document.getElementById('role');
    rolesSelect.innerHTML = '';

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
    const formData = new FormData(form);

    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }

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
            alert('Employee added successfully');
            form.reset();
            getEmployees();
        } else {
            alert('Error adding employee');
        }
    } catch (error) {
        console.log(error);
    }

});


function getEmployees() {
    const table = document.getElementById('employeeTableBody');
    table.innerHTML = '';

    fetch('/admin/api/employees')
        .then(response => response.json())
        .then(employees => {
            employees.forEach(employee => {
                let row = table.insertRow();
                row.innerHTML = `
                    <td>${employee.id}</td>
                    <td>${employee.fname}</td>
                    <td>${employee.email}</td>
                    <td>${employee.phone}</td>
                    <td>${employee.role}</td>
                `;
            });
        })
        .catch(error => {
            console.log(error);
        });
}

getEmployees();