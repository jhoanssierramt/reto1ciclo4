/**
 * URL de acceso a recurso
 */
const BASE_URL = "http://localhost:8080/api/user";


/**
 * Datos asesor
 */
var datosAsesor = {};

/**
 * Esperar a que los elementos HTML esten cargados:
 */
window.onload = function () {

    document.getElementById("editarPerfil").addEventListener("click",actualizarCambios);

    document.getElementById("tablaCrearOrden").hidden = true;
    document.getElementById("tablaListaPedidos").hidden = true;
    document.getElementById("botonAgregarItem").addEventListener("click", mostrarItemEnTabla);
    document.getElementById("botonCancelarAgregarItem").onclick = cerrarModalAgregarItem;
    document.getElementById("botonCancelar").onclick = cerrarModalMensaje;
    document.getElementById("botonMostrarModalAgregarItem").onclick= mostrarModalAgregarItem;
    document.getElementById("botonEnviarOrdenPedido").onclick = enviarOrdenPedido;

    //Aquí se obtienen los parámetros que se enviaron a través de la URL:
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const $id = urlParams.get('id');
    getUser($id);

}

/**
 * Trae los datos de inicio, 
 * se ven datos en la parte izquierda
 */
 async function getUser(id) {
    try {
        const url = BASE_URL + '/' + id;
        console.log("GET user: ", url);
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
        //document.getElementById("type").textContent = responseConverted.type;
        if (responseConverted.type=="ASE"){
            document.getElementById("type").textContent = "ASESOR COMERCIAL";
        } else if (responseConverted.type=="COORD") {
            document.getElementById("type").textContent = "COORDINADOR DE ZONA";
        }
        document.getElementById("identification").textContent = responseConverted.identification;
        document.getElementById("zone").textContent = responseConverted.zone;
        document.getElementById('botonEditarPerfil').setAttribute("onclick", "editar(" + JSON.stringify(responseConverted) + ", true)");
        await coordInZone(responseConverted.zone);
        if(responseConverted.type=="COORD"){
            document.getElementById("botonCrearOrdenPedido").innerHTML = '<i class="fas fa-search"></i> Ver órdenes de pedidos';
            document.getElementById("botonCrearOrdenPedido").disabled = false;
            document.getElementById("botonCrearOrdenPedido").onclick = listaOrdenes;
        }
        datosAsesor = responseConverted;
        console.log("-- datos asesor --",datosAsesor);

    } catch (error) {
        console.log(`error`, error);
    }
}

/**
 * Trae los datos de inicio, 
 * se ven datos en la parte izquierda
 */
async function coordInZone(zona) {
    try {
        const url = BASE_URL + '/coordInZone/' + zona;
        console.log("GET user: ", url);
        const fetchOptions = {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        };
        const response = await fetch(url, fetchOptions);
        const responseConverted = await response.json();
        console.log(`esta es la respuesta ZONA COORD`, responseConverted);
        if(responseConverted){
            document.getElementById("botonCrearOrdenPedido").innerHTML = '<i class="fas fa-box-open"></i> Crear orden de pedido';
            document.getElementById("botonCrearOrdenPedido").disabled = false;
            document.getElementById("botonCrearOrdenPedido").onclick = mostrarCrearPedido;
        } else {
            document.getElementById("botonCrearOrdenPedido").innerHTML = '<i class="fas fa-hand-paper"></i> No tienes coordinador asignado';
            document.getElementById("botonCrearOrdenPedido").disabled = true;
        }
        //Enviando al HTML los datos que provienen de la URL:

    } catch (error) {
        console.log(`error`, error);
    }
}


/* async function getAllUsers() {
    try {
        const url = BASE_URL + '/all';
        console.log("url: ", url);
        const fetchOptions = {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        };
        const response = await fetch(url, fetchOptions);
        const responseConverted = await response.json();
        console.log(`getAllUsers:`, responseConverted);
        return responseConverted;
    } catch (error) {
        console.log(`error`, error);
    }
} */

function mostrarTablaUsuarios() {
    document.getElementById("tablaUsuarios").hidden = false;
    cargarTabla();
}

