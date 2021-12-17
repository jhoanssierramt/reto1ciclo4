import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ReactModal from "react-modal";
import { DetailOrder } from "../detail-order/DetailOrder";
import * as moment from "moment";

const serverUrl = "http://localhost:8080/";
ReactModal.setAppElement('body');

export const Orders = () => {
  const [stateSelect, setStateSelect] = useState("");
  const [dateSelect, setDateSelect] = useState("");
  const [saler, setSaler] = useState("");

  const headers = ["Fecha", "N° pedido", "Estado", "Acciones"];
  const [body, setBody] = useState([]);
  const [orderId, setOrderId] = useState(0);


  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const url = `${serverUrl}/api/order/all`;
      let response = await fetch(url);
      response = await response.json();
      console.log(`response`, response);
      setBody(response);
    } catch (error) {
      console.log(`error`, error);
    }
  };
  
  function handleCloseModal() {
    setShowModal(false);
  }

  function handleOpenModal(id) {
    setOrderId(id);
    setShowModal(true);
  }

  // async function handleDelete(id) {
  //   try {
  //     const url = `${serverUrl}/api/order/${id}`;
  //     const options = {
  //       method: "DELETE",
  //       // method: "POST",
  //       // body:JSON.stringify({})
  //     };
  //     let response = await fetch(url, options);
  //     response = await response.json();
  //   } catch (error) {
  //     console.log(`error`, error);
  //   }
  // }

  const getByDate = async () => {
    if (saler === "" || dateSelect == "") {
      alert("No deben haber campos vacíos (ID Vendedor y Fecha).");
    } else {
      try {
        const url = `${serverUrl}/api/order/date/${dateSelect}/${saler}`;
        let response = await fetch(url);
        response = await response.json();
        setBody(response);
      } catch (error) {
        console.log(`error`, error);
      }
    }
  };

  const getByState = async () => {
    if (saler === "" || stateSelect === "") {
      alert("No deben haber campos vacíos (ID Vendedor y Estado del Pedido). ");
    } else {
      try {
        const url = `${serverUrl}/api/order/state/${stateSelect}/${saler}`;
        let response = await fetch(url);
        response = await response.json();
        setBody(response);
      } catch (error) {
        console.log(`error`, error);
      }
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Id Vendedor y Fecha Registo</h5>
              <input type="number" className="form-control" placeholder="Id Vendedor" onChange={(event) => setSaler(event.target.value)}></input>
              <input
                className="form-control"
                onChange={(event) => setDateSelect(event.target.value)}
                type="date"
              />
              <button className="btn btn-info btn-lg" onClick={getByDate}>
                Buscar por fecha
              </button>
            </div>
          </div>
        </div>


        <div className="col-sm-6">
          <div className="card">
            <div className="card-body" >
              <h5 className="card-title">Estado del Pedido</h5>
              <select className="form-control" defaultValue={"Seleccione..."} onChange={(event) => setStateSelect(event.target.value)}>
                <option disabled>Seleccione...</option>
                <option>Pendiente</option>
                <option>Aprobada</option>
                <option>Rechazada</option>
              </select>
              <br /><br />
              <button className="btn btn-info btn-lg" onClick={getByState}>
                Buscar por estado
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
                <tr key={row.id}>
                  <td>{moment(row.registerDay).format("DD-MM-YYYY hh:mm")}</td>
                  <td>{row.id}</td>
                  <td>{row.status}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => handleOpenModal(row.id)}
                    >
                      Ver pedido
                    </button>
                  </td>

                </tr>
              ))}
          </tbody>
        </Table>
        <button className="btn btn-success btn-lg" onClick={getData}>
          Mostrar Toda la Lista.
        </button>
      </div>
      <ReactModal isOpen={showModal} contentLabel="Minimal Modal Example">
        <button className="btn btn-primary" onClick={handleCloseModal}>Cerrar Detalle</button>
        <DetailOrder orderId={orderId} />
      </ReactModal>
    </div>
  );
};
