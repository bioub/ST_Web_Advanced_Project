# Tests

Nous allons maintenant écrire les tests unitaires avec Jest.

Par défaut dans le template TypeScript de React est installé la bibliothèque Testing Library.

Vous y trouverez des références dans le `package.json` :

```
"@testing-library/jest-dom": "^5.11.4",
"@testing-library/react": "^11.1.0",
"@testing-library/user-event": "^12.1.10",
```

Et dans le fichiers `setupTest.ts` :

```
import '@testing-library/jest-dom';
```

Dans le fichier `App.test.tsx` se trouve un exemple de test utilisant Testing Library :

```
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

Ce test doit mainteant échouer puisque le texte "learn react" n'est plus présent sur la page.

Adapter ce test pour qu'il vérifie que la page contiennent `STocrative`.

Ecrire ensuite les tests unitaires de `teacher/login` :

- en faisant un mock des fonctions de `api.ts` avec `ts-jest` comme côté serveur
- en saisissant du texte dans les champs avec User Event  https://testing-library.com/docs/ecosystem-user-event/#typeelement-text-options
- en déclenchant l'événement `submit` avec `fireEvent` : https://testing-library.com/docs/dom-testing-library/api-events
- pour vérifier que le `history.push` utiliser `jest.fn()`

Sur le même modèle, tester ensuite la page `Quizzes`.