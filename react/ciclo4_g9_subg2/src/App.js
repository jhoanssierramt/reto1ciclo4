// import logo from "./logo.svg";
import "./App.css";
// import Padre from "./Padre/Padre";
import React from "react";
// import Login from "./components/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
// import GlobalContext from "./context/GlobalContext";
// import { Orders } from "./components/orders/Orders";
// import { DetailOrder } from "./components/detail-order/DetailOrder";
import { Home } from "./components/Home/Home";
import { SessionProvider } from "./context/GlobalSession";

function App() {
  // const [counter, setCounter] = useState(0);

  // const add = () => {
  //   setCounter(counter + 1);
  // };

  return (
    <div className="App">
      <header className="">
        {/* <ThemeContext.Provider value="hola"> */}
        {/* <GlobalContext.p value={{counter}}> */}
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        {/* {counter < 5 ? (
          <Padre apellido="sanchez" edad="40" hijonombre="pedro" />
        ) : (
          ""
        )}

        <button onClick={add}>aumentar</button> */}
        {/* <Login /> */}
        {/* <LoginFunc /> */}
        {/* <Toolbar /> */}
        <SessionProvider>
          <Home />
        </SessionProvider>

        {/* </GlobalContext> */}
        {/* </ThemeContext.Provider> */}
        {/* <Padre apellido="díaz" edad="50" hijonombre="diana" /> */}
      </header>
    </div>
  );
}

export default App;
