console.log('hello');

const URL = 'http://localhost:3000/api/users/brad63';
const container = document.querySelector('#container');
// const button = document.querySelector('button');

function convertSex(intIam){
    if (intIam === 1) { return 'Man' }
    if (intIam === 2) { return 'Woman'}
    return 'Both'
}

function getAge(birthYear){
    const now = new Date();
    return now.getFullYear() - parseInt(birthYear);
}

window.addEventListener('load', async () => {


    try {
        // GET is the default request method.
        const response = await fetch(URL);
        if (response.ok) {
            const data = await response.json();
            console.log(data);

            data.foxuser.forEach(item => {
                const div = document.createElement('div');
                div.innerHTML =
                    `<span>
                    <h1> ${item.nickname} (${getAge(item.birthyear)}, ${convertSex(item.iam)} )</h1>
                    <h6> ${item.aboutme}</h6>
                    <img src="${item.URL}" alt="profilepicture"/>
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