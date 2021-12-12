async function listaOrdenes() {
    console.log("ESTA ES FUNC DE VER LISTA ORDENES");
    document.getElementById("tablaListaPedidos").hidden = false;
    await listaPedidosZona(datosAsesor.zone);
    console.log('ZONA USER',datosAsesor.zone);
}

async function listaPedidosZona(zona) {
    try {
        const url = BASE_URL_ORDER + '/zona/' + zona;
        console.log("GET orders: ", url);
        const fetchOptions = {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        };
        const response = await fetch(url, fetchOptions);
        const responseConverted = await response.json();
        console.log(`esta es la respuesta LISTA PEDIDOS POR ZONA`, responseConverted);
        llenarTablaListaPedidos(responseConverted);
        //Enviando al HTML los datos que provienen de la URL:

    } catch (error) {
        console.log(`error`, error);
    }
}

function llenarTablaListaPedidos(items) {
    let tablaListaPedidos = "";
    for (let i of items) {
        tablaListaPedidos += `<tr>
                        <td>
                        <span>`+ i.salesMan.name + `</span><br>
                            <span class="text-muted"> C.C.`+ i.salesMan.identification + `</span>    
                        </td>
                        <td>
                            <span class="text-muted">`+ i.salesMan.email + `</span>
                        </td>
                        <td>
                            <span class="text-muted">`+ i.registerDay.split('T')[0] + "\n" + i.registerDay.split('T')[1].split('.')[0] + `</span>
                        </td>
                        <td>
                            <span class="text-muted">`+ i.id + `</span>
                        </td>
                        <td>
                            <select class="form-control-sm" id="statusOrden`+ i.id + `">
                            <option value="Pendiente">Pendiente</option>
                            <option value="Rechazada">Rechazada</option>
                            <option value="Aprobada">Aprobada</option>
                            </select>
                        </td>
                        <td>
                            <button type="button"
                            class="btn btn-warning btn-circle btn-lg btn-circle ml-2"
                            onclick=\'detalleOrden(`+ JSON.stringify(i) + `)\'> 
                            <i class="fas fa-info-circle"></i> </button>
                        </td>
                        <td>
                            <button type="button"
                            class="btn btn-success btn-circle btn-lg btn-circle ml-2"
                            onclick=\'actualizarOrden(`+ JSON.stringify(i) + `)\'> 
                            <i class="fas fa-save"></i> </button>
                        </td>`;
    }

    document.getElementById("cuerpoTablaListaPedidos").innerHTML = tablaListaPedidos;

    for (let i of items) {
        document.getElementById("statusOrden" + i.id).value = i.status;
    }
}

function detalleOrden(orden) {
    var itemsP = orden.products;
    console.log('PRUEBA', );
    contenidoTablaModal = "";
    for (let reference in itemsP) {
        let item = itemsP[reference];
        contenidoTablaModal += `<tr>
                            <td>
                            <img src="`+ item.photography + `" alt="Accesorio" style="width:50px;height:50px;"
                            onerror="this.src='./images/no_d.png'">
                            </td>
                            <td>
                            <span>`+ item.reference + `</span><br>    
                            </td>
                            <td>
                                <span class="text-muted">`+ item.category + `</span>
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
                            <span class="text-muted">` + orden.quantities[reference] +`</span>
                            </td>
                            <td>
                            <span class="text-muted">`+ item.quantity + `</span>
                            </td>`;
    }
    document.getElementById("cuerpoTablaModal").innerHTML = contenidoTablaModal;
    $('#modalTablaOrden').modal('show');
}

function cerrarModalTablaOrden(){
    $('#modalTablaOrden').modal('hide');
}

async function actualizarOrden(orden) {
    try {
        const datosOrden = {
            id: +orden.id,
            status: document.getElementById("statusOrden" + orden.id).value
        }
        const url = BASE_URL_ORDER + '/update';
        console.log("url: ", url);
        const fetchOptions = {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(datosOrden)
        };
        const response = await fetch(url, fetchOptions).then(function () {
        mostrarMensaje("Cambio de estado satisfactorio!", "MENSAJE");
        });
    }
    catch (error) {
        console.log(`error`, error);
    }
}