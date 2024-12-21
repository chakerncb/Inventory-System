


// Edit a category
function editCategory(id, name, description) {
    categoryName.value = name; // Populate form with category data
    categoryDescription.value = description;
  
    isEditing = true; // Flag that editing is in progress
    currentCategoryId = id; // Save the ID of the category being edited
  
    cancelEditButton.style.display = "inline-block"; // Show cancel button
  }
  
  // Delete a category
  async function deleteCategory(id) {
    if (!confirm("Are you sure you want to delete this category?")) return; // Confirmation dialog
  
    try {
      // Perform DELETE request to the backend
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
  
      // Refresh the categories table
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  }
  
  // Fetch and display all categories
  async function fetchCategories() {
    try {
      const response = await fetch(API_URL);
      const categories = await response.json();
      populateTable(categories); // Populate table rows with categories
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }
  
  // Populate the table with categories
  function populateTable(categories) {
    categoryTableBody.innerHTML = ""; // Clear the table body
  
    categories.forEach((category) => {
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${category.id}</td>
        <td>${category.name}</td>
        <td>${category.description}</td>
        <td>
          <button
            class="btn btn-sm btn-warning"
            onclick="editCategory('${category.id}', '${category.name}', '${category.description}')">
            Edit
          </button>
          <button
            class="btn btn-sm btn-danger"
            onclick="deleteCategory('${category.id}')">
            Delete
          </button>
        </td>
      `;
  
      categoryTableBody.appendChild(row); // Append the row to the table body
    });
  }