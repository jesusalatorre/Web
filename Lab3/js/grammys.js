$.ajax({
    url : "data/grammys.json",
    type : "GET",
    dataType : "json",
    success: function(data) {

      for(let i = 0; i < data.fields.length; i++) {
        var dropdownItem = document.createElement('option')
        dropdownItem.text = data.fields[i].field
        dropdownItem.value = data.fields[i].field_id
        $('#category_types').append(dropdownItem)
      }

      loadOptionInfo(data, 1)
      $('#category_types').on('change', function(event) {
        let catSelected = this.value
        loadOptionInfo(data, catSelected)
      })},
  })
function loadOptionInfo(data, catSelected){
    $('#nominees_section').empty();
    $('#category_section').empty();
    for(let i=0; i < data.fields.length; i++) {
        if (data.fields[i].field_id == catSelected){
          var catNueva = document.createElement('h2')
          catNueva.textContent = data.fields[i].field
          var infoNueva = document.createElement('p')
          infoNueva.textContent = data.fields[i].description
          infoNueva.classList.add('description')
          $('#category_section').append(catNueva)
          $('#category_section').append(infoNueva)
          for (let j = 0; j < data.fields[i].categories.length; j++){
            var blockNuevo = document.createElement('div')
            var ulNominados = document.createElement('ul')
            for (let k = 0; k < data.fields[i].categories[j].nominees.length; k++){
              var liArtist = document.createElement('li')
              liArtist.textContent = data.fields[i].categories[j].nominees[k].nominee
              if (k == data.fields[i].categories[j].winner_id){
                liArtist.classList.add('winner')
                var emptySpan = document.createElement('span')
                emptySpan.textContent = 'WON THE GRAMMY!!'
                liArtist.append(emptySpan)
              }
              ulNominados.append(liArtist)
              var artNuevo = document.createElement('p')
              artNuevo.textContent = data.fields[i].categories[j].nominees[k].artist
              ulNominados.append(artNuevo)
              var newInfo = document.createElement('p')
              newInfo.textContent = data.fields[i].categories[j].nominees[k].info
              ulNominados.append(newInfo)
            }
            var premio = document.createElement('h3')
            premio.textContent = data.fields[i].categories[j].category_name
            var descPremio = document.createElement('p')
            descPremio.textContent = data.fields[i].categories[j].description
            descPremio.classList.add('description')
            blockNuevo.append(premio)
            blockNuevo.append(descPremio)
            blockNuevo.append(ulNominados)
            blockNuevo.classList.add('container')
            $('#nominees_section').append(blockNuevo)
            $('#nominees_section').append(document.createElement('hr'))
          }
        }
    }

}
