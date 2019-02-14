/* 
  * Получение доступа к элементам:
    * Таблица
    * Обертка таблицы кроме первой строки
    * Блок обертка
    * Блок для ввода текста
    * Кнопка принять
    * Кнопка отмена
    * Обертка для checkBox
    * Обертка для кнопок
*/

var table = document.getElementById('t'),
    tbody = document.getElementById('tb'),
    elem = document.getElementById('elem'),
    div = document.getElementById('write'),
    ok = document.getElementById('ok'),
    cancel = document.getElementById('cancel'),
    boxs = document.getElementsByClassName('box'),
    wrap = document.getElementById('wrap');

/*  Иницализация переменных
    * Длина массива из json.jss
    * Половина экрана пользователя
    * Расположение дива для редактирования ячеек
    * Количество страниц 
    * переменная для обратной сортировки
    * Переменная для обратной сортировки
*/

var len = myJson.length ,
    screen = screen.width / 2,
    marginDiv = screen + 100;
    l = Math.ceil(len / 10),
    clickFinder = 0,
    pageHelper = 0;

var clickRepeat;



/*  Задаем нужные параметры стиля
    * Отступ для блока редактирования ячеек
    * Ширина в половину экрана пользователя
*/

elem.style.marginLeft = marginDiv + 'px';
table.style.width = screen + 'px';


createTable(4, 10, l);  // Вызываем функцию динамического создания таблицы
        

/*
    Функция динамического создания таблицы принимает 3 параметра:
    1 Число столбцов
    2 Число строк
    3 Количество страниц
    4

*/

function createTable(cels, rows, l){

  // Делим контент на l оберток по 10 строк в каждой
  for (var i = 0; i < l; i++){

    var tbody = document.createElement('tbody')           // Создаем обетрку для 10 строк
    tbody.id = 'tbody' + i;                               // Присваевам id
    tbody.className = 'tbody';                            // Добавляем в общий класс

    //Первую страницу делаем видимой  
    if(tbody.id == 'tbody0'){
      tbody.style.display = 'table-row-group';
    }

    // Добавляем строки в tbody                       
    for (var j = 0; j < rows; j++){
      var tr = document.createElement('tr');

      // Добвляем столбцы 
      for (var k = 0; k < cels; k++){
        var td = document.createElement('td');
        
        /*Определяем какой именное элемент из массива myJson нам нужно вывести
          Во всех tbody кроме первого складываем индекс страницы и индекс строки как строки
          Для первого же идексы оставим обычными
        */
        if (l > 0) {
          var index = parseInt(i.toString() + j.toString());
        } else index = k;


        if(k == 0){        
          td.innerHTML = myJson[index].name.firstName;   // firstName записываются в первый стобец
        }else if(k == 1){
          td.innerHTML = myJson[index].name.lastName;    // lastName записываются во второй стобец
        }else if(k == 2){
          td.innerHTML = myJson[index].about;            // about записываются в первый стобец
          td.className = 'abo';                          // Вспомогательный класс для обрезания текста

        } else{

          var color = myJson[index].eyeColor;            // Определение цвета
            
          td.style.color = 'transparent';                // Делаем тест прозрачным
          td.className = 'colors'                        // Ячейки не требующие редактирования


          //В зависимости от значения переменной color закрашиваем нужным цветом ячейку

          switch (color) {
            case 'red':
                td.style.backgroundColor = 'red';
              break;
              case 'green':
                td.style.backgroundColor = 'green';
              break;
              case 'brown':
                td.style.backgroundColor = 'brown';
              break;
              case 'blue':
                td.style.backgroundColor = 'blue';
              break;            
          }
           
          td.innerHTML = myJson[index].eyeColor;         // Выведем прозрачный текст для сортировки(можно было сделать с помощью классов, но мне лень)
        }
        tr.appendChild(td);
      }
      tbody.appendChild(tr);     
    }
    table.appendChild(tbody);
  }

  // Обрезание текста в стобце about
  var abo =  document.getElementsByClassName('abo'); // достаем td в столбце about

  for(var i = 0; i < 10; i++){
    cutTable(abo[i]);        
  }
} 

function cutTable(cel){

  // Сохраняем содержимое ячейки в text
  var text = cel.innerHTML; 
 

  /*
      Обрезаем символы и добавляем ... до тех пор, пока высота ячейки не будет 50 px
      для улучшения производительности обрезаем сразу по 5 символов
  */

  if (cel.clientHeight > 50){
    for(var l = text.length; cel.clientHeight > 50; l-=5){
      cel.innerHTML = text.substring(0, l) + '...';
    }            
  }
}


//Добавляем событие при нажатии на обертку кнопок 
wrap.addEventListener('click', turnPage);

