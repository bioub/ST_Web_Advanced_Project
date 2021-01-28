# Routeur

## Mise en place

Installer le router React Router : `npm i react-router-dom`

Installer ses déclarations TypeScript : `npm i --save-dev @types/react-router-dom`

Remplacer ensuite le contenu du fichier `App.tsx` par :

```
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
            <NavLink to="/" className="link" exact activeClassName="active">
              STocrative
            </NavLink>
            <NavLink to="/teacher" className="link" activeClassName="active">
              Teacher
            </NavLink>
            <NavLink to="/student" className="link" activeClassName="active">
              Student
            </NavLink>
          </header>
          <main>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/teacher/login" component={TeacherLogin} />
              <Route path="/teacher/register" component={Register} />
              <Route path="/teacher/create-quizz" component={QuizCreation} />
              <Route path="/teacher" component={Quizzes} />
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
```

Vérifier que les pages soit bien accessibles.

