console.log('hello');

const URL = 'http://localhost:3000/api/reddit';

const container = document.querySelector('.main-container');
const button = document.querySelector('button');


window.addEventListener('load', async () => {


    try {
        // GET is the default request method.
        const response = await fetch(URL);
        if (response.ok) {
            const data = await response.json();
            console.log(data);

            data.reddit.forEach(item => {
                const div = document.createElement('div');
                div.innerHTML =
                    `<span>
                    <h1>Title: ${item.title}</h1>
                    <h2>Url: ${item.url}</h2>
                    <button type="submit" onclick="upvote(${item.id})">Up vote</button>
                    <button type="submit" onclick="downvote( ${item.id})">Down vote</button>
                    <button type="submit" onclick="deletePost(${item.id})">Delete Post</button>
                </span>`;
                container.appendChild(div);
            });

        } else {
            console.error(response.statusText);
        }
    } catch (error) {
        console.error(error);
    }

})

async function upvote(id) {
    console.log(id);

    if ((id == null) || (id == "")) {
        showError('Error');
        return;
    }

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(`/posts/${id}/upvote`, requestOptions);
    const data = await response.json();
    if (!response.ok) {
        showError(`GET ${resource}`, data.message);
        return;
    }
}



async function downvote(id) {
    console.log(id);



    if ((id == null) || (id == "")) {
        showError('Error');
        return;
    }

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(`/posts/${id}/downvote`, requestOptions);
    const data = await response.json();
    if (!response.ok) {
        showError(`GET ${resource}`, data.message);
        return;
    }
}






async function deletePost(id) {
    console.log(id);


  
        if ((id == null) || (id == "")) {
            showError('Error');
            return;
        }
    
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        const response = await fetch(`/posts/${id}`, requestOptions);
        const data = await response.json();
        if (!response.ok) {
            showError(`GET ${resource}`, data.message);
            return;
        }
    }
