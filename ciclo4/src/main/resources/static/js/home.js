/**
 * Esperar a que los elementos HTML esten cargados:
 */
 window.onload = function(){
 
    //Aquí se obtienen los parámetros que se enviaron a través de la URL:
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const $email = urlParams.get('email');
    const $pswd = urlParams.get('pswd');
    const $name = urlParams.get('name');
    

    //Enviando al HTML los datos que provienen de la URL:
    document.getElementById("name").textContent = $name;
    document.getElementById("email").textContent = $email;
}


$(function () {
    $(window).on('scroll', function () {
        if ( $(window).scrollTop() > 10 ) {
            $('.navbar').addClass('active');
        } else {
            $('.navbar').removeClass('active');
        }
    });
})