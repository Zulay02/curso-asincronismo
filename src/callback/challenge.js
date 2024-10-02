const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; //Llamado al XMLHttpRequest.
const API = 'https://api.escuelajs.co/api/v1';//APIen mayúscula porque es una referencia qu no va cambiar.

function fetchData(urlApi, callback) { //urlApi: no confundir y colocar en mayúscula.
    let xhttp = new XMLHttpRequest(); //referencia a new XMLHttpRequest.

    xhttp.open('GET', urlApi, true); //petición "obtener" con true para habilitarla
    xhttp.onreadystatechange = function (event) { //escucha diferentes estados de la solicitud y conocer cuando está disponible la información
        if (xhttp.readyState === 4) {//si el estado ha sido completado la llamada
            if(xhttp.status === 200){ //el servidor responde de forma correcta
              callback(null, JSON.parse(xhttp.responseText)); // dentro de xhttp.responseText recibimos lo que el servidor entrega en texto y se hace la transformacion en JSON. 
            } 
            else {
              const error = new Error('Error' + urlApi);
              return callback(error, null);// Es null porque no se está regresando ning+un dato
            }
        }  
    }
    xhttp.send();
}
///La nueva forma de hacer peticiones a una API es el fetch.
fetchData(`${API}/products`, function (error1, data1){
    if (error1) return console.error(error1);
    fetchData(`${API}/products/${data1[0].id}`, function (error2, data2){
        if (error2) return console.error(error2);
        fetchData(`${API}/categories/${data2?.category?.id}`, function (error3, data3) {
            if (error3) return console.error(error3);
            console.log(data1[0]);
            console.log(data2.title);
            console.log(data3.name);
        });      
    });
}); 
   
