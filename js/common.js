var $messages = $('.messages-content'), 
	d, h, m, 
	i = 0;

$(window).load(function() {
	setTimeout(function() {
		fakeMessage();
	});
}); 


function updateScrollbar() {
	var $chatCont = $('.chat-container')
	$chatCont.css('bottom', '0px')
}


var Fake = [
	'Здравствуйте. Я ЖКХ-бот. Решаю вопросы, пока люди заняты',
	'Приятно познакомиться',
	'Давайте для начала я расскажу, что умею...',
	'В моем арсенале ряд услуг: Ремонт, Обслуживание, Установка Оборудования и домашний помощник',
	'Через меня вы можете заказать все: от химчистки до установки бытовой техники',
	'Кстати, вот к примеру самые популярные услуг: "Проверка расхода воды", "Поклейка обоев" и т.д. и т.п. ',
	'Бонусом - я помогу оплатить ваши счета. И вам даже не надо регистрироваться!',
	'Но если, что-то пойдет не так - служба поддержки решит любые вопросы',
	'Ну пока',
	';)'
]


function setDate() {
	d = new Date();
	if (m != d.getMinutes()) {
		m = d.getMinutes();
		if (m < 10) {
			$('<div class="timestamp">' + d.getHours() 
				+ ':' + '0' + m + '</div>').appendTo($('.message:last'));
		} else {
			$('<div class="timestamp">' + d.getHours() 
				+ ':' + m + '</div>').appendTo($('.message:last'));
		}
		
	}
}


function insertMessage() {
	msg = $('.message-input').val();
	if ($.trim(msg) == '') {
		return false;
	}
	$('<div class="message message-personal">' + msg + '</div>').appendTo($('.chat-container')).addClass('new');
	setDate();
	$('.message-input').val(null);

	updateScrollbar();

	setTimeout(function() {
		fakeMessage();
	}, 1000 + (Math.random() * 20) * 100);
}

//отправка смс по нажатию на кнопку
$('.message-submit').click(function() {
	insertMessage();
});

//на клавишу enter 
$(window).on('keydown', function(e) {
	if (e.which == 13) {
		insertMessage();
		return false;
	}
});


//сообщения от бота

function fakeMessage() {
	if ($('.message-input').val() != '') {
		return false;
	}
	$('<div class="message loading new"><figure class="avatar"><img src="img/roboto-logo.svg"></figure><span></span></div>').appendTo($('.chat-container'));
	
	updateScrollbar();

	setTimeout(function() {
		$('.message.loading').remove();
		$('<div class="message new"><figure class="avatar"><img src="img/roboto-logo.svg"></figure>' 
			+ Fake[i] + '</div>').appendTo($('.chat-container')).addClass('new');
		setDate();

		updateScrollbar();
		
		i++;
	}, 1000 + (Math.random() * 20) * 100);
}