function turnPage(e){

  var target = e.target; // Для удобства

  // Переменные для опрделения выводимого контента
  var len = 10;          
  var start = 0;

  /*При нажатии на одну из кнопок, определяем на какой из них произошел клик. Делаем 
    соответствующий этой кнопке tbody видимым, остольное же скрываем, попутно обрезая 
    содержимое столбца about
  */

  if(target.className == 'p'){
    
    // Получаем доступ к нужным нам элементам
    var num = target.getAttribute('number');
    var tbo = document.getElementsByClassName('tbody');
    var but = document.getElementsByClassName('p');

    for (var i = 0; i < tbo.length; i++){

      if (num == i){
        tbo[i].style.display = 'table-row-group';  // Делаем содержимое tbody видимым
        pageHelper = i;                            // Запоминаем индекс нужного tbody для сортировки 
        but[i].style.color = 'black';       

      } else {

        tbo[i].style.display = 'none';             // Не нужные tbody елаем невидимыми
        but[i].style.color = 'white';

      }
    }
    // Опредляем, с какой по какую строку нам нужно обрезать текст в about
    if(num != 0){
      len = num * 10 + 10;
      start = len - 10;
    } 
    
    // Обрезаем текст
    var abo =  document.getElementsByClassName('abo');
        for(var i = start; i < len; i++){
          cutTable(abo[i]);     
        }
  }

}


// Фунция определяет, где произошел клик

table.onclick = function(e){

  var target = e.target; // Для удобства инициализируем данную переменную

  // Если клик был на заголовке, вызываем сортировку

  if(target.nodeName == 'TH'){
    
    sortTable(target.cellIndex); 
    clickRepeat = target.cellIndex; // переменная нужная для проверки повторного нажатия на столбец
       
  }


  // Eсли клик был на обычной ячейке, вызываем редактирование 
  else if(target.nodeName == 'TD'){
    writeText(target);
  }
}


// Функция сортировки таблицы, принимает значения индекса td

function sortTable(index){

    var tbody = document.getElementsByClassName('tbody');  // Получаем массив tbody
    var MasRows = [].slice.call(tbody[pageHelper].rows);   // Копируем все строки из нужного tbody в MasRow   
    

    clickFinder++; // считаем клики

    // Функция вспомогательная в сортировке
    var compare = function(rowA, rowB){
      if(rowA.cells[index].innerHTML > rowB.cells[index].innerHTML) return 1;
      else if(rowA.cells[index].innerHTML < rowB.cells[index].innerHTML) return -1;
      else return 0;
    }
    
    MasRows.sort(compare);                                // Сортировка массива на основе функции compare
    console.log(clickFinder, clickRepeat);
    // При повторном клике на тот же столбец переворачиваем массив
    if (clickRepeat == index && clickFinder == 2){
      MasRows.reverse();
      clickFinder = 0;
    } else clickFinder = 1;

    // Заново заполняем таблицу уже отсортированным
    for (var i = 0; i < MasRows.length; i++){
      tbody[pageHelper].appendChild(MasRows[i]);
    }
  
}


// Функция редактирования ячеек, принимает значения ячейки, которую нужно редактировать

function writeText(td){

  var help = 0;                              // устранение ошибки, при повторном подтверждении ячейка становилась пустой

  // Ограничиваем 4 столбец
  if (td.className != 'colors'){

    div.innerHTML = td.innerHTML;            // Записываем в div содержимое выбранной ячейки
    div.contentEditable= 'true';             // Разрешаем редактировать текст в div
  }

    ok.onclick = function(){

      // Если клик уже был, а div пустой -> выход из функции
      if(help == 1 && div.innerHTML == '') return;
      else {
        
        td.innerHTML = div.innerHTML;        // записываем в ячейку содержание div     

        // Если клик был в столбце about, тогда нужно обрезать лишнее и добавить ...   
        cutTable(td);

        div.innerHTML = '';                  // Очищаем div
        div.contentEditable = 'false';       // Запрещаем редактирование текста внутри
        help++;                         
      }
 
    }

    cancel.onclick = function(){
      div.innerHTML = '';                    // Очищаем div
      div.contentEditable = 'false';         // Запрещаем редактирование текста внутри
    } 
 }


// Функция, прятающая нужный нам столбец
function hidde(ids) {
  for(var i = 1; i < len + 1; i++){
      table.rows[i].cells[ids].style.visibility = 'hidden';
  }   
}


// Функция, показывающая нужный нам столбец
function visible(ids) {
  for(var i = 1; i < len + 1; i++){
    table.rows[i].cells[ids].style.visibility = 'visible';
  }   
}


/*
    При клике определяем id checkBox и нажат ли он
    Если checkBox нажат, то прячем все ячейки соответствующего столбца и наоборот
*/

elem.onclick = function(e){

  target = e.target;

  if(target.id == '0' && boxs[0].checked != true){
    hidde(target.id);
  } else if(target.id == '1' && boxs[1].checked != true){
    hidde(target.id);
  } else if(target.id == '2' && boxs[2].checked != true){
    hidde(target.id);
  } else if(target.id == '3' && boxs[3].checked != true){
    hidde(target.id);
  } else if(target.id == '0' && boxs[0].checked != false){
    visible(target.id);
  } else if(target.id == '1' && boxs[1].checked != false){
    visible(target.id);
  } else if(target.id == '2' && boxs[2].checked != false){
    visible(target.id);
  } else if(target.id == '3' && boxs[3].checked != false){
    visible(target.id);
  }
}
