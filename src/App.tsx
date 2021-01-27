import { Component } from "react";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";

import Home from "./public/Home";
import NotFound from "./public/NotFound";
import Answer from "./student/Answer";
import StudentLogin from "./student/Login";
import TeacherLogin from "./teacher/Login";
import QuizCreation from "./teacher/QuizCreation";
import Quizzes from "./teacher/Quizzes";
import Register from "./teacher/Register";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <header className="host">
            <NavLink to="/" className="link">STocrative</NavLink>
            <NavLink to="/teacher" className="link">Teacher</NavLink>
            <NavLink to="/student" className="link">Student</NavLink>
          </header>
          <main>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/teacher/login" component={TeacherLogin} />
              <Route path="/teacher/register" component={Register} />
              <Route path="/teacher" component={Quizzes} />
              <Route path="/teacher/create-quizz" component={QuizCreation} />
              <Route path="/student/login" component={StudentLogin} />
              <Route path="/student" component={Answer} />
              <Route path="*" component={NotFound} />
            </Switch>
          </main>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
