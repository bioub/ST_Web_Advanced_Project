# Outils

Comme pendant la formation, nous utiliserons le projet Express Rest Skeleton comme base de départ.

Commencez par créer un dossier `ProjetQuizz`.

En ligne de commande, placez vous dans le projet et clonez le squelette :

`git clone https://github.com/bioub/express-rest-skeleton.git server`

Un dossier `server` doit apparaitre, l'ouvrir avec VSCode.

Installez les dépendances via la commande `npm install`

## Prettier

Installer prettier en devDependencies : `npm install prettier --save-dev`

Comme vu pendant la formation, dans le fichier `package.json` ajouter un script `format` pour lancer prettier manuellement sur les fichiers `.ts`, `.js` et `.json` en incluant les sous-répertoires.

Lancer le script format : `npm run format` et vérifier que vous obtenez la sortie suivante (les temps seront bien sûr différents) :

```
.eslintrc.json 30ms
app.js 37ms
config/index.js 4ms
controllers/todo.js 31ms
controllers/user.js 12ms
index.js 11ms
middlewares/authenticate.js 8ms
models/todo.js 28ms
models/user.js 8ms
package-lock.json 137ms
package.json 4ms
routes/todo.js 6ms
routes/user.js 4ms
```

Si ce n'est pas déjà fait, installer le plugin Prettier dans VSCode :

https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

Créer ensuite un fichier `.prettierrc` au format JSON (avec à minima des accolades) :

```
{}
```

En regardant dans la doc de Prettier (https://prettier.io/docs/en/options.html) ou en vous aidant de la complétion proposée par le plugin de VSCode :

- passer la longueur des lignes à 120 caractères
- utiliser les apostrophes plutôt que les guillemets pour les chaines de caractères
- utiliser les virgules finales tout le temps (y compris pour les appels de fonction)

## lint-staged

Installer ensuite `lint-staged` pour lancer ce script automatiquement en `pre-commit` :

`npx mrm lint-staged`

Dans le fichier `package.json` modifier la config `lint-staged` pour que prettier s'applique aux fichiers `.ts`, `.js` et `.json`

Conserver la config `*.js` pour `eslint` dans un premier temps.

Indenter le fichier `index.js` n'importe comment et créer un commit dont le message pourrait être `chore: prettier` pour vérifier que `prettier` se lance bien en `pre-commit`

Remarquez l'utilisation du commentaire `// prettier-ignore` dans les fichiers du répertoire `routes/` qui exclu la prochaine instruction du formatage.
