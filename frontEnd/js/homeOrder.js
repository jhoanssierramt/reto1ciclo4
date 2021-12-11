/**
 * URL de acceso a recurso
 */
const BASE_URL_ORDER= "http://localhost:8080/api/order";
const BASE_URL_ACCESSORY = "http://localhost:8080/api/accessory";

/**
 * Muestra la tabla de productos, 
 * al pulsar boton
 */
function mostrarCrearPedido(){

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
 function modalDespliegaItem(){
    try {
        let opciones = {    method: 'GET',
                        headers: {'Content-Type': 'application/json'},
                    };
    
        let peticion = new Request(BASE_URL_ACCESSORY+'/all', opciones);
    
        fetch(peticion)
            .then(response => response.json())
            .then(function(items) {
                createListaDespliegueItem(items);
                console.log("--- Lista de productos Modal ---");
                console.log(items)
            });
    
    }  catch (error) {
        console.log(`error`, error);
    }
}
    

/**
 * funcion encargada de mostrar la lista de items
 * en el elemento select del modal agregar item
 * 
 * @param {} items 
 */
 function createListaDespliegueItem(items){

    /**
     * se vacia la lista de items en modal
     * 
     */
    $("#modalRerenciaProd").empty();
    
    let listaItems = "<option value=''>seleccionar</option>"; //para almacenar etiquetas option

    for(let i of items){
        let reference = i.reference; 
        listaItems+= "<option value='"+reference+"'>"+reference+"</option>"; //etiqueta option para añadir a select
        
    }
    $("#modalRerenciaProd").html(listaItems); 

    document.getElementById('modalRerenciaProd').addEventListener('change', cargarDatosModal);

}

/**
 * Autocompleta los datos del modal,
 * al seleccionar una referencia
 */
async function cargarDatosModal(){

    console.log("-- cargar datos modal --")
    let item = await getAccessoryByReference(document.getElementById('modalRerenciaProd').value);

    if(document.getElementById('modalRerenciaProd').value){

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

    }else{
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
let cerrarModalMensaje = function(){
    $('#modalMensaje').modal('hide');
}

/**
 * Modal mensaje
 * @param {*} mensaje 
 * @param {*} titulo 
 */
function mostrarMensaje(mensaje, titulo) {
    $("#mensaje").html(mensaje);
    $("#tituloModalMensaje").html(titulo);
    $('#modalMensaje').modal('show');
}

/**
 * Agrega el item que se encuentra en el modal, 
 * a la tabla orden de pedido
 */
async function mostrarItemEnTabla(event){
    
    try {
        
        event.preventDefault();
        
        console.log("-- cargar item en tabla --")
        let item = await getAccessoryByReference(document.getElementById('modalRerenciaProd').value);
        
        if(document.getElementById('modalRerenciaProd').value){
            let itemOrdenPedido = `<tr>
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
                                    
                                    <button type="button"
                                    class="btn btn-danger btn-circle btn-lg btn-circle ml-2"
                                    onclick=\'removeToOrder(`+ JSON.stringify(item) + `)\'><i
                                    class="fas fa-minus"></i> </button>
                                </td>`;

                                // <button type="button"
                                //     class="btn btn-info btn-circle btn-lg btn-circle ml-2"
                                //     onclick=\'addToOrder(`+ JSON.stringify(item) + `)\'><i
                                //     class="fas fa-plus"></i> </button>

            document.getElementById("cuerpoTablaProductosAsesor").insertAdjacentHTML("afterbegin",itemOrdenPedido);
            mostrarMensaje("Item agregado", "Aviso");
            document.getElementById("formModalAgregarItem").reset();
        }else{
            mostrarMensaje("Item NO agregado", "Aviso");
        }

    } catch (error) {
        console.log("error: ", error);
    }
    
}

function removeToOrder(item){
    console.log(item);
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