$(function(){
  var pokemonSearch;
  var defaultPokemonData;

  var initFunc = function() {



    defaultPokemonData = $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon/",
      method: "GET",
      dataType:"json",
    });



    defaultPokemonData.done(function( data ) {
      defaultPokemonData = data;



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



    $(".kaderRechts").removeClass('kaderRechts');
    $(".kaderRechts").addClass('kaderRechtsOpen');
    $(".kaderLinks").animate({"width": "30vw"});
    $(".pokedex").animate({"width": "65vw"});



//  $('.linksOpen').css("transform","translate(-30vw,0px)");



    pokemonSearch = $('input[type="text"]').val()

    var request = $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon/" + pokemonSearch,
      method: "GET",
      dataType:"json",
    });


    function randomNumber() {
    return Math.floor((Math.random() * 150) + 1);
    }

      if (pokemonSearch > 151) {
        alert( "First gen only, here's a random pokemon");

        var request = $.ajax({
          type: "GET",
          url: "https://pokeapi.co/api/v2/pokemon/" + randomNumber(),
          success: function(data){
              $("#zoeken").val(data.id);
           }
        })

      };


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
            $('.pokeAfb img').attr('src', data.sprites.front_default)


        console.log(data)

    });



    request.fail(function( jqXHR, textStatus, error) {
      alert( "Request failed: " + textStatus + ' ' + error);
    });
})

});



// END
