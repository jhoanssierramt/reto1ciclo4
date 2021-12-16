import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import * as moment from "moment";

const serverUrl = "http://localhost:8080/";

export const Birthday = () => {

    const headers = ["Identificación", "Nombre", "Fecha Nacimiento", "Correo", "Teléfono", "Dirección", "Zona", "Tipo"];
    const [month, setMonth] = useState("");
    const [body, setBody] = useState();

    const buscarCumple = async () => {
        console.log("Mes Seleccionado: ",month);
        if(month != "")
        {
            try {
                const url = `${serverUrl}api/user/birthday/${month}`;
                let response = await fetch(url);
                response = await response.json();
                setBody(response);
                console.log("Response:",response.length);
                if(response.length == 0)
                {
                    alert("No hay cumpleañeros este mes 😢");
                }
              } catch (error) {
                console.log(`error`, error);
              }
        }
        else{
            alert("Por favor selecciones un mes!");
        }        
    };



    return (
        <div>
            <h3>Consulta los cumpleaños del mes!🥳</h3>

            <div className="row">
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Selecciona el mes a consultar!</h5>

                            <select className="form-control"defaultValue={"Seleccione..."} onChange={(event) => setMonth(event.target.value)}>
                                <option disabled>Seleccione...</option>
                                <option value="01" >Enero</option>
                                <option value="02">Febrero</option>
                                <option value="03">Marzo</option>
                                <option value="04">Abril</option>
                                <option value="05">Mayo</option>
                                <option value="06">Junio</option>
                                <option value="07">Julio</option>
                                <option value="08">Agosto</option>
                                <option value="09">Septiembre</option>
                                <option value="10">Octubre</option>
                                <option value="11">Noviembre</option>
                                <option value="12">Diciembre</option>
                                
                            </select>
                            <br/>
                            <button className="btn btn-info btn-lg"
                            onClick={() => buscarCumple()}>
                                Encontrar cumpleañeros!
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <div className="col">
                <Table responsive className="cumpleTable">
                <thead>
                    <tr>
                    {headers.map((column) => (
                        <th key={column}>{column}</th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {body &&
                    body.length > 0 &&
                    body.map((row) => (
                        <tr key={row.id}>
                        <td>{row.identification}</td>
                        <td>{row.name}</td>
                        <td>{moment(row.birthtDay).format("DD-MM-YYYY")}</td>
                        <td>{row.email}</td>
                        <td>{row.cellPhone}</td>
                        <td>{row.address}</td>
                        <td>{row.zone}</td>
                        <td>{row.type}</td>
                        
                        </tr>
                    ))}
                </tbody>
                </Table>
            </div>
            
            
        </div>
    );
};