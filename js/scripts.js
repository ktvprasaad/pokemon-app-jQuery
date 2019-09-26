var $ul = $('.pokemon-list');

// IIFE - Immeditaly Invoked Function Expression --> (function() {})();
var pokemonRepository = (function () {
	var repository = [];
	var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

	/* Add the loaded pokemons to our repository */
	function add(pokemon) {
		repository.push(pokemon);
	}
	/* Load pokemon from the api thru http's fetch method and Promise class */
	function loadList() {
		return $.ajax(apiUrl, {
			method: 'GET',
			dataType: 'json'
		}).then(function(item){
			//console.log(item.results); //array of objects for JS generated */
			$.each(item.results,(function(index,item){
				//console.log(item);
				var pokemon = {
					name: item.name,
					detailsUrl: item.url,
				};
				add(pokemon);
			}));
		}).catch(function(e){
			console.error(e);
		});
	}

	/* To close the poped up modal that has pokemon's details */
	function hideModal() {
		if ($('#modal-container').hasClass('is-visible')) {
			/* To remove the #modal-container's element and all its children */
			$('#modal-container').remove();
		}
	}
	/* get all the pokemons from our repository */
	function getAll() {
		return repository;
	}

	/* To show detail of the pokemon on the modal */
	function showModal(event, pokemon) {
		var listElement = $(event.target).parent();

		var modalContainer = $('<div id="modal-container" class="is-visible"></div>')

		var modal = $('<div class="modal"></div>');

		var closeButtonElement = $('<button class="modal-close">X</button>')
		closeButtonElement.on('click', hideModal);

		var img = $(`<img src="${pokemon.imageUrl}" alt="${pokemon.name}'s Image">`);


		var titleElement = $(`<h2>I'm ${pokemon.name} !!</h2>`);

		var textDiv = $('<div class="modal-text-div"></div>');
		var textElementHeight = $('<p></p>').text('Height : ' + pokemon.height/10 + ' m.');
		var textElementWeight = $('<p></p>').text('Weight : ' + pokemon.weight/10 + ' kg.');

		textDiv.append(textElementHeight)
		.append(textElementWeight)

		modal.append(closeButtonElement)
		.append(titleElement)
		.append(img)
		.append(textDiv)

		modalContainer.append(modal);
		listElement.append(modalContainer);
	}

	/* show details of the specific pokemon that is clicked by the user */
	function showDetails(event, pokemon) {
		var url = pokemon.detailsUrl; // https://pokeapi.co/api/v2/pokemon/1/ --> Sample
		$.ajax(url, {
			method: 'GET',
			dataType: 'json'
		}).then(function(details){
			//console.log(details); //would print particular pokemon (object)'s detail
			pokemon.imageUrl = details.sprites.front_default;
			pokemon.height = details.height;
			pokemon.weight = details.weight;
			/* Function call to display modal */
			showModal(event, pokemon);
			// pokemon.types = Object.keys(details.types);
		}).catch(function(e){
			console.error(e);
		});
	}

	/* DOM - Document Object Model - Add all the pokemons name alone from the
	repository to the html list */
	function addListItem(pokemon) {
		/* To create 'li' element */
		var listItemElement = $('<li class="pokemon-list--item"></li>');
		/* To create 'button' element */
		var buttonElement = $(`<button>${pokemon.name}</button>`);
		listItemElement.append(buttonElement);
		$ul.append(listItemElement);
		// .velocity({boxShadowBlur: 5%})
		buttonElement.on('click', function(event){
			showDetails(event, pokemon);
		});
	}

	/* To close the poped up modal that has pokemon's details thru escape key in the keyboard */
	$(window).on('keydown', function(e) {
		if (e.key === 'Escape' && ($('#modal-container'))) {
			hideModal();
		}
	});

	/* To close the poped up modal that has pokemon's details clicking on anywhere on the screen */
	$('body').on('click',function(e) {
		if ($(e.target).hasClass('is-visible')) {
			hideModal();
		}
	});

	// $(window).scroll(function() { return false; });

	return {
		loadList,
		add,
		getAll,
		addListItem,
		showDetails,
		showModal,
		hideModal,
	};
}());

pokemonRepository.loadList().then(function() {
	$.each(pokemonRepository.getAll(),function(index,pokemon) {
		pokemonRepository.addListItem(pokemon);
	});

	$('#pokey').on('input',function() {
		// var searchKey =  this.value.trim().toLowerCase();
		var searchKey = $('#pokey').val().trim().toLowerCase();
		$('.pokemon-list--item').filter(function(){
			// returns only which is true and the toggle hides or makes it visible if the user keyed in exists in the pokemon-list--item
			$(this).toggle($(this).text().toLowerCase().indexOf(searchKey) > -1);
		});
	});

	var colorNum = (Math.floor(Math.random() * 5) + 1);

	if(colorNum === 1) {
		$('h1').css('color','royalblue');
	} else if(colorNum === 2) {
		$('h1').css('color','olive');
	} else if(colorNum === 3) {
		$('h1').css('color','coral');
	} else if(colorNum === 4) {
		$('h1').css('color','darkgoldenrod');
	} else if(colorNum === 5) {
		$('h1').css('color','purple');
	}


});
