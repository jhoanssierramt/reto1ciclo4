
/**
 * URL de acceso a recurso
 */
const BASE_URL = "http://localhost:8080/api/user";

/**
 * Esperar a que los elementos HTML esten cargados:
 */
 window.onload = function(){
    //Aquí se obtienen los parámetros que se enviaron a través de la URL:
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const $id = urlParams.get('id');
    getUser($id);
}

async function getUser(id) {
    try {
        const url = BASE_URL + '/' + id;
        console.log("url: ", url);
        const fetchOptions = {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        };
        const response = await fetch(url, fetchOptions);
        const responseConverted = await response.json();
        console.log(`esta es la respuesta`, responseConverted);
        //Enviando al HTML los datos que provienen de la URL:
        document.getElementById("name").textContent = responseConverted.name;
        document.getElementById("email").textContent = responseConverted.email;
        document.getElementById("type").textContent = responseConverted.type;
    } catch (error) {
        console.log(`error`, error);
    }
}