/**
 * URL de acceso a recurso
 */
const BASE_URL_ACCESSORY = "http://localhost:8080/api/accessory";

function onLoadAdminAccessoryjs(){
    console.log('pruebaOnLoadAdminAccessoryjs');    
}

/**
 * Muestra la tabla de productos, 
 * lanza funcion que recarga tabla.
 */
function mostrarTablaAccesorios() {
    document.getElementById("tablaProductos").hidden = false;
    document.getElementById("tablaUsuarios").hidden = true;
    cargarTablaProductos();
}

/**
 * Se recarga la tabla de productos,
 * se muestran los productos al dar clic.
 */
async function cargarTablaProductos() {
    let items = await getAllAccessory();
    let tablaProductos = "";
    for (let i of items) {
        tablaProductos += `<tr>
                        <td>
                        <img src="`+ i.photography + `" alt="Accesorio" style="width:50px;height:50px;"
                        onerror="this.src='./images/no_d.png'">
                        </td>
                        <td>
                        <span>`+ i.reference + `</span><br>    
                        </td>
                        <td>
                            <span class="text-muted">`+ i.brand + `</span>
                        </td>
                        <td>
                            <span class="text-muted">`+ i.category + `</span>
                        </td>
                        <td>
                            <span class="text-muted">`+ i.material + `</span>
                        </td>
                        <td>
                            <span class="text-muted">`+ i.gender + `</span>
                        </td>
                        <td>
                            <span class="text-muted">`+ i.size + `</span>
                        </td>
                        <td>
                            <span class="text-muted">`+ i.availability + `</span>
                        </td>
                        <td>
                            <span class="text-muted">`+ i.price + `</span>
                        </td>
                        <td>
                            <span class="text-muted">`+ i.quantity + `</span>
                        </td>
                        <td>
                        <span class="text-muted">`+ i.description + `</span>
                        </td>
                        <td>
                            <button type="button"
                            class="btn btn-info btn-circle btn-lg btn-circle ml-2"
                            onclick=\'editarProducto(`+ JSON.stringify(i) + `)\'><i
                            class="fa fa-edit"></i> </button>
                            <button type="button"
                            class="btn btn-danger btn-circle btn-lg btn-circle ml-2"
                            onclick=\'eliminarProducto(`+ JSON.stringify(i) + `)\'><i
                            class="fa fa-trash"></i> </button>
                        </td>`;

    }
    document.getElementById("cuerpoTablaProductos").innerHTML = tablaProductos;
}


/**
 * Funcion encarga de retornar la lista de productos,
 * se realiza una peticion GET al endpoint /api/accessory
 * 
 * @returns Lista Productos
 */
async function getAllAccessory() {
    try {
        const url = BASE_URL_ACCESSORY + '/all';
        console.log("GET all accessory : ", url);
        const fetchOptions = {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        };
        const response = await fetch(url, fetchOptions);
        const responseConverted = await response.json();
        console.log(`getAllAccessory:`, responseConverted);
        return responseConverted;
    } catch (error) {
        console.log(`error`, error);
    }
}

function editarProducto(producto) {
    editProdTrue_createFalse = true;
    console.log("accesorio a Editar: ", producto.reference);
    $("#modalRerenciaProd").val(producto.reference);
    $("#modalMarcaProd").val(producto.brand);
    $("#modalCategoria").val(producto.category);
    $("#modalMaterialProd").val(producto.material);
    $("#modalGeneroProd").val(producto.gender);
    $("#modalTallaProd").val(producto.size);
    $("#modalDispoProd").val(producto.availability+""); //+"" permite pasar de booleano a String
    $("#modalPrecioProd").val(producto.price);
    $("#modalCantidadProd").val(producto.quantity);
    $("#modalImagenProd").val(producto.photography);
    $("#modalDescripcionProd").val(producto.description);

    document.getElementById("modalRerenciaProd").disabled = true;
    //Este lístener se configura en el onload de adminjs:
    //document.getElementById("botonEditarProducto").addEventListener("click", actualizarProducto);
    $('#modalProducto').modal('show');
}

var cerrarModalProducto = function () {
    $('#modalProducto').modal('hide');
}

function mostrarMensajeProducto(mensaje, titulo) {
    document.getElementById("botonCancelar").innerHTML = "Ok!";
    document.getElementById("botonEliminar").hidden = true;
    $("#mensaje").html(mensaje);
    $("#tituloModalMensaje").html(titulo);
    $('#modalMensaje').modal('show');
}

/**
 * Funcion que valida los datos del producto,
 * realiza peticion PUT.
 * @param {*} event 
 */

async function actualizarProducto(event) {
    event.preventDefault();
    console.log("actualizarProducto flag:",editProdTrue_createFalse);
    if(editProdTrue_createFalse)
    {
        let verificacion = await verificarDatosModal("PUT");
        console.log("verificación PUT:",verificacion);
        if (!verificacion) {
            await peticionActualizarProd();
        }
    }
}

/**
 * Peticion PUT para actualizar producto
 */
async function peticionActualizarProd() {
    try {
        const url = BASE_URL_ACCESSORY + '/update';
        console.log("url: ", url);

        const fetchOptions = {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: capturarDatosProducto()
        };

        const response = await fetch(url, fetchOptions).then(function () {
            console.log("-- Peticion PUT actualizar producto --");
            //const responseConverted = await response.json();
            //console.log(responseConverted);
            mostrarMensajeProducto("Producto Actualizado Exitosamente", "MENSAJE");
            cerrarModalProducto();            
            cargarTablaProductos();
        });
        
        /*
        let peticion = new Request(url, fetchOptions);

        fetch(peticion).then(function (items) {
            console.log("-- Peticion PUT actualizar producto --");
            console.log(items);
            cerrarModalProducto();
            mostrarMensajeProducto("Producto Actualizado Exitosamente", "MENSAJE");
            cargarTablaProductos();
        });
        */
    }
    catch (error) {
        console.log(`error`, error);
    }
}

/**
 * Se capturan datos del modal editar producto,
 * se retorna en formato  JSON.stringify
 * @returns 
 */
function capturarDatosProducto() {
    let datosCapturados = {
        reference: document.getElementById("modalRerenciaProd").value,
        brand: document.getElementById("modalMarcaProd").value,
        category: document.getElementById("modalCategoria").value,
        material: document.getElementById("modalMaterialProd").value,
        gender: document.getElementById("modalGeneroProd").value,
        size: document.getElementById("modalTallaProd").value,
        description: document.getElementById("modalDescripcionProd").value,
        availability: document.getElementById("modalDispoProd").value,
        price: document.getElementById("modalPrecioProd").value,
        quantity: document.getElementById("modalCantidadProd").value,
        photography: document.getElementById("modalImagenProd").value
    };
    return JSON.stringify(datosCapturados);
}


/**
 * Funcion que muestra formulario modal para crear producto.
 */
function nuevoProducto() {

    editProdTrue_createFalse = false;
    document.getElementById("botonEditarProducto").addEventListener("click", crearProducto);
    document.getElementById("modalRerenciaProd").disabled = false;

    $("#tituloModalProducto").html('Crear nuevo producto');
    console.log("Se pulsó el boton de crear producto");

    $("#modalRerenciaProd").val("");
    $("#modalMarcaProd").val("");
    $("#modalCategoria").val("");
    $("#modalMaterialProd").val("");
    $("#modalGeneroProd").val("");
    $("#modalTallaProd").val("");
    $("#modalDescripcionProd").val("");
    $("#modalDispoProd").val("true");
    $("#modalPrecioProd").val("");
    $("#modalCantidadProd").val("");
    $("#modalImagenProd").val("");

    $('#modalProducto').modal('show');
}

/**
 * Funciona que valida datos de formulario modal,
 * se realiza peticion POST si la verificacion es OK
 * @param {*} event 
 */
async function crearProducto(event) {
    event.preventDefault();
    if(!editProdTrue_createFalse)
    {
        let verificacion = await verificarDatosModal("POST");
        if (!verificacion) {
            await peticionCrearProd();
        }
    }    
}

/**
 * Peticion POST para crear producto
 */
async function peticionCrearProd() {
    try {
        const url = BASE_URL_ACCESSORY + '/new';

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: capturarDatosProducto()
        };

        const response = await fetch(url, fetchOptions).then(function () {
            console.log("-- Peticion POST crear producto --");
            //const responseConverted = await response.json();
            //console.log(responseConverted);
            cerrarModalProducto();
            mostrarMensajeProducto("Producto Creado Exitosamente", "MENSAJE");
            cargarTablaProductos();
        });

        /*

        let peticion = new Request(url, fetchOptions);

        fetch(peticion).then(function (items) {
            console.log("-- Peticion POST actualizar producto --");
            console.log(items);
            cerrarModalProducto();
            mostrarMensajeProducto("Producto Creado Exitosamente", "MENSAJE");
            cargarTablaProductos();
        });
        */
    }
    catch (error) {
        console.log(`error`, error);
    }
}


/**
 * Verificar datos que se van a enviar en POST y PUT,
 * nuevoProducto() y actualizarProducto()
 */
async function verificarDatosModal(operacion) {
    console.log("Estoy Aqui");
    let $reference = document.getElementById("modalRerenciaProd").value;
    let $brand = document.getElementById("modalMarcaProd").value.trim();
    let $category = document.getElementById("modalCategoria").value.trim();
    let $material = document.getElementById("modalMaterialProd").value.trim();
    let $gender = document.getElementById("modalGeneroProd").value;
    let $size = document.getElementById("modalTallaProd").value.trim();
    let $availability = document.getElementById("modalDispoProd").value;
    let $price = document.getElementById("modalPrecioProd").value.trim();
    let $quantity = document.getElementById("modalCantidadProd").value.trim();
    let $photography = document.getElementById("modalImagenProd").value.trim();
    let $description = document.getElementById("modalDescripcionProd").value.trim();

    if ($reference.length <= 0 || $brand.length <= 0 || $category.length <= 0 || $material.length <= 0
        || $gender.length <= 0 || $size.length <= 0 || $availability.length <= 0 || $price.length <= 0
        || $quantity.length <= 0 || $description.length <= 0 || $photography.length <= 0) {
        console.log("-- campos vacios --");
        //console.log($reference, $brand, $category, $material, $gender, $size, $availability, $price, $quantity, $description);
        mostrarMensaje("Todos los campos son obligatorios", "ADVERTENCIA");
        return true;
    } else if (operacion == "POST"){
        if(await verificarReferencia($reference))
        {
            console.log("-- referencia repetida --");
            mostrarMensaje("La referencia ya existe", "ADVERTENCIA");
            return true;
        }else {
            console.log("verificarReferencia FALSO");
            return false;
        }
    }
    else {
        return false;
    }
}

async function verificarReferencia(referencia) {
    try {
        const url =  BASE_URL_ACCESSORY + '/' + referencia;
        console.log("url: ", url);
        const fetchOptions = {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        };
        const response = await fetch(url, fetchOptions);
        const responseConverted = await response.json();
        console.log(`verificarReferencia: esta es la respuesta`, responseConverted);
        if (responseConverted.reference != null) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(`error`, error);
    }
}

function eliminarProducto(producto) {
    document.getElementById('botonEliminar').setAttribute("onclick", "eliminarRegistroProducto(\'" + producto.reference + "\')");
    mostrarMensaje("Seguro desea eliminar el producto con la referencia " + producto.reference, "Eliminar Producto");
    document.getElementById("botonCancelar").innerHTML = "Cancelar";
    document.getElementById("botonEliminar").hidden = false;
}

async function eliminarRegistroProducto(referencia) {
    try {
        const url = BASE_URL_ACCESSORY + '/' + referencia;
        console.log("url: ", url);
        const fetchOptions = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        };
        const response = await fetch(url, fetchOptions).then(function () {
            cargarTablaProductos();
            cerrarModalMensaje();
        }
        );
    } catch (error) {
        console.log(`error`, error);
    }
}
