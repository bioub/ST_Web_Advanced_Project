import { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './Home.module.css';

class Home extends Component {
  render() {
    return (
      <div className={styles.host}>
        <div className={styles.menu}>
          <Link to="/teacher/login" className={styles.teacherLogin}>
            Teacher Login
          </Link>
          <Link to="/student/login" className={styles.studentLogin}>
            Student Login
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
