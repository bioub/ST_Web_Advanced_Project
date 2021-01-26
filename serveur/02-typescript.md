
## TypeScript

Installer TypeScript :

`npm i typescript -D`

Dans le fichier `app.js` supprimer les lignes :

- `const todoRoutes = require('./routes/todo');`
- `app.use('/api/todos', todoRoutes);`

Ce projet ne contenant plus de todos.

Vous pouvez ensuite supprimer les fichiers (ou mettez les de côté si vous souhaitez vous en inspirer pour la suite du projet) :

- `routes/todo.js`
- `controllers/todo.js`
- `models/todo.js`

Renommer ensuite l'ensemble des fichiers `.js` en `.ts`

Lancer la commande `./node_modules/.bin/tsc --init` pour générer la configuration du compilateur TypeScript.

Dans le fichier `tsconfig.json` changer la target pour `ES2019` avec laquelle Node.js 12 est compatible. (`ES2020` si vous utilisez Node.js 14)

Déplacer les fichiers suivants dans un répertoire `src` :

- `index.ts`
- `app.ts`
- `routes/`
- `controllers/`
- `models/`
- `middlewares/`
- `config/`

Dans le fichier `tsconfig.json` désigner `./src` en `rootDir` et `.dist` en `./outDir`.

Exclure le dossier `dist` de git via le fichier `.gitignore`

Dans le fichier `package.json` ajouter un script `build` qui lancera la commande `tsc` et lancer ce script via `npm run build`

## Correction des erreurs

Vous devriez avoir un certain nombre d'erreurs à corriger dans les fichiers .ts

Installer les déclarations pour les APIs de Node.js : `npm i --save-dev @types/node@12` (ou 14 selon votre version de Node) pour corriger les erreurs liées aux APIs de Node.js (require, module...)

Transformer les modules CommonJS en module ESM :

- dans les fichiers où sont présent les fonctions `require` utiliser le générateur de VSCode pour les transformer en `import` (clic que les ... sous le `r` de `require` puis clic sur l'ampoule)

- l'import de `uuid` dans le fichier `models/user` doit s'écrire `import * as uuid from 'uuid';`

- remplacer les `exports.nomDeLexport = nomDeLexport` par `export { nomDeLexport }` et les `module.exports = nomDeLexport` par `export default nomDeLexport`. Pour la fonction login dans `controllers/user` vous pourriez remplacer `exports.login = async (req, res, next) => {` par `export async function login(req, res, next) {` (cela impliquera d'importer différemment dans `routes/user`, par exemple `import * as userCtrl from '../controllers/user';`)

- des exports multiples comme dans `models/user` ou `controllers/user` peuvent être soit importés en regroupants les exports, ex : `import * as User from '../models/user';` soit importés séparemment `import { login, token } from '../models/user';`, (la deuxième solution est préférable mais plus compliqué puisqu'il faudra renommer certaines fonctions comme `login` qui deviennent ambigues, ie. utilisées 2 fois dans le même fichier).

Installer les déclarations pour les bibliothèques utilisées : `npm i -D @types/express @types/cors @types/morgan @types/uuid`   

Dans le fichier `tsconfig.json` décommenter la ligne :
`"moduleResolution": "node",` pour permettre la prise en compte des modules Node.js.

Typer les variables `req`, `res`, `next` et `err` :
- `req`: `Request` (importé depuis express)
- `res`: `Response` (importé depuis express)
- `next`: `NextFunction` (importé depuis express)
- `err`: `Error` (pas d'import)

Et supprimer les commentaires JSDoc associées.

Dans `models/user` créer une interface pour le paramètre `credentials` (composé de `username: string` et `password: string`) et supprimer le commentaire JSDoc associé.

A ce stade il doit vous rester 2 erreurs TypeScript :
- une dans `middlewares/authentication` 
- l'autre dans `app`

Dans `middlewares/authentication` l'erreur vient du fait que le header authentication peut ne pas exister (cela dépend de la requete), son type est donc `string | undefined`, alors que le type de tokens est `string[]`.

Editer le fichier `tsconfig.json` en recherchant la ligne `strictNullChecks`, la décommenter les la passer à `true`

Pour la seconde erreur (celle de `app`) cela vient du fait qu'il n'y a pas de propriété `notFoundReason` dans la déclaration initiale d'express (celle qui se trouve dans `@types/express`) et que `Request` n'y est pas définie comme extensible.

On va donc étendre cette déclaration en créant à la racine du projet un fichier `types/express/index.d.ts` y ajouter le code suivant :

```
declare namespace Express {
  export interface Request {
    notFoundReason?: string
  }
}
```

Ajouter le chemin vers de dossier `types` dans `tsconfig.json` :

```
"typeRoots": ["./types", "./node_modules/@types"],
```

Normalement le code compile !

## Scripts npm

Pour finir, remplacer le script `start` par `node dist/index.js`

Installer `ts-node` : `npm i ts-node -D`

Remplacer le script `start:dev` par `nodemon --watch 'src/**/*.ts' --ignore 'src/**/*.spec.ts' --exec 'ts-node' src/index.ts`

## ESLint TypeScript

On va maintenant modifier la config de eslint pour qu'il soit compatible avec le code TypeScript :

Installer les plugins suivants :

```
npm i -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

Modifier le fichier `.eslintrc.json` pour :

```
{
  "$schema": "https://json.schemastore.org/eslintrc",
  "env": {
    "node": true,
    "commonjs": true,
    "es2020": true
  },
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 11
  },
  "rules": {}
}
```

Modifier les scripts npm `lint` et `lint:fix` par :

```
"lint": "eslint src",
"lint:fix": "eslint src --fix",
```

Modifier également la config de `lint-staged` pour qu'il tienne compte des fichiers `.ts`

Installer le plugin ESLint de VSCode si nécessaire : https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

Dans `app.js` remplacer les commentaires `// eslint-disable-next-line no-unused-vars` par `// eslint-disable-next-line @typescript-eslint/no-unused-vars`

Corriger les erreurs restantes, par exemple en indiquant le type de retour de fonction, ex dans `models/user` :

```
function login(credentials: Credentials): Promise<string|null> {
```

