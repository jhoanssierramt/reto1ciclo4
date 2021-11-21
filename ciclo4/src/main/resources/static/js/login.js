const urlBaseUser= "/api/user";
window.onload = function(){
//Eventos

function verificarUsuario(email, password){
    $.ajax({
        url: urlBaseUser + "/" + email + "/" + password,
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
           // actualizarTabla(respuesta);
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('ha sucedido un problema');
        }
    });
}

const $formulario = document.querySelector("#formulario");
$formulario.addEventListener("submit",onSubmit());

function onSubmit($event){
    let $email = document.getElementById("#email");
    $event.preventDefault();
    console.log('correo: ',$email);
    alert( 'formulario' );

}

}