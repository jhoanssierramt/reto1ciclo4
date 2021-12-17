import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const serverUrl = "http://localhost:8080/";

export const Products = () => {
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const headers = ["Código", "Marca", "Categoría", "Género", "Descripción", "Precio", "Imagen"];
    const [body, setBody] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const url = `${serverUrl}/api/accessory/all`;
            let response = await fetch(url);
            response = await response.json();
            console.log(`response`, response);
            setBody(response);
        } catch (error) {
            console.log(`error`, error);
        }
    };

    const filtrarPrecio = async () => {
        console.log(price);
        if (price !== "") {
            try {
                const url = `${serverUrl}api/accessory/price/${price}`;
                let response = await fetch(url);
                response = await response.json();
                setBody(response);
                console.log("Response:", response.length);
                if (response.length === 0) {
                    alert("No hay productos menores a ese precio 🤑");
                } else {
                    document.getElementById("precioInput").value = "";
                }
            } catch (error) {
                console.log(`error`, error);
            }
            //this.value = "";
        }
        else {
            alert("Por favor ingrese un precio");
        }
    };
    const filtrarCoincidencia = async () => {
        console.log(desc);
        if (desc !== "") {
            try {
                const url = `${serverUrl}api/accessory/description/${desc}`;
                let response = await fetch(url);
                response = await response.json();
                setBody(response);
                console.log("Response:", response.length);
                if (response.length === 0) {
                    alert("No hay coincidencias 😵");
                } else {
                    document.getElementById("keywordInput").value = "";
                }
            } catch (error) {
                console.log(`error`, error);
            }

        }
        else {
            alert("Por favor ingrese una palabra.");
        }
    };
    return (
        <div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Precio</h5>
                            <input id="precioInput" type="number" className="form-control" placeholder="$" onChange={(event) => setPrice(event.target.value)}></input>
                            <br />
                            <button className="btn btn-info btn-lg" onClick={filtrarPrecio}>
                                Filtrar por precio
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Descripción</h5>
                            <input id="keywordInput" type="text" className="form-control" placeholder="Digite palabra clave" onChange={(event) => setDesc(event.target.value)}></input>
                            <br />
                            <button className="btn btn-info btn-lg" onClick={filtrarCoincidencia}>
                                Filtrar por Coincidencia
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col">
                <Table responsive className="white">
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
                                <tr key={row.reference}>
                                    <td>{row.reference}</td>
                                    <td>{row.brand}</td>
                                    <td>{row.category}</td>
                                    <td>{row.gender}</td>
                                    <td>{row.description}</td>
                                    <td>{row.price}</td>
                                    <td>
                                        <img src={row.photography} width="50px" alt={row.brand} />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
                <button className="btn btn-success btn-lg" onClick={getData}>
                    Mostrar Toda la Lista.
                </button>
            </div>
        </div>
    );
};