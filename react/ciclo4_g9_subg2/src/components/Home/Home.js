import { useEffect, useState } from "react";
import { Tabs, Tab, Accordion, Badge, Button} from "react-bootstrap";
import { useApp } from "../../context/GlobalSession";
import LoginFunc from "../Login/LoginFunc";
import { Orders } from "../orders/Orders";
import { Birthday } from "../birthday/Birthday";
import { Products } from "../products/Products"

export const Home = () => {
  const { isLoged, setIsLoged } = useApp();
  const { user, setUser } = useApp();
  const { logout } = useApp();
  const [key, setKey] = useState('orders');
  const [tipoUser, setTipoUser] = useState("");
  useEffect(() => { 
    console.log("TIPO", user.type);
    if(user.type==="ADM"){
      setTipoUser("Administrador");
    }else if(user.type==="ASE"){
      setTipoUser("Asesor");
    }else if(user.type==="COORD"){
      setTipoUser("Coordinador");
    }else{
      setTipoUser("No aplica");
    }
  });

  return (
    <div>
      {isLoged ? (
        <div>
          <div>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Perfil de Usuario</Accordion.Header>
                <Accordion.Body>
                  <h4 className="izq">
                    Bienvenido {user.name}
                  </h4>
                  <h4><Badge bg="dark">{tipoUser}</Badge></h4>
                  <h6>{user.email}</h6>
                  <h6>CC. {user.identification}</h6>
                  <h6>{user.zone}</h6>
                  <Button variant="secondary" onClick={logout} href="#">
                    Cerrar sesión
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          <br />
          <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3"
            activeKey={key} onSelect={(k) => setKey(k)}>
            <Tab eventKey="orders" title="Órdenes">
              <Orders />
            </Tab>
            <Tab eventKey="birthday" title="Cumpleaños">
              <Birthday />
            </Tab>
            <Tab eventKey="products" title="Productos">
              <Products />
            </Tab>
          </Tabs>
        </div>
      ) : (
        <LoginFunc />
      )}
    </div>
  );
};
