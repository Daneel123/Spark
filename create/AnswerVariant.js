function addAnswerVariant(button) {
        const parent = button.parentElement;
        const newVariant = document.createElement('div');
        newVariant.innerHTML = `
            <input class="ansvar" type="text" placeholder="Введите ответ">
            <span class="correct-mark" onclick="markCorrect(this)">✓</span>
            <button class="ansb" onclick="removeAnswerVariant(this)">X</button>
        `;
        parent.insertBefore(newVariant, button);
}
    
function removeAnswerVariant(button) {
        button.parentElement.remove();
}
