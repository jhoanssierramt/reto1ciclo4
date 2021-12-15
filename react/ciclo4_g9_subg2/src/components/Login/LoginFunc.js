import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useApp } from "../../context/GlobalSession";
const serverUrl = "http://localhost:8080/";

const LoginFunc = ({ userData }) => {
  const { isLoged, setIsLoged } = useApp();
  const { user, setUser } = useApp();

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
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(`this.state`, username);
      console.log(`this.state`, password);
      // if (username === "usuario@correo.com" && password === "123") {
      //   const jsonData = { name: "juan", lastname: "perez", id: 1 };
      //   setIsLoged(true);
      //   setUser(jsonData);
      //   localStorage.setItem("isLoged", true);
      //   localStorage.setItem("logedUser", JSON.stringify(jsonData));
      // }

      let response = await fetch(`${serverUrl}api/user/${username}/${password}`);
      response = await response.json();
      if (response.id) {
      
      const jsonData = { name: response.name, id: response.id };
      setIsLoged(true);
      setUser(jsonData);
      localStorage.setItem("isLoged", true);
      localStorage.setItem("logedUser", JSON.stringify(jsonData));
      
        alert("Bienvenido");

      }
      else{alert("Usuario no encontrado")}

    } catch (error) {
      console.log(`error`, error);
    }
  };

  return (
    <div>
      {isLoged === false ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              onKeyUp={(event) => setUserName(event.target.value)}
              defaultValue={username}
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onKeyUp={(event) => setPassword(event.target.value)}
              defaultValue={password}
            />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <label>Cual es su rol </label>
            <Form.Select onChange={(event) => setRol(event.target.value)}>
              <option selected disabled>
                Seleccione...
              </option>
              <option>Asesor</option>
              <option>Coordinador</option>
              <option>Administrador</option>
            </Form.Select>
          </Form.Group> */}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      ) : (
        <h1>Bienvenido {name}</h1>
      )}

      {/* <form className="row">
            <input className="form-control" name="username" type="email" />
            <input className="form-control" name="password" type="password" />
        </form> */}
    </div>
  );
};

export default LoginFunc;
