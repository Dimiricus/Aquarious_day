/*----------Нулевой канвас: фон-------------------------*/
var canv_0 = document.getElementById('canv_0');
var canvas_0 = canv_0.getContext('2d');
var milk_way = document.getElementById('milk_way');
/*------------------------------------------------------*/
/*----------Первый канвас: комната----------------------*/
var canv = document.getElementById('canv');
var canvas = canv.getContext('2d');
var img = document.getElementById('image');
var room_dark = document.getElementById('room_dark');
var astral_room = document.getElementById('astral_room');
/*----------------------------------------------*/
/*-----------Второй канвас: маятник----------------------*/
var canv_2 = document.getElementById('canv_2');
var canvas_2 = canv_2.getContext('2d');
var pendulum_dark = document.getElementById('37-79_dark');
var pendulum = document.getElementById('37-79');
/*----------------------------------------------*/
/*----------Третий канвас: врач-----------------------*/
var canv_3 = document.getElementById('canv_3');
var canvas_3 = canv_3.getContext('2d');
var psih_write = document.getElementById('psih_write');
var psih_gives = document.getElementById('psih_gives');
var psih_dark = document.getElementById('psih_dark');
var track = document.getElementById('track');
/*----------------------------------------------*/
/*-----------Четвёртый канвас: главный герой-------------------*/
var canv_4 = document.getElementById('canv_4');
var canvas_4 = canv_4.getContext('2d');
var extr = document.getElementById('extr');
var extr_sit = document.getElementById('extr_sit');
var extr_take_img = document.getElementById('extr_take');
var extr_sit_astral = document.getElementById('extr_sit_astral');
var sit_stay_astral = document.getElementById('sit_stay_astral');
var thing = document.getElementById('thing');
var devushka = document.getElementById('devushka');
var answer_0 = document.getElementById('answer_0');
var sit_stay = document.getElementById('sit_stay');
/*----------------------------------------------*/
/*-----------Канвас диалога---------------------*/
var border_1 = document.getElementById('border_1');
var magic_hand = document.getElementById('magic_hand');
var magic_hand_off = document.getElementById('magic_hand_off');
var exit_hand = document.getElementById('exit_hand');
var calendar_inv = document.getElementById('calendar_inv');
var magnifier = document.getElementById('magnifier');
var magnifier_hover = document.getElementById('magnifier_hover');
var envelope_ing = document.getElementById('envelope_inv');
var touch_dark = document.getElementById('touch_dark');
var touch = document.getElementById('touch'); // КАРТИНКА С ВОЛШЕБНОЙ РУКОЙ
var touch_hover = document.getElementById('touch_hover'); // КАРТИНКА С ХОВЕРОМ
var tel = document.getElementById('telep');

var canv_text = document.getElementById('canv_text');
var c_text = canv_text.getContext('2d');
c_text.font =  "normal 14px 'Press Start 2P'";
//c_text.font = "normal 14px 'Terminal Regular'";
c_text.textAlign = "left";
             // ОПРЕДЕЛЯЕМ КООРДИНАТЫ КУРСОРА НА ТЕКСТОВОМ КАНВАСЕ
var inp_text = document.getElementById('text_coord');	 
var text_x = canv_text.getBoundingClientRect().left;
var text_y = canv_text.getBoundingClientRect().top;
var c_textX;
var c_textY;
function text_coord(event) {
	event = event || window.event;
	//c_textX = event.clientX - text_x;
	c_textX = event.offsetX;
	c_textY = event.offsetY;
	c_textX = c_textX.toFixed();
	c_textY = c_textY.toFixed();
	//c_textY = event.clientY - text_y;
	inp_text.value = c_textX +':'+ c_textY;
}
canv_text.addEventListener('mousemove', text_coord); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/*----------------------------------------------*/
/*----------Объявление переменных---------------*/
var clock = document.getElementById('clock'); // АУДИО ФАЙЛ СО ЗВУКОМ ТИКАНЬЯ ЧАСОВ
var env_open = document.getElementById('envelope_open');
var track_audio = document.getElementById('track_audio'); //ТРЭК ВО ВРЕМЯ ПУТИ
var F_pendulum; // ФУНКЦИЯ ДВИЖЕНИЯ МАЯТНИКА
var shift = 50; // ИЗНАЧАЛЬНОЕ ПОЛОЖЕНИЕ КОМНАТЫ
var C_1 = 200 - shift; // СДВИГ КОМНАТЫ
var C_2 = 64 + shift; // СДВИГ МАЯТНИКА
var C_3 = 410 + shift; // СДВИГ ПСИХОЛОГА
var i = 0; // МНОЖИТЕЛЬ ДЛЯ СПРАЙТА МАЯТНИКА
var coord_psih = 0; // МНОЖИТЕЛЬ ДЛЯ СПРАЙТА ПСИХОЛОГА
var coord_extr = 0; // МНОЖИТЕЛЬ ДЛЯ СПРАЙТА ГЛ ГЕРОЯ
var x = 350; // МЕСТО ПОЯВЛЕНИЯ ГЛ ГЕРОЯ ПО X
var y = 35; // МЕСТО ПОЯВЛЕНИЯ ГЛ ГЕРОЯ ПО Y
var clickMouseX = canv_4.getBoundingClientRect().left; // ДЛЯ РАСЧЁТА КООРДИНАТ КЛИКА НА canvas_4 НЕ ЗАВИСИМО ОТ ВСЕГО ОКНА
var clickMouseY = canv_4.getBoundingClientRect().top; // ДЛЯ РАСЧЁТА КООРДИНАТ КЛИКА НА canvas_4 НЕ ЗАВИСИМО ОТ ВСЕГО ОКНА
var Cl_1; // МЕСТО КЛИКА ПО X 
var Cl_2; // МЕСТО КЛИКА ПО Y
var interval_4x; // ИМЯ ИНТЕРВАЛА ДЛЯ ПЕРЕДВИЖЕНИЯ ВПРАВО И ВЛЕВО ПО X
var interval_4y; // ИМЯ ИНТЕРВАЛА ДЛЯ ПЕРЕДВИЖЕНИЯ ВПРЕВО И ВЛЕВО ПО Y
var divider; // ШАГ ДЛЯ СДВИГА ГЛ ГЕРОЯ ПО ОСИ X
var dividend; // ШАГ ДЛЯ СДВИГА ГЛ ГЕРОЯ ПО ОСИ Y
var distance_x; // РАССТОЯНИЕ ОТ МЕСТОНАХОЖДЕНИЯ НОГ ГЛ ГЕРОЯ ДО МЕСТА КЛИКА ПО X
var distance_y; // РАССТОЯНИЕ ОТ МЕСТОНАХОЖДЕНИЯ НОГ ГЛ ГЕРОЯ ДО МЕСТА КЛИКА ПО Y
var sp;
var true_x; // ЗНАЧЕНИЕ ДЛЯ ЗАХВАТА МОМЕНТА ДОСТИЖЕНИЯ ГЛ ГЕРОЕМ МЕСТА КЛИКА; МОЖНО УВЕЛИЧИВАТЬ ДЛЯ ЛИКВИДАЦИИ ПОГРЕШНОСТИ
var true_y; // ЗНАЧЕНИЕ ДЛЯ ЗАХВАТА МОМЕНТА ДОСТИЖЕНИЯ ГЛ ГЕРОЕМ МЕСТА КЛИКА; МОЖНО УВЕЛИЧИВАТЬ ДЛЯ ЛИКВИДАЦИИ ПОГРЕШНОСТИ
var distance_rolls; // ПРЯМАЯ ДИСТАНЦИЯ ПО ПИФОГОРУ
var endSpeed = 2.5; // СКОРОСТЬ ПЕРЕДВИЖЕНИЯ ПЕРСОНАЖА
var counter = 0; // ШАГ, ЧЕРЕЗ КОТОРЫЙ СОВЕРШАЕТСЯ ЗАМЕНА КАРТИНКИ СПРАЙТА; КАЖДУЮ ИТЕРАЦИЮ УВЕЛИЧИВАЕТСЯ НА 1
var z_step = 6; 	// ЧАСТОТА ПЕРЕКЛЮЧЕНИЯ КАРТИНКИ СПРАЙТА ГЛ ГЕРОЯ; УСЛОВИЕ ПЕРЕКЛЮЧЕНИЯ ЭТО КРАТНОСТЬ counter
var interval_shift_right; // ИНТЕРВАЛ СДВИГАЮЩИЙ КОМНАТУ ВПРАВО (setInterval)
var interval_shift_left; // ИНТЕРВАЛ СДВИГАЮЩИЙ КОМНАТУ ВЛЕВО (setInterval)
var speak_psih_interval; // ИМЯ ИНТЕРВАЛА ДЛЯ ГОВОРЯЩЕГО ПСИХОЛОГА
var speak_extr_interval; // ИМЯ ИНТЕРВАЛА ДЛЯ ГОВОРЯЩЕГО ГЛ ГЕРОЯ
var interval_currentTime; // ИНТЕРВАЛ ЗВУКА МАЯТНИКА
var interval_pendulum; // ИНТЕРВАЛ МАЯТНИКА
var dark_interval; // ИНТЕРВАЛ ЗАТЕМНЕНИЯ КОМНАТЫ
var interval_track_move; // ИНТЕРВАЛ ПРИЗРАКОВ-СЛЕДОВ
var flicker_interval; //  ИНТЕРВАЛ АСТРАЛЬНОГО МЕРЦАНИЯ
/*--------------------------------------------------------------------------------*/
/*--------------------------ПЕРЕМЕННЫЕ ДЛЯ ДИАЛОГА--------------------------------*/

var arr_phrase = []; // МАССИВ С ФРАЗАМИ

 var maxWidth = 680; // ПЕРЕМЕННЫЕ ДЛЯ ФУНКЦИИ ВЫВОДА МНОГОСТРОЧНОГО ТЕКСТА wrapText
 var lineHeight = 25;
 var marginLeft = 20;
 var marginTop = 30;
 var context = c_text;
/*--------------------------------------------------------------------------------*/
/*--------------------------ПОЛУЧЕНИЕ РАНДОМНЫХ ЧИСЕЛ-------------------------------------*/
function getRand(min, max)
{
  return ((Math.random() * (max - min) + min).toFixed(4)) * 1;
}
/*----------------------------------------------------------------------------------------
/*-Выводим координаты курсора на канве------------------------------*/

	var inp = document.getElementById('coord'); //
	var left = canv_4.getBoundingClientRect().left;  
	var up = canv_4.getBoundingClientRect().top;
	var position_4X;
	var position_4Y;
	function coordinate(event) {
		event = event || window.event;
		position_4X = event.offsetX;
		position_4Y = event.offsetY;
		position_4X = position_4X.toFixed();
		position_4Y = position_4Y.toFixed();
		inp.value = position_4X + ':' + position_4Y ;
	};   
	canv_4.addEventListener('mousemove', coordinate);// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/*------------------------------------------------------------------*/	
