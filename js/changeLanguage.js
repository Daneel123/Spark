$(document).ready(function() {
  $('#language-select').on('change', function() {
    changeLanguage($(this).val());
  });

  function changeLanguage(language) {
    switch (language) {
      case 'ru':
        $('h1').text('Spark');
        $('.first-div button').text('Начать');
        $('.second-div h3').text('Приветствуем вас на сайте Spark!');
        $('.second-div p:nth-of-type(1)').text('Верите ли вы, что образование может быть не только плодотворным, но и захватывающим?');
        $('.second-div p:nth-of-type(2)').text('Мы в Spark верим в это! Именно поэтому мы создали платформу, где вы можете создавать интерактивные задачи, превращая процесс обучения в увлекательное и эффективное приключение.');
        $('.second-div p:nth-of-type(3)').text('Spark - это больше, чем просто набор инструментов. Это сообщество единомышленников, разделяющих нашу страсть к обучению и развитию. Мы убеждены, что Spark станет вашим незаменимым помощником на пути к знаниям.');
        $('.second-div p:nth-of-type(4)').text('Присоединяйтесь к Spark сегодня и сделайте обучение незабываемым!');
        break;
      case 'kk':
        $('h1').text('Spark');
        $('.first-div button').text('Бастау');
        $('.second-div h3').text('Spark веб-сайтына қош келдіңіз!');
        $('.second-div p:nth-of-type(1)').text('Білім тек қана пайдалы емес, сонымен қатар қызықты болуы мүмкін екеніне сенесіз бе?');
        $('.second-div p:nth-of-type(2)').text('Біз Spark компаниясында бұған сенеміз! Сондықтан біз оқу процесін көңілді және тиімді шытырман оқиғаға айналдыра отырып, интерактивті тапсырмаларды құра алатын платформа жасадық.');
        $('.second-div p:nth-of-type(3)').text('Spark - бұл құралдар жиынтығы емес. Бұл біздің оқу мен дамуға деген құштарлығымызды бөлісетін пікірлес адамдар қауымдастығы. Біз Spark сіздің білім жолындағы таптырмас көмекшіңіз болатынына сенімдіміз.');
        $('.second-div p:nth-of-type(4)').text('Бүгін Spark-қа қосылыңыз және оқу тәжірибеңізді ұмытылмастай етіңіз!');
        break;
      default:
        $('h1').text('Spark');
        $('.first-div button').text('Start');
        $('.second-div h3').text('Welcome to Spark!');
        $('.second-div p:nth-of-type(1)').text('Do you believe that education can be not only productive but also exciting?');
        $('.second-div p:nth-of-type(2)').text('We in Spark believe in this! That’s why we created a platform where you can create interactive tasks, turning the learning process into an exciting and efficient adventure.');
        $('.second-div p:nth-of-type(3)').text('Spark is more than just a set of tools. It’s a community of like-minded people sharing our passion for learning and development. We are convinced that Spark will become your indispensable helper on your way to knowledge.');
        $('.second-div p:nth-of-type(4)').text('Join Spark today and make learning unforgettable!');
    }
  }
});