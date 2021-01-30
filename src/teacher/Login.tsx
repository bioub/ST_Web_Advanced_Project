import { Component, SyntheticEvent } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { login } from './api';
import styles from './Login.module.css';

class Login extends Component<RouteComponentProps> {
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
      const res = await login(this.state);
      localStorage.setItem('token', res.data.token);
      this.props.history.push('/teacher');
    } catch (err) {
      this.setState({
        errorMessage: 'Mauvais login/password',
      });
    }
  };

  render() {
    return (
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
        <Link to="/teacher/register">Register</Link>
      </form>
    );
  }
}

export default Login;