/*----------------------ФОНОВЫЙ КАНВАС------------------------------*/
var milk = {
	rand_interval : 0,
	milk_interval : 0,
	x_milk : 50,
	y_milk : 200,
	milk_stop : function() {
		clearInterval(milk.rand_interval);
		clearInterval(milk.milk_interval);
		canvas_0.clearRect(0, 0, milk_way.width, milk_way.height);
	},
	milk_draw : function(x, y) {
		canvas_0.clearRect(0, 0, milk_way.width, milk_way.height);
		canvas_0.drawImage(milk_way, x, y, milk_way.width, milk_way.height, 0, 0, milk_way.width * 1, milk_way.height * 1);
	},
	milk_change : function(a, b) {
			milk.milk_interval = setInterval(function() {
				milk.milk_draw(milk.x_milk, milk.y_milk);
				
				if(milk.x_milk != a && milk.x_milk < 700 && milk.x_milk > 10) {
					milk.x_milk += a;
					if(milk.y_milk != b && milk.y_milk < 425 && milk.y_milk > 10) {
						milk.y_milk += b;
					}
					else { 
						milk.y_milk -= b; 
					}
				}
				else { 
					milk.x_milk -= a; 
				}
			}, 10);
	},
	milk_rand : function() {
		milk.rand_interval = setInterval(function() {
			clearInterval(milk.milk_interval);
			var x_pos = getRand(-.025, .025);
			var y_pos = getRand(-.025, .025);
			milk.milk_change(x_pos, y_pos);
		}, 10000);
	}
}
/*------------------------------------------------------------------*/
/*----------------------ОБЪЕКТ КУРСОРА------------------------------*/
var cursor_obj = {
	cursor_state : 'standart',
	stand_curs : function(stage) {
		canv_4.style.cursor = 'url(image/hands/hand.png), pointer';
		canv_text.style.cursor = 'url(image/hands/hand.png), pointer';
		if(stage == 0) {
			this.cursor_state = 'standart';
		}
		else if(stage == 1) {
			this.cursor_state = 'standart_1';
		}
		else if(stage == 2) {
			this.cursor_state = 'astral';
		}
		else if(stage == 3) {
			this.cursor_state = 'entrance';
		}
	},
	take_curs : function() {
		canv_4.style.cursor = 'url(image/hands/hand_take.png), pointer';
		canv_text.style.cursor = 'url(image/hands/hand_take.png), pointer';
	},
	magnifier_curs : function(stage) {
		canv_4.style.cursor = 'url(image/hands/magnifier_cursor.png), pointer';
		canv_text.style.cursor = 'url(image/hands/magnifier_cursor.png), pointer';
		if(stage == 0) {
			this.cursor_state = 'magnifier';
		}
		else if(stage == 1) {
			this.cursor_state = 'magnifier_1';
		}
		else if(stage == 2) {
			this.cursor_state = 'magnifier_2';
		}
		else if(stage == 3) {
			this.cursor_state = 'magnifier_entrance';
		}
	},
	magnifier_above : function() {
		canv_4.style.cursor = 'url(image/hands/magnifier_cursor_above.png), pointer';
		canv_text.style.cursor = 'url(image/hands/magnifier_cursor_above.png), pointer';
	},
	envelope_curs : function() {
		canv_4.style.cursor = 'url(image/hands/envelope_curs.png), pointer';
		canv_text.style.cursor = 'url(image/hands/envelope_curs.png), pointer';
		this.cursor_state = 'envelope';
	},
	envelope_curs_above : function() {
		canv_4.style.cursor = 'url(image/hands/envelope_curs_above.png), pointer';
		canv_text.style.cursor = 'url(image/hands/envelope_curs_above.png), pointer';
	},
	calendar_curs : function() {
		cursor_obj.cursor_state = 'calendar';
		canv_4.style.cursor = 'url(image/hands/calendar_curs.png), pointer';
		canv_text.style.cursor = 'url(image/hands/calendar_curs.png), pointer';
	},
	calendar_curs_above : function() {
		canv_4.style.cursor = 'url(image/hands/calendar_curs_above.png), pointer';
		canv_text.style.cursor = 'url(image/hands/calendar_curs_above.png), pointer';
	},
	magic_hand_curs : function() {
		cursor_obj.cursor_state = 'magic_hand';
		canv_4.style.cursor = 'url(image/hands/magic_hand_curs.png), pointer';
		canv_text.style.cursor = 'url(image/hands/magic_hand_curs.png), pointer';
	},
	magic_hand_curs_above : function() {
		canv_4.style.cursor = 'url(image/hands/magic_hand_curs_above.png), pointer';
		canv_text.style.cursor = 'url(image/hands/magic_hand_curs_above.png), pointer';
	},
	controller_curs : function() { //КОНТРОЛЛЕР КУРСОРА И СОБЫТИЙ
		switch(this.cursor_state) {
			case 'astral' :
				console.log(cursor_obj.cursor_state);
				canv_text.removeEventListener('mousemove',o_magic_hand_off.exit_hand_hover);
				canv_text.removeEventListener('mousedown', entrance_exit);
				canv_text.addEventListener('mousemove', o_magnifier.magnifier_hover);
				canv_text.addEventListener('mousemove', o_magic_hand_off.magic_off_hover);
				canv_text.addEventListener('mousemove', teleport.teleport_hover);
			break;
			case 'nitral_astral' :
				console.log(cursor_obj.cursor_state);
				canv_text.style.cursor = 'url(image/hands/hand.png), pointer';
				canv_4.style.cursor = 'url(image/hands/hand.png), pointer';
				canv_text.removeEventListener('mousemove', o_magnifier.magnifier_hover);
				canv_text.removeEventListener('mousemove', o_magic_hand_off.magic_off_hover);
			break;
			case 'nitral' :
				console.log(cursor_obj.cursor_state);
				canv_text.removeEventListener('mousemove', o_magic_hand_off.magic_off_hover);
				canv_text.removeEventListener('mousedown', o_trace_mode.exit);
				canv_text.removeEventListener('mousemove', o_magic_hand.m_hand_hover);
				canv_text.removeEventListener('mousemove', o_calendar.calendar_hover);
				canv_text.removeEventListener('mousedown', o_calendar.information);
				canv_text.removeEventListener('mausemove', o_magnifier.magnifier_hover);
				canv_text.removeEventListener('mousedown', o_calendar.magic_path);
				canv_4.removeEventListener('mousedown', this.refresh_curs);
				canv_text.removeEventListener('mousedown', this.refresh_curs);
				canv_text.removeEventListener('mousedown', o_magnifier.magnifier_click);
				canv_text.removeEventListener('mausemove', o_envelope.envelope_hover);
				canv_text.removeEventListener('mousedown', o_envelope.envelope_click);
				canv_4.style.cursor = 'url(image/hands/hand.png), pointer';
				canv_text.style.cursor = 'url(image/hands/hand.png), pointer';
			break;
			case 'standart' :
				canv_4.removeEventListener('mousedown', this.refresh_curs);
				canv_text.removeEventListener('mousedown', this.refresh_curs);
				canv_text.addEventListener('mousemove', o_magnifier.magnifier_hover);
				canv_text.addEventListener('mousemove', o_envelope.envelope_hover);
				console.log(cursor_obj.cursor_state);
			break;
			case 'standart_1' :
				console.log(cursor_obj.cursor_state);
				canv_4.removeEventListener('mousedown', this.refresh_curs);
				canv_text.removeEventListener('mousedown', this.refresh_curs);
				canv_text.addEventListener('mousemove', o_magnifier.magnifier_hover);
				canv_text.addEventListener('mousemove', o_magic_hand.m_hand_hover);
				canv_text.addEventListener('mousemove', o_calendar.calendar_hover);
			break;
			case 'magnifier' :
				canv_text.removeEventListener('mousemove', o_magnifier.magnifier_hover);
				canv_text.removeEventListener('mousedown', o_magnifier.magnifier_click);
				canv_4.addEventListener('mousedown', this.refresh_curs);
				canv_text.addEventListener('mousedown', this.refresh_curs);
				canv_text.addEventListener('mousemove', o_envelope.envelope_hover);
				console.log(cursor_obj.cursor_state);
			break;
			case 'magnifier_1' :
				console.log(cursor_obj.cursor_state);
				canv_text.removeEventListener('mousemove', o_magnifier.magnifier_hover);
				canv_text.removeEventListener('mousedown', o_magnifier.magnifier_click);
				canv_text.addEventListener('mousedown', this.refresh_curs);
				canv_4.addEventListener('mousedown', this.refresh_curs);
				canv_text.addEventListener('mousemove', o_calendar.calendar_hover);
				canv_text.addEventListener('mousemove', o_magic_hand.m_hand_hover);
			break;
			case 'magnifier_2' :
				console.log(cursor_obj.cursor_state);
				canv_text.removeEventListener('mousedown', o_magnifier.magnifier_click);
				canv_text.removeEventListener('mousemove', o_magnifier.magnifier_hover);
				canv_text.removeEventListener('mousemove', o_magic_hand_off.magic_off_hover);
				canv_text.addEventListener('mousedown', this.refresh_curs);
				canv_4.addEventListener('mousedown', this.refresh_curs);
				canv_text.addEventListener('mousemove', teleport.teleport_hover);
			break;
			case 'magnifier_entrance' :
				console.log(cursor_obj.cursor_state);
				canv_text.removeEventListener('mousedown', o_magnifier.magnifier_click);
				canv_text.removeEventListener('mousemove', o_magnifier.magnifier_hover);
				canv_4.addEventListener('mousedown', this.refresh_curs);
				canv_text.addEventListener('mousedown', this.refresh_curs);
			break;
			case 'envelope' :
				canv_text.removeEventListener('mousemove', o_envelope.envelope_hover);
				canv_text.removeEventListener('mousedown', o_envelope.envelope_click);
				canv_4.addEventListener('mousedown', this.refresh_curs);
				canv_text.addEventListener('mousedown', this.refresh_curs);
				canv_text.addEventListener('mousemove', o_magnifier.magnifier_hover);
				console.log(cursor_obj.cursor_state);
			break;
			case 'calendar' :
				console.log(cursor_obj.cursor_state);
				canv_text.removeEventListener('mousemove', o_calendar.calendar_hover);
				canv_text.removeEventListener('mousedown', o_calendar.calendar_click);
				canv_4.addEventListener('mousedown', this.refresh_curs);
				canv_text.addEventListener('mousedown', this.refresh_curs);
				canv_text.addEventListener('mousemove', o_magnifier.magnifier_hover);
				canv_text.addEventListener('mousemove', o_magic_hand.m_hand_hover);
			break;
			case 'magic_hand' :
				console.log(cursor_obj.cursor_state);
				canv_text.removeEventListener('mousemove', o_magic_hand.m_hand_hover);
				canv_text.removeEventListener('mousedown', o_magic_hand.m_hand_click);
				canv_4.addEventListener('mousedown', this.refresh_curs);
				canv_text.addEventListener('mousedown', this.refresh_curs);
				canv_text.addEventListener('mousemove', o_calendar.calendar_hover);
				canv_text.addEventListener('mousemove', o_magnifier.magnifier_hover);
			break;
			case 'entrance' :                                                            // ПЕРЕХОД В АСТРАЛ
				console.log(cursor_obj.cursor_state);
				//canv_text.style.cursor = 'url(image/hands/hand.png), pointer';
				//canv_4.style.cursor = 'url(image/hands/hand.png), pointer';
				canv_text.removeEventListener('mousemove', o_magic_hand_off.magic_off_hover);
				canv_text.removeEventListener('mousedown', o_magic_hand.m_hand_click);
				canv_text.removeEventListener('mousemove', teleport.teleport_hover);
				canv_text.removeEventListener('mousedown', teleport.teleportation);
				canv_text.addEventListener('mousemove', o_magnifier.magnifier_hover);
				canv_text.addEventListener('mousemove',o_magic_hand_off.exit_hand_hover);
			break;
		}
	},
	refresh_curs : function() {
		if(cursor_obj.cursor_state == 'standart' || cursor_obj.cursor_state == 'magnifier' || cursor_obj.cursor_state == 'envelope') {
			console.log('refresh');
			canv_4.removeEventListener('mousedown', this.refresh_curs);
			canv_text.removeEventListener('mousedown', this.refresh_curs);
			canv_text.removeEventListener('mausemove', o_magnifier.magnifier_hover);
			canv_text.removeEventListener('mousedown', o_magnifier.magnifier_click);
			canv_text.removeEventListener('mausemove', o_envelope.envelope_hover);
			canv_text.removeEventListener('mousedown', o_envelope.envelope_click);
			cursor_obj.stand_curs(0);
			cursor_obj.controller_curs();
		}
		else if(cursor_obj.cursor_state == 'standart_1' || cursor_obj.cursor_state == 'magnifier_1' || cursor_obj.cursor_state == 'calendar' || cursor_obj.cursor_state == 'magic_hand') {
			console.log('refresh_1');
			canv_text.removeEventListener('mousedown', this.refresh_curs);
			canv_text.removeEventListener('mousemove', o_calendar.calendar_hover);
			canv_text.removeEventListener('mousemove', o_magnifier.magnifier_hover);
			canv_text.removeEventListener('mousemove', o_magic_hand.m_hand_hover);
			canv_4.removeEventListener('mousedown', this.refresh_curs);
			cursor_obj.stand_curs(1);
			cursor_obj.controller_curs();
		}
		else if(cursor_obj.cursor_state == 'magnifier_2') {
			console.log('refresh_2');
			canv_text.removeEventListener('mousedown', this.refresh_curs);
			canv_4.removeEventListener('mousedown', this.refresh_curs);
			cursor_obj.stand_curs(2);
			cursor_obj.controller_curs();
		}
		else if(cursor_obj.cursor_state == 'magnifier_entrance') {
			console.log('refresh_entrance');
			canv_text.removeEventListener('mousedown', this.refresh_curs);
			canv_4.removeEventListener('mousedown', this.refresh_curs);
			cursor_obj.stand_curs(3);
			cursor_obj.controller_curs();
		}
	}
}

