$(function () {

	// Globals variables

		// 	An array containing objects with information about the books.
	var books = [];



	// Single book page buttons

	var singlebookPage = $('.single-book');

	singlebookPage.on('click', function (e) {

		if (singlebookPage.hasClass('visible')) {

			var clicked = $(e.target);

			// If the close button or the background are clicked go to the previous page.
			if (clicked.hasClass('close') || clicked.hasClass('overlay')) {
				// Change the url hash with the last used filters.
				createQueryHash(filters);
			}

		}

	});


	// These are called on page load

	// Get data about our books from books.json.
	//$.getJSON( "books.json", function( data ) {

		// Write the data into our global variable.
		//books = data;

			books = [
  {
    "id": 1,
    "title": "Eloquent JavaScript",
    "author": "Marijn Haverbeke",
    "year": 2013,    
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique ipsum in efficitur pharetra. Maecenas luctus ante in neque maximus, sed viverra sem posuere. Vestibulum lectus nisi, laoreet vel suscipit nec, feugiat at odio. Etiam eget tellus arcu.",
    "image": {
      "small": "assets/images/eloquent_js.png",
      "large": "assets/images/eloquent_js_large.png"
    }
  },
  {
    "id": 2,
    "title": "Eloquent JavaScript",
    "author": "Marijn Haverbeke",
    "year": 2013,    
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique ipsum in efficitur pharetra. Maecenas luctus ante in neque maximus, sed viverra sem posuere. Vestibulum lectus nisi, laoreet vel suscipit nec, feugiat at odio. Etiam eget tellus arcu.",
    "image": {
      "small": "assets/images/eloquent_js.png",
      "large": "assets/images/eloquent_js_large.png"
    }
  },
  {
    "id": 3,
    "title": "Eloquent JavaScript",
    "author": "Marijn Haverbeke",
    "year": 2013,    
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique ipsum in efficitur pharetra. Maecenas luctus ante in neque maximus, sed viverra sem posuere. Vestibulum lectus nisi, laoreet vel suscipit nec, feugiat at odio. Etiam eget tellus arcu.",
    "image": {
      "small": "assets/images/eloquent_js.png",
      "large": "assets/images/eloquent_js_large.png"
    }
  },
  {
    "id": 4,
    "title": "Eloquent JavaScript",
    "author": "Marijn Haverbeke",
    "year": 2013,    
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique ipsum in efficitur pharetra. Maecenas luctus ante in neque maximus, sed viverra sem posuere. Vestibulum lectus nisi, laoreet vel suscipit nec, feugiat at odio. Etiam eget tellus arcu.",
    "image": {
      "small": "assets/images/eloquent_js.png",
      "large": "assets/images/eloquent_js_large.png"
    }
  },
  {
    "id": 5,
    "title": "Eloquent JavaScript",
    "author": "Marijn Haverbeke",
    "year": 2013,    
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique ipsum in efficitur pharetra. Maecenas luctus ante in neque maximus, sed viverra sem posuere. Vestibulum lectus nisi, laoreet vel suscipit nec, feugiat at odio. Etiam eget tellus arcu.",
    "image": {
      "small": "assets/images/eloquent_js.png",
      "large": "assets/images/eloquent_js_large.png"
    }
  },
  {
    "id": 6,
    "title": "Eloquent JavaScript",
    "author": "Marijn Haverbeke",
    "year": 2013,    
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique ipsum in efficitur pharetra. Maecenas luctus ante in neque maximus, sed viverra sem posuere. Vestibulum lectus nisi, laoreet vel suscipit nec, feugiat at odio. Etiam eget tellus arcu.",
    "image": {
      "small": "assets/images/eloquent_js.png",
      "large": "assets/images/eloquent_js_large.png"
    }
  },
  {
    "id": 7,
    "title": "Eloquent JavaScript",
    "author": "Marijn Haverbeke",
    "year": 2013,    
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique ipsum in efficitur pharetra. Maecenas luctus ante in neque maximus, sed viverra sem posuere. Vestibulum lectus nisi, laoreet vel suscipit nec, feugiat at odio. Etiam eget tellus arcu.",
    "image": {
      "small": "assets/images/eloquent_js.png",
      "large": "assets/images/eloquent_js_large.png"
    }
  },
  {
   "id": 8,
    "title": "Eloquent JavaScript",
    "author": "Marijn Haverbeke",
    "year": 2013,    
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique ipsum in efficitur pharetra. Maecenas luctus ante in neque maximus, sed viverra sem posuere. Vestibulum lectus nisi, laoreet vel suscipit nec, feugiat at odio. Etiam eget tellus arcu.",
    "image": {
      "small": "assets/images/eloquent_js.png",
      "large": "assets/images/eloquent_js_large.png"
    }
  }
]

		// Call a function to create HTML for all the books.
		generateAllbooksHTML(books);

		// Manually trigger a hashchange to start the app.
		$(window).trigger('hashchange');
	//});


	// An event handler with calls the render function on every hashchange.
	// The render function will show the appropriate content of out page.
	$(window).on('hashchange', function(){
		render(window.location.hash);
	});


	// Navigation

	function render(url) {

		// Get the keyword from the url.
		var temp = url.split('/')[0];

		// Hide whatever page is currently shown.
		$('.main-content .page').removeClass('visible');


		var	map = {

			// The "Homepage".
			'': function() {

				// Clear the filters object, uncheck all checkboxes, show all the books
				filters = {};
				checkboxes.prop('checked',false);

				renderbooksPage(books);
			},

			// Single books page.
			'#book': function() {

				// Get the index of which book we want to show and call the appropriate function.
				var index = url.split('#book/')[1].trim();

				renderSinglebookPage(index, books);
			},
		};

		// Execute the needed function depending on the url keyword (stored in temp).
		if(map[temp]){
			map[temp]();
		}
		// If the keyword isn't listed in the above - render the error page.
		else {
			renderErrorPage();
		}

	}


	// This function is called only once - on page load.
	// It fills up the books list via a handlebars template.
	// It recieves one parameter - the data we took from books.json.
	function generateAllbooksHTML(data){

		var list = $('.all-books .books-list');

		var theTemplateScript = $("#books-template").html();
		//Compile the template​
		var theTemplate = Handlebars.compile (theTemplateScript);
		list.append (theTemplate(data));


		// Each books has a data-index attribute.
		// On click change the url hash to open up a preview for this book only.
		// Remember: every hashchange triggers the render function.
		list.find('li').on('click', function (e) {
			e.preventDefault();

			var bookIndex = $(this).data('index');

			window.location.hash = 'book/' + bookIndex;
		})
	}

	// This function receives an object containing all the book we want to show.
	function renderbooksPage(data){

		var page = $('.all-books'),
			allbooks = $('.all-books .books-list > li');

		// Hide all the books in the books list.
		allbooks.addClass('hidden');

		// Iterate over all of the books.
		// If their ID is somewhere in the data object remove the hidden class to reveal them.
		allbooks.each(function () {

			var that = $(this);

			data.forEach(function (item) {
				if(that.data('index') == item.id){
					that.removeClass('hidden');
				}
			});
		});

		// Show the page itself.
		// (the render function hides all pages so we need to show the one we want).
		page.addClass('visible');

	}


	// Opens up a preview for one of the books.
	// Its parameters are an index from the hash and the books object.
	function renderSinglebookPage(index, data){

		var page = $('.single-book'),
			container = $('.preview-large');

		// Find the wanted book by iterating the data object and searching for the chosen index.
		if(data.length){
			data.forEach(function (item) {
				if(item.id == index){
					// Populate '.preview-large' with the chosen book's data.
					container.find('h3').text(item.name);
					container.find('img').attr('src', item.image.large);
					container.find('p').text(item.description);
				}
			});
		}

		// Show the page.
		page.addClass('visible');

	}


	// Shows the error page.
	function renderErrorPage(){
		var page = $('.error');
		page.addClass('visible');
	}

	// Get the filters object, turn it into a string and write it into the hash.
	function createQueryHash(){
		window.location.hash = '#';
	}



});