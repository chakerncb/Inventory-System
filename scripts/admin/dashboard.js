async function countEmployees() {
    const employeesCard = document.querySelector('.employeesCard');
    try {
        const response = await fetch('/admin/api/employees/count');
        const data = await response.json();
        employeesCard.innerHTML = data.count; // Update to use data.count
    } catch (error) {
        console.log(error);
    }
}


async function countOrders() {
    const ordersCard = document.querySelector('.ordersCard');
    try {
        const response = await fetch('/admin/api/orders/count');
        const data = await response.json();
        ordersCard.innerHTML = data.count; // Update to use data.count
    } catch (error) {
        console.log(error);
    }
}


async function countProducts() {
    const productsCard = document.querySelector('.productsCard');
    try {
        const response = await fetch('/admin/api/products/count');
        const data = await response.json();
        productsCard.innerHTML = data.count; // Update to use data.count
    } catch (error) {
        console.log(error);
    }
}


async function countCostumers() {
    const costumersCard = document.querySelector('.costumersCard');
    try {
        const response = await fetch('/admin/api/costumers/count');
        const data = await response.json();
        costumersCard.innerHTML = data.count; // Update to use data.count
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    countEmployees();
    countOrders();
    countProducts();
    countCostumers();
});