var bord = {
	draw : function() {
		c_text.drawImage(border_1, 0, 0, 700, 120);
	}
}
/*------------------------------------------------------------------*/
var o_envelope = {   //  КОНВЕРТ
	envelope_hover : function() {
		if(cursor_obj.cursor_state == 'standart') {  // ЕСЛИ КУРСОР НАД КОНВЕРТОМ
			if(c_textX >= 235 && c_textX <= 300 && c_textY >= 20 && c_textY <= 85) {
				cursor_obj.take_curs();
				canv_text.addEventListener('mousedown', o_envelope.envelope_click);
			}
			else {
				canv_text.removeEventListener('mousemove', o_envelope.envelope_hover);
				canv_text.removeEventListener('mousedown', o_envelope.envelope_click);
				canv_text.addEventListener('mousemove', o_magnifier.magnifier_hover);
				cursor_obj.stand_curs(0);
			}
		}
		else if(cursor_obj.cursor_state == 'magnifier') {  // ЕСЛИ ЛУПА НАД КОНВЕРТОМ
		//canv_text.removeEventListener('mousedown', o_envelope.envelope_click);
			if(c_textX >= 235 && c_textX <= 300 && c_textY >= 20 && c_textY <= 85) {
				cursor_obj.magnifier_above();
				canv_text.addEventListener('click', o_envelope.information);
			}
			else {
				cursor_obj.magnifier_curs(0);
				canv_text.removeEventListener('click', o_envelope.information);
			}
		}
	},
	envelope_draw : function() {
		c_text.drawImage(envelope_inv, 250, 27, 48, 60);
	},
	envelope_click : function() {
		cursor_obj.envelope_curs();
		cursor_obj.controller_curs();
	},
	information : function() {
		//cursor_obj.refresh_curs();
		canv_text.removeEventListener('click', o_envelope.information);
		inventory.inventory_refresh();
	},
	envelope_open : function() {
		canv_text.removeEventListener('click', o_envelope.envelope_open);
		canv_4.removeEventListener('click', o_envelope.envelope_open);
		c_text.clearRect(0, 0, 700, 120);
		setTimeout(function() {
			env_open.volume = .5;
			env_open.currentTime = .7;
			env_open.play();
		}, 250);
		setTimeout(function() {
			wrapText(context, o_calendar.description_when_open, marginLeft, marginTop, maxWidth, lineHeight);
			canv_4.addEventListener('click', inventory.inventory_on_two);
			canv_text.addEventListener('click', inventory.inventory_on_two);
			env_open.pause();
		}, 1000);
	},
	description : 'Конверт из плотной бумаги с надписью "конфиденциально". Внутри находится плоский предмет. Конверт запечатан воском.'
}

var o_magnifier = {   // ЛУПА
	magnifier_hover : function() {  //  ЕСЛИ КУРСОР НАД ЛУПОЙ
		if(cursor_obj.cursor_state == 'standart') {
			if(c_textX >= 20 && c_textX <= 90 && c_textY >= 25 && c_textY <= 85) {
				cursor_obj.take_curs();
				canv_text.addEventListener('mousedown', o_magnifier.magnifier_click);
			}
			else {
				canv_text.removeEventListener('mousemove', o_magnifier.magnifier_hover);
				canv_text.addEventListener('mousemove', o_envelope.envelope_hover);
				canv_text.removeEventListener('mousedown', o_magnifier.magnifier_click);
				cursor_obj.stand_curs(0);
			}
		}
		else if(cursor_obj.cursor_state == 'envelope') {  // ЕСЛИ КОНВЕРТ НАД ЛУПОЙ
		//canv_text.removeEventListener('mousedown', o_magnifier.magnifier_click);
			if(c_textX >= 20 && c_textX <= 90 && c_textY >= 25 && c_textY <= 85) {
				cursor_obj.envelope_curs_above();
				canv_text.addEventListener('click', o_envelope.information);
			}
			else {
				cursor_obj.envelope_curs();
				canv_text.removeEventListener('click', o_envelope.information);
			}
		}
		else if(cursor_obj.cursor_state == 'standart_1') {
			if(c_textX >= 20 && c_textX <= 90 && c_textY >= 25 && c_textY <= 85) {
				cursor_obj.take_curs();
				canv_text.removeEventListener('mousemove', o_calendar.calendar_hover);
				canv_text.removeEventListener('mousemove', o_magic_hand.m_hand_hover);
				canv_text.addEventListener('mousedown', o_magnifier.magnifier_click);
			}
			else {
				canv_text.removeEventListener('mousemove', o_magnifier.magnifier_hover);
				canv_text.removeEventListener('mousedown', o_magnifier.magnifier_click);
				canv_text.addEventListener('mousemove', o_calendar.calendar_hover);
				canv_text.addEventListener('mousemove', o_magic_hand.m_hand_hover);
				cursor_obj.stand_curs(1);
			}
		}
		else if(cursor_obj.cursor_state == 'calendar') { // ЕСЛИ ЗАПИСНАЯ КНИЖКА НАД ЛУПОЙ
			if(c_textX >= 20 && c_textX <= 90 && c_textY >= 25 && c_textY <= 85) {
				console.log('calendar_above_on');
				cursor_obj.calendar_curs_above();
				canv_text.addEventListener('mousedown', o_calendar.information);
			}
			else {
				//canv_text.removeEventListener('mousemove', o_magnifier.magnifier_hover);
				canv_text.removeEventListener('mousedown', o_calendar.information);
				canv_text.addEventListener('mousemove', o_calendar.calendar_hover);
				canv_text.addEventListener('mousemove', o_magic_hand.m_hand_hover);
				cursor_obj.calendar_curs();
			}
		}
		else if(cursor_obj.cursor_state == 'magic_hand') {  //  ЕСЛИ ВОЛШЕБНАЯ РУКА НАД ЛУПОЙ
			if(c_textX >= 20 && c_textX <= 90 && c_textY >= 25 && c_textY <= 85) {
				cursor_obj.magic_hand_curs_above();
				canv_text.addEventListener('click', o_magic_hand.information);
			}
			else {
				canv_text.removeEventListener('click', o_magic_hand.information);
				cursor_obj.magic_hand_curs;
			}
		}
		else if(cursor_obj.cursor_state == 'astral') {  // ЕСЛИ В АСТРАЛЕ НАД ЛУПОЙ
			if(c_textX >= 20 && c_textX <= 90 && c_textY >= 25 && c_textY <= 85) {
				cursor_obj.take_curs();
				canv_text.addEventListener('mousedown', o_magnifier.magnifier_click);
				canv_text.removeEventListener('mousemove', o_magic_hand_off.magic_off_hover);
			} 
			else {
				canv_text.removeEventListener('mousedown', o_magnifier.magnifier_click);
				canv_text.addEventListener('mousemove', o_magic_hand_off.magic_off_hover);
			}
		}
		else if(cursor_obj.cursor_state == 'entrance') {  // ЕСЛИ В ПАРАЛЛЕЛЬНОМ МИРЕ
			if(c_textX >= 20 && c_textX <= 90 && c_textY >= 25 && c_textY <= 85) {
				cursor_obj.take_curs();
				canv_text.removeEventListener('mousemove', o_magic_hand_off.exit_hand_hover);
				canv_text.addEventListener('mousedown', o_magnifier.magnifier_click);
			} 
			else {
				canv_text.removeEventListener('mousedown', o_magnifier.magnifier_click);
				canv_text.addEventListener('mousemove', o_magic_hand_off.exit_hand_hover);
				cursor_obj.stand_curs(3);
			}
		}
	},
	magnifier_click : function() {
		if(cursor_obj.cursor_state == 'standart') {
			cursor_obj.magnifier_curs(0);
			cursor_obj.controller_curs();
		}
		else if(cursor_obj.cursor_state == 'standart_1') {
			cursor_obj.magnifier_curs(1);
			cursor_obj.controller_curs();
		}
		else if(cursor_obj.cursor_state == 'astral') {
			cursor_obj.magnifier_curs(2);
			cursor_obj.controller_curs();
		}
		else if(cursor_obj.cursor_state == 'entrance') {
			cursor_obj.magnifier_curs(3);
			cursor_obj.controller_curs();
		}
	},
	magnifier_draw : function() {
		c_text.drawImage(magnifier, 35, 35, 50, 50);
	}
}

var o_calendar = {  //  ЗАПИСНАЯ КНИЖКА
	description_when_open : 'В конверте лежит небольшая записная книжка в кожанном переплёте.',
	description : 'Небольшая записная книжка в кожанном переплёте. Книжка накрепко перевязана шнурком.',
	calendar_draw : function() {
		c_text.drawImage(calendar_inv, 250, 27, 48, 60);
	},
	calendar_hover : function() {  //  ЕСЛИ СТАНДАРТНЫЙ КУРСОР НАД ЗАПИСНОЙ КНИЖКОЙ
		if(cursor_obj.cursor_state == 'standart_1') {  
			if(c_textX >= 235 && c_textX <= 300 && c_textY >= 20 && c_textY <= 85) {
				cursor_obj.take_curs();
				canv_text.removeEventListener('mousemove', o_magnifier.magnifier_hover);
				canv_text.removeEventListener('mousemove', o_magic_hand.m_hand_hover);
				canv_text.addEventListener('mousedown', o_calendar.calendar_click);
			}
			else {
				canv_text.removeEventListener('mousemove', o_calendar.calendar_hover);
				canv_text.removeEventListener('mousedown', o_calendar.calendar_click);
				canv_text.addEventListener('mousemove', o_magnifier.magnifier_hover);
				canv_text.addEventListener('mousemove', o_magic_hand.m_hand_hover);
				cursor_obj.stand_curs(1);
			}
		}
		else if(cursor_obj.cursor_state == 'magnifier_1') {  // ЕСЛИ ЛУПА НАД ЗАПИСНОЙ КНИЖКОЙ
		//canv_text.removeEventListener('mousedown', o_envelope.envelope_click);
			if(c_textX >= 235 && c_textX <= 300 && c_textY >= 20 && c_textY <= 85) {
				cursor_obj.magnifier_above();
				canv_text.addEventListener('click', o_calendar.information);
			}
			else {
				cursor_obj.magnifier_curs(1);
				canv_text.removeEventListener('click', o_calendar.information);
				canv_text.removeEventListener('mousemove', o_calendar.calendar_hover);
				canv_text.addEventListener('mousemove', o_magic_hand.m_hand_hover);
			}
		}
		else if(cursor_obj.cursor_state == 'magic_hand') {  // ЕСЛИ ВОЛШЕБНАЯ РУКА НАД ЗИПИСНОЙ КНИЖКОЙ
			if(c_textX >= 235 && c_textX <= 300 && c_textY >= 20 && c_textY <= 85) {
				console.log('magic_hand_on');
				cursor_obj.magic_hand_curs_above();
				canv_text.addEventListener('mousedown', o_calendar.magic_path);
			}
			else {
				cursor_obj.magic_hand_curs();
				console.log('magic_hand_off');
				canv_text.removeEventListener('mousedown', o_calendar.magic_path);
				canv_text.removeEventListener('mousemove', o_magic_hand.m_hand_hover);
				//canv_text.removeEventListener('mousemove', o_calendar.calendar_hover);
			}
		}
	},
	calendar_click : function() {
		cursor_obj.calendar_curs();
		cursor_obj.controller_curs();
	},
	information : function() {
		console.log('information_on');
		canv_text.removeEventListener('click', o_calendar.information);
		inventory.inventory_refresh_1('calendar', 'nitral', o_calendar.calendar_draw,	o_magnifier.magnifier_draw,	o_magic_hand.m_hand_draw);
	},
	magic_path : function() {  //  ПЕРЕХОД В РЕЖИМ СЛЕДА !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		canv_text.removeEventListener('mousedown', o_calendar.magic_path);
		cursor_obj.cursor_state = 'nitral';
		cursor_obj.controller_curs();
		console.log('magic_path_on');
		o_trace_mode.dark(o_magic_hand.m_hand_draw, o_calendar.calendar_draw);
	}
}

