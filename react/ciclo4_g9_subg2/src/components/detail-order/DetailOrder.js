import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import * as moment from "moment";

const serverUrl = "http://localhost:8080/";

export const DetailOrder = ({ orderId }) => {
  const headers = ["Fecha", "N° pedido", "Estado"];
  const headersDetail = [
    "Foto",
    "Nombre",
    "Categoría",
    "Descripción",
    "Precio",
    "Cantidad",
  ];
  const [body, setBody] = useState([]);
  const [bodyDetail, setBodyDetail] = useState([]);

  useEffect(() => {
    console.log(`orderId`, orderId);
    const getData = async () => {
      try {
        const url = `${serverUrl}/api/order/${orderId}`;
        let response = await fetch(url);
        response = await response.json();
        console.log(`response`, response);
        const { registerDay, id, status } = response;
        setBody([
          {
            registerDay: moment(registerDay).format("DD-MM-YYYY hh:mm"),
            id,
            status,
          },
        ]);
        const values = Object.values(response.products);
        const bodyDetailTemporal = [];
        for (const value of values) {
          console.log(`value`, value);
          bodyDetailTemporal.push(value);
        }
        setBodyDetail(bodyDetailTemporal);
      } catch (error) {
        console.log(`error`, error);
      }
    };
    getData();
    // const body = ;
    // setBody(body);
  }, []);

  return (
    <div>
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
              <tr>
                <td>{row.registerDay}</td>
                <td>{row.id}</td>
                <td>{row.status}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <hr />
      <Table responsive className="white">
        <thead>
          <tr>
            {headersDetail.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyDetail &&
            bodyDetail.length > 0 &&
            bodyDetail.map((row) => (
              <tr>
                <td>
                  <img src={row.photography}  width="50px" alt={row.brand} />
                </td>
                <td>{row.brand}</td>
                <td>{row.category}</td>
                <td>{row.description}</td>
                <td>{row.price}</td>
                <td>{row.quantity}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};
