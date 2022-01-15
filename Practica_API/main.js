const API_URL = "https://jsonplaceholder.typicode.com";

// HAY 2 MÉTODOS PARA LLAMAR API REST CON JS CRUDO,

// 1- XMLHttpRequest() -> antiguo metodo que crea un objeto con metodos para realizar llamadas:

const xhr = new XMLHttpRequest();

// creamos una función que servira para manejar los resultados de las llamadas, se utilizará como callback mas adelante:

function onRequestHandler() {
  /* primero un comprovante que la llamada ha sido satisfactoria segun el código de la respuesta.
     Al ser una petición asincrona, también es bueno comprobar si su estado es el correcto, distinguimos 5 estados segun la etapa en que se encuentra:
    0 = UNSET, no se ha llamado al método OPEN del objeto XMLHttpRequest
    1 = OPENED, ya se ha llamado al método OPEN
    2 = HEADERS_RECEIVED, se esta llamando al método SEND
    3 = LOADING, esta recibiendo la respuesta
    4 = DONE, se ha recibido la respuesta y completado la petición. */
  if (this.status === 200 && this.readyState === 4) {
    // Parseamos a JSON los datos recibidos
    const data = JSON.parse(this.response);

    //Una vez parseados, podemos pintar los datos en el HTML:
    // Creamos variable con la zona del HTML donde vamos a pintar los datos
    const HTMLxhr = document.querySelector("#xhr");

    //Seleccionamos los datos a pintar y el modo para incluirlos en el HTML:
    const dataList = data.map(
      (user) =>
        `<li>👤 ${user.name} 📧 ${user.email} 📍 ${user.address.city}</li>`
    );

    //Incluimos en la parte html seleccionada:
    HTMLxhr.innerHTML = `<h1>XMLHttpRequest()</h1><ul> ${dataList} </ul>`;
  }
}

// Para ejecutar la función podemos usar el evento de cargar la página:
xhr.addEventListener("load", onRequestHandler);

// Ahora podemos llamar al método OPEN para pasar al estado 1, este metodo necesita dos parametros: el metodo HTTP y el endpoint.
xhr.open("GET", `${API_URL}/users`);

// Una vez en el estado 1, podemos llamar al metodo SEND para realizar la llamada, este metodo no tiene parametros, se utilizan los parametros del meotodo OPEN para la petición.
xhr.send();

//Esto nos devuelve los datos del servidor consultado en formato texto. Por lo que si queremos trabajar con estos datos debemos parsearlo dentro de la función



// 2 - FETCH() -> función introducida en ES6 para simplificar todo el proceso anterior

const pokeApi = 'https://pokeapi.co/api/v2'
const fakeStore = 'https://fakestoreapi.com'

// Primero seleccionamos la zona del HTML donde imprimir los datos recibidos
const HTMLfetch = document.querySelector("#fetch");

// Llamamos a la función FETCH() con parametro la URL a consultar, esta función devuelve una promesa, por lo que podemos utilizar metodos .then .catch o .finally. Por otro lado, FETCH tiene un metodo para parsear a json directamente con .json(), se suele hacer en el primer then() y utilizar el retorno parseado en los siguientes then().
fetch(`${fakeStore}/products`)
  .then((response) => response.json())
  .then((products) => {
      const dataList = products.map(product => `<li>${product.title} <b>$</b>${product.price.toFixed(2)}</li>`);
      HTMLfetch.innerHTML = `<h1>Fetch()</h1><ul> ${dataList} </ul>`
  });
