const createTableRow = (book) => `
<tr>
  <td>${result.name}</td>
</tr>
`;



const retrievePeople = async () => {
    const resource = 'https://swapi.dev/api/people/?format=json';
    const response = await fetch(resource);
    const data = await response.json();

    if (!response.ok) {
        showError(`GET ${resource}`, data.message);
        return;
    }
    


    const rows = data.books.map(createTableRow);
    document.querySelector('#name-rows').innerHTML = rows.join('');

 
};


window.addEventListener('DOMContentLoaded', () => {
    retrievePeople();

});