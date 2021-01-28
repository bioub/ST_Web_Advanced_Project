# Quizzes

Sur la page `/teacher` nous allons afficher la liste des Quizzes.

Préremplir le fichier `teacher/Quizzes.tsx` comme ceci :

```
import { Component } from "react";
import { Link, Redirect } from "react-router-dom";

interface Props {

}

interface State {

}

class Quizzes extends Component<Props, State> {
  render() {
    if (!localStorage.getItem("token")) {
      return <Redirect to="/teacher/login" />;
    }

    return (
      <div className="Quizzes">
        <h2>Hello username</h2>
        <Link to="/teacher/create-quizz">Add new quiz</Link>
        <table>
          <thead>
            <tr>
              <th>Quiz</th>
              <th>Actions</th>
            </tr>
            <tr>
              <td>An awesome quiz</td>
              <td>
                <button>Activate</button>
              </td>
            </tr>
            <tr>
              <td>The active quiz</td>
              <td>
                <button disabled>Activate</button>
              </td>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

export default Quizzes;
```

Créer une fonction `fetchCurrentUser` dans `teacher/api` :

```
export async function fetchCurrentUser() {
  const token = localStorage.getItem("token");

  return axios.get("http://localhost:4000/api/users/me", {
    headers: { authorization: token },
  });
}
```

Dans `api.ts` créer une interface pour `User` (`id`, `username`, `password`) et exporter la.

Vous pouvez expliquer au compilateur TypeScript qu'axios répond un `User` en utilisant la syntaxe : `axios.get<User>("http://localhost:4000/a...`

Appeler cette fonction dans la méthode `componentDidMount` du composant `Quizzes` (vous pouvez déclarer `componentDidMount` `async` pour pouvoir utilser `await` devant `fetchCurrentUser`)

Stocker l'utilisateur résolu par la promesse de `fetchCurrentUser` dans le state de `Quizzes` et remplacer la phrase `<h2>Hello username</h2>` par celui du state.

Compléter l'interface `State` de `Quizzes` pour qu'elle accepter une propriété `user` de type `User` (vous pouvez aussi utiliser `Partial<User>` si c'est plus adapté à votre code).

Créer ensuite une méthode `fetchQuizzes` sur le même modèle que `fetchCurrentUser`, appeler cette méthode dans `componentDidMount` et stocker les quizzes dans le state. `fetchQuizzes` devra requêter `GET http://localhost:4000/api/users/quizzes`.

Créer et exporter une interface pour `Quiz` en vous aidant par exemple du site : https://quicktype.io/typescript/


Bonus : utiliser Promise.all pour lancer les 2 requêtes en simultané.

Bonus 2 : afficher un "Loader" pendant le chargement des données.

Créer ensuite une boucle pour transformer les lignes du tableau par celle reçues du serveur.

Pour finir, écouter le click du bouton `Activate`, puis sur le modèle des requêtes précédentes, envoyer une requête `POST http://localhost:4000/api/quizzes/2/activate` (où 2 correspond à l'id du quiz à activer).

Une fois la réponse obtenue, mettez à jour le tableau `quizzes` du state pour refléter le changement (vous pourriez utiliser la fonction `.map`)
