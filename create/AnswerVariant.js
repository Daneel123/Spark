function addAnswerVariant(button) {
        const parent = button.parentElement;
        const newVariant = document.createElement('div');
        newVariant.innerHTML = `
            <input class="ansvar" style="width: 55%; margin-bottom: 3%;" type="text" placeholder="Введите ответ">
            <span class="correct-mark" onclick="markCorrect(this)">✓</span>
            <button style="background: none; color: darkred; font-size: 130%; padding: 0 0 0 1%;" onclick="removeAnswerVariant(this)">X</button>
        `;
        parent.insertBefore(newVariant, button);
}
    
function removeAnswerVariant(button) {
        button.parentElement.remove();
}
