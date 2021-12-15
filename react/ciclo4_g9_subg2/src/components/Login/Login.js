import React from "react";
import { Form, Button } from "react-bootstrap";

class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: "andres@andres.com",
      password: "1234",
      mensaje: "",
      isLoged: false,
      name: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      console.log(`this.state`, this.state);
      let response = await fetch("http://localhost:8080/api/users/login");
      response = await response.json();
      if (response.id) {
        this.setState({ name: response.name });
      }
    } catch (error) {
      console.log(`error`, error);
    }
  }

  componentDidUpdate(){
    console.log(`this.state`,this.state);
  }

  render() {
    return (
      <div>
        {this.state.isLoged === false ? (
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                onChange={(event) =>
                  this.setState({ username: event.target.value })
                }
                defaultValue={this.state.username}
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
                onKeyUp={(event) =>
                  this.setState({ password: event.target.value })
                }
                defaultValue={this.state.password}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        ) : (
          <h1>Bienvenido {this.state.name}</h1>
        )}

        {/* <form className="row">
            <input className="form-control" name="username" type="email" />
            <input className="form-control" name="password" type="password" />
        </form> */}
      </div>
    );
  }
}

export default Login;