function editar(usuario) {
    console.log("usuario a Editar: ", usuario.name);
    $("#tituloModalRegistro").html('Editar Perfil');
    $("#confPasswordModal").val("");
    $("#idModal").val(usuario.id);
    $("#passwordModal").val(usuario.password);
    $("#emailModal").val(usuario.email);
    $("#hEmailModal").val(usuario.email);
    $("#nameModal").val(usuario.name);
    $("#identModal").val(usuario.identification);
    $("#addressModal").val(usuario.address);
    $("#cellphoneModal").val(usuario.cellPhone);
    $("#zonaModal").val(usuario.zone);
    $("#tipoModal").val(usuario.type);
    $("#birthDayModal").val(usuario.birthtDay.substring(0, 10));

    document.getElementById('passwordModal').disabled = false;
    document.getElementById('emailModal').disabled = false;
    document.getElementById("zonaModal").disabled = true;
    document.getElementById("tipoModal").disabled = true;
    document.getElementById("confPasswordDiv").hidden = false;

    $('#modalRegistro').modal('show');
}

var cerrarModal = function () {
    $('#modalRegistro').modal('hide');
}

async function actualizarCambios(event) {
    event.preventDefault();
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let $email = document.getElementById("emailModal").value;
    let $password = document.getElementById("passwordModal").value;
    let $name = document.getElementById("nameModal").value;
    let $confirm = document.getElementById("confPasswordModal").value;
    let $ident = document.getElementById("identModal").value;
    let $address = document.getElementById("addressModal").value;
    let $cellphone = document.getElementById("cellphoneModal").value;
    let correoRepetido = await verificarCorreo($email) && ($email != document.getElementById("hEmailModal").value);
    let $birthtDay = document.getElementById("birthDayModal").value.trim();
    let $month = $birthtDay.split('-')[1];
    if ($name.length <= 0 || $email.length <= 0 || $password.length <= 0 || $confirm.length <= 0
        || $ident.length <= 0 || $address.length <= 0 || $cellphone.length <= 0 || $birthtDay <= 0 || $month <= 0) {
        mostrarMensaje("Todos los campos son obligatorios", "ADVERTENCIA");
    }
    else if ($password != $confirm) {
        mostrarMensaje("Las contraseñas no coinciden.", "ADVERTENCIA");
    }
    else if (!emailPattern.test($email)) {
        mostrarMensaje("Ingrese un correo adecuado.", "ADVERTENCIA");
    }
    else if (correoRepetido) {
        mostrarMensaje("Este correo ya existe!", "ADVERTENCIA");
    }
    else {
        try {
            const url = BASE_URL + '/update';
            console.log("Update: ", url);
            const fetchOptions = {
                method: "PUT",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: capturarDatosUsuario()
            };
            const response = await fetch(url, fetchOptions).then(function () {
                mostrarMensaje("Usuario Actualizado Exitosamente", "MENSAJE");
                cerrarModal();
                setTimeout(() => {
                    window.location.reload();}, 1500);
            });
        }
        catch (error) {
            console.log(`error`, error);
        }
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
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(`error`, error);
    }
}

function capturarDatosUsuario() {
    let datosCapturados = {
        id: +document.getElementById("idModal").value,
        name: document.getElementById("nameModal").value.trim(),
        email: document.getElementById("emailModal").value.trim(),
        password: document.getElementById("passwordModal").value.trim(),
        identification: document.getElementById("identModal").value.trim(),
        address: document.getElementById("addressModal").value.trim(),
        cellPhone: document.getElementById("cellphoneModal").value.trim(),
        birthtDay: document.getElementById("birthDayModal").value.trim(),
        monthBirthtDay: document.getElementById("birthDayModal").value.trim().split('-')[1],
        zone: document.getElementById("zonaModal").value.trim(),
        type: document.getElementById("tipoModal").value.trim()
    };
    return JSON.stringify(datosCapturados);
}

function mostrarMensaje(mensaje, titulo) {
    $("#mensaje").html(mensaje);
    $("#tituloModalMensaje").html(titulo);
    $('#modalMensaje').modal('show');
}

// var cerrarModalMensaje = function (reload = false) {
//     $('#modalMensaje').modal('hide');
//     window.location.reload();
//     return false;
// }