var o_magic_hand = {  //  ВОЛШЕБНАЯ РУКА
	m_hand_draw : function() {
		c_text.drawImage(magic_hand, 120, 27, 60, 67);
	},
	m_hand_hover : function() {
		if(cursor_obj.cursor_state == 'standart_1') {  
			if(c_textX >= 110 && c_textX <= 170 && c_textY >= 20 && c_textY <= 85) {
				cursor_obj.take_curs();
				canv_text.removeEventListener('mousemove', o_calendar.calendar_hover);
				canv_text.removeEventListener('mousemove', o_magnifier.magnifier_hover);
				canv_text.addEventListener('mousedown', o_magic_hand.m_hand_click);
			}
			else {
				canv_text.removeEventListener('mousemove', o_magic_hand.m_hand_hover);
				canv_text.removeEventListener('mousedown', o_magic_hand.m_hand_click);
				canv_text.addEventListener('mousemove', o_calendar.calendar_hover);
				canv_text.addEventListener('mousemove', o_magnifier.magnifier_hover);
				cursor_obj.stand_curs(1);
			}
		}
		else if(cursor_obj.cursor_state == 'magnifier_1') {  // ЕСЛИ ЛУПА НАД РУКОЙ
			if(c_textX >= 110 && c_textX <= 170 && c_textY >= 20 && c_textY <= 85) {
				cursor_obj.magnifier_above();
				canv_text.addEventListener('click', o_magic_hand.information);
			}
			else {
				cursor_obj.magnifier_curs(1);
				canv_text.removeEventListener('click', o_magic_hand.information);
				canv_text.removeEventListener('mousemove', o_magic_hand.m_hand_hover);
				canv_text.addEventListener('mousemove', o_calendar.calendar_hover);
			}
		}
		else if(cursor_obj.cursor_state == 'calendar') {  // ЕСЛИ ЗАПИСНАЯ КНИЖКА НАД РУКОЙ
			if(c_textX >= 110 && c_textX <= 170 && c_textY >= 20 && c_textY <= 85) {
				cursor_obj.calendar_curs_above();
				canv_text.addEventListener('mousedown', o_calendar.magic_path);
			}
			else {
				cursor_obj.calendar_curs();
				canv_text.removeEventListener('mousemove', o_magic_hand.m_hand_hover);
				canv_text.removeEventListener('mousedown', o_calendar.magic_path);
			}
		}
	},
	m_hand_click : function() {
		cursor_obj.magic_hand_curs();
		cursor_obj.controller_curs();
	},
	information : function() {
		canv_text.removeEventListener('click', o_magic_hand.information);
		inventory.inventory_refresh_1('magic_hand', 'nitral', o_calendar.calendar_draw, o_magnifier.magnifier_draw, o_magic_hand.m_hand_draw);
	},
	desc_number : -1,
	desc_plus : function() {
		if(o_magic_hand.desc_number < 3) {
			o_magic_hand.desc_number += 1;
		}
		else { 
			o_magic_hand.desc_number = 0; 
		}
	},
	description : ['Эта способность со мной столько, сколько я себя помню. Мой дар и моё проклятие.',
				   'Когда человек дотрагивается до чего-нибудь, он оставляет свой след...', 
				   'Если след доститочно чист - я могу пойти по нему...', 
				   'Мне просто нужно прикоснуться.']
}

