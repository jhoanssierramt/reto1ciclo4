import React from "react";
import { Hijo } from "../HIjo/Hijo";

class Padre extends React.Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      password: "",
      mensaje: "",
    };
    console.log(`'he sido construido'`);
  }

  static getDerivedStateFromProps(gato) {
    // console.log(`gato`,gato);
    console.log(`'he sido derivado'`);
    return gato;
  }

  render() {
    console.log(`me encargué de pintar`);
    let patito = "main-class";
    // console.log(`this.props`,this.props);
    let esjoven = <p>no soy joven</p>;
    if (this.props.edad < 45) {
      esjoven = <p>si soy joven</p>;
    }
    return (
      <div>
        <h1 className={patito}>
          hola soy el padre y mi apellido es {this.props.apellido} y {esjoven}
        </h1>
        <Hijo name={this.props.hijonombre} />
      </div>
    );
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({ name: "juan" });
    //   console.log(`cambio de nombre`);
    // }, 5000);
    this.setState({
      mensaje: setInterval(() => {
        console.log(`hola`);
      }, 2000),
    });

    // console.log(`'he sido cargado'`);
  }

  shouldComponentUpdate(props) {
    console.log(`'voy a ser actualizado'`);
    console.log(`props should`, props);
    return props;
  }

  getSnapshotBeforeUpdate(props) {
    console.log(`'he sido actualizado por snap'`);
    console.log(`props snap update`, props);
    return props;
  }

  componentDidUpdate() {
    console.log(`"fui actualizado"`);
  }

  componentWillUnmount() {
    console.log(`seré eliminado`);
    clearInterval(this.state.mensaje)
    debugger;
  }
}

export default Padre;
