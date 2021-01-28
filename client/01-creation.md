# Création du projet React

Dans le terminal placer vous dans le dossier `ProjetQuiz` et créer un projet React `client` avec le template TypeScript :

```
npx create-react-app client --template typescript --use-npm
```

Bonus : reprendre les installations et les configs de `prettier`, `eslint` et `lint-staged` (il y a déjà un morceau de config `eslintConfig` dans le fichier `package.json` qu'il faudra ajouter à la config `eslint` et la retirer du `package.json`).

## Création des modules et des composants

Dans le projet fraichement créé, ajouter 3 dossiers dans `src` :

- `public`
- `teacher`
- `student`

Créer ensuite les composants suivants :

- `public/Home.tsx`
- `public/NotFound.tsx`
- `teacher/Register.tsx`
- `teacher/Login.tsx`
- `teacher/Quizzes.tsx`
- `teacher/QuizCreation.tsx`
- `student/Login.tsx`
- `student/Answer.tsx`

Chaque composants aura le contenu suivant:

```
import { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <h2>Home</h2>
      </div>
    );
  }
}

export default Home;
```

Remplacer dans chaque fichier le nom de la classe, la propriété className, le contenu du h2 et l'export pour correspondre au nom du fichier.

