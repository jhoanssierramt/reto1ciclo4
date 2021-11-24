
/**
 * Se utiliza para que añada el evento despues
 * de que los elementos HTML esten cargados
 * 
 */

window.onload = function () {

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

async function ingreso(event) {
  event.preventDefault();
  console.log("se pulsó el boton de Ingreso");

  /**
   * Se capturan datos de input email y password
   */
  let $email = document.getElementById("email").value;
  let $password = document.getElementById("password").value;

  console.log("email --> ", $email, "password--> ", $password);

  if ($email.length <= 0) {

    //alert("Por favor ingrese el correo electronico");
    mostrarMensaje("Por favor ingrese el correo electronico", "ADVERTENCIA");

    document.getElementById("email").focus();  //selecciona input email

  }
  else if ($password.length <= 0) {

    //alert("Por favor ingrese la contraseña");
    mostrarMensaje("Por favor ingrese la contraseña", "ADVERTENCIA");
    document.getElementById("password").focus();  //selecciona input password

  }
  else {
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

function respuestaIngreso(json) {

  if (json.name != "NO DEFINIDO") {
    //alert("La informacion de inicio de sesion es CORRECTA");
    mostrarMensaje("La informacion de inicio de sesion es CORRECTA", "Inicio Sesion");
    setTimeout(() => {
      window.location.href = "home.html?email=" + json.email + "&pswd=" + json.password + "&name=" + json.name;
    }, 3000);

  }
  else {
    //alert("La informacion de inicio de sesion es INCORRECTA");
    mostrarMensaje("La informacion de inicio de sesion es INCORRECTA", "Inicio Sesion");
  }

}


function registro() {
  mostrarRegistro();
  console.log("se pulso el boton de Registro");

}

async function checkEmailAndPass(email, password) {
  try {
    const url = BASE_URL + '/' + email + "/" + password;
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

function mostrarMensaje(mensaje, titulo) {
  $("#mensaje").html(mensaje);
  $("#tituloModalMensaje").html(titulo);
  $('#modalMensaje').modal('show');
  console.log("ingresa a mostrar mensaje");
}

var cerrarModalMensaje = function () {
  $('#modalMensaje').modal('hide');
}

function mostrarRegistro() {
  $('#modalRegistro').modal('show');

}

async function guardarCambios() {
  let $email = document.getElementById("emailModal").value;
  let $password = document.getElementById("passwordModal").value;
  let $name = document.getElementById("nameModal").value;
  let $confirm = document.getElementById("confirmModal").value;
  if ($name.length <= 0 || $email.length <= 0 || $password.length <= 0 || $confirm.length <= 0) {
    mostrarMensaje("Todos los campos son obligatorios", "ADVERTENCIA");
  }
  else if ($password != $confirm) {
    mostrarMensaje("Las contraseñas no coinciden", "ADVERTENCIA");
  } else {
    await verificarCorreo($email)
  }
}

async function verificarCorreo(email) {
  try {
    const url = BASE_URL + '/' + email;
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
    if (responseConverted) {
      mostrarMensaje("Este correo ya existe, por favor inicia sesion", "ADVERTENCIA");
    } else {
      await guardarRegistro();
     
    }
  } catch (error) {
    console.log(`error`, error);
  }
}

async function guardarRegistro() {
  try {
    const url = BASE_URL + '/new';
    console.log("url: ", url);
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: capturarDatosUsuario()
    };
    const response = await fetch(url, fetchOptions);
    const responseConverted = await response.json();
    console.log(`esta es la respuesta`, responseConverted);
    mostrarMensaje("Usuario Registrado Exitosamente","MENSAJE");
  } catch (error) {
    console.log(`error`, error);
  }
}

function capturarDatosUsuario() {

  let datosCapturados = {
    name: document.getElementById("nameModal").value.trim(),
    email: document.getElementById("emailModal").value.trim(),
    password: document.getElementById("passwordModal").value.trim(),
  };
  return JSON.stringify(datosCapturados);
}
