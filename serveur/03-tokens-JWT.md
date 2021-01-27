# Tokens JWT

Nous allons remplacer le système de token actuel par des tokens JWT (JSON Web Tokens)

L'intérêt des tokens JWT sur le système actuel est qu'ils n'ont pas besoin d'être stockés, ils intégrent un système de signature pour vérifier leur validité.

Vous verrez sur le site https://jwt.io qu'un token JWT est constitué de 3 parties :

- header (qui contient des l'algorithme utilisé par la signature)
- payload (qui contient des informations sur le token, ces infos ne doivent pas pouvoir changer dans le temps, ex: username ou userid, date d'expiration)
- signature (permettra de s'assurer de la validité du token)

Supprimer uuid : `npm rm uuid`

Installer via npm : `npm install jsonwebtoken`

La bibliothèque jsonwebtoken ne contient pas les déclarations TypeScript, on les installera donc :
`npm i -D @types/jsonwebtoken`

JWT a besoin d'une clé secrète pour générer sa signature (sinon tout le monde pourrait créé une signature valide).

Dans `src/config` ajouter la ligne : 

```
jwtSecret: process.env.JWT_SECRET || 'NOT_SO_SECRET',
```

Pendant le dev la clé `NOT_SO_SECRET` sera utilisé, en prod il faudra absolument créer une variable d'environnement `JWT_SECRET`

Dans `models/user` token pourra être créé à partir de la fonction `sign` de `jsonwebtoken` :

```
sign({ username: user.username }, config.jwtSecret)
```

Importer les `sign` et `config` pour que le code fonctionne

Dans `middlewares/authenticate` le test devra se faire en utilisant la fonction `verify` :

```
if (verify(req.headers.authorization, config.jwtSecret)) {
  return next();
}
```

Vous pouvez maintenant supprimer la variable `tokens` des fichiers `models/user` et `middlewares/authenticate`

Dans `models/user` ajouter et exporter la fonction :

```
async function getCurrent(token: string): Promise<any> {
  const payload = decode(token) as { [key: string]: any };

  return {
    username: payload.username,
  };
}
```

A ce stade elle retourne un user créé à partir du payload, à terme elle ira chercher le user correspondant dans la base de données.

Créer ensuite un controller `me` qui appelera cette méthode en lui passant le token contenu dans l'entête HTTP `Authorization`

Puis créer une route qui répondra à la requête HTTP :
`GET /api/users/me`

Ajouter le middleware `authenticate` et le contrôleur `me` à cette route.

Tester ensuite dans Postman que des requêtes vers :
`POST /api/users/login` et `GET /api/users/me` (me redemander si besoin comment configurer Postman).

Vous pouvez vérifier le payload des tokens sur le site https://jwt.io 

Bonus 1 : Les fonction `sign`, `verify` ont été utilisé de manière synchrone. Des versions asynchones existent (https://github.com/auth0/node-jsonwebtoken#readme) mais sont basés sur des callbacks, créer une fonction qui les transforment en promesse et utiliser ces fonctions asynchrones (pour créer les fonctions basées sur les promesses vous pouvez utiliser la fonction `promisify` du module `util` de Node : https://nodejs.org/dist/latest-v12.x/docs/api/util.html#util_util_promisify_original).
(NE PAS promisify `decode` qui n'existe pas en asynchrone)

Bonus 2 : Par défaut la fonction `sign` créer un token sans date d'expiration, en regardant les options de `jsonwebtoken` https://github.com/auth0/node-jsonwebtoken#readme ajouter une expiration à 24h.
