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



const createTableRow = (book) => `
<tr>
  <td>
    <input
      class="form-check-input book-radio"
      type="radio"
      name="book"
      value="${book.book_id}"
    />
  </td>
  <td>${book.book_id}</td>
  <td>${book.book_name}</td>
  <td>${book.aut_name}</td>
  <td>${book.cate_descrip}</td>
  <td>${book.cate_price}</td>
  <td>${book.pub_name}</td>


</tr>
`;

const getSelectedBookId = () => {
    return document.querySelector('.book-radio:checked')?.value;
};


const retrieveBooks = async () => {
    const resource = '/api/books';
    const response = await fetch(resource);
    const data = await response.json();

    if (!response.ok) {
        showError(`GET ${resource}`, data.message);
        return;
    }
    
    const selectedId = getSelectedBookId();


    const rows = data.books.map(createTableRow);
    document.querySelector('#book-rows').innerHTML = rows.join('');

    const selectedRadioButton =
        document.querySelector(`.book-radio[value="${selectedId}"]`) ||
        document.querySelector('.book-radio');
    selectedRadioButton.setAttribute('checked', '');
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
    retrieveBooks();
};

const handleClose = (event) => {
    event.preventDefault();
    closeEditor();
};








window.addEventListener('DOMContentLoaded', () => {
    retrieveBooks();

   
});





