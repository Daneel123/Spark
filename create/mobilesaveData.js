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
                    @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@100..900&family=Fira+Sans+Condensed:wght@500&display=swap');

                    body {font-family: "Exo 2", sans-serif; color: #05386b; margin: 0; background-color: #5cdb95; display: flex; height: 100vh; flex-direction: column; justify-content: space-between;}
                    header {padding: 1% 0; display: flex; flex-direction: row; align-items: center; justify-content: space-between; text-align: center; width: 100%;}
                    footer {padding: 2% 0; text-align: center; font-weight: 700; position: relative; top: 150px; font-size: 175%;}
                    .img {height: 50%; position: absolute; z-index: -1; top: 10%; left: 15%;}
                    button {background-color: #05386b; color: #edf5e1; border: none; border-radius: 5px; cursor: pointer; font-size: 225%; padding: 2% 4%;}
                    button:hover {background-color: #379684;}
                    .conteiner {margin: 0 15%; background-color: white; text-align: center; padding: 4% 0;}
                    header h1 {margin: 0 10%; font-size: 400%;}
                    select{appearance: none; border: none; outline: none; background: none; font-size: 200%; font-weight: 700; padding: 20% 20%; color: #05386b; font-family: "Exo 2", sans-serif;}
                    select option:not(:checked) {color: #05386b; background-color: white;}
                    .language-selector {margin: 0 5%;}
                    option:checked {background-color: #05386b; color: #edf5e1;}
                    .conteiner h1 {margin: 0; font-size: 300%;}
                    h3 {margin-left: 20%; text-align: left; font-size: 2.5em;}
                    ul {list-style-type: none; padding: 0; font-size: 2.5em; margin-left: 20%; text-align: left;}
                    .correct {color: green;}
                    .incorrect {color: red;}
                    .explanation {display: none; color: darkgreen; font-size: 2.5em;}
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
                <div class="conteiner">
                   <h1>${data.theme}</h1>
                   ${data.questions.map((question, index) => `
                       <div class="question" data-index="${index}">
                           <h3>${index + 1}. ${question.text}</h3>
                           ${question.media.map(media => `<img style="max-width: 500px; max-height: 500px;" src="${media}" alt="media">`).join('')}
                           <ul>
                               ${question.answers.map((answer, i) => `
                                   <li>
                                       <input type="${question.answers.filter(a => a.correct).length > 1 ? 'checkbox' : 'radio'}" name="question${index}" value="${i}" id="q${index}a${i}">
                                       <label for="q${index}a${i}">${answer.text}</label>
                                   </li>
                               `).join('')}
                           </ul>
                           <h4 class="explanation">${question.explanation}</h4>
                       </div>
                   `).join('')}
                   <button id="check-answers">Проверить</button>
                   <p id="result-message" style="color:red; display:none;">Пожалуйста, ответьте на все вопросы.</p>
                </div>
                <img class="img" src="https://i.ibb.co.com/cNXD90C/background.png">
                <footer>
                   <p>&copy; 2024 Spark</p>
                </footer>
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

                    document.getElementById('language-select').addEventListener('change', function() {
                        changeLanguage(this.value);
                    });

                    function changeLanguage(language) {
                        const button = document.querySelector('button');
                        const resultMessage = document.getElementById('result-message');
                        switch (language) {
                            case 'kz':
                                button.textContent = 'Тексеру';
                                resultMessage.textContent = 'Барлық сұрақтарға жауап беріңіз.';
                                break;
                            case 'en':
                                button.textContent = 'Check Answers';
                                resultMessage.textContent = 'Please answer all questions.';
                                break;
                            default:
                                button.textContent = 'Проверить';
                                resultMessage.textContent = 'Пожалуйста, ответьте на все вопросы.';
                                break;
                        }
                    }
                </script>
            </body>
        </html>
    `);

    return newPage;
  }
  console.log(newPage.location.href);
}
