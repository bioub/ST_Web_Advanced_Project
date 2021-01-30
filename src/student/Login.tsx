import { Component, SyntheticEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import styles from './Login.module.css';

class Login extends Component<RouteComponentProps> {
  state = {
    studentName: '',
    teacherUsername: '',
  };

  handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    localStorage.setItem('studentName', this.state.studentName);
    localStorage.setItem('teacherUsername', this.state.teacherUsername);
    this.props.history.push('/student');
  };

  render() {
    return (
      <form className={styles.host} onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          value={this.state.studentName}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="teacherUsername"
          placeholder="Teacher Username"
          value={this.state.teacherUsername}
          onChange={this.handleChange}
        />
        <button>Connect</button>
      </form>
    );
  }
}

export default Login;
