// IIFE - Immeditaly Invoked Function Expression --> (function () {})();
var $;
var pokemonRepository = (function () {
    'use strict';
    var repository = [],
        apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=108';

    /* Add the loaded pokemons to our repository */
    function add(pokemon) {
        repository.push(pokemon);
    }
    /* Load pokemon from the api thru http's fetch method and Promise class */
    function loadList() {
        return $.ajax(apiUrl, {
            method: 'GET',
            dataType: 'json'
        }).then(function (item) {
            //console.log(item.results); //array of objects for JS generated */
            $.each(item.results, (function (index, result) {
                //console.log(item);
                var pokemon = {
                    name: result.name,
                    detailsUrl: result.url
                };
                add(pokemon);
            }));
        }).catch(function (e) {
            console.error(e);
        });
    }

    /* get all the pokemons from our repository */
    function getAll() {
        return repository;
    }

    /* show details of the specific pokemon that is clicked by the user */
    function showDetails(event, pokemon) {
        var url = pokemon.detailsUrl;
        $.ajax(url, {
            method: 'GET',
            dataType: 'json'
        }).then(function (details) {
            //console.log(details); //would print particular pokemon (object)'s detail
            pokemon.imageUrl = details.sprites.front_default;
            pokemon.height = details.height;
            pokemon.weight = details.weight;

            // $('.modal-title').text(`Hi! I'm ${pokemon.name}`);
            $('.modal-title').text('Hi! I\'m ' + pokemon.name);

            var modalDiv = $('<div></div>'),
            // var modalElementImg = $(`<img src="${pokemon.imageUrl}" alt="${pokemon.name}'s Image">`);
                modalElementImg = $('<img src="' + pokemon.imageUrl + '" alt="' + pokemon.name + '\'s Image">'),
                modalElementHeight = $('<p></p>').text('Height : ' + pokemon.height / 10 + ' m.'),
                modalElementWeight = $('<p></p>').text('Weight : ' + pokemon.weight / 10 + ' kg.');

            modalDiv.append(modalElementImg)
                    .append(modalElementHeight)
                    .append(modalElementWeight);

            $('.modal-body').html(modalDiv);

        }).catch(function (e) {
            console.error(e);
        });
    }

    /* DOM - Document Object Model - Add all the pokemons name alone from the
    repository to the html list */
    function addListItem(pokemon) {
        /* To create 'div' element */
        var divItemElement = $('<div class="pokemon-div--item"></div>'),
            divElement = $('<div class="col-1 col-lg-4 col-md-3"></div>'),
        /* To create 'button' element */
        // var buttonElement = $(`<button type="button" class="btn-pokemon btn btn-primary" data-toggle="modal" data-target="#pokemon-modal">${pokemon.name}</button>`);
            buttonElement = $('<button type="button" class="btn-pokemon btn btn-primary" data-toggle="modal" data-target="#pokemon-modal">' + pokemon.name + '</button>');
        // console.log(pokemon.name);
        divElement.append(buttonElement);
        divItemElement.append(divElement);
        $('.pokemon-div').append(divItemElement);
        buttonElement.on('click', function (event) {showDetails(event, pokemon); });
    }

    return {
        loadList: loadList,
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails
    };
}());

pokemonRepository.loadList().then(function () {
    'use strict';
    $.each(pokemonRepository.getAll(), function (index, pokemon) {
        pokemonRepository.addListItem(pokemon);
    });

    //$(document).ready(function () {
    $('.pokey').on('input', function () {
        var searchKey = $('.pokey').val().trim().toLowerCase();
        $('.pokemon-div--item').filter(function () {
            // returns only which is true and the toggle hides or makes it visible if the user keyed in exists in the pokemon-div--item
            $(this).toggle($(this).text().toLowerCase().indexOf(searchKey) > -1);
        });
    });

    var colorNum = (Math.floor(Math.random() * 3) + 1);
    if (colorNum === 1) {
        $('h1,label').css('color', 'royalblue');
        $('.pokey').css('border', '1px solid royalblue');
        $('nav').css('border-bottom', '1px outset royalblue');
        $('.btn-pokemon').css('background-color', '#b8c7f4');
    } else if (colorNum === 2) {
        $('h1,label').css('color', 'darkolivegreen');
        $('.pokey').css('border', '1px solid darkolivegreen');
        $('nav').css('border-bottom', '1px outset darkolivegreen');
        $('.btn-pokemon').css('background-color', '#c0d49e');
    } else if (colorNum === 3) {
        $('h1,label').css('color', 'purple');
        $('.pokey').css('border', '1px solid purple');
        $('nav').css('border-bottom', '1px outset purple');
        $('.btn-pokemon').css('background-color', '#ead5ff');
    }
    //});
});
