import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import * as moment from "moment";

const serverUrl = "http://localhost:8080/";

export const UserEdit = ({ userId }) => {
  const [dataUser, setDataUser] = useState({});

  useEffect(() => {
    console.log(`userId`, userId);
    const getData = async () => {
      try {
        const url = `${serverUrl}api/user/${userId}`;
        let response = await fetch(url);
        response = await response.json();
        console.log(`response`, response);
        llenarDatos(response);
      } catch (error) {
        console.log(`error`, error);
      }
    };
    getData();
  }, []);

  const llenarDatos = (data) => {
    document.getElementById("emailModal").value = data.email;
    document.getElementById("emailModal").disabled = true;
    document.getElementById("zonaModal").value = data.zone;
    document.getElementById("zonaModal").disabled = true;
    document.getElementById("nameModal").value = data.name;
    document.getElementById("identModal").value = data.identification;
    document.getElementById("addressModal").value = data.address;
    document.getElementById("cellphoneModal").value = data.cellPhone;
    document.getElementById("tipoModal").value = data.type;
    //console.log(data.birthtDay);
    document.getElementById("birthDayModal").value = moment(data.birthtDay).format("YYYY-MM-DD");

    setDataUser(data);
  }

  const capturarDatos = () => {
    var userDataCambios = dataUser;
    userDataCambios.id = +userDataCambios.id;
    userDataCambios.name = document.getElementById("nameModal").value;
    userDataCambios.identification = document.getElementById("identModal").value;
    userDataCambios.address = document.getElementById("addressModal").value;
    userDataCambios.cellPhone = document.getElementById("cellphoneModal").value;
    userDataCambios.type = document.getElementById("tipoModal").value;
    userDataCambios.birthtDay = document.getElementById("birthDayModal").value;
    userDataCambios.monthBirthtDay = document.getElementById("birthDayModal").value.split('-')[1];

    console.log(userDataCambios.monthBirthtDay);

    return JSON.stringify(userDataCambios);
  };
  const editarUser = async (event) => {
    event.preventDefault();
    if (document.getElementById("nameModal").value.trim().length > 0 && document.getElementById("identModal").value.trim().length > 0 &&
      document.getElementById("addressModal").value.trim().length > 0 && document.getElementById("cellphoneModal").value.trim().length > 0 &&
      document.getElementById("tipoModal").value.trim().length > 0 && document.getElementById("birthDayModal").value.trim().length > 0) {
      try {
        const url = `${serverUrl}api/user/update`;
        let options = {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: capturarDatos()
        };
        let response = await fetch(url, options);
        //response = await response.json();
        console.log(`response`, response);
        if (response.status === 201) {
          alert("Datos actualizados 🎅🏻");
        }
      } catch (error) {
        console.log(`error`, error);
      }
    } else {
      alert("Hay datos vacíos! 🐱");
    }
  };
  return (
    <div>
      <Form>
        <div className="modal-header">
          <h3 className="modal-title">Actualizar Usuario</h3>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="name" className="form-label">Email</label>
              <input type="text" className="form-control" id="emailModal" placeholder="Email"
                autoComplete="off" />
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="name" className="form-label">Zona</label>
              <input type="text" className="form-control" id="zonaModal" placeholder="Zona"
                autoComplete="off" />
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input type="text" className="form-control" id="nameModal" placeholder="Nombre"
                autoComplete="off" />
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="name" className="form-label">Identificación</label>
              <input type="text" className="form-control" id="identModal" placeholder="Identificación"
                autoComplete="off" />
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="name" className="form-label">Dirección</label>
              <input type="text" className="form-control" id="addressModal" placeholder="Dirección"
                autoComplete="off" />
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="name" className="form-label">Teléfono</label>
              <input type="number" className="form-control" id="cellphoneModal" placeholder="Teléfono"
                autoComplete="off" />
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="name" className="form-label">Tipo</label>
              <select className="form-control category-select" id="tipoModal">
                <option value="ASE">ASESOR</option>
                <option value="COORD">COORD</option>
                <option value="ADM">ADMIN</option>
              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="name" className="form-label">Fecha de nacimiento</label>
              <input type="date" className="form-control" id="birthDayModal" autoComplete="off" />
            </div>

          </div>
        </div>
        <div className="modal-footer">
          <button id="editarDatos" onClick={editarUser} type="submit" className="btn btn-primary">Guardar</button>
        </div>
      </Form>
    </div>
  );
};
