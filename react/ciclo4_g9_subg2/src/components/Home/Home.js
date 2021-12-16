import "./home.css";
import { useEffect,useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
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

  useEffect(() => {});

  return (
    <div>
      {isLoged ? (
        <div>
          <div className="izq">
            <h6>
              Bienvenido {user.name} {user.lastname}
            </h6>
            <a onClick={logout} href="#">
              Cerrar sesión
            </a>
          </div> 

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
