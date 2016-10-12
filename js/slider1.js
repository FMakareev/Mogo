;(function() {
// получили в переменную контейнер слайдов
var slidContainer = document.getElementById('whatwedo__slider-list');
// переключатель вправо
var rightArrow = document.getElementById('whatwedo__arrow-right');
rightArrow.addEventListener("click", right);
// переключатель влево
var leftArrow = document.getElementById('whatwedo__arrow-left');
leftArrow.addEventListener("click", left);
// получаем ширину родителя, на её основе будет менятся позиционированиею
var widthItem = parseInt(getComputedStyle(slidContainer).width, 10);
// получаем позиционирование последнего элемента
var posLast = parseInt(getComputedStyle(slidContainer.lastElementChild).left, 10);

//функция листания вправо
function right(){
    // запрет переключения слайдов
    rightArrow.style.pointerEvents = 'none';
    leftArrow.style.pointerEvents = 'none';
    // получили обект с слайдами
    var sliderList = document.getElementById('whatwedo__slider-list').getElementsByClassName('whatwedo__slider-item');
console.log(sliderList[sliderList.length - 1])

    
    // сместили все слайды влево на widthItem
	for(var i = 0; i< sliderList.length; i++){
        // получаем текущее значение позиционирования элемента и преобразуем его к числу
		var currentPos = parseInt(getComputedStyle(sliderList[i]).left, 10);
        // устонавливаем новое позиционирование вычетая из текущего ширинуродителя
		sliderList[i].style.left = `${currentPos - widthItem}px`;		
	}
    // функция перемещает каждый первый элемент после сдвига всех элементов в конец
    function slideLast(){   
        // клонируем первый элемент
        var clonElem = sliderList[0].cloneNode(true);
        // устонавливаем позиционирование для добавления его в конец иначе он останется на прежнем месте
        clonElem.style.left = `${posLast}px`;
        // перемещаем в конец 
        slidContainer.appendChild(clonElem);
        // удоляем первый элемент
        var delElem = slidContainer.removeChild(sliderList[0]);
        // разрешаем переключение слайдов
        leftArrow.style.pointerEvents = 'auto';
        rightArrow.style.pointerEvents = 'auto';
    }       
    //ловит конец анимации транзишн и выполняет функцию
	sliderList[0].addEventListener("transitionend", slideLast);
}
//функция листания влево
function left(){   
    
    
    rightArrow.style.pointerEvents = 'none';
    leftArrow.style.pointerEvents = 'none';
    
    // получили обект с слайдами
    var sliderList = document.getElementById('whatwedo__slider-list').getElementsByClassName('whatwedo__slider-item');
    // сместили все слайды влево на widthItem
	for(var i = 0; i< sliderList.length; i++){
		var currentPos = parseInt(getComputedStyle(sliderList[i]).left, 10);
		sliderList[i].style.left = `${currentPos + widthItem}px`;		
	}
    function slideLast(){         
        var clonElem = sliderList[sliderList.length - 1].cloneNode(true);
        var delElem = slidContainer.removeChild(sliderList[sliderList.length - 1]);
        clonElem.style.left = `-${widthItem}px`;
        slidContainer.insertBefore(clonElem, slidContainer.firstChild);
        leftArrow.style.pointerEvents = 'auto';
        rightArrow.style.pointerEvents = 'auto';
    }       
	sliderList[sliderList.length - 1].addEventListener("transitionend", slideLast);
}
}());