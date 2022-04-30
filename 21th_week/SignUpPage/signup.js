const $detailsInputFields = document.querySelectorAll('.details input');

$detailsInputFields.forEach(($inputField) => {
    $inputField.addEventListener('blur', (event) => {
        event.target.classList.add('visited');
    });
});