const apiUrl = 'http://127.0.0.1:8000/api/card/';
const formContainer = document.getElementById('forms-container');
const responseDisplay = document.getElementById('api-response-data');

function displayResult(data, success = true) {
    const color = success ? 'green' : 'red';
    responseDisplay.style.color = color;
    responseDisplay.textContent = JSON.stringify(data, null, 2);
}

//GET
async function fetchCardInfo(name) {
    responseDisplay.textContent = 'Searching...';
    try {
        const encodedName = encodeURIComponent(name); 
        const response = await axios.get(apiUrl + encodedName);
        displayResult(response.data);
    } catch (error) {
        const message = error.response ? error.response.data.message : error.message;
        displayResult({ status: 'Error', message: message }, false);
    }
}

//POST
async function createCard(cardData) {
    responseDisplay.textContent = 'Creating...';
    try {
        const response = await axios.post(apiUrl, cardData); 
        displayResult({ status: 'Success (201)', newCard: response.data });
    } catch (error) {
        const message = error.response ? error.response.data.message : error.message;
        displayResult({ status: 'Error', message: message }, false);
    }
}

//PUT
async function updateCard(name, cardData) {
    responseDisplay.textContent = 'Updating...';
    try {
        const encodedName = encodeURIComponent(name); 
        const response = await axios.put(apiUrl + encodedName, cardData); 
        displayResult({ status: 'Success', updatedCard: response.data });
    } catch (error) {
        const message = error.response ? error.response.data.message : error.message;
        displayResult({ status: 'Error', message: message }, false);
    }
}

//DELETE
async function deleteCard(name) {
    responseDisplay.textContent = 'Deleting...';
    try {
        const encodedName = encodeURIComponent(name); 
        const response = await axios.delete(apiUrl + encodedName); 
        displayResult({ status: 'Success (204)', message: `Card for '${name}' deleted successfully.` });
    } catch (error) {
        const message = error.response ? error.response.data.message : error.message;
        displayResult({ status: 'Error', message: message }, false);
    }
}

function clearFormsContainer() {
    formContainer.innerHTML = '';
    document.querySelectorAll('[name="radioRequestType"]').forEach(radio => radio.removeAttribute('checked'));
}

function createForm(fields, submitValue, handler) {
    clearFormsContainer();
    const form = document.createElement('form');

    fields.forEach(field => {
        const label = document.createElement('label');
        label.setAttribute('for', field.id);
        label.innerText = field.label;
        
        const input = document.createElement('input');
        input.setAttribute('type', field.type);
        input.setAttribute('name', field.name);
        input.setAttribute('id', field.id);

        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(document.createElement('br'));
    });

    const submitBtn = document.createElement('input');
    submitBtn.setAttribute('type', 'submit');
    submitBtn.setAttribute('value', submitValue);
    form.appendChild(submitBtn);

    form.addEventListener('submit', handler);
    formContainer.appendChild(form);
}

document.getElementById('radioRequestInputGet').addEventListener('click', () => {
    document.getElementById('radioRequestInputGet').setAttribute('checked', 'True');
    const fields = [{ label: 'Nume:', type: 'text', name: 'name', id: 'nameInput' }];
    createForm(fields, 'Cauta', e => {
        e.preventDefault();
        const nameValue = document.getElementById('nameInput').value;
        fetchCardInfo(nameValue);
    });
});

document.getElementById('radioRequestInputPost').addEventListener('click', () => {
    document.getElementById('radioRequestInputPost').setAttribute('checked', 'True');
    const fields = [
        { label: 'Nume:', type: 'text', name: 'name', id: 'nameInput' },
        { label: 'Numar card:', type: 'text', name: 'number', id: 'numberInput' },
        { label: 'Data expirare (MM/YY):', type: 'text', name: 'expDate', id: 'expDateInput' },
        { label: 'CVV:', type: 'text', name: 'cvv', id: 'cvvInput' },
    ];
    createForm(fields, 'Adauga', e => {
        e.preventDefault();
        const cardData = {
            name: document.getElementById('nameInput').value,
            number: document.getElementById('numberInput').value,
            expDate: document.getElementById('expDateInput').value,
            cvv: parseInt(document.getElementById('cvvInput').value)
        };
        createCard(cardData);
    });
});

document.getElementById('radioRequestInputPut').addEventListener('click', () => {
    document.getElementById('radioRequestInputPut').setAttribute('checked', 'True');
    const fields = [
        { label: 'Nume CARD DE UP-DATAT:', type: 'text', name: 'name', id: 'nameToUpdateInput' },
        { label: 'Nume NOU:', type: 'text', name: 'newName', id: 'newNameInput' },
        { label: 'Numar card NOU:', type: 'text', name: 'newNumber', id: 'newNumberInput' }
    ];
    createForm(fields, 'Actualizeaza', e => {
        e.preventDefault();
        const nameToUpdate = document.getElementById('nameToUpdateInput').value;
        const updateData = {
            name: document.getElementById('newNameInput').value,
            number: document.getElementById('newNumberInput').value
        };
        updateCard(nameToUpdate, updateData);
    });
});

document.getElementById('radioRequestInputDelete').addEventListener('click', () => {
    document.getElementById('radioRequestInputDelete').setAttribute('checked', 'True');
    const fields = [{ label: 'Nume CARD DE SERS:', type: 'text', name: 'name', id: 'nameToDeleteInput' }];
    createForm(fields, 'Sterge', e => {
        e.preventDefault();
        const nameToDelete = document.getElementById('nameToDeleteInput').value;
        deleteCard(nameToDelete);
    });
});