import { useEffect } from "react";
import { useApp } from "../../context/GlobalSession";
import LoginFunc from "../Login/LoginFunc";
import { Orders } from "../orders/Orders";

export const Home = () => {
  const { isLoged, setIsLoged } = useApp();
  const { user, setUser } = useApp();
  const { logout } = useApp();

  useEffect(() => {});

  return (
    <div>
      <p>
        Bienvenido {user.name} {user.lastname}
      </p>

      {isLoged ? (
        <div>
          <a onClick={logout} href="#">
            Cerrar sesión
          </a>
          <Orders />
        </div>
      ) : (
        <LoginFunc />
      )}
    </div>
  );
};
