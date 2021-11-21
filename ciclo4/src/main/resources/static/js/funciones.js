window.onload = function(){

    document.getElementById("botonIngresar").addEventListener("click", ingreso);

}

const BASE_URL = "/api/user";

function ingreso(){

    console.log("se pulso el boton");

    /**
     * Se capturan datos de input email y password
     */
    let $email = document.getElementById("email").value;
    let $password = document.getElementById("password").value;

    console.log("email --> ", $email, "password--> ", $password);

    /**
     * se ejecuta peticion GET, AJAX.
     */
    validarEmailPassword($email,$password);

}

function validarEmailPassword(email,password){

    /**
     * peticion AJAX GET para validar si existe el correo y la clave
     * esta relacionada
     * 
     */
    $.ajax (
                {
                    url          :  BASE_URL+'/'+email+"/"+password,
                    type         : 'GET',
                    dataType     : 'json',
                    success      :  function(json){
                                        console.log("-- Respuesta GET --");
                                        console.log(json);
                                        respuestaIngreso(json);
                                    },
                    error        :   function(xhr,status){
                                        console.log("Error --> ",status)
                                    },
                    complete     :  function(xhr,status){
                                        console.log("Peticion GET validarEmailPassword completada -->",status)
                                    }
                }
        );
}


function respuestaIngreso(json){

    if(json.name != "NO DEFINIDO"){
        alert("La informacion de inicio de sesion es CORRECTA");
    }
    else{
        alert("La informacion de inicio de sesion es INCORRECTA");
    }

}
