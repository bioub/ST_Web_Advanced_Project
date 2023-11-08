# Test automatisés

Nous allons écrire les tests unitaires et fonctionnels de l'application.

Pour permettre de compiler les tests `.ts` en `.js` simplement et permettre le debug nous utiliserons la bibliothèque `ts-jest`.

Installer `jest`, `ts-jest` et `supertest` : `npm i -D jest @types/jest ts-jest supertest @types/supertest`

Créer une config pour `ts-jest` via la commande: `npx ts-jest config:init`

Créer un script npm `test` qui lancera le programme `jest` (`ts-jest` sera bien utilisé par `jest` en interne)

Editer le fichier `jest.config.js` comme ceci :

```
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
};
```

## Test unitaires

Les tests unitaires en TypeScript ont une contrainte supplémentaire, il faut respecter les types, ce qui peut être contraignant lorsque qu'on créer des objets partiels (ex: Request et Response) et des mocks.

Voici un exemple de test unitaire du middleware authenticate qui gère ces 2 problématique :

```
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import authenticate from './authenticate';

jest.mock('jsonwebtoken');
const mockedJwt = jest.mocked(jwt, { shallow: true })

test('authenticate calls next if token is valid', () => {
  const validToken = '1234';
  const nextSpy = jest.fn();

  mockedJwt.verify.mockImplementationOnce(() => true);

  const fakeRequest = { headers: { authorization: validToken } } as Partial<Request>;
  const fakeResponse = {} as Partial<Response>;

  authenticate(fakeRequest as Request, fakeResponse as Response, nextSpy);

  expect(nextSpy).toHaveBeenCalled();
});
```

`fakeRequest` et `fakeResponse` sont des objets `Request` et `Response` partiels car ils ne contiennent pas toutes les propriétés et méthodes obligatoires.

`Partial` est un type utilitaire de TypeScript qui reprend le type passé en paramètre et rend toutes ses propriétés optionnelles : https://www.typescriptlang.org/docs/handbook/utility-types.html

En appelant votre middleware/controller il faudra forcer le type à `Request` et `Response` pour respecter les types : `fakeRequest as Request`...

Pour pouvoir `mocker` des objets (ici le module `jsonwebtoken`), `jest` nous fourni l'utilitaire `mocked` (`{ shallow: true }` permet de s'appliquer aux sous-propriétés ici `verify`), cela permet de récupérer de la complétion sur les méthodes `mockImplementationOnce`...

En vous inspirant de l'exemple ci-dessus, compléter le test unitaire du middleware `authenticate` pour traiter le cas où le token serait invalide (la méthode `verify` devrait retourner `false`).


## Test fonctionnels

Voici un exemple de test fonctionnel pour la route `GET /api/user/login/me`

```
import jwt from 'jsonwebtoken';
import request from 'supertest';

import app from '../app';
import * as userModel from '../models/user';

jest.mock('jsonwebtoken');
jest.mock('../models/user');
const mockedJwt = jest.mocked(jwt, { shallow: true });
const mockedUserModel = jest.mocked(userModel, { shallow: true });


test('GET /api/users/me', async () => {
  mockedJwt.verify.mockImplementation(() => true);
  mockedUserModel.getCurrent.mockResolvedValue({ id: 1, username: 'test', password: '' });
  const res = await request(app).get('/api/users/me');

  expect(res.status).toBe(200);
  expect(res.body).toEqual({ id: 1, username: 'test', password: '' });
});
```

En vous inspirant de cet exemple, écrire un test unitaire pour `POST /api/users/login`
