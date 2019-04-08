const request = require('request');

function metMatches(search_term, callback){
  request.get({ url: `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search_term}`,
    json: true }, (error, response, data) => {
      if(!response){
        const result = {
          error: "Error: No hubo respuesta del Met."
        }
        callback(result, "")
      }
      else if(data.total != null && data.total > 0){
        const result = data.objectIDs[0];
        callback("", result)
    }
    else{
      if(typeof data.total == 'undefined' || data.total == 0){
        const result = {
          error: `Error: No se encontró nada sobre un tal ${search_term}.`
        }
        callback(result, "")
      }
      else if(error){
        callback(error, "")
      }
    }
    });
}

function findObject(object_id, callback){
  request.get({ url: `https://collectionapi.metmuseum.org/public/collection/v1/objects/${object_id}`,
  json: true }, (error, response, data) => {
    if(!response){
      const result = {
        error: "Error: No hubo respuesta del Met."
      }
      callback(result, "")
    }
      else if(!error){
        if(data.title!=null && data.constituents==null){
          const result = {
            artist : "Esta pieza no tiene artista!",
            title: data.title,
            year: data.objectEndDate,
            technique: data.medium,
            metUrl: data.objectURL
          }
          callback("", result)
        }
        else{
        const result = {
            artist : data.constituents[0].name,
            title: data.title,
            year: data.objectEndDate,
            technique: data.medium,
            metUrl: data.objectURL
          }
          callback("", result)
        }
      }
    else{
      const result = {
        error: `${data.error}`
      }
      callback(result, "")
    }
  });
}

module.exports = {
  metMatches: metMatches,
  findObject: findObject
}
