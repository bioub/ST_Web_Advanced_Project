# Teacher Login

Modifier le composant `teacher/Login.tsx` pour le code suivant :

```
import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";

import styles from "./Login.module.css";

class Login extends Component<RouteComponentProps> {
  render() {
    return (
      <form className={styles.host}>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button>Connect</button>
      </form>
    );
  }
}

export default Login;
```

Le fichier `Login.module.css` contient :

```
.host {
  padding: 10px;
  width: 70%;
  background-color: #efefef;
  border-radius: 5px;
  margin: 100px auto;
  text-align: center;
}

.host input {
  margin: 20px auto;
  display: block;
}

.host button {
  cursor: pointer;x
  outline: 0;
  border: 0;
  margin: 20px auto;
  padding: 10px;
  background-color: coral;
  border-radius: 5px;
  display: block;
  color: white;
}
```

Modifier le fichier `Login.tsx` pour qu'il contienne un state créé à partir des champs username et password (`onChange`).

Dans le callback associé à `onChange`, le paramètre event sera de type `SyntheticEvent<HTMLInputElement>`.

Pour manipuler les propriétés `value` et `name` de l'élément `input` on utilisera `event.currentTarget.value` (et non pas `event.target.value` où techniquement peut être autre chose qu'un `HTMLInputElement`).

Créer ensuite un fichier `teacher/api.ts`.

Installer la bibliothèque axios : `npm i axios`

Puis ajouter le code suivant à `teacher/api.ts`

```
import axios from "axios";

export interface Credentials {
  username: string;
  password: string;
}

export async function login(credentials: Credentials) {
  return axios.post("http://localhost:4000/api/users/login", credentials);
}
```

Remarquez qu'axios converti le body de la requête et la réponse en JSON automatiquement. Il ajoute également l'entete `Content-type: application/json` nécessaire à Express (avec `fetch` il aurait fallu écrire tout celà nous même).

Ecouter l'événement submit du formulaire de `Login` et désactiver l'action par défaut (`event.preventDefault()`).

Appeler ensuite le code suivant :

```
try {
  const res = await login(this.state);
  localStorage.setItem('token', res.data.token);
  this.props.history.push('/teacher');
} catch (err) {
  
}
```

Dans le block catch, ajouter au state une propriété `errorMessage` ayant comme valeur `Mauvais Login/Password` et afficher `errorMessage` sur la page s'il existe.

En cas de login valide, nous avons stocké le token dans le localStorage et avons redirigé vers la page `/teacher` qui doit afficher la liste des Quizz de l'utilisateur connecté.

