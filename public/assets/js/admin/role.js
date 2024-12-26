
async function getRoles() {
    const rolesSelect = document.getElementById('role');

    try {
        const response = await fetch('/admin/api/roles');
        const roles = await response.json();

        roles.forEach(role => {
            let option = document.createElement('option');
            option.text = role.name;
            option.value = role.id;
            rolesSelect.appendChild(option);
        });

    }
    catch (error) {
        console.log(error);
    }


}