var teleport = {
	angle : 0,
	rot_int : 0,
	width : tel.width,
	height : tel.height,
	description : 'В конце концов это моя работа.',
	information : function() {
		console.log('teleport_information');
		canv_text.removeEventListener('mousedown', teleport.information);
		teleport.off();
		inventory.inventory_refresh_1('teleport', 'nitral_astral', o_magic_hand_off.off_draw, o_magnifier.magnifier_draw, teleport.rot_on);
	},
	information_off : function() {
		canv_text.removeEventListener('click', teleport.information_off);
		canv_4.removeEventListener('click', teleport.information_off);
		var opacity_inv = 0;
		var inf_off_interval = setInterval(function() {
			if(opacity_inv < 1) {
				c_text.clearRect(0, 0, 700, 120);
				c_text.globalAlpha = opacity_inv;
				c_text.drawImage(border_1, 0, 0, 700, 120);
				o_magic_hand_off.off_draw();
				o_magnifier.magnifier_draw();
				teleport.rot_on();
				opacity_inv += 0.1;
			}
			else {
				c_text.clearRect(0, 0, 700, 120);
				c_text.globalAlpha = 1;
				c_text.drawImage(border_1, 0, 0, 700, 120);
				teleport.rot_on();
				o_magic_hand_off.off_draw();
				o_magnifier.magnifier_draw();
				clearInterval(inf_off_interval);
				teleport.rot(o_magic_hand_off.off_draw, o_magnifier.magnifier_draw, bord.draw);
				cursor_obj.cursor_state = 'astral';
				cursor_obj.controller_curs();
			}
		}, 20);
	},
	draw : function() {
		c_text.drawImage(tel, 305, 23, teleport.width, teleport.height);
	},
	draw_rot : function() {
		c_text.drawImage(tel, -teleport.width/2, -teleport.height/2, teleport.width, teleport.height);
	},
	rot_on : function() {
		clearTimeout(rot_on_timeout);
		c_text.save();
			
		c_text.translate(305 + teleport.width/2, 23 + teleport.height/2);
		c_text.rotate(teleport.angle);
	
		teleport.draw_rot();
		c_text.restore();
		var rot_on_timeout = setTimeout(function() {
			teleport.angle += 100;
		}, 200);
	},
	rot : function(callback_1, callback_2, callback_3, callback_4) {
		teleport.rot_int = setInterval(function() {
			c_text.clearRect(0, 0, 700, 120);
			callback_3();
			callback_1();
			callback_2();
			c_text.save();
			
			c_text.translate(305 + teleport.width/2, 23 + teleport.height/2);
			c_text.rotate(teleport.angle);
	
			teleport.draw_rot();
			c_text.restore();
			teleport.angle += .5;
		}, 200);		
	},
	off : function() {
		clearInterval(teleport.rot_int);
		c_text.restore();
	},
	teleport_hover : function() {
		if(cursor_obj.cursor_state == 'astral') {  //  ЕСЛИ КУРСОР НАД ТЕЛЕПОРТОМ
			if(c_textX >= 295 && c_textX <= 285 + teleport.width && c_textY >= 15 && c_textY <= 5 + teleport.height) {
				 cursor_obj.take_curs();
				 canv_text.removeEventListener('mousemove', o_magnifier.magnifier_hover);
				 canv_text.removeEventListener('mousemove', o_magic_hand_off.magic_off_hover);
				 canv_text.addEventListener('mousedown', teleport.teleportation);
			}
			else {
				canv_text.removeEventListener('mousedown', teleport.teleportation);
				canv_text.addEventListener('mousemove', o_magic_hand_off.magic_off_hover);
				canv_text.addEventListener('mousemove', o_magnifier.magnifier_hover);
				cursor_obj.stand_curs(2);
			}
		}
		if(cursor_obj.cursor_state == 'magnifier_2') { // ЕСЛИ ЛУПА НАД ТЕЛЕПОРТОМ
			if(c_textX >= 295 && c_textX <= 285 + teleport.width && c_textY >= 15 && c_textY <= 5 + teleport.height) {
				console.log('opa opa 1 2 3');
				cursor_obj.magnifier_above();
				canv_text.removeEventListener('mousedown', cursor_obj.refresh_curs);
				canv_4.removeEventListener('mousedown', cursor_obj.refresh_curs);
				canv_text.addEventListener('mousedown', teleport.information);
			}
			else {
				canv_text.removeEventListener('mousedown', teleport.information);
				cursor_obj.magnifier_curs(2);
				canv_text.addEventListener('mousedown', cursor_obj.refresh_curs);
				canv_4.addEventListener('mousedown', cursor_obj.refresh_curs);
			}
		}
	},
	teleportation : function() {
		entrance();
		console.log('teleportation');
		cursor_obj.cursor_state = 'entrance';
		cursor_obj.controller_curs();
	}
}
/*------------------------------------------------------------------*/
/*------------------------ПЕРЕХОД В АСТРАЛЬНЫЙ МИР----------------------*/
function entrance() {
		clearInterval(flicker_interval);
		//track_audio_off();
		var col_down = 0;
		var col_up = 1;
		setTimeout(function() {
			teleport.off();
			dark_interval = setInterval(function() {
				if(col_down < 1.05) {
					canvas_4.clearRect(0, 0, 700, 425);
					canvas_4.globalAlpha -= col_down;
					canvas_4.drawImage(extr_sit, 123 * 0, 1, 123, 145, 300, 230, 123, 145);
					canvas_4.globalAlpha = col_down;
					canvas_4.drawImage(extr_sit_astral, 123 * 0, 1, 123, 145, 300, 230, 123, 145);
					canvas_4.globalAlpha = 1;
					
					canvas_3.globalAlpha = 1;
					canvas_3.globalAlpha = col_down;
					canvas_3.fillStyle = "#393737";
					canvas_3.fillRect(0, 0, 700, 425);
					
					c_text.fillStyle = "#393737";
					c_text.clearRect(0, 0, 700, 120);
					c_text.globalAlpha = 1;
					o_magic_hand_off.off_draw();
					teleport.rot_on();
					c_text.globalAlpha = col_down;
					c_text.fillRect(0, 0, 700, 120);
					
					col_down = col_down + 0.05;
					col_down = col_down.toFixed(2);
					col_down = col_down * 1;
					
					c_text.globalAlpha = 1;
					c_text.drawImage(border_1, 0, 0, 700, 120);
					o_magnifier.magnifier_draw();
					c_text.globalAlpha = col_down;

				}
				else if(col_down == 1.05) { 
					o_pendulum.pendulum_draw(o_pendulum.pendulum_dark, o_pendulum.pos - 1);
					
					milk.milk_change(.03, 0);
					milk.milk_rand(milk.x_milk, milk.y_milk);
					
					canvas_4.clearRect(0, 0, 700, 425); 
					canvas_4.drawImage(extr_sit_astral, 123 * 0, 1, 123, 145, 300, 230, 123, 145);
					
					canvas_3.clearRect(0, 0, 700, 425);
					canvas_3.fillRect(0, 0, 700, 425);
					
					c_text.clearRect(0, 0, 700, 120);
					o_magic_hand_off.exit_draw();
					c_text.fillRect(0, 0, 700, 425);
					
					col_down = col_down + 0.05;
					col_down = col_down.toFixed(2);
					col_down = col_down * 1;
					
					c_text.drawImage(border_1, 0, 0, 700, 120);
					o_magnifier.magnifier_draw();
					
					canvas.clearRect(0, 0, 700, 425);
					canvas.drawImage(astral_room, C_1, 0, 2265, 425, 0, 0, 2265, 425);
					
					Victor.sit_stay(sit_stay_astral);
				}
				else if(col_down > 1.05 && col_up > 0 ) {
					
					canvas_4.clearRect(0, 0, 700, 425);
					canvas_4.globalAlpha = 1;
					canvas_4.drawImage(extr_sit_astral, 123 * 0, 1, 123, 145, 300, 230, 123, 145);
					canvas_4.globalAlpha = col_up;
					
					canvas_3.clearRect(0, 0, 700, 425);
					canvas_3.globalAlpha = 1;
					canvas_3.globalAlpha = col_up;
					canvas_3.fillRect(0, 0, 700, 425);
					
					c_text.clearRect(0, 0, 700, 120);
					c_text.globalAlpha = 1;
					o_magic_hand_off.exit_draw();
					c_text.globalAlpha = col_up;
					c_text.fillRect(0, 0, 700, 120);
					
					col_up = col_up - 0.05;
					col_up = col_up.toFixed(2);
					col_up = col_up * 1;
					
					c_text.globalAlpha = 1;
					c_text.drawImage(border_1, 0, 0, 700, 120);
					o_magnifier.magnifier_draw();
					c_text.globalAlpha = col_down;
					
					canvas.clearRect(0, 0, 700, 425);
					canvas.drawImage(astral_room, C_1, 0, 2265, 425, 0, 0, 2265, 425);
				}
				else { 
					clearInterval(dark_interval);
					clearInterval(flicker_interval);
					canvas_4.globalAlpha = 1;
					canvas_3.globalAlpha = 1;
					c_text.clearRect(0, 0, 700, 120);
					c_text.drawImage(border_1, 0, 0, 700, 120);
					o_magic_hand_off.exit_draw();
					o_magnifier.magnifier_draw();
					canvas.clearRect(0, 0, 700, 425);
					canvas.drawImage(astral_room, C_1, 0, 2265, 425, 0, 0, 2265, 425);
					o_trace_mode.beams_flicker_entrance();
				}
			}, 10);
		}, 250);
}
/*----------------------------------------------------------------------*/
/*-----------------------ВЫХОД ИЗ АСТРАЛЬНОГО МИРА----------------------*/
function entrance_exit() {
	console.log('opa');
	canv_4.removeEventListener('click', moveExtr);
	zero_zero();
	canv_text.removeEventListener('mousemove',o_magic_hand_off.exit_hand_hover);
	canv_text.removeEventListener('mousedown', entrance_exit);
	clearInterval(Victor.interval_sit_stay);
	clearTimeout(Victor.timeout_sit_stay);
	clearInterval(flicker_interval);
	clearInterval(dark_interval);
		//track_audio_on();
		var col_down = 0;
		var col_up = 1;
		var track_shift_0 = 0;
			setTimeout(function() {
				dark_interval = setInterval(function() {
					if(col_down < 1.05) {
						
						canvas_4.clearRect(0, 0, 700, 425);
						canvas_4.globalAlpha = 1;
						canvas_4.globalAlpha -= col_down;
						canvas_4.drawImage(extr_sit_astral, 123 * 0, 1, 123, 145, 300, 230, 123, 145);
						canvas_4.globalAlpha = col_down/2;
						canvas_4.drawImage(extr_sit, 123 * 0, 1, 123, 145, 300, 230, 123, 145);
						
						canvas_3.fillStyle = "#393737"; 
						canvas_3.clearRect(0, 0, 700, 425);
						canvas_3.globalAlpha = 1;
						canvas_3.globalAlpha = col_down;
						canvas_3.fillRect(0, 0, 700, 425);
						
						c_text.clearRect(0, 0, 700, 120);
						c_text.fillStyle = "#393737";
						c_text.globalAlpha = 1;
						o_magic_hand_off.exit_draw();
						c_text.globalAlpha = col_down;
						c_text.fillRect(0, 0, 700, 120);
						c_text.globalAlpha = 1;
						c_text.drawImage(border_1, 0, 0, 700, 120);
						o_magnifier.magnifier_draw();
						c_text.globalAlpha = col_down;
						
						col_down = col_down + 0.05;
						col_down = col_down.toFixed(2);
						col_down = col_down * 1;
					}
					else if(col_down == 1.05) { 
					
						milk.milk_stop();
						
						canvas_4.globalAlpha = col_down/2;
						canvas_4.drawImage(extr_sit, 123 * 0, 1, 123, 145, 300, 230, 123, 145);
						
						canvas_3.clearRect(0, 0, 700, 425);
						canvas_3.drawImage(psih_dark, 123 * 10, 0, 123, 145, C_3, 232, 123, 145);					
						canvas_3.fillRect(0, 0, 700, 425);
					
						c_text.clearRect(0, 0, 700, 120);
						c_text.fillStyle = "#393737";
						c_text.fillRect(0, 0, 700, 120);
						c_text.drawImage(border_1, 0, 0, 700, 120);
						o_magnifier.magnifier_draw();
						
						canvas.clearRect(0, 0, 700, 425);
						canvas.drawImage(room_dark, C_1, 0, 700, 425, 0, 0, 700, 425);
						
						o_pendulum.pendulum_draw(o_pendulum.pendulum_dark, o_pendulum.pos - 1);
						
						col_down = col_down + 0.05;
						col_down = col_down.toFixed(2);
						col_down = col_down * 1;
					}
					else if(col_down > 1.05 && col_up > 0 ) {
						o_pendulum.pendulum_draw(o_pendulum.pendulum_dark, o_pendulum.pos - 1);
						
						canvas_4.clearRect(0, 0, 700, 425);
						canvas_4.globalAlpha = col_down/2;
						canvas_4.drawImage(extr_sit, 123 * 0, 1, 123, 145, 300, 230, 123, 145);
						
						canvas_3.clearRect(0, 0, 700, 425);
						canvas_3.globalAlpha = 1;
						canvas_3.drawImage(psih_dark, 123 * 10, 0, 123, 145, C_3, 232, 123, 145);
						canvas_3.globalAlpha = col_up;
						canvas_3.fillRect(0, 0, 700, 425);
						
						c_text.clearRect(0, 0, 700, 120);
						c_text.fillStyle = "#393737";
						c_text.globalAlpha = 1;
						teleport.rot_on();						
						o_magic_hand_off.off_draw();
						c_text.globalAlpha = col_up;
						c_text.fillRect(0, 0, 700, 120);
						c_text.globalAlpha = 1;
						c_text.drawImage(border_1, 0, 0, 700, 120);
						o_magnifier.magnifier_draw();
						
						col_up = col_up - 0.05;
						col_up = col_up.toFixed(2);
						col_up = col_up * 1;
						
						col_down = col_down + 0.05;
						col_down = col_down.toFixed(2);
						col_down = col_down * 1;
						
						o_pendulum.pendulum_draw(o_pendulum.pendulum_dark, o_pendulum.pos - 1);
					}
					else if(col_up == 0){
						clearInterval(dark_interval);
						
						canvas_4.clearRect(0, 0, 700, 425);
						canvas_4.globalAlpha = 1;
						canvas_4.drawImage(extr_sit, 123 * 0, 1, 123, 145, 300, 230, 123, 145);
						
						o_pendulum.pendulum_draw(o_pendulum.pendulum_dark, o_pendulum.pos - 1);
						c_text.clearRect(0, 0, 700, 120);
						c_text.drawImage(border_1, 0, 0, 700, 120);
						o_magic_hand_off.off_draw();
						o_magnifier.magnifier_draw();
						teleport.rot_on();
						
						cursor_obj.cursor_state = 'astral';
						cursor_obj.controller_curs();
						canv_text.addEventListener('mousemove', o_magic_hand_off.magic_off_hover);
						o_trace_mode.beams_flicker();
						teleport.rot(o_magic_hand_off.off_draw, o_magnifier.magnifier_draw, bord.draw);
					}
				}, 10);
			}, 250);
}
/*----------------------------------------------------------------------*/
/*-----------------------КНОПКА ВЫКЛЮЧЕНИЯ РЕЖИМА СЛЕДА-------------*/
o_magic_hand_off = {
	off_draw : function(){
		c_text.drawImage(magic_hand_off, 120, 27, 60, 67);
	},
	exit_draw : function() {
		c_text.drawImage(exit_hand, 120, 27, 60, 67);
	},
	exit_hand_hover : function() {
		if(c_textX >= 110 && c_textX <= 170 && c_textY >= 20 && c_textY <= 85) {
				cursor_obj.take_curs();
				canv_text.addEventListener('mousedown', entrance_exit);
				canv_text.removeEventListener('mousemove', o_magnifier.magnifier_hover);
			}
			else {
				canv_text.removeEventListener('mousedown', entrance_exit);
				canv_text.addEventListener('mousemove', o_magnifier.magnifier_hover);
				cursor_obj.stand_curs(3);
			}
	},
	magic_off_hover : function(){
			if(c_textX >= 110 && c_textX <= 170 && c_textY >= 20 && c_textY <= 85) {
				cursor_obj.take_curs();
				canv_text.addEventListener('mousedown', o_trace_mode.exit);
				canv_text.removeEventListener('mousemove', o_magnifier.magnifier_hover);
			}
			else {
				canv_text.removeEventListener('mousedown', o_trace_mode.exit);
				canv_text.addEventListener('mousemove', o_magnifier.magnifier_hover);
				cursor_obj.stand_curs(2);
			}
	}
}
/*------------------------------------------------------------------*/
/*------------------------------ИНВЕНТАРЬ---------------------------*/
var inventory = {
	inventory_on : function() {
		var opacity_inv = 0;
		var inv_on_interval = setInterval(function() {
			if(opacity_inv < 1) {
				c_text.clearRect(0, 0, 700, 120);
				c_text.globalAlpha = opacity_inv;
				c_text.drawImage(border_1, 0, 0, 700, 120);
				o_envelope.envelope_draw();
				o_magnifier.magnifier_draw();
				opacity_inv += 0.1;
			}
			else {
				c_text.clearRect(0, 0, 700, 120);
				c_text.globalAlpha = 1;
				c_text.drawImage(border_1, 0, 0, 700, 120);
				o_magnifier.magnifier_draw();
				o_envelope.envelope_draw();
				clearInterval(inv_on_interval);
				cursor_obj.cursor_state = 'standart';
				cursor_obj.controller_curs(); // START
			}
		}, 20);
	},
	inventory_on_two : function() {
		canv_4.removeEventListener('click', inventory.inventory_on_two);
		canv_text.removeEventListener('click', inventory.inventory_on_two);
		var opacity_inv = 0;
		var inv_on_interval = setInterval(function() {
			if(opacity_inv < 1) {
				c_text.clearRect(0, 0, 700, 120);
				c_text.globalAlpha = opacity_inv;
				c_text.drawImage(border_1, 0, 0, 700, 120);
				o_calendar.calendar_draw();
				o_magnifier.magnifier_draw();
				o_magic_hand.m_hand_draw();
				opacity_inv += 0.1;
			}
			else {
				c_text.clearRect(0, 0, 700, 120);
				c_text.globalAlpha = 1;
				c_text.drawImage(border_1, 0, 0, 700, 120);
				o_magnifier.magnifier_draw();
				o_calendar.calendar_draw();
				o_magic_hand.m_hand_draw();
				clearInterval(inv_on_interval);
				cursor_obj.cursor_state = 'standart_1';
				cursor_obj.controller_curs(); // START
			}
		}, 20);
	},
	inventory_off : function() {
		c_text.clearRect(0, 0, 700, 120);
		canv_text.removeEventListener('mousemove', o_envelope.envelope_hover);
		canv_text.removeEventListener('mousemove', o_magnifier.magnifier_hover);
	},
	inventory_refresh : function() {
		//cursor_obj.refresh_curs();
		cursor_obj.cursor_state = 'nitral';
		cursor_obj.controller_curs();
		var opacity_inv = 1;
		var inv_on_interval = setInterval(function() {
			if(opacity_inv > 0) {
				c_text.clearRect(0, 0, 700, 120);
				c_text.globalAlpha = opacity_inv;
				c_text.drawImage(border_1, 0, 0, 700, 120);
				o_envelope.envelope_draw();
				o_magnifier.magnifier_draw();
				opacity_inv -= 0.1;
			}
			else {
				clearInterval(inv_on_interval);
				c_text.clearRect(0, 0, 700, 120);
				c_text.globalAlpha = 1;
				c_text.fillStyle = '#c99fd3';
				wrapText(context, o_envelope.description, marginLeft, marginTop, maxWidth, lineHeight);
				canv_text.addEventListener('click', o_envelope.envelope_open);
				canv_4.addEventListener('click', o_envelope.envelope_open);
			}
		}, 20);
	},
	inventory_refresh_1 : function(key, key_2, callback_1, callback_2, callback_3) {
		cursor_obj.cursor_state = key_2;
		cursor_obj.controller_curs();
		var opacity_inv = 1;
		var inv_on_interval = setInterval(function() {
			if(opacity_inv > 0) {
				c_text.clearRect(0, 0, 700, 120);
				c_text.globalAlpha = opacity_inv;
				c_text.drawImage(border_1, 0, 0, 700, 120);
				callback_1();
				callback_2();
				callback_3();
				opacity_inv -= 0.1;
			}
			else {
				clearInterval(inv_on_interval);
				c_text.clearRect(0, 0, 700, 120);
				c_text.globalAlpha = 1;
				c_text.fillStyle = '#c99fd3';
				if(key == 'calendar') {
					wrapText(context, o_calendar.description, marginLeft, marginTop, maxWidth, lineHeight);
					canv_text.addEventListener('click', inventory.inventory_on_two);
					canv_4.addEventListener('click', inventory.inventory_on_two);
				}
				else if(key == 'magic_hand') {
					o_magic_hand.desc_plus();
					wrapText(context, o_magic_hand.description[o_magic_hand.desc_number], marginLeft, marginTop, maxWidth, lineHeight);
					canv_text.addEventListener('click', inventory.inventory_on_two);
					canv_4.addEventListener('click', inventory.inventory_on_two);
				}
				else if(key == 'teleport') {
					wrapText(context, teleport.description, marginLeft, marginTop, maxWidth, lineHeight);
					canv_text.addEventListener('click', teleport.information_off);
					canv_4.addEventListener('click', teleport.information_off);
				}
			}
		}, 20);
	}
};
/*------------------------------------------------------------------*/
/*------------------РЕЖИМА СЛЕДА-----------------------------*/
var o_trace_mode = {
	exit : function() {
		clearInterval(dark_interval);
		clearInterval(flicker_interval);
		cursor_obj.cursor_state = 'nitral';
		cursor_obj.controller_curs();
		o_trace_mode.light(o_calendar.calendar_draw);
	},
	dark : function(callback_0, callback_1) {
		o_pendulum.pendulum_stop(pendulum, o_pendulum.pos - 1);
		//track_audio_on();
		var col_down = 0;
		var col_up = 1;
		var track_shift_0 = 0;
			setTimeout(function() {
				dark_interval = setInterval(function() {
					if(col_down < 1.05) {
						canvas_3.fillStyle = "#393737"; 
						c_text.fillStyle = "#393737";
						canvas_3.clearRect(0, 0, 700, 425);
						c_text.clearRect(0, 0, 700, 120);
						canvas_3.globalAlpha = 1;
						c_text.globalAlpha = 1;
						canvas_3.drawImage(psih_write, 123 * 10, 0, 123, 145, C_3, 232, 123, 145);
						callback_0();
						callback_1();
						canvas_3.globalAlpha = col_down;
						c_text.globalAlpha = col_down;
						canvas_3.fillRect(0, 0, 700, 425);
						c_text.fillRect(0, 0, 700, 120);
						col_down = col_down + 0.05;
						col_down = col_down.toFixed(2);
						col_down = col_down * 1;
						
						c_text.globalAlpha = 1;
						c_text.drawImage(border_1, 0, 0, 700, 120);
						o_magnifier.magnifier_draw();
						c_text.globalAlpha = col_down;
					}
					else if(col_down == 1.05) { 
						c_text.clearRect(0, 0, 700, 120);
						c_text.fillStyle = "#393737";
						c_text.fillRect(0, 0, 700, 120);
						c_text.drawImage(border_1, 0, 0, 700, 120);
						o_magnifier.magnifier_draw();
						
						
						canvas.clearRect(0, 0, 700, 425);
						canvas.drawImage(room_dark, C_1, 0, 700, 425, 0, 0, 700, 425);
						o_pendulum.pendulum_draw(o_pendulum.pendulum_dark, o_pendulum.pos - 1);
						canvas_3.clearRect(0, 0, 700, 425);
						canvas_3.drawImage(psih_dark, 123 * 10, 0, 123, 145, C_3, 232, 123, 145);					
						canvas_3.fillRect(0, 0, 700, 425);
						col_down = col_down + 0.05;
						col_down = col_down.toFixed(2);
						col_down = col_down * 1;
					}
					else if(col_down > 1.05 && col_up > 0 ) {
						o_pendulum.pendulum_draw(o_pendulum.pendulum_dark, o_pendulum.pos - 1);
						
						c_text.clearRect(0, 0, 700, 120);
						c_text.fillStyle = "#393737";
						c_text.globalAlpha = 1;
						teleport.rot_on();						
						o_magic_hand_off.off_draw();
						c_text.globalAlpha = col_up;
						c_text.fillRect(0, 0, 700, 120);
						c_text.globalAlpha = 1;
						c_text.drawImage(border_1, 0, 0, 700, 120);
						o_magnifier.magnifier_draw();
						
						canvas_3.clearRect(0, 0, 700, 425);
						canvas_3.globalAlpha = 1;
						canvas_3.drawImage(psih_dark, 123 * 10, 0, 123, 145, C_3, 232, 123, 145);
						canvas_3.globalAlpha = col_up;
						canvas_3.fillRect(0, 0, 700, 425);
						col_up = col_up - 0.05;
						col_up = col_up.toFixed(2);
						col_up = col_up * 1;
						o_pendulum.pendulum_draw(o_pendulum.pendulum_dark, o_pendulum.pos - 1);
					}
					else if(col_up == 0){
						clearInterval(dark_interval);
						o_pendulum.pendulum_draw(o_pendulum.pendulum_dark, o_pendulum.pos - 1);
						c_text.clearRect(0, 0, 700, 120);
						c_text.drawImage(border_1, 0, 0, 700, 120);
						o_magic_hand_off.off_draw();
						o_magnifier.magnifier_draw();
						teleport.rot_on();
						
						cursor_obj.cursor_state = 'astral';
						cursor_obj.controller_curs();
						o_magic_hand_off.magic_off_hover();
						o_trace_mode.beams_flicker();
						//teleport.off(o_magic_hand_off.off_draw, o_magnifier.magnifier_draw, bord.draw);
						teleport.rot(o_magic_hand_off.off_draw, o_magnifier.magnifier_draw, bord.draw);
					}
				}, 10);
			}, 250);
	},
	light : function change_canvases_light_start(callback_0, callback_1) {
		canvas_4.clearRect(0, 0, 700, 425);
		canvas_4.drawImage(extr_sit, 123 * 0, 1, 123, 145, 300, 230, 123, 145);
		//track_audio_off();
		var col_down = 0;
		var col_up = 1;
		setTimeout(function() {
		teleport.off();
			dark_interval = setInterval(function() {
				if(col_down < 1.05) {
					canvas_3.clearRect(0, 0, 700, 425);
					canvas_3.globalAlpha = 1;
					canvas_3.drawImage(psih_dark, 123 * 10, 0, 123, 145, C_3, 232, 123, 145);
					canvas_3.globalAlpha = col_down;
					c_text.fillStyle = "#393737";
					c_text.clearRect(0, 0, 700, 120);
					c_text.globalAlpha = 1;
					o_magic_hand_off.off_draw();
					teleport.rot_on();
					c_text.globalAlpha = col_down;
					canvas_3.fillRect(0, 0, 700, 425);
					c_text.fillRect(0, 0, 700, 120);
					col_down = col_down + 0.05;
					col_down = col_down.toFixed(2);
					col_down = col_down * 1;
					
					c_text.globalAlpha = 1;
					c_text.drawImage(border_1, 0, 0, 700, 120);
					o_magnifier.magnifier_draw();
					c_text.globalAlpha = col_down;
				}
				else if(col_down == 1.05) { 
					canvas.clearRect(0, 0, 700, 425);
					canvas.drawImage(img, C_1, 0, 700, 425, 0, 0, 700, 425);
					o_pendulum.pendulum_draw(pendulum, o_pendulum.pos - 1);
					canvas_3.clearRect(0, 0, 700, 425);
					canvas_3.drawImage(psih_write, 123 * 10, 0, 123, 145, C_3, 232, 123, 145); 
					canvas_3.fillRect(0, 0, 700, 425);
					c_text.clearRect(0, 0, 700, 120);
					o_magic_hand.m_hand_draw();
					callback_0();
					c_text.fillRect(0, 0, 700, 425);
					col_down = col_down + 0.05;
					col_down = col_down.toFixed(2);
					col_down = col_down * 1;
					
					c_text.drawImage(border_1, 0, 0, 700, 120);
					o_magnifier.magnifier_draw();
				}
				else if(col_down > 1.05 && col_up > 0 ) {
					canvas_3.clearRect(0, 0, 700, 425);
					canvas_3.globalAlpha = 1;
					canvas_3.drawImage(psih_write, 123 * 10, 0, 123, 145, C_3, 232, 123, 145);
					canvas_3.globalAlpha = col_up;
					canvas_3.fillRect(0, 0, 700, 425);
					c_text.clearRect(0, 0, 700, 120);
					c_text.globalAlpha = 1;
					o_magic_hand.m_hand_draw();
					callback_0();
					c_text.globalAlpha = col_up;
					c_text.fillRect(0, 0, 700, 120);
					col_up = col_up - 0.05;
					col_up = col_up.toFixed(2);
					col_up = col_up * 1;
					
					c_text.globalAlpha = 1;
					c_text.drawImage(border_1, 0, 0, 700, 120);
					o_magnifier.magnifier_draw();
					c_text.globalAlpha = col_down;
				}
				else { 
					clearInterval(dark_interval);
					clearInterval(flicker_interval);
					canvas_3.globalAlpha = 1;
					c_text.clearRect(0, 0, 700, 120);
					c_text.drawImage(border_1, 0, 0, 700, 120);
					o_magic_hand.m_hand_draw();
					callback_0();
					o_magnifier.magnifier_draw();
					o_pendulum.pendulum_work();
					cursor_obj.cursor_state = 'standart_1';
					cursor_obj.controller_curs();
				}
			}, 10);
		}, 150);
	},
	beams : function(num_x_0, num_x_1, num_y, size_width_0, size_height_0, size_width_1, size_height_1) {
		canvas_3.drawImage(track, 0 + num_x_0, 425 - num_y, 8 + size_width_0, 22 * size_height_0);
		canvas_3.drawImage(track, 10 + num_x_1, 425 - num_y, 4 + size_width_1, 11 * size_height_1);
	},
	beams_flicker : function() {  //  ЭФФЕКТ АСТРАЛЬНОГО МЕРЦАНИЯ
		canvas_3.globalAlpha = 1;
		var num_y = 10;
			flicker_interval = setInterval(function() {
			var size_width_0 = Math.floor(Math.random() * (7 - 0 + 1)) + 0;
			var size_height_0 = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
			var size_width_1 = Math.floor(Math.random() * (7 - 0 + 1)) + 0;
			var size_height_1 = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
			var num_x_0 = Math.floor(Math.random() * (700 - 0 + 1)) + 0;
			var num_x_1 = Math.floor(Math.random() * (700 - 1 + 1)) + 1;
			var room_shift_x = Math.random() * (4 - (-4) + 1) + (-4);
			var room_shift_y = Math.random() * (4 - (-4) + 1) + (-4);
			
			canvas.clearRect(0, 0, 700, 425);
			canvas.drawImage(room_dark, C_1, 0, 700, 425, 0, 0, 700, 425);
			canvas_2.clearRect(0, 0, 700, 79);
			canvas_2.drawImage(pendulum_dark, (42 * (o_pendulum.pos - 1)), 0, 37, 79, C_2, 0, 37, 79);
			
			canvas_3.clearRect(0, 0, 700, 425);
			canvas_3.drawImage(psih_dark, 123 * 10, 0, 123, 145, C_3, 232, 123, 145);
			canvas_4.clearRect(0, 0, 700, 450);
			extr_speak(0);
			
			canvas.globalAlpha = .2;
			canvas.drawImage(room_dark, C_1 + room_shift_x, 0 + room_shift_y, 700, 425, 0, 0, 700, 425);
			canvas_2.globalAlpha = .2;
			canvas_2.drawImage(pendulum_dark, (42 * (o_pendulum.pos - 1)) + room_shift_x, 0 + room_shift_y, 37, 79, C_2, 0, 37, 79);
			
			canvas_3.globalAlpha = .2;
			canvas_3.drawImage(psih_dark, (123 * 10) + room_shift_x, 0 + room_shift_y, 123, 145, C_3, 232, 123, 145);
			canvas_4.globalAlpha = .2;
			canvas_4.drawImage(extr_sit, (123 * 0) + room_shift_x, 1 + room_shift_y, 123, 145, 300, 230, 123, 145);
			
			canvas.globalAlpha = 1;
			canvas_2.globalAlpha = 1;
			canvas_3.globalAlpha = 1;
			canvas_4.globalAlpha = 1;
			if(num_y <= 480) {
				o_trace_mode.beams(num_x_0, num_x_1, num_y, size_width_0, size_height_0, size_width_1, size_height_1);
				num_y += 150;
			}
			else { num_y = 120;}
		}, 25);
	},
	beams_flicker_entrance : function() {  //  ЭФФЕКТ АСТРАЛЬНОГО МЕРЦАНИЯ ДЛЯ ДРУГОГО МИРА
		canvas_3.globalAlpha = 1;
		var num_y = 10;
		flicker_interval = setInterval(function() {
			var size_width_0 = Math.floor(Math.random() * (7 - 0 + 1)) + 0;
			var size_height_0 = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
			var size_width_1 = Math.floor(Math.random() * (7 - 0 + 1)) + 0;
			var size_height_1 = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
			var num_x_0 = Math.floor(Math.random() * (700 - 0 + 1)) + 0;
			var num_x_1 = Math.floor(Math.random() * (700 - 1 + 1)) + 1;
			var room_shift_x = Math.random() * (4 - (-4) + 1) + (-4);
			var room_shift_y = Math.random() * (4 - (-4) + 1) + (-4);
			
			canvas.clearRect(0, 0, 700, 425);
			canvas.drawImage(astral_room, C_1, 0, 700, 425, 0, 0, 700, 425);
			canvas_2.clearRect(0, 0, 700, 79);
			canvas_2.drawImage(pendulum_dark, (42 * (o_pendulum.pos - 1)), 0, 37, 79, C_2, 0, 37, 79);
			
			canvas_3.clearRect(0, 0, 700, 425);
			
			canvas.globalAlpha = .2;
			canvas.drawImage(astral_room, C_1 + room_shift_x, 0 + room_shift_y, 700, 425, 0, 0, 700, 425);
			canvas_2.globalAlpha = .2;
			canvas_2.drawImage(pendulum_dark, (42 * (o_pendulum.pos - 1)) + room_shift_x, 0 + room_shift_y, 37, 79, C_2, 0, 37, 79);
			
			canvas_3.globalAlpha = .2;
			
			canvas.globalAlpha = 1;
			canvas_2.globalAlpha = 1;
			canvas_3.globalAlpha = 1;
			if(num_y <= 480) {
				o_trace_mode.beams(num_x_0, num_x_1, num_y, size_width_0, size_height_0, size_width_1, size_height_1);
				num_y += 150;
			}
			else { num_y = 120;}
		}, 25);
	}
}
/*------------------------------------------------------------------*/

