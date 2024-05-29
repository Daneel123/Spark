document.addEventListener("DOMContentLoaded", function() {
  const saveButton = document.querySelector('button[onclick="saveData()"]');
  saveButton.onclick = saveData;
});

function saveData() {
  const data = {};
  const questionsContainer = document.getElementById('questions-container');
  const questions = questionsContainer.children;

  data.theme = document.getElementById('theme').value;

  data.questions = [];
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionData = {};

    questionData.text = question.querySelector('input#question-text').value;
    questionData.answers = [];
    const answerVariants = question.querySelectorAll('input[type="text"]');
    for (let j = 0; j < answerVariants.length; j++) {
      const answerVariant = answerVariants[j];
      const answerData = {};

      answerData.text = answerVariant.value;
      answerData.correct = answerVariant.nextElementSibling && answerVariant.nextElementSibling.classList.contains('correct');
      questionData.answers.push(answerData);
    }

    questionData.explanation = question.querySelector('input#explanation').value;
    questionData.media = [];
    const mediaContainer = question.querySelector('#media-container');
    const mediaElements = mediaContainer.children;
    for (let k = 0; k < mediaElements.length; k++) {
      const mediaElement = mediaElements[k];
      if (mediaElement.tagName === 'IMG' || mediaElement.tagName === 'VIDEO' || mediaElement.tagName === 'AUDIO') {
        questionData.media.push(mediaElement.src);
      }
    }

    data.questions.push(questionData);
  }

  const jsonData = JSON.stringify(data, null, 2);

  const newPage = createPage(data);

  function createPage(data) {
    const newPage = window.open("", "_blank");
    newPage.document.write(`
        <html>
            <head>
                <title>${data.theme}</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    .correct { color: green; }
                    .incorrect { color: red; }
                    .explanation { display: none; }
                </style>
            </head>
            <body>
                <header>
                    <h1>Spark</h1>
                    <div class="language-selector">
                        <select id="language-select">
                            <option value="ru">Русский</option>
                            <option value="kz">Қазақ тілі</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                </header>
                <h1>${data.theme}</h1>
                ${data.questions.map((question, index) => `
                    <div class="question" data-index="${index}">
                        <h2>Вопрос ${index + 1}</h2>
                        <p>${question.text}</p>
                        ${question.media.map(media => `<img src="${media}" alt="media">`).join('')}
                        <ul>
                            ${question.answers.map((answer, i) => `
                                <li>
                                    <input type="${question.answers.filter(a => a.correct).length > 1 ? 'checkbox' : 'radio'}" name="question${index}" value="${i}" id="q${index}a${i}">
                                    <label for="q${index}a${i}">${answer.text}</label>
                                </li>
                            `).join('')}
                        </ul>
                        <p class="explanation">Объяснение: ${question.explanation}</p>
                    </div>
                `).join('')}
                <button id="check-answers">Проверить</button>
                <p id="result-message" style="color:red; display:none;">Пожалуйста, ответьте на все вопросы.</p>
                <script>
                    document.getElementById('check-answers').addEventListener('click', function() {
                        const questions = document.querySelectorAll('.question');
                        let allAnswered = true;
                        
                        questions.forEach(question => {
                            const inputs = question.querySelectorAll('input');
                            const checkedInputs = Array.from(inputs).filter(input => input.checked);
                            
                            if (checkedInputs.length === 0) {
                                allAnswered = false;
                            }
                        });
                        
                        if (!allAnswered) {
                            document.getElementById('result-message').style.display = 'block';
                        } else {
                            document.getElementById('result-message').style.display = 'none';
                            questions.forEach(question => {
                                const inputs = question.querySelectorAll('input');
                                const checkedInputs = Array.from(inputs).filter(input => input.checked);
                                const answers = ${JSON.stringify(data.questions)}[question.dataset.index].answers;
                                
                                checkedInputs.forEach(input => {
                                    const answerIndex = input.value;
                                    const isCorrect = answers[answerIndex].correct;
                                    input.parentElement.className = isCorrect ? 'correct' : 'incorrect';
                                });
                                question.querySelector('.explanation').style.display = 'block';
                            });
                        }
                    });
                </script>
            </body>
        </html>    `);

    return newPage;
  }

  // Create a dialog element for the modal window
  const dialog = document.createElement('dialog');
  dialog.innerHTML += `<p>Ссылка на новую страницу: <a href="${newPage.location.href}" target="_blank">${newPage.location.href}</a></p>`;
  dialog.innerHTML += `<pre>${jsonData}</pre>`;
  dialog.style.width = '400px';
  dialog.style.height = '600px';

  // Add the dialog element to the document
  document.body.appendChild(dialog);

  // Show the dialog as a modal window
  dialog.showModal();

  // Print the URL of the new page to the console
  console.log(newPage.location.href);
}
