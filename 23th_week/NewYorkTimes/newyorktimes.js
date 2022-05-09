console.log ('hello');
const key = "cTJwSeQPhz36n4IGxgq5LAmg3WnG1IFX";
let searchTerm = "moon landing by Apollo 11"
const URLforArticles  = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&api-key=${key}`;
const container = document.querySelector ('.main-container');
const button = document.querySelector('button');





button.addEventListener  ('click', async  () => {
    container.innerHTML="";
    searchTerm = document.getElementById("myInput").value;

    try {
        // GET is the default request method.
        const response = await fetch(URLforArticles);
        if (response.ok) {
            const data = await response.json();
            console.log(data);

            // div.textContent = data.value.joke;
            data.response.docs.forEach(item => {
                const div = document.createElement ('div');
                div.innerHTML = `<span><h1>Snippet: ${item.snippet}</h1><h2>Headline: ${item.headline.main}</h2><h2>Publication date: ${item.pub_date}</h2></span>`;
                container.appendChild(div);         
            });

        } else {
            console.error(response.statusText);
        }
    } catch (error) {
        console.error(error);
    }
})