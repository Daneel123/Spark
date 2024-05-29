function loadMedia(input) {
    const mediaContainer = input.parentElement.querySelector('#media-container');
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const mediaElement = document.createElement(input.files[0].type.startsWith('image') ? 'img' : input.files[0].type.startsWith('video') ? 'video' : 'audio');
            mediaElement.src = e.target.result;
            mediaElement.controls = true;
            mediaElement.style.maxWidth = '200px';
            mediaElement.style.maxHeight = '200px';

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.textContent = 'X';
            deleteButton.onclick = function() {
                mediaElement.remove();
                deleteButton.remove();
                input.value = ''; // Clear the input file value
            };

            mediaContainer.appendChild(mediaElement);
            mediaContainer.appendChild(deleteButton);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
