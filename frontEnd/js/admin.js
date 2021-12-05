/**
 * URL de acceso a recurso
 */
const BASE_URL = "http://localhost:8080/api/user";

/**
 * Esperar a que los elementos HTML esten cargados:
 */
window.onload = function () {

    document.getElementById("editarDatos").addEventListener("click", actualizarCambios);
    document.getElementById("botonEliminar").hidden = true;

    //Aquí se obtienen los parámetros que se enviaron a través de la URL:
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const $id = urlParams.get('id');
    getUser($id);

    document.getElementById("tablaUsuarios").hidden = true;
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
        document.getElementById('editarPerfil').setAttribute("onclick", "editar(" + JSON.stringify(responseConverted) + ", true)");
    } catch (error) {
        console.log(`error`, error);
    }
}

async function getAllUsers() {
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
}

async function cargarTabla() {
    let items = await getAllUsers();
    let tablaUsuarios = "";
    for (let i of items) {
        tablaUsuarios += `<tr>
                        <td>
                        <span>`+ i.name + `</span><br>
                            <span class="text-muted"> C.C.`+ i.identification + `</span>
                        </td>
                        <td>
                            <span class="text-muted">`+ i.email + `</span>
                        </td>
                        <td>
                            <span class="text-muted">`+ i.cellPhone + `</span>
                        </td>
                        <td>
                            <span class="text-muted">`+ i.address + `</span>
                        </td>
                        <td>
                            <span class="text-muted">`+ i.zone + `</span>
                        </td>
                        <td>
                            <span class="text-muted">`+ i.type + `</span>
                        </td>
                        <td>
                            <button type="button"
                            class="btn btn-info btn-circle btn-lg btn-circle ml-2"
                            onclick=\'editar(`+ JSON.stringify(i) + `)\'><i
                            class="fa fa-edit"></i> </button>`;

        if (i.type != "ADMIN") {
            tablaUsuarios += `<button type="button"
                            class="btn btn-danger btn-circle btn-lg btn-circle ml-2" 
                            onclick=\'eliminar(`+ JSON.stringify(i) + `)\'><i
                            class="fa fa-trash"></i> </button>
                        </td>`
        }
        else {
            tablaUsuarios += `</td>`
        }

    }
    document.getElementById("cuerpoTabla").innerHTML = tablaUsuarios;
}

function mostrarTablaUsuarios() {
    document.getElementById("tablaUsuarios").hidden = false;
    cargarTabla();
}

function nuevoUsuario() {
    $("#tituloModalRegistro").html('Crear nuevo usuario');
    console.log("Se pulsó el botón de crear usuario");
    $("#idModal").val(generarId);
    $("#passwordModal").val("");
    $("#emailModal").val("");
    $("#hEmailModal").val("");
    $("#nameModal").val("");
    $("#identModal").val("");
    $("#addressModal").val("");
    $("#cellphoneModal").val("");
    $("#zonaModal").val("");
    $("#confPasswordModal").val("");
    document.getElementById("editarDatos").addEventListener("click", crearNuevoUsuario);
    $('#modalRegistro').modal('show');
}

async function crearNuevoUsuario(event) {
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
    if ($name.length <= 0 || $email.length <= 0 || $password.length <= 0 || $confirm.length <= 0
        || $ident.length <= 0 || $address.length <= 0 || $cellphone.length <= 0) {
        mostrarMensaje("Todos los campos son obligatorios", "ADVERTENCIA");
    }
    else if ($password != $confirm) {
        mostrarMensaje("Las contraseñas no coinciden.", "ADVERTENCIA");
    }
    else if (!emailPattern.test($email)) {
        mostrarMensaje("Ingrese un correo adecuado.", "ADVERTENCIA");
    }
    else if (correoRepetido) {
        mostrarMensaje("Ese correo ya existe!", "ADVERTENCIA");
    }
    else {
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
            const response = await fetch(url, fetchOptions).then(function () {
                cerrarModal();
                mostrarMensaje("Usuario creado exitosamente", "MENSAJE");
                cargarTabla();
            });
        }
        catch (error) {
            console.log(`error`, error);
        }
    }
}

function editar(usuario, isPerfil = false) {
    console.log("usuario a Editar: ", usuario.name);
    if (!isPerfil) {
        $("#tituloModalRegistro").html('Actualizar Usuario');
        $("#confPasswordModal").val(usuario.password);
    } else {
        $("#tituloModalRegistro").html('Editar Perfil');
        $("#confPasswordModal").val("");
    }
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

    document.getElementById('passwordModal').disabled = !isPerfil;
    document.getElementById('emailModal').disabled = !isPerfil;
    document.getElementById("zonaModal").disabled = isPerfil;
    document.getElementById("tipoModal").disabled = isPerfil;
    document.getElementById("confPasswordDiv").hidden = !isPerfil;

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
    if ($name.length <= 0 || $email.length <= 0 || $password.length <= 0 || $confirm.length <= 0
        || $ident.length <= 0 || $address.length <= 0 || $cellphone.length <= 0) {
        mostrarMensaje("Todos los campos son obligatorios", "ADVERTENCIA");
    }
    else if ($password != $confirm) {
        mostrarMensaje("Las contraseñas no coinciden.", "ADVERTENCIA");
    }
    else if (!emailPattern.test($email)) {
        mostrarMensaje("Ingrese un correo adecuado.", "ADVERTENCIA");
    }
    else if (correoRepetido) {
        mostrarMensaje("Ese correo ya existe!", "ADVERTENCIA");
    }
    else {
        try {
            const url = BASE_URL + '/update';
            console.log("url: ", url);
            const fetchOptions = {
                method: "PUT",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: capturarDatosUsuario()
            };
            const response = await fetch(url, fetchOptions).then(function () {
                cerrarModal();
                if (document.getElementById("tipoModal").disabled) {
                    window.location.reload();
                    return false;
                } else {
                    cargarTabla();
                    mostrarMensaje("Usuario Actualizado Exitosamente", "MENSAJE");
                }

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
        zone: document.getElementById("zonaModal").value.trim(),
        type: document.getElementById("tipoModal").value.trim()
    };
    return JSON.stringify(datosCapturados);
}

function eliminar(usuario) {
    document.getElementById('botonEliminar').setAttribute("onclick", "eliminarRegistro(" + usuario.id + ")");
    mostrarMensaje("Seguro desea eliminar el usuario " + usuario.name, "Eliminar Usuario");
    document.getElementById("botonCancelar").innerHTML = "Cancelar";
    document.getElementById("botonEliminar").hidden = false;
}

function mostrarMensaje(mensaje, titulo) {
    document.getElementById("botonCancelar").innerHTML = "Ok!";
    document.getElementById("botonEliminar").hidden = true;
    $("#mensaje").html(mensaje);
    $("#tituloModalMensaje").html(titulo);
    $('#modalMensaje').modal('show');
}

var cerrarModalMensaje = function () {
    $('#modalMensaje').modal('hide');
}

async function eliminarRegistro(idRegistro) {
    try {
        const url = BASE_URL + '/' + idRegistro;
        console.log("url: ", url);
        const fetchOptions = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        };
        const response = await fetch(url, fetchOptions).then(function () {
            cargarTabla();
            cerrarModalMensaje();
        }
        );
    } catch (error) {
        console.log(`error`, error);
    }
}

function generarId(){
    const id = Date.now() - parseInt(Date.now() / 1000000) * 1000000;
    console.log("id fecha:",id);
    return id;
  }