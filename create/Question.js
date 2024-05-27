function addQuestion() {
        const questionsContainer = document.getElementById('questions-container');
        const questionContainer = document.createElement('div');
        questionContainer.className = 'question-container';
        questionContainer.innerHTML = `
            <span class="delete-question" onclick="removeQuestion(this)">X</span>
            <div>
                <input class="question-text" type="question-text" id="question-text" placeholder="Введите вопрос">
            </div>
            <div style="padding: 4% 0;" class="file-input">
               <input type="file" id="media-file" onchange="loadMedia(this)">
               <div style="position: relative; bottom: 23px;">
                  <span class="file-button">Выберите файл</span>
               </div>
               <div id="media-container"></div>
            </div>
            
            <button class="variant" onclick="addAnswerVariant(this)">Добавить вариант ответа</button>
            
            <div style="margin: 3% 0;">
                <input class="explanation" type="explanation" id="explanation" placeholder="Объяснение">
            </div>
        `;
        questionsContainer.appendChild(questionContainer);
        answerCount = 0;    }

    function removeQuestion(element) {
        element.parentElement.remove();
    }

    function markCorrect(element) {
    const parent = element.parentElement;
    const inputs = parent.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type === 'text' && inputs[i].value.trim() !== '') {
            inputs[i].style.border = '';
        }
    }
    if (element.classList.contains('correct')) {
        element.previousElementSibling.style.border = '';
        element.classList.remove('correct');
    } else {
        element.previousElementSibling.style.border = '2px solid green';
        element.classList.add('correct');
      }
    }
