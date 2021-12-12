/**
 * URL de acceso a recurso
 */
const BASE_URL = "http://localhost:8080/api/user";
/**
 * Se utiliza para que añada el evento despues
 * de que los elementos HTML esten cargados
 * 
 */

window.onload = function () {

  document.getElementById("formulario").addEventListener("submit", ingreso);
  document.getElementById("enviarDatos").addEventListener("click", guardarCambios);
  document.getElementById("botonRegistrar").addEventListener("click", registro);

}

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

  if (json.email != null) {
    //alert("La informacion de inicio de sesion es CORRECTA");
    mostrarMensaje("Bienvenido " + json.name, "Inicio Sesion");
    setTimeout(() => {
      if(json.type == "ADM") {
        window.location.href = "admin.html?id=" + json.id;  
      }
      else if(json.type == "ASE" || json.type == "COORD") {
        window.location.href = "home.html?id=" + json.id;
      }
    }, 2000);

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
  borrarCampos();
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

async function guardarCambios(event) {
  event.preventDefault();
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  let $email = document.getElementById("emailModal").value.trim();
  let $password = document.getElementById("passwordModal").value.trim();
  let $name = document.getElementById("nameModal").value.trim();
  let $confirm = document.getElementById("confirmModal").value.trim();
  let $ident = document.getElementById("identModal").value.trim();
  let $address = document.getElementById("addressModal").value.trim();
  let $cellphone = document.getElementById("cellphoneModal").value.trim();
  let $birthtDay = document.getElementById("birthDayModal").value.trim();
  let $month = $birthtDay.split('-')[1];
  if ($name.length <= 0 || $email.length <= 0 || $password.length <= 0 || $confirm.length <= 0 
|| $ident.length <=0 || $address.length <=0 || $cellphone.length <=0 || $birthtDay<=0 || $month<=0){
    mostrarMensaje("Todos los campos son obligatorios", "ADVERTENCIA");
  }
  else if ($password != $confirm) {
    mostrarMensaje("Las contraseñas no coinciden.", "ADVERTENCIA");
  }
  else if (!emailPattern.test($email)) {
    mostrarMensaje("Ingrese un correo adecuado.", "ADVERTENCIA");
  } 
  else {
    await verificarCorreo($email);
  }
}

async function verificarCorreo(email) {
  try {
    const url = BASE_URL + '/emailexist/' + email;
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
    cerrarModal();
    borrarCampos();
  } catch (error) {
    console.log(`error`, error);
  }
}

function capturarDatosUsuario() {
  let datosCapturados = {
    id: generarId(),
    name: document.getElementById("nameModal").value,
    email: document.getElementById("emailModal").value,
    password: document.getElementById("passwordModal").value,
    identification: document.getElementById("identModal").value,
    address: document.getElementById("addressModal").value,
    cellPhone: document.getElementById("cellphoneModal").value,
    birthtDay: document.getElementById("birthDayModal").value.trim(),
    monthBirthtDay: document.getElementById("birthDayModal").value.trim().split('-')[1],
    zone: "-",
    type: "ASE"

  };
  return JSON.stringify(datosCapturados);
}

function borrarCampos() {
  document.getElementById("formModalRegistro").reset();
}

function generarId(){
  const id = Date.now() - parseInt(Date.now() / 1000000) * 1000000;
  console.log("id fecha:",id);
  return id;
}