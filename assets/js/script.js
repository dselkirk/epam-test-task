$(function () {

	// Глобальные переменные

		// 	Массив книг
	var books = [];


	// Кнопки на странице конкретной книги

	var singlebookPage = $('.single-book');

	singlebookPage.on('click', function (e) {

		if (singlebookPage.hasClass('visible')) {

			var clicked = $(e.target);

			// На прошлую страницу возвращаемся, если были книги по кнопкам
			if (clicked.hasClass('close') || clicked.hasClass('overlay')) {
				window.location.hash = '#';
			}
		}
	});

	// Вызывается при рендеринге страницы

	// Получаем данные из books.json.
	$.getJSON( "books.json", function( data ) {

		// Записываем в переменную
		books = data;
		
		// Вызываем метод для генерации всех книг
		generateAllbooksHTML(books);

		// Вручную вызываем событие hashchange, чтобы начать приложение
		$(window).trigger('hashchange');
	});


	// При каждом изменении hash вызываем данный метод
	$(window).on('hashchange', function(){
		render(window.location.hash);
	});


	// Навигация

	function render(url) {

		// Получаем keyword из url
		var temp = url.split('/')[0];

		// Скрываем все
		$('.main-content .page').removeClass('visible');

		var	map = {

			// Домашняя страница
			'': function() {
				renderbooksPage(books);
			},

			// Страница книги
			'#book': function() {

				// Получаем индекс книги
				var index = url.split('#book/')[1].trim();

				renderSinglebookPage(index, books);
			},
		};

		// Выполняем функцию из temp
		if(map[temp]){
			map[temp]();
		}
		// Если роутинг неизвестен - выводим страницу ошибки
		else {
			renderErrorPage();
		}
	}

	// Функция вызывается только раз - при старте страницы.
	// Она заполняет книгами страницу. Данные получаются из books.json.
	function generateAllbooksHTML(data){

		var list = $('.all-books .books-list');

		var theTemplateScript = $("#books-template").html();

		// Компилируем шаблон
		var theTemplate = Handlebars.compile (theTemplateScript);
		list.append (theTemplate(data));


		// Каждая книга имеет data-index аттрибут.
		// При клике изменяем url, чтобы открыть превью конкретной книги
		// NB: каждый hashchange вызывает функцию render.
		list.find('li').on('click', function (e) {
			e.preventDefault();

			var bookIndex = $(this).data('index');

			window.location.hash = 'book/' + bookIndex;
		})
	}

	// Эта функция получает объект, содержащий все книги, что мы хотим показать
	function renderbooksPage(data){

		var page = $('.all-books'),
			allbooks = $('.all-books .books-list > li');

		// Скрываем все книги
		allbooks.addClass('hidden');

		// Проходимся по всем книгам
		// Если их id совпадает, то показываем
		allbooks.each(function () {

			var that = $(this);

			data.forEach(function (item) {
				if(that.data('index') == item.id){
					that.removeClass('hidden');
				}
			});
		});

		// Показываем саму страницу
		// (render функция скрывает все, поэтому мы должны выбирать, что показать).
		page.addClass('visible');

	}


	// Открывает превью для конкретной книги
	// Принимает в качестве параметра index из hash и сам объект книг
	function renderSinglebookPage(index, data){

		var page = $('.single-book'),
			container = $('.preview-large');

			// Перемещаемся в верх страницы
			$('html, body').scrollTop( 0 );

		// Находим нужную книгу из массива по index 
		if(data.length){
			data.forEach(function (item) {
				if(item.id == index){
					// Заполняем '.preview-large' данными.
					container.find('.book-header').text(item.title);
					container.find('.book-title').text(item.title);
					container.find('.book-photo').attr('src', item.image.large);
					container.find('.book-author').text(item.author);
					container.find('.book-year').text(item.year);
					container.find('.book-description').text(item.description);
				}
			});
		}

		// Показываем страницу
		page.addClass('visible');

	}


	// Покзываем страницу ошибок
	function renderErrorPage(){
		var page = $('.error');
		page.addClass('visible');
	}	
});