const newCustomerModal = document.getElementById('newCustomerModal');
const newCustomerForm = document.getElementById('newCustomerForm');
const newProductModal = document.getElementById('newProductModal');
const newCustomerBtn = document.getElementById('newCustomerBtn');
const addProductBtn = document.getElementById('addProductBtn');
const categoryListBtn = document.getElementById('categoryListBtn'); 
const categoryList = document.getElementById('categoryList');

if (!newCustomerForm) console.error('New customer form not found');
if (!newCustomerModal) console.error('New customer modal not found');

newCustomerBtn.addEventListener('click', () => {
    newCustomerModal.style.display = 'block';
});

// addProductBtn.addEventListener('click', () => {
//     newProductModal.style.display = 'block';
// });

categoryListBtn.addEventListener('click', () => {
    categoryList.classList.toggle('active'); 
});

window.addEventListener('click', (e) => {
    if (e.target !== categoryList && !categoryList.contains(e.target) && e.target !== categoryListBtn) {
        categoryList.classList.remove('active');
    }
});

document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', () => {
        newCustomerModal.style.display = 'none';
        // newProductModal.style.display = 'none';
        newCustomerForm.reset();
    });
});
