const createTableRow = (data) => `

<tr>
  <td>${data.name}</td>
</tr>
`;



const retrievePeople = async () => {
    const namelist = [];
    const resource = 'https://swapi.dev/api/people/?format=json';
    const response = await fetch(resource);
    const data = await response.json();
    console.log (response);
    console.log (data);
    if (!response.ok) {
        showError(`GET ${resource}`, data.message);
        return;
    }
    


    const rows = data.name.map(createTableRow);
    document.querySelector('#name-rows').innerHTML = rows.join('');

 
};


window.addEventListener('DOMContentLoaded', () => {
    retrievePeople();

});