/*--------------------------ВИКТОР---------------------------*/
var Victor = {
	timeout_sit_stay : 0,
	interval_sit_stay : 0,
	take_draw : function(num) {
		canvas_4.drawImage(extr_take, 153 * num, 0, 153, 150, 300, 230, 153, 150);
	},
	victor_take : function() {
		cursor_obj.stand_curs(0);
		canv_4.removeEventListener('mousemove', envelope_touch);
		canv_4.removeEventListener('click', Victor.victor_take);
		thing_draw();
		Victor.take_draw(num);
		var num = 0;
		var victor_take_interval = setInterval(function() {
			if(num < 8) {
				canvas_4.clearRect(0, 0, 700, 425);
				thing_draw();
				Victor.take_draw(num);
				++num;
			}
			else if(num >= 8 && num <= 14) {
				canvas_4.clearRect(0, 0, 700, 425);
				Victor.take_draw(num);
				++num;
			}
			else if(num >= 15) {
				clearInterval(victor_take_interval);
				extr_speak(0);
				inventory.inventory_on();
			}
		}, 200);
	},
	sit_stay : function(img) {
		var num = 0;
		Victor.timeout_sit_stay = setTimeout(function() {
			Victor.interval_sit_stay = setInterval(function() {
				if(num < 4) {
					canvas_4.clearRect(0, 0, 700, 425);
					canvas_4.drawImage(img, 123 * num, 1, 123, 180, 300, 209, 123, 180);
					num++;
				}
				else { 
					clearInterval(Victor.interval_sit_stay);
					clearTimeout(Victor.timeout_sit_stay);
					canvas_4.clearRect(0, 0, 700, 425);
					canvas_4.drawImage(img, 123 * 4,  0, 100, 201, 300, 185, 100, 201);
					console.log('end');
					canv_4.addEventListener('click', moveExtr);
				}
			}, 200);
		}, 500);
	}
}
/*------------------------------------------------------------------*/
/*------------------------МАЯТНИК-----------------------------------*/

var o_pendulum = {
	pendulum_dark : document.getElementById('37-79_dark'),
	pos : 2,
	pendulum_draw : function(pic, num) {
		canvas_2.clearRect(0, 0, 700, 79);
		canvas_2.drawImage(pic, 42 * num, 0, 37, 79, C_2, 0, 37, 79);
	},
	pendulum_work : function(){
			setTimeout(function() {
			clock.volume = .0 //(((130 - (regulator_y - 8)) * 0.7)/100) || .8;
			clock.play();
			clock.currentTime = 15;
			clearInterval(interval_currentTime);
			interval_currentTime = setInterval(function() {
				clock.currentTime = 15;
			}, 10000);
		}, 250);	
		clearInterval(interval_pendulum);
		interval_pendulum = setInterval (function() {
				o_pendulum.pendulum_draw(pendulum, o_pendulum.pos);
				if(o_pendulum.pos < 8) { o_pendulum.pos += 1; }
				else { o_pendulum.pos = 1; }
		}, 250);
	},
	pendulum_stop : function(pic, pos) {
		clock.pause();
		clearInterval(interval_pendulum);
		clearInterval(interval_currentTime);
		
		canvas_2.clearRect(0, 0, 700, 79);
		canvas_2.drawImage(pic, 42 * pos, 0, 37, 79, C_2, 0, 37, 79);
	} 
}
/*--------------------Включение и выключение музыки на путь----------------------*/
function track_audio_on() {
	setTimeout(function() {
		track_audio.volume = .04 //((130 - (regulator_y - 8)) * 0.7)/100 || .8;
		track_audio.play();
		track_audio.currentTime = 15;
		var interval_track_audio = setInterval(function() {
			track_audio.currentTime = 9;
		}, 32000);
	}, 600);
}

function track_audio_off() {
	//clearInterval(interval_track_audio);
	track_audio.pause();
}
/*------------------------------------------------------------------*/
/*--------------------Врач пишет------------------------------------*/

function F_write(num) {
	canvas_3.clearRect(0, 0, 700, 425);
	canvas_3.drawImage(psih_write, 123 * num, 0, 123, 145, C_3, 232, 123, 145);
}

function F_speak(num) {
	canvas_3.clearRect(0, 0, 700, 425);
	canvas_3.drawImage(psih_write, 123 * num, 0, 123, 145, C_3, 232, 123, 145);
}

function F_gives(num) {
	canvas_3.clearRect(0, 0, 700, 425);
	canvas_3.drawImage(psih_gives, 153 * num, 0, 153, 145, 430, 232, 153, 145);
}

function F_psih(work) {
	var gives_psih_interval;
	if(work == 2) {
		setInterval (function() {
			F_write(coord_psih);
			if(coord_psih <= 7) { coord_psih += 1; }
			else { coord_psih = 0; }
		}, 350); 
	}
	else if(work == 1) {
		coord_psih = 10;
		speak_psih_interval = setInterval(function() {
			F_speak(coord_psih);
			if(coord_psih <= 16) { coord_psih += 1;}
			else { coord_psih = 10; }
		}, 220);
	}
	else if(work == 0) {
		clearInterval(speak_psih_interval);
		clearInterval(gives_psih_interval);
		F_speak(10);
	}
	else if(work == 3) {
		coord_psih = 0;
		clearInterval(speak_psih_interval);
		var gives_psih_interval = setInterval(function() {
			F_gives(coord_psih);
			if(coord_psih < 10) { coord_psih += 1; }
			else if(coord_psih == 10) { 
				thing_draw(); 
				coord_psih +=1;
			}
			else if(coord_psih > 10 && coord_psih <= 12) { coord_psih +=1; }
			else { 
				F_psih(0);
				clearInterval(gives_psih_interval);
				add_envelope_touch();
			}
		}, 220);
	}
}
/*------------------------------------------------------------------*/
/*--------------------ГЛ ГЕРОЙ-------------------------------------*/
              /*--------СИДИТ В КРЕСЛЕ----------*/

function extr_speak(num) {
	canvas_4.clearRect(0, 0, 700, 425);
	canvas_4.drawImage(extr_sit, 123 * num, 1, 123, 145, 300, 230, 123, 145);
}

function F_extr_speak(work) {
	if(work == 1) {
		clearInterval(speak_extr_interval);
		speak_extr_interval = setInterval(function() {
		extr_speak(coord_extr);
		if(coord_extr <= 11) { coord_extr += 1; }
		else { coord_extr = 0; }
	}, 150);
	}
	else if(work == 0) {
		clearInterval(speak_extr_interval);
		extr_speak(0);
	}
}
/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/
/*--------------Сдвиг комнаты---------------------------------------*/
function dvig_left(a) {
	C_1 = C_1 - a;
	C_2 = C_2 + a;
	C_3 = C_3 + a;
	canvas.clearRect(0, 0, 700, 425);
	canvas.drawImage(astral_room, C_1, 0, 2265, 425, 0, 0, 2265, 425);

	o_pendulum.pendulum_draw(o_pendulum.pendulum_dark, o_pendulum.pos - 1);
};

function dvig_right(a) {
	C_1 = C_1 + a;
	C_2 = C_2 - a;
	C_3 = C_3 - a;
	canvas.clearRect(0, 0, 700, 425);
	canvas.drawImage(astral_room, C_1, 0, 2265, 425, 0, 0, 2265, 425);

	o_pendulum.pendulum_draw(o_pendulum.pendulum_dark, o_pendulum.pos - 1);
};
/*------------------------------------------------------------------*/
/*----------ФУНКЦИЯ ДЛЯ РАСЧЁТА ПЕРЕМЕННЫХ ДЛЯ ДВИЖЕНИЯ, ПРОВЕРКИ, И ОСТАНОВКИ-----*/
function divide(Cl_1, Cl_2, x, y) {
	distance_x = Cl_1 - x; distance_x = distance_x.toFixed(2); distance_x = distance_x * 1;
	distance_y = Cl_2 - y; distance_y = distance_y.toFixed(2); distance_y = distance_y * 1;
	distance_rolls = (distance_x * distance_x) + (distance_y * distance_y); 
	distance_rolls = Math.sqrt(distance_rolls);
	sp = distance_rolls/endSpeed;  // РАСЧЁТ ОКОНЧАТЕЛЬНОЙ СКОРОСТИ ПЕРСОНАЖА
	if(sp < 0){ sp = sp * (-1); }
	divider = distance_x/sp; 
	dividend = distance_y/sp;
	divider = divider.toFixed(2); divider = divider * 1;
	dividend = dividend.toFixed(2); dividend = dividend * 1;
}
/*---------------------------------------------------------------------------------*/
/*------------------------------ДВИЖЕНИЯ ВПРАВО И ВЛЕВО----------------------------*/
function movement_Right(work, num, Cl_1, Cl_2, z) {
	clearInterval(interval_4x);
	num = 1;
	if(work == 1) {
	interval_4x = setInterval(function() {
		//console.log('movement_Right');
		if(x != Cl_1 && x <= 540 || y != Cl_2 && x <= 540) { 
			x += divider;
			y += dividend; 
			x = x.toFixed(2); x = x * 1;
			y = y.toFixed(2); y = y * 1;
			true_x = x - Cl_1;  true_x = true_x.toFixed(2); true_x = true_x * 1;
			true_y = y - Cl_2;  true_y = true_y.toFixed(2); true_y = true_y * 1;
			if(true_x < 2 && true_x > -2 && true_y < 2 && true_y > -2) { x = Cl_1 ; y = Cl_2; }	
			if(Cl_1 > x && (parseInt(z / z_step) == z / z_step) && x <= 540) {
					if(num < 8)	{ num += 1; }
					else { num = 1; }
				}
			else if(Cl_1 == x || x > 540) { num = 0; movement_Right(0);}
		canvas_4.clearRect(0, 0, 700, 428);
		canvas_4.drawImage(extr, 100 * num, 0, 100, 201, x, 185, 100, 201);
		z += 1;
		 location_shift_right(1, 10)
		}
	}, 1000/60);
	}
	else if(work == 0) { 
		//canvas_4.clearRect(0, 0, 700, 428);
		//canvas_4.drawImage(extr, 100 * 0, 0, 100, 201, x, 185, 100, 201);
	}
}

function movement_Left(work, num, Cl_1, Cl_2, z) {
	clearInterval(interval_4x);
	num = 9;
	if(work == 1) {
	interval_4x = setInterval(function() {
		//console.log('movement_Left');
		if(x != Cl_1 && x >= 40 || y != Cl_2 && x >= 40) { 
			x += divider;
			y += dividend;
			x = x.toFixed(2); x = x * 1;
			y = y.toFixed(2); y = y * 1;
			true_x = x - Cl_1;  true_x = true_x.toFixed(2); true_x = true_x * 1;
			true_y = y - Cl_2;  true_y = true_y.toFixed(2); true_y = true_y * 1;
			if(true_x < 2 && true_x > -2 && true_y < 2 && true_y > -2) { x = Cl_1 ; y = Cl_2; }	
			if(Cl_1 < x && (parseInt(z / z_step) == z / z_step) && x >= 40) {
				if(num < 17) {num += 1;}
				else { num = 10; }
			}
			else if(Cl_1 == x || x < 40) { num = 9; movement_Left(0);}
		canvas_4.clearRect(0, 0, 700, 428);
		canvas_4.drawImage(extr, 100 * num, 0, 100, 201, x, 185, 100, 201);
		z += 1;
		location_shift_left(1, 10);
		}
	}, 1000/60);
	}
	else if(work == 0) { 
		canvas_4.clearRect(0, 0, 700, 428);
		canvas_4.drawImage(extr, 100 * 9, 0, 100, 201, x, 185, 100, 201);
	}
}
/*---------------------------------------------------------------------------------------------*/

/*--------------------------СДВИГ ЛОКАЦИИ------------------------------------------------------*/

function location_shift_left(work, a) {
	clearInterval(interval_shift_left);
	var step_a = 0;
	if(work == 1) {
		if(x <= 150) {
			interval_shift_left = setInterval(function() {
				//console.log('влево');
				if(C_1 > 30 && step_a <= 45) {
					movement_Left(0);
					dvig_left(a);
					canvas_4.clearRect(0, 0, 700, 428);
					x = x + a;
					step_a += 1;
					canvas_4.drawImage(extr, 100 * 9, 0, 100, 201, x, 185, 100, 201);
				}
			}, 1000/60);
		}
	}
	else if(work == 0) { 
		canvas_4.clearRect(0, 0, 700, 428);
		canvas_4.drawImage(extr, 100 * 0, 0, 100, 201, x, 185, 100, 201);
	}
}


function location_shift_right(work, a) {
	clearInterval(interval_shift_right);
	var step_a = 0;
	if(work == 1) {
		if(x >= 450) {
			interval_shift_right = setInterval(function() {
				//console.log('вправо');
				if(C_1 <= 1547 && step_a <= 45) {
					movement_Right(0);
					dvig_right(a);
					canvas_4.clearRect(0, 0, 700, 428);
					x = x - a;
					step_a += 1;
					canvas_4.drawImage(extr, 100 * 0, 0, 100, 201, x, 185, 100, 201);
				}
			}, 1000/60);
		}
	}
	else if(work == 0) {
		canvas_4.clearRect(0, 0, 700, 428);
		canvas_4.drawImage(extr, 100 * 9, 0, 100, 201, x, 185, 100, 201);
	}
}
/*------------------------------------------------------------------------------------*/
/*-------------------------ПЕРЕДЖВИЖЕНИЕ ПЕРСОНАЖА------------------------------------*/                                     // ШАГ 1
function moveExtr(event) {
	endSpeed = 2.5;
	Cl_1 = event.offsetX;// - clickMouseX; 
	//Cl_2 = event.offsetY;// - clickMouseY; 
	Cl_1 = Cl_1 - 50; // ЧТО-БЫ МЕСТО КЛИКА СОВПАДАЛО С НОГАМИ ПО X
	//Cl_2 = Cl_2 - 200; // ЧТО-БЫ МЕСТО КЛИКА СОВПАДАЛО С НОГАМИ ПО Y
	divide(Cl_1, 0/*Cl_2*/, x, y);
	if(Cl_1 >= x) { 
		movement_Right(1, coord_extr, Cl_1, 0/*Cl_2*/, counter); 
		location_shift_left(0, 10); 
	}
	else if(Cl_1 < x) { 
		movement_Left(1, coord_extr, Cl_1, 0/*Cl_2*/, counter); 
		location_shift_right(0, 10); 
	}
	//console.log('C_1'+' : '+C_1+' ; '+'Cl_1 '+' : '+Cl_1+' ; '+' Cl_2 '+' : '+Cl_2+' ; ' + 'x' + ' : ' + x + ' ; ' + 'y' + ' : ' + y + ' ; '+'divider'+' : '+divider+' ; '+'dividend'+' : '+dividend+' ; '+'distance_x'+' : '+distance_x+' ; '+'distance_y'+' : '+distance_y);
}
/*------------------------------------------------------------------------------------*/
/*--------------------------ОБНУЛЕНИЕ ПОСЛЕ АСТРАЛЬНОГО МИРА--------------------------*/

function zero_zero() {
	clearInterval(interval_shift_right);
	clearInterval(interval_shift_left);
	clearInterval(interval_4x);
	clearInterval(interval_4x);
	C_1 = 150;
	C_2 = 114;
	C_3 = 460;
	x = 350;
	y = 35;
}

/*------------------------------------------------------------------------------------*/
/*---------------------------ДИАЛОГ---------------------------------------------------*/

function wrapText(context, text, marginLeft, marginTop, maxWidth, lineHeight) {
        var words = text.split(" ");
        var countWords = words.length;
        var line = "";
        for (var n = 0; n < countWords; n++) {
            var testLine = line + words[n] + " ";
            var testWidth = context.measureText(testLine).width;
            if (testWidth > maxWidth) {
                context.fillText(line, marginLeft, marginTop);
                line = words[n] + " ";
                marginTop += lineHeight;
            }
            else {
                line = testLine;
            }
        }
		context.fillText(line, marginLeft, marginTop);
	}

var ii = 0;
var arr_phrase_1 = ['Итак, Виктор, сколько прошло?',
				  'Больше недели. Вы достали то, что я просил?', 
				  'В компании решили, что вы окажете ответную услугу. Это честная сделка. Заодно проверим, на что вы годитесь.',
				  'Выкладывайте.',
				  'Мы разыскиваем одного человека. Женщину. Всё что у нас есть - вот этот предмет...',
				  ' '];

function switch_touch() {
	if(c_textX >= 300 && c_textX <= 350 && c_textY >= 25 && c_textY <= 95) {
		c_text.drawImage(touch_hover, 0, 0, 94, 115, 300, 15, 94, 115);
		canv_text.addEventListener('click', stop_time_and_fill);
	}
	else { 
		canv_text.removeEventListener('click', stop_time_and_fill);
		c_text.clearRect(0, 0, 700, 120);
		c_text.drawImage(touch, 0, 0, 94, 115, 300, 15, 94, 115);
	}
}

function one_touch(work) {
	c_text.drawImage(touch, 0, 0, 94, 115, 300, 15, 94, 115);
	if(work == 1) {
		canv_text.addEventListener('mousemove', switch_touch);
		
	}
	else if(work == 0) {
		c_text.clearRect(0, 0, 700, 120);
		canv_text.removeEventListener('mousemove', switch_touch);
	}
}

function thing_draw() {
		canvas_4.drawImage(thing, 430, 278, 30, 23); 
}
				  
function switch_arr() {
	if(ii < 5) {
		if(ii % 2 == 0) {
			F_extr_speak(0);
			F_psih(1);
			c_text.fillStyle = '#a4a6b5';
		}
		else { 
			F_psih(0); 
			F_extr_speak(1); 
			c_text.fillStyle = '#f3e7e7';
		}
		c_text.clearRect(0, 0, 700, 120);
		wrapText(context, arr_phrase_1[ii], marginLeft, marginTop, maxWidth, lineHeight);
		ii++;
	}
	else if(ii == 5) {                     // ПОДСКАЗКА
		F_extr_speak(0);
		F_psih(0); 
		F_psih(3);
		c_text.clearRect(0, 0, 700, 120);
		wrapText(context, arr_phrase_1[5], marginLeft, marginTop, maxWidth, lineHeight);
		ii++;
	}
	else { 
		canv_text.removeEventListener('click', switch_arr);
		canv_4.removeEventListener('click', switch_arr);
		c_text.clearRect(0, 0, 700, 120);
		//one_touch(1);
	}
}

function add_envelope_touch() {
	canv_4.addEventListener('mousemove', envelope_touch);
}

function envelope_touch() {
	if(position_4X >= 410 && position_4X <= 455 && position_4Y >= 255 && position_4Y <= 290) {
		cursor_obj.take_curs();
		canv_4.addEventListener('click', Victor.victor_take);
	}
	else {
		cursor_obj.stand_curs();
		canv_4.removeEventListener('click', Victor.victor_take);
	}
}



function Dialog() {
	setTimeout(function() {
	switch_arr();
	/*-------------------------СОБЫТИЯ КЛИКА----------------------------------------------*/
	canv_text.addEventListener('click', switch_arr);
	canv_4.addEventListener('click', switch_arr);
	/*------------------------------------------------------------------------------------*/
	}, 2000);
}
/*--------------------------------------------------------------------------------------*/
/*--------------------------------ПОДСКАЗКИ И ПРОДОЛЖЕНИЕ ДИАЛОГА------------------------------*/
function tips() {
		c_text.clearRect(0, 0, 700, 120);
		wrapText(context, arr_phrase_1[ii], marginLeft, marginTop, maxWidth, lineHeight);
		ii++;
}
/*---------------------------------------------------------------------------------------------*/
function end_dial() {
	if(ii < 19) {
		if(ii % 2 == 0) {
			F_psih(1);
			F_extr_speak(0);
			c_text.fillStyle = '#a4a6b5';
		}
		else { 
			F_psih(0); 
			F_extr_speak(1); 
			c_text.fillStyle = '#f3e7e7';
		}
		c_text.clearRect(0, 0, 700, 120);
		wrapText(context, arr_phrase_1[ii], marginLeft, marginTop, maxWidth, lineHeight);
		ii++;
	}
	else { 
		canv_text.removeEventListener('click', end_dial);
		canv_4.removeEventListener('click',end_dial);
		F_extr_speak(0);
		F_psih(0);
		c_text.clearRect(0, 0, 700, 120);
		setTimeout(function() {
			extr_sit_stay();
			wrapText(context, arr_phrase_1[19], marginLeft, marginTop, maxWidth, lineHeight);
		}, 500);
	}
}

function continue_dial() {
	canv_4.addEventListener('click', end_dial);
	canv_text.addEventListener('click', end_dial);
	c_text.fillStyle = '#f3e7e7';
	pendulum_work(1);
	tips();
	F_extr_speak(1);
}


/*---------------------------------------------------------------------------------------------*/
/*--------------------------------------НАЧАЛО----------------------------------------------*/
function start_play() {
	canv_4.removeEventListener('click', start_play);
	canv_text.removeEventListener('click', start_play);
	c_text.clearRect(0, 0, 700, 120);
	c_text.fillStyle = '#3f4046';
	c_text.fillRect(0, 0, 700, 120);
	canvas.drawImage(img, C_1, 0, 700, 425, 0, 0, 700, 425);
	canvas_2.drawImage(pendulum, 126, 0, 37, 79, C_2, 0, 37, 79);
	F_psih(0);
	F_extr_speak(0);
	Dialog();
	o_pendulum.pendulum_work();
	//menu_play.removeEventListener('click', start_play);
}

function general_start() {
	c_text.fillStyle = '#000';
	c_text.font =  "normal 14px 'Press Start 2P'";
	c_text.fillText("Click for Play", 315, 60);
	canvas_4.fillStyle = '#000';
	canvas_4.fillRect(0, 0, 700, 425);
	canvas_4.fillStyle = '#fff';
	canvas_4.font =  "normal 46px 'Khula:600'";
	canvas_4.fillText("Click and Play", 215, 290);
	c_text.fillStyle = '#000';
	c_text.fillRect(0, 0, 700, 120);
	canv_4.addEventListener('click', start_play);
	canv_text.addEventListener('click', start_play);
}
/*------------------------------------------------------------------------------------------*/
//extra_vision_start();
//extr_sit_stay();
//canv_4.addEventListener('click', moveExtr);
//Dialog();
general_start();
