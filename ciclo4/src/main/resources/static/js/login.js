
/**
 * Se utiliza para que añada el evento despues
 * de que los elementos HTML esten cargados
 * 
 */

 window.onload = function(){
 
    document.getElementById("formulario").addEventListener("submit", ingreso);
    //document.getElementById("botonIngresar").addEventListener("click", ingreso);
    document.getElementById("botonRegistrar").addEventListener("click", registro);

}

/**
 * URL de acceso a recurso
 */
 const BASE_URL = "/api/user";

 /**
  * funcion que se ejecuta al detectar el evento click en el boton
  * de ingreso
  */
 
  async function ingreso(){
     console.log("se pulsó el boton de Ingreso");
 
     /**
      * Se capturan datos de input email y password
      */
     let $email = document.getElementById("email").value;
     let $password = document.getElementById("password").value;
 
     console.log("email --> ", $email, "password--> ", $password);
 
         if($email.length <= 0){
 
             alert("Por favor ingrese el correo electronico");
             document.getElementById("email").focus();  //selecciona input email
 
         }
         else if($password.length <= 0){
 
             alert("Por favor ingrese la contraseña");
             document.getElementById("password").focus();  //selecciona input password
 
         }
         else{
             /**
              * En caso de que haya diligenciado tanto correo como contraseña:
              * se ejecuta peticion GET, AJAX.
              */
             //validarEmailPassword($email,$password);
             await checkEmailAndPass($email, $password);
         } 
 }
  
 /**
  * Funcion de prueba utilizada para confirmar al usuario
  * si los datos de inicio existen en el sistema
  * @param {*} json 
  */

function respuestaIngreso(json){
    
     if(json.name != "NO DEFINIDO"){
        //alert("La informacion de inicio de sesion es CORRECTA");
        
        mostrarMensaje("La informacion de inicio de sesion es CORRECTA");
         window.location.href = "home.html?email="+json.email+"&pswd="+json.password+"&name="+json.name;
     }
     else{
        //alert("La informacion de inicio de sesion es INCORRECTA");
        
        mostrarMensaje("La informacion de inicio de sesion es INCORRECTA");
     }
 
 }
 
 
 function registro(){
 mostrarMensaje("holamundo");
     console.log("se pulso el boton de Registro");
 
 }

 async function checkEmailAndPass(email, password) {
      try {
      
      const url = BASE_URL+'/'+email+"/"+password;
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
      //console.log(`name`, responseConverted.name);
      respuestaIngreso(responseConverted);
      //if(responseConverted && responseConverted.token){
  
      //}
    } catch (error) {
      console.log(`error`, error);
    }
}


var cerrarModal = function () {
    $('#modalRegistro').modal('hide');
    //document.getElementById('modalRegistro').style.display='none';
}


function mostrarMensaje(mensaje) {

    $("#mensaje").html(mensaje);
    $('#modalMensaje').modal('show');
    console.log("ingresa a mostrar mensaje");
    //document.getElementById('modalRegistro').style.display='';
}

var cerrarModalMensaje = function(){
    $('#modalMensaje').modal('hide');
}

