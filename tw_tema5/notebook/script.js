const tableBody = document.getElementById('phone-table-body')

document.getElementById('input-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const data = {
        uname: formData.get('fname'),
        phone: formData.get('fphone')
    };
    
    if(data.phone === '' || data.uname === '') return;

    const newRow = document.createElement('tr');
    const nameCell = document.createElement('td');
    const phoneCell = document.createElement('td');
    nameCell.innerText = data.uname;
    phoneCell.innerText = data.phone;
    newRow.appendChild(nameCell);
    newRow.appendChild(phoneCell);
    tableBody.appendChild(newRow);
})