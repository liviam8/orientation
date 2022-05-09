
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

const URLforPeople = 'https://swapi.dev/api/people/';
const container = document.querySelector ('.container');

const $character = document.querySelector('#character');
const $characterError = document.querySelector('.character.error');
const button = document.querySelector('button');


console.log($character);
console.dir($character);
console.log($character.value);





const listofpeople = (result) => `
<tr>
    <td>
        <input name="book" value="${result.name}" />
    </td>
    <td>${result.name}</td>
</tr>
`;





const listofpeople = async () => {
    const resource = 'https://swapi.dev/api/people/';
    const response = await fetch(resource);
    const data = await response.json();

    if (!response.ok) {
        showError(`GET ${resource}`, data.message);
        return;
    }

    const rows = data.name.map(createTableRow);
    document.querySelector('#name-rows').innerHTML = rows.join('');

    
};




const createSubmitHandler = (method, resource) => async (event) => {
    event.preventDefault();


    const requestData = {
        name: document.querySelector('#name').value,
       
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
    listofpeople();
};




const handleClose = (event) => {
    event.preventDefault();
    closeEditor();
};








window.addEventListener('DOMContentLoaded', () => {
    listofpeople();

   
});







// button.addEventListener('submit', (event) => {
//     event.preventDefault();
//     if ($username.value.length < 3) {
//         console.log('Something went wrong')
//     } else {
//         let email = document.getElementById('search-input').value;
//         fetch('/subscribe',{
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//               },
//             body: JSON.stringify({ "name": $username.value, 
//                     "email": email })
//         })
//         .then((data) =>{
//             console.log('Subscribed - ' + data);
//         })
//         .catch((message)=>{
//             console.log('Error happend: ' +message);
//         });
//         console.log('Subscription happened');
//     }
// });