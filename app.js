$(function(){
  var pokemonSearch;
  var defaultPokemonData;

  var initFunc = function() {

    defaultPokemonData = $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon/?limit=151",
      method: "GET",
      dataType:"json",
    });



    defaultPokemonData.done(function( data ) {
      defaultPokemonData = data;


      // $('.pokedex h3').text(defaultPokemonData.name.toUpperCase())

  /*    $('.poke-img img').attr('src', defaultPokemonData.sprites.front_default)
      console.log(data)*/
    });

    defaultPokemonData.fail(function( jqXHR, textStatus, error) {
      alert( "Request failed: " + textStatus + ' ' + error);
    });
  }


  initFunc()


  $('input').focus(function() {
      this.value = '';
  });



  $('.button').on('click', function(){

    pokemonSearch = $('input[type="text"]').val()

    var request = $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon/" + pokemonSearch,
      method: "GET",
      dataType:"json",
    });


    request.done(function( data ) {
      $('.nameText').text(data.name)

      $('.heightText').html(data.height /10 + "m")
      $('.weightText').html(data.weight /10 + "kg")


      var api2="https://pokeapi.co/api/v2/pokemon-species/" + data.id

      $.getJSON(api2, function(data2){
          $('.descriptionText').html(data2.flavor_text_entries[1].flavor_text);

        })




          $('.typesText').html(data.types[1].type.name + ", " + data.types[0].type.name);






            $('.pokedex h3').text(data.name.toUpperCase())

            $('.poke-img img').attr('src', data.sprites.front_default)

        console.log(data)

    });



    request.fail(function( jqXHR, textStatus, error) {
      alert( "Request failed: " + textStatus + ' ' + error);
    });
})

});



// END
