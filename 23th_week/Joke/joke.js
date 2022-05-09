console.log ('hello');

const URLforJoke = 'http://api.icndb.com/jokes/random';
const container = document.querySelector ('.main-container');
const button = document.querySelector('button');


button.addEventListener ('click', async () => {


    try {
        // GET is the default request method.
        const response = await fetch(URLforJoke);
        if (response.ok) {
            const data = await response.json();
            console.log(data);

            const div = document.createElement ('div');
            div.textContent = data.value.joke;
            container.appendChild(div);

        } else {
            console.error(response.statusText);
        }
    } catch (error) {
        console.error(error);
    }
})