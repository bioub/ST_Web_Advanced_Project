import { Component, SyntheticEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { postUser } from './api';
import styles from './Register.module.css';

class Register extends Component<RouteComponentProps> {
  state = {
    username: '',
    password: '',
    errorMessage: '',
  };

  handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await postUser(this.state);
      this.props.history.push('/teacher/login');
    } catch (err) {
      this.setState({
        errorMessage: 'Username already exists',
      });
    }
  };

  render() {
    return (
      <div className="Register">
        <h2>Register</h2>
        <form className={styles.host} onSubmit={this.handleSubmit}>
          {this.state.errorMessage && <div>{this.state.errorMessage}</div>}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button>Connect</button>
        </form>
      </div>
    );
  }
}

export default Register;
