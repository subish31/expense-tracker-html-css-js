let total = 0;

document.getElementById('transaction-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const type = document.getElementById('type').value;
    const name = document.getElementById('name').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;  
    if (type && name && amount && date) {
        const table = document.getElementById('transaction-table');
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${name}</td>
            <td>$${amount.toFixed(2)}</td>
            <td>${type}</td>
            <td>${date}</td>
            <td><button href="#" onclick="editRow(this)">Edit</button> <button href="#" onclick="deleteRow(this)">Delete</button></td>
        `;
        
        total += amount;
        document.getElementById('tot').innerHTML = `Total: $${total.toFixed(2)}`;
        
        table.appendChild(row);
        document.getElementById('transaction-form').reset();
    }
});

function deleteRow(button) {
    const row = button.parentElement.parentElement;
    const amount = parseFloat(row.cells[1].textContent.replace('$', ''));
    total -= amount;
    document.getElementById('tot').innerHTML = `Total: $${total.toFixed(2)}`;
    row.remove();
}

function editRow(button) {
    currentEditRow = button.parentElement.parentElement;
    const cells = currentEditRow.cells;
    
    document.getElementById('name').value = cells[0].textContent;
    document.getElementById('amount').value = parseFloat(cells[1].textContent.replace('$', ''));
    document.getElementById('type').value = cells[2].textContent;
    document.getElementById('date').value = cells[3].textContent;
}
function updateRow(row, name, amount, type, date) {
    const cells = row.cells;
    const previousAmount = parseFloat(cells[1].textContent.replace('$', ''));
    
    cells[0].textContent = name;
    cells[1].textContent = `$${amount.toFixed(2)}`;
    cells[2].textContent = type;
    cells[3].textContent = date;
    
    total += amount - previousAmount;
    document.getElementById('tot').innerHTML = `Total: $${total.toFixed(2)}`;
}

document.getElementById('categ').addEventListener('change', function() {
    const filter = this.value;
    const rows = document.querySelectorAll('#transaction-table tr');
    
    rows.forEach(row => {
        const type = row.cells[2].textContent;
        if (filter === "" || type === filter) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});