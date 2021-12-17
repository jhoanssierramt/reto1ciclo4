import "./login.css";
import { useEffect, useState } from "react";
import { Form, Button, CardGroup, Card } from "react-bootstrap";
import { useApp } from "../../context/GlobalSession";
import { Products } from "../products/Products";
const serverUrl = "http://localhost:8080/";
let isClient = false;

const LoginFunc = ({ userData }) => {
  const { isLoged, setIsLoged } = useApp();
  const { user, setUser } = useApp();
  const [client, setClient] = useState("false");

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // const [rol, setRol] = useState("");
  // const [mensaje, setMensaje] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    // console.log(`hola`);
    console.log(`username`, username);
    if (localStorage.getItem("isLoged") === "true") {
      setIsLoged(true);
      setUser(JSON.parse(localStorage.getItem("logedUser")));

    }
    //setClient("false");
    isClient = false;

  });

  const verCatalogo = () => {
    setClient("true");
    alert("Entrando a catálogo de productos");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(`this.state`, username);
      console.log(`this.state`, password);

      let response = await fetch(`${serverUrl}api/user/${username}/${password}`);
      response = await response.json();
      if (response.id) {

        const jsonData = response;
        setIsLoged(true);
        setUser(jsonData);
        localStorage.setItem("isLoged", true);
        localStorage.setItem("logedUser", JSON.stringify(jsonData));

        alert("Bienvenido");

      }
      else { alert("Usuario no encontrado") }

    } catch (error) {
      console.log(`error`, error);
    }
  };

  return (
    <div>
      {isLoged === false && client === "false" ? (
        <CardGroup className="row justify-content-center">
          <Card style={{ maxWidth: '25rem' }}>
            <Card.Body>
              <Card.Title>Calzado Saylor Moon</Card.Title>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    onKeyUp={(event) => setUserName(event.target.value)}
                    defaultValue={username}
                    placeholder="Ingrese Correo Electrónico"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingrese Contraseña"
                    onKeyUp={(event) => setPassword(event.target.value)}
                    defaultValue={password}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Iniciar Sesión
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Protegemos tus datos personales.</small>
            </Card.Footer>
          </Card>

          <Card style={{ maxWidth: '20rem' }}>
            <Card.Img variant="top" src="../../../images/Logo.png" />
            <Card.Body>
              <Card.Text>Visita nuestro catálogo en línea</Card.Text>
              <Button variant="primary" onClick={verCatalogo}>
                Ver productos
              </Button>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Área de Clientes</small>
            </Card.Footer>
          </Card>
        </CardGroup>
      ) : (

        <div>
          <Products />
          <br/>
          <div id="volverProducto">
            <Button variant="outline-primary" size="lg" onClick={() => setClient("false")} href="#">
              Volver
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginFunc;
