async function getOrders() {
    const ordersTable = document.getElementById('ordersTableBody');

    try {
        const response = await fetch('/warehouse/api/orders');
        const orders = await response.json();
        console.log(orders);

        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.order_code}</td>
                <td>${order.total_price}</td>
                <td>${order.status}</td>
                <td>${order.customer}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteOrder(${order.id})">Delete</button>
                </td>
            `;
            ordersTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}




getOrders();

