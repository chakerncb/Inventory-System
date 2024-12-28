const db = require('../../config/db');
const bcrypt = require('bcryptjs');

newWareHouse = async (req, res) => {

    const { capacity, address, description } = req.body;

    if(!capacity || !address || !description) {
        message = 'Please provide an email and password';
        return res.message({ message });
    }
    
    try {
        const [results] = await db.promise().query('INSERT INTO warehouses (capacity, address, description) VALUES (?,?,?)', [capacity, address, description]);
        message = 'Supplier added successfully';
        return res.json({ success: true , message });

    } catch (error) {
        // console.log(error);
        // return res.status(500).send('Server error');
        if (error.code === 'ER_DUP_ENTRY') {
            message = 'Email already exists';
            return res.json({ message });
        }

        return res.status(500).send(error);

    }

}


getWarehouses = async (req, res) => {

    try {
        const [results] = await db.promise().query('SELECT * FROM warehouses');
        const warehouses = [];
        for (const result of results) {
            warehouses.push({
            id_wr: result.id_w,
            capacity: result.capacity,
            address: result.address,
            description: result.description,
            });
        }
        return res.json(warehouses);

    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
}

deleteWarehouse = async (req , res) => {
    const { id } = req.body;

    if(!id) {
        message = 'Please provide an id';
        return res.json({ message });
    }

    try {
        const [results] = await db.promise().query('DELETE FROM warehouses WHERE id_w = ?', [id]);
        message = 'Warehouse deleted successfully';
        return res.json({ success: true , message });

    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
}

editWarehouse = async (req , res) => {
    const { id } = req.body;

    if(!id) {
        message = 'Please provide an id';
        return res.json({ message });
    }

    try {
        const [results] = await db.promise().query('SELECT * FROM warehouses WHERE id_w = ?', [id]);
        if(results.length === 0) {
            message = 'Warehouse not found';
            return res.json({ message });
        }
        console.log(results[0]);
        const warehouse = {
            id_wr: results[0].id_w,
            capacity: results[0].capacity,
            address: results[0].address,
            description: results[0].description,
        }
        return res.json({ success: true , warehouse});

    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
}

updateWarehouse = async (req , res) => {
    const { id , capacity, address, description } = req.body;

    if(!id || !capacity || !address || !description) {
        message = 'Please provide all fields';
        return res.json({ message });
    }

    try {
        const [results] = await db.promise().query('UPDATE warehouses SET capacity = ? , address = ? , description = ? WHERE id_w = ?', [capacity, address, description, id]);
        message = 'Warehouse updated successfully';
        return res.json({ success: true , message });

    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
}




module.exports = { newWareHouse , getWarehouses , deleteWarehouse , editWarehouse , updateWarehouse };