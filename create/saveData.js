document.addEventListener("DOMContentLoaded", function(){
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
  
  const baseURL = new URL(window.location.href).origin + new URL(window.location.href).pathname.split('/').slice(0, -1).join('/') + '/';
  const newPage = window.open(`${baseURL}${data.theme}`, "_blank");
  
  function createPage(data, baseURL) {
    const newPage = window.open(`${baseURL}${data.theme}`, "_blank");
    newPage.document.write(`
        <html>
            <head>
                <title>${data.theme}</title>
            </head>
            <body>
                <h1>${data.theme}</h1>
                ${data.questions.map((question, index) => `
                    <div>
                        <h2>Вопрос ${index + 1}</h2>
                        <p>${question.text}</p>
                        ${question.media.map(media => `<img src="${media}" alt="media">`).join('')}
                        <ul>
                            ${question.answers.map((answer, index) => `
                                <li>${answer.text} ${answer.correct ? '(правильный ответ)' : ''}</li>
                            `).join('')}
                        </ul>
                        <p>Объяснение: ${question.explanation}</p>
                    </div>
                `).join('')}
            </body>
        </html>
    `);

    return newPage;
}
   // Create a dialog element for the modal window
  const dialog = document.createElement('dialog');
  dialog.innerHTML += `<p>Ссылка на новую страницу: <a href="${newPage}" target="_blank">${newPage}</a></p>`;
  dialog.innerHTML += `<pre>${jsonData}</pre>`;
  dialog.style.width = '400px';
  dialog.style.height = '600px';

  // Add the dialog element to the document
  document.body.appendChild(dialog);

  // Show the dialog as a modal window
  dialog.showModal();

  // Create a new page with the data
  

  // Print the URL of the new page to the console
  console.log(newPage.location.href);
}
   
