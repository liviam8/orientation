const clearErrors = () => {
    document.querySelector('#errors').innerHTML = '';
};

const showError = (context, message) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="col-6 alert alert-danger" role="alert">
        <strong>${context}:</strong> ${message}
      </div>
    `;

    document.querySelector('#errors').appendChild(div);
};

const createTableRow = (participant) => `
  <tr>
    <td>
      <input
        class="form-check-input participant-radio"
        type="radio"
        name="participant"
        value="${participant.id}"
      />
    </td>
    <td>${participant.first_name}</td>
    <td>${participant.last_name}</td>
    <td>
      <a href="mailto:${participant.email}">
        ${participant.email}
      </a>
    </td>
    <td>
      <a href="tel:${participant.phone_number}">
        ${participant.phone_number}
      </a>
    </td>
    <td>${participant.cohort}</td>
    <td>${participant.class}</td>
  </tr>
`;

const getSelectedParticipantId = () => {
    return document.querySelector('.participant-radio:checked')?.value;
};

const retrieveParticipants = async () => {
    const resource = '/api/participants';
    const response = await fetch(resource);
    const data = await response.json();

    if (!response.ok) {
        showError(`GET ${resource}`, data.message);
        return;
    }

    const selectedId = getSelectedParticipantId();

    const rows = data.participants.map(createTableRow);
    document.querySelector('#participant-rows').innerHTML = rows.join('');

    const selectedRadioButton =
        document.querySelector(`.participant-radio[value="${selectedId}"]`) ||
        document.querySelector('.participant-radio');
    selectedRadioButton.setAttribute('checked', '');
};

const retrieveClasses = async (currentId) => {
    const resource = '/api/classes';
    const response = await fetch(resource);
    const data = await response.json();

    if (!response.ok) {
        showError(`GET ${resource}`, data.message);
        return;
    }

    const options = data.classes.map((cls) => `
      <option value="${cls.id}" ${cls.id === currentId ? 'selected': ''}>
        ${cls.name}
      </option>
    `);
    options.unshift('<option></option>');

    document.querySelector('#class').innerHTML = options.join('');
};

const closeEditor = () => {
    document.querySelector('#editor-container').innerHTML = '';
};

const openEditor = (title) => {
    closeEditor();

    const newForm = document.querySelector('#editor-form').cloneNode(true);
    document.querySelector('#editor-container').appendChild(newForm);

    document.querySelector('#editor-title').textContent = title;
};

const createSubmitHandler = (method, resource) => async (event) => {
    event.preventDefault();

    const requestData = {
        first_name: document.querySelector('#first-name').value,
        last_name: document.querySelector('#last-name').value,
        email: document.querySelector('#email').value,
        phone_number: document.querySelector('#phone-number').value,
        class_id: parseInt(document.querySelector('#class').value),
    };

    const response = await fetch(resource, {
        method: method,
        body: JSON.stringify(requestData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const responseData = await response.json();

    if (!response.ok) {
        showError(`${method} ${resource}`, responseData.message);
        return;
    }

    clearErrors();
    closeEditor();
    retrieveParticipants();
};

const handleClose = (event) => {
    event.preventDefault();
    closeEditor();
};

const handleAdd = (event) => {
    event.preventDefault();

    openEditor('Add Participant');
    retrieveClasses();

    document.querySelector('#submit-button').onclick =
        createSubmitHandler('POST', '/api/participants');
    document.querySelector('#cancel-button').onclick = handleClose;
};

const handleEdit = async (event) => {
    event.preventDefault();

    openEditor('Edit Participant');

    const resource = `/api/participants/${getSelectedParticipantId()}`;

    document.querySelector('#submit-button').onclick =
        createSubmitHandler('PUT', resource);
    document.querySelector('#cancel-button').onclick = handleClose;

    const response = await fetch(resource);
    const data = await response.json();

    if (!response.ok) {
        showError(`GET ${resource}`, data.message);
        return;
    }

    document.querySelector('#first-name').value = data.first_name;
    document.querySelector('#last-name').value = data.last_name;
    document.querySelector('#email').value = data.email;
    document.querySelector('#phone-number').value = data.phone_number;

    retrieveClasses(data.class_id);
};

const handleDelete = async (event) => {
    event.preventDefault();

    if (!confirm('Are you sure?')) {
        return;
    }

    const resource = `/api/participants/${getSelectedParticipantId()}`;

    const response = await fetch(resource, {
        method: 'DELETE',
    });
    const data = await response.json();

    if (!response.ok) {
        showError(`DELETE ${resource}`, data.message);
    }

    retrieveParticipants();
};

window.addEventListener('DOMContentLoaded', () => {
    retrieveParticipants();

    document.querySelector('#add-button').onclick = handleAdd;
    document.querySelector('#edit-button').onclick = handleEdit;
    document.querySelector('#delete-button').onclick = handleDelete;
});
