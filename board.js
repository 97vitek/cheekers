let table = document.createElement("table");// создаем таблицу в JS
let letters = ["A", "B", "C", "D", "E", "F", "G", "H"]// создаем массив с буквами

document.querySelector("div").appendChild(table);//ищем тег "div" и в него вставляем нашу таблицу
table.style.border = "1px solid black";

function createBord(){ 
    for(let line = 0; line < 10; line++) {//делаем цикл, создающий строки
        tr = document.createElement("tr"); // создаем строку в JS
        table.appendChild(tr);// кладем строку в таблицу

        for(column = 0; column < 10; column++) { // делаем цикл, создающий столбцы
            td = document.createElement("td"); //создаем столбец
            tr.appendChild(td);//кладем столбцы в каждую строку

            if(line == 0 || line == 9) { //выделяем последнюю и первую строки
                td.id = line.toString() + column.toString(); // присваиаем id
                td.style.border = ""; // убираем бордеры

                if (column > 0 && column < 9) { //выделяем нужные нам ячейки
                    td.innerText = letters[column-1]; // вставляем буковки сверху и снизу
                    td.className = "lastTr"; // присваиваем класс, чтоб было удобнее в css развернуть буковки
                }

                if(line == 0) {//выделяем первую строку
                    td.id = 0 + (9-line).toString();// присваиваем id
                    td.className = "firstTr";// присваиваем класс, чтоб было удобнее в css развернуть буковки
                }
            } 
            
            if (line > 0 && line < 9) { // конструкция для передвижения фигур (начало)
                // td.onclick= move 
            }// тут конец конструкции по передвжиению
            td.id = column.toString() + "_" + (9-line); //всем ячейкам присваиваем свой айди
            if(column == 0 || column == 9){ // выделяем последний и первый столбец
                td.style.border = "";// убираем бордеры
                td.id = 9 + "_" + (9-line).toString();//раскидываем айдишники
                if (line > 0 && line < 9) {// //выделяем нужные нам ячейки
                    td.innerText = 9-line; //закидваем цифры
                    td.className = "lastTd"// присваиваем класс, чтоб было удобнее в css развернуть циферки
                }
                if(column == 0) {//выделяем первую строку
                    td.id = 0 + "_" + (9-line).toString();// присваиваем id
                    td.className = "firstTd"// присваиваем класс, чтоб было удобнее в css развернуть циферки
                }
                if(column == 9) {//выделяем последнюю строку
                    td.className = "lastTd"// присваиваем класс, чтоб было удобнее в css развернуть циферки
                }
            }

            if (line > 0 && line < 9 && column > 0 && column < 9) {
                td.className = "game"
                if(line % 2) {
                        if (!(column % 2)) {
                        td.className += " grey";
                         }
                } else {
                        if ((column % 2)) {
                            td.className += " grey";
                         }
                    }
            }

            if ((line < 9  && column != 0 && column != 9 && line > 5) && td.className == "game grey") {
                td.innerHTML = "<div onfocus=\"step(event.target)\" id = \"figureW\" class = \"figureW \" tabindex = \"0\"></div>";
                figureW = td.innerHTML 
            } // заполняем Фигурами

            if((line > 0 && column != 0 && column != 9 && line < 4) && td.className == "game grey") {
                td.innerHTML = "<div onfocus=\"step(event.target)\" id = \"figureB\" class = \"figureB \" tabindex = \"0\"></div>";
                figureB =td.innerHTML 
            }// заполняем Фигурами
        }
    }

}
createBord();