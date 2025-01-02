document.querySelector('#addCategoryForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = document.querySelector('#addCategoryForm');
    let idField = document.querySelector('#id_ctg').value;
    const formData = new FormData(form);
    const category = {};
    formData.forEach((value, key) => {
        category[key] = value;
    });

    console.log('the id is: ' + idField);


    if (!idField) {

        console.log('add');

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
            getCategories();
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
 
    } else {
 
        console.log('update');
         
        try {
            const response = await fetch('/wareHouse/categories/update', {
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
                getCategories();
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
    }
});



async function getCategories() {
    const categoriesTable = document.getElementById('CategoriesTableBody');
    categoriesTable.innerHTML = '';

    try {
        const response = await fetch('/wareHouse/api/categories');
        const result = await response.json();
       
        let i = 1;
        result.forEach(category => {

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${i++}</td>
                <td>${category.name}</td>
                <td>${category.description}</td>
                <td align="center">
                    <button onclick="editCtg(${category.id_ctg})" class="btn btn-sm btn-warning">Edit</button>
                    <button onclick="deleteCtg(${category.id_ctg})" class="btn btn-sm btn-danger">Delete</button>
                </td>
            `;
            categoriesTable.appendChild(tr);
        });
    } catch (error) {
        console.log(error);
    }

}


async function deleteCtg(id) {

    try {

        const response = await fetch('/wareHouse/categories/delete', {
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
            getCategories();
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


async function editCtg(id) {

    document.querySelector('.modal-title').innerText = 'Update Category';

    try {
        const response = await fetch('/wareHouse/categories/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id }),
        });

        const result = await response.json();
        console.log(result);
        document.querySelector('#id_ctg').value = result.id_ctg;
        document.querySelector('#categoryName').value = result.name;
        document.querySelector('#categoryDescription').value = result.description;
        const editCategoryModal = new bootstrap.Modal(document.getElementById('addCategoryModal'));
        editCategoryModal.show();
    } catch (error) {
        console.log(error);
    }
}



getCategories();