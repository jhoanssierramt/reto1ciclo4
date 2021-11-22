
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
 function ingreso(){
 
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
             validarEmailPassword($email,$password);
         } 
 }
 
 /**
  * Funcion ajax
  * 
  * @param {} email 
  * @param {*} password 
  */
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
 
 /**
  * Funcion de prueba utilizada para confirmar al usuario
  * si los datos de inicio existen en el sistema
  * @param {*} json 
  */
 function respuestaIngreso(json){
 
     if(json.name != "NO DEFINIDO"){
         alert("La informacion de inicio de sesion es CORRECTA");
         window.location.href = "home.html?email="+json.email+"&pswd="+json.password+"&name="+json.name;
     }
     else{
         alert("La informacion de inicio de sesion es INCORRECTA");
     }
 
 }
 
 
 function registro(){
 
     console.log("se pulso el boton de Registro");
 
 }