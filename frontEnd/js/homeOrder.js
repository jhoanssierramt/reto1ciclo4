/**
 * URL de acceso a recurso
 */
const BASE_URL_ORDER = "http://localhost:8080/api/order";
const BASE_URL_ACCESSORY = "http://localhost:8080/api/accessory";

/**
 * Muestra la tabla de productos, 
 * al pulsar boton
 */
function mostrarCrearPedido() {

    // cargarTablaProductosAsesor();
    document.getElementById("tablaCrearOrden").hidden = false;

}

/**
 * Funcion que muestra formulario modal para agregar item.
 */
function mostrarModalAgregarItem() {

    // editProdTrue_createFalse = false; //Pruebas Johan

    console.log("Se pulsó el boton de mostrarModalAgregarItem");

    /**
     * Se ejecuta funcion que trae las referencias disponibles
     */
    modalDespliegaItem();

    document.getElementById('modalMarcaProd').disabled = true;
    document.getElementById('modalCategoria').disabled = true;
    document.getElementById('modalMaterialProd').disabled = true;
    document.getElementById('modalGeneroProd').disabled = true;
    document.getElementById('modalTallaProd').disabled = true;
    document.getElementById('divModalDispoProd').hidden = true;
    document.getElementById('modalPrecioProd').disabled = true;
    document.getElementById('divModalCantidadProd').hidden = true;
    document.getElementById('modalImagenProd').disabled = true;
    document.getElementById('modalDescripcionProd').disabled = true;


    $('#modalAgregarItem').modal('show');
}

/**
 * Funcion que trae los productos, 
 * para mostrarlos en lista desplegable de modal
 * 
 */
function modalDespliegaItem() {
    try {
        let opciones = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        let peticion = new Request(BASE_URL_ACCESSORY + '/all', opciones);

        fetch(peticion)
            .then(response => response.json())
            .then(function (items) {
                createListaDespliegueItem(items);
                console.log("--- Lista de productos Modal ---");
                console.log(items)
            });

    } catch (error) {
        console.log(`error`, error);
    }
}


/**
 * funcion encargada de mostrar la lista de items
 * en el elemento select del modal agregar item
 * 
 * @param {} items 
 */
function createListaDespliegueItem(items) {

    /**
     * se vacia la lista de items en modal
     * 
     */
    $("#modalRerenciaProd").empty();

    let listaItems = "<option value=''>seleccionar</option>"; //para almacenar etiquetas option

    for (let i of items) {
        let reference = i.reference;
        listaItems += "<option value='" + reference + "'>" + reference + "</option>"; //etiqueta option para añadir a select

    }
    $("#modalRerenciaProd").html(listaItems);

    document.getElementById('modalRerenciaProd').addEventListener('change', cargarDatosModal);

}

/**
 * Autocompleta los datos del modal,
 * al seleccionar una referencia
 */
async function cargarDatosModal() {

    console.log("-- cargar datos modal --")
    let item = await getAccessoryByReference(document.getElementById('modalRerenciaProd').value);

    if (document.getElementById('modalRerenciaProd').value) {

        document.getElementById('modalMarcaProd').value = item.brand;
        document.getElementById('modalCategoria').value = item.category;
        document.getElementById('modalMaterialProd').value = item.material;
        document.getElementById('modalGeneroProd').value = item.gender;
        document.getElementById('modalTallaProd').value = item.size;
        document.getElementById('modalDispoProd').value = item.availability;
        document.getElementById('modalPrecioProd').value = item.price
        document.getElementById('modalCantidadProd').value = item.quantity
        document.getElementById('modalImagenProd').value = item.photography;
        document.getElementById('modalDescripcionProd').value = item.description;

    } else {
        document.getElementById("formModalAgregarItem").reset();
    }


}

/**
 * Ocultar modal agregar item
 */
let cerrarModalAgregarItem = function () {
    $('#modalAgregarItem').modal('hide');
}

/**
 * ocultar modal de mensaje
 */
let cerrarModalMensaje = function () {
    $('#modalMensaje').modal('hide');
}


/**
 * Agrega el item que se encuentra en el modal, 
 * a la tabla orden de pedido
 */
async function mostrarItemEnTabla(event) {
    event.preventDefault();
    try {

        console.log("-- cargar item en tabla --")
        let item = await getAccessoryByReference(document.getElementById('modalRerenciaProd').value);

        let tabla = document.getElementById("cuerpoTablaProductosAsesor");

        let repetido = false;
        for (var i = 0, row; row = tabla.rows[i]; i++) {
            for (var j = 0, col; col = row.cells[j]; j++) {
                let columna = col.innerText;
                if (j == 1 && columna.trim() == item.reference) {
                    console.log("REPETIDO")
                    repetido = true;
                }
            }
        }

        if (item && !repetido) {
            let itemOrdenPedido = `<tr id='` + item.reference + `'>
                        <td>
                        <img src="`+ item.photography + `" alt="Accesorio" style="width:50px;height:50px;"
                        onerror="this.src='./images/no_d.png'">
                        </td>
                        <td>
                        <span>`+ item.reference + `</span><br>    
                        </td>
                        <td>
                            <span class="text-muted">`+ item.brand + `</span>
                        </td>
                        <td>
                            <span class="text-muted">`+ item.category + `</span>
                        </td>
                        <td>
                            <span class="text-muted">`+ item.material + `</span>
                        </td>
                        <td>
                            <span class="text-muted">`+ item.gender + `</span>
                        </td>
                        <td>
                            <span class="text-muted">`+ item.size + `</span>
                        </td>
                        <td>
                            <span class="text-muted">`+ item.price + `</span>
                        </td>
                        <td>
                        <span class="text-muted">`+ item.description + `</span>
                        </td>
                        <td>
                        <span class="text-muted">`+ document.getElementById("modalCantidadItem").value + `</span>
                        </td>
                        <td>
                            
                            <button type="button"
                            class="btn btn-danger btn-circle btn-lg btn-circle ml-2"
                            onclick=\'removeToOrder(`+ JSON.stringify(item) + `)\'><i
                            class="fas fa-minus"></i> </button>
                        </td>`;

            // <button type="button"
            //     class="btn btn-info btn-circle btn-lg btn-circle ml-2"
            //     onclick=\'addToOrder(`+ JSON.stringify(item) + `)\'><i
            //     class="fas fa-plus"></i> </button>

            document.getElementById("cuerpoTablaProductosAsesor").insertAdjacentHTML("afterbegin", itemOrdenPedido);
            mostrarMensaje("Item agregado", "Aviso");
            document.getElementById("formModalAgregarItem").reset();
        } else {
            mostrarMensaje("Item NO agregado, no se pueden accesorios repetidos", "Aviso");
        }

    } catch (error) {
        console.log("error: ", error);
    }

}

/**
 * Boton rojo para quitar producto de lista
 * @param {} item 
 */
async function removeToOrder(item) {
    document.getElementById(item.reference).remove();
}


/**
 * Se capturan datos de tabla y cantidades
 * @returns JSON
 */
async function capturarProductosYcantidades() {

    let tabla = document.getElementById("cuerpoTablaProductosAsesor");

    let productos = {};
    let cantidades = {};
    let referenciaAux;

    for (var i = 0, row; row = tabla.rows[i]; i++) {

        for (var j = 0, col; col = row.cells[j]; j++) {

            // https://es.stackoverflow.com/questions/425986/como-recorrer-una-tabla-de-html-con-javascript
            //   console.log(`Txt: ${col.innerText} \tFila: ${i} \t Celda: ${j}`);

            let columna = col.innerText;

            if (j == 1) {

                let referencia = columna;
                let productoRetorno = await getAccessoryByReference(referencia);
                productos[productoRetorno.reference] = productoRetorno;
                referenciaAux = productoRetorno.reference;
            }

            if (j == 9) {

                let cantidad = columna;
                cantidades[referenciaAux] = +cantidad;

            }
        }

    }

    //   console.log("productos agregados: ",productos);
    //   console.log("cantidades agregadas: ",cantidades);

    return { products: productos, quantities: cantidades };
}


/**
 * Funcion encarga de capturar fecha y crear ID pedido
 */
function capturarCabeceraOrden() {

    const id = Date.now();
    const idOrden = id - parseInt(id / 1000000) * 1000000;

    let fecha = new Date().toISOString();
    fecha = fecha.slice(0, 19);

    return { id: idOrden, registerDay: fecha, status: "Pendiente" };

}

/**
 * Se ajusta la respuesta en JSON
 * @returns datos orden pedido
 */
async function consolidarDatosOrden() {

    let cabecera = capturarCabeceraOrden();
    let prodYCant = await capturarProductosYcantidades();

    let datos = {
        id: cabecera.id,
        registerDay: cabecera.registerDay,
        status: cabecera.status,
        salesMan: datosAsesor,
        products: prodYCant.products,
        quantities: prodYCant.quantities
    }

    return JSON.stringify(datos);
}


/**
 * Funcion que se ejecuta al pulsar boton Enviar orden de pedido
 */

async function enviarOrdenPedido() {

    if (document.getElementById("cuerpoTablaProductosAsesor").innerHTML != "") {
        console.log("envio datos: ", consolidarDatosOrden());
        let ans = await postNewOrder();
        mostrarMensaje("Orden de pedido enviada con ID: "+ans.id, "AVISO");
        setTimeout(() => {
            window.location.reload();}, 1500);

    } else {
        mostrarMensaje("Agregue productos a la orden", "AVISO")
    }

}

/**
 * Peticion POST nueva orden pedido
 * 
 * @returns respuesta Backend
 */
async function postNewOrder() {

    try {
        const url = BASE_URL_ORDER + '/new';
        console.log("POST new order : ", url);
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: await consolidarDatosOrden(),
        };
        const response = await fetch(url, fetchOptions);
        const responseConverted = await response.json();
        console.log(`POST new order`, responseConverted);
        return responseConverted;
    } catch (error) {
        console.log(`error`, error);
    }

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


/**
 * Funcion encarga de retornar producto indicado por referencia
 * se realiza una peticion GET al endpoint /api/accessory
 * 
 * @returns producto
 */
async function getAccessoryByReference(referencia) {
    try {
        const url = BASE_URL_ACCESSORY + '/' + referencia;
        console.log("GET accessory by reference : ", url);
        const fetchOptions = {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        };
        const response = await fetch(url, fetchOptions);
        const responseConverted = await response.json();
        console.log(`getAccessoryByReference:`, responseConverted);
        return responseConverted;
    } catch (error) {
        console.log(`error`, error);
    }
}