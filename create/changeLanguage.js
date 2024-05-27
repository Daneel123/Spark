$(document).ready(function() {
  $('#language-select').on('change', function() {
    changeLanguage($(this).val());
  });

  function changeLanguage(language) {
    switch (language) {
      default:
        $('h1').text('Создание задач');
        $('header h1').text('Spark');
        $('#theme').attr('placeholder', 'Введите тему');
        $('.add').text('Добавить вопрос');
        $('.save').text('Сохранить');
        $('.question-text').attr('placeholder', 'Введите вопрос');
        $('.file-button').text('Выберите файл');
        $('.variant').text('Добавить вариант ответа');
        $('.explanation').attr('placeholder', 'Объяснение');
        $('.ansvar').attr('placeholder', 'Введите ответ');
        break;
      case 'kz':
        $('h1').text('Тапсырманы жасау');
        $('header h1').text('Spark');
        $('#theme').attr('placeholder', 'Тақырыпты жазыңыз');
        $('.add').text('Сұрақты қосыңыз');
        $('.save').text('Сақтау');
        $('.question-text').attr('placeholder', 'Сұрақты енгізіңіз');
        $('.file-button').text('Файлды таңдаңыз');
        $('.variant').text('Жауапты қосу');
        $('.explanation').attr('placeholder', 'Түсіндіру');
        $('.ansvar').attr('placeholder', 'Жауабты енгізіңіз');
        break;
      case 'en':
        $('h1').text('Creating tasks');
        $('header h1').text('Spark');
        $('#theme').attr('placeholder', 'Enter a subject');
        $('.add').text('Add a question');
        $('.save').text('Save');
        $('.question-text').attr('placeholder', 'Enter a question');
        $('.file-button').text('Choose file');
        $('.variant').text('Add an answer option');
        $('.explanation').attr('placeholder', 'Explanation');
        $('.ansvar').attr('placeholder', 'Enter answer');
    }
  }
});