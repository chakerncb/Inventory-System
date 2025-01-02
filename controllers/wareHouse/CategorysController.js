const e = require('express');
const db = require('../../config/db');

addCategory = async (req, res) => {
    const { name , description } = req.body;
    if (!name || !description) {
        return res.json({ message: 'Please provide all fields' });
    }

    if (name.length < 3) {
        return res.json({ message: 'Category name must be at least 3 characters' });
    }

    if (description.length < 10) {
        return res.json({ message: 'Category description must be at least 10 characters' });
    }

    const [category] = await db.promise().query('SELECT name FROM categories WHERE name = ?', [name]);
    if (category.length > 0) {
        return res.json({ message: 'Category already exists' });
    }

    try {
        const [results] = await db.promise().query('INSERT INTO categories (name, description) VALUES (?,?)', [name, description]);
        return res.json({ success: true, message: 'Category added successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
}


getCategories = async (req, res) => {
    try {
        const [categories] = await db.promise().query('SELECT * FROM categories');
        return res.json(categories);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
}

deleteCategory = async (req, res) => {
    const { id } = req.body;
    try {
        const [results] = await db.promise().query('DELETE FROM categories WHERE id_ctg = ?', [id]);
        return res.json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.json({ message: 'An error occurred. Please try again' });
    }
}

editCategory = async (req, res) => {
    const { id } = req.body;
    try {
        const [category] = await db.promise().query('SELECT * FROM categories WHERE id_ctg = ?', [id]);
        return res.json(category[0]);
    } catch (error) {
        console.log(error);
        return res.json({ message: 'An error occurred. Please try again' });
    }
}

updateCategory = async (req, res) => {
    const { id_ctg , name, description } = req.body;
    if (!name || !description) {
        return res.json({ message: 'Please provide all fields' });
    }

    if (name.length < 3) {
        return res.json({ message: 'Category name must be at least 3 characters' });
    }

    if (description.length < 10) {
        return res.json({ message: 'Category description must be at least 10 characters' });
    }

    try {
        const [results] = await db.promise().query('UPDATE categories SET name = ?, description = ? WHERE id_ctg = ?', [name, description, id_ctg]);
        return res.json({ success: true, message: 'Category updated successfully' });
    } catch (error) {
        console.log(error);
        return res.json({ message: 'An error occurred. Please try again' });
    }
}

module.exports = { addCategory, getCategories , deleteCategory , editCategory , updateCategory };