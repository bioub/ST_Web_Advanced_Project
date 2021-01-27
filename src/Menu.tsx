import { NavLink } from "react-router-dom";

import styles from './Menu.module.css';

function Menu() {
  return (
    <header className={styles.host}>
      <NavLink to="/" className={styles.link} exact activeClassName={styles.active}>
        STocrative
      </NavLink>
      <NavLink to="/teacher" className={styles.link} activeClassName={styles.active}>
        Teacher
      </NavLink>
      <NavLink to="/student" className={styles.link} activeClassName={styles.active}>
        Student
      </NavLink>
    </header>
  );
}

export default Menu;
