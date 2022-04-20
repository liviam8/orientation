const button = document.querySelector ('button');
const list = document.querySelector ('ul');
const result = document.querySelector ('.result');
button.addEventListener ('click', () => {
    result.textContent = list.childElementCount.toString();
});

list.childElementCount;

