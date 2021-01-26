## dotenv

TypeORM peut utiliser différents format de config dont le fichier `.env`, en interne elle utilise la bibliothèque `dotenv`.

Le principe, lorsqu'on lit `process.env` soit la variable d'environnement existe alors elle est utilisée, soit dotenv charge la valeur contenue dans le fichier `.env`.

Nous allons nous en servir pour l'ensemble du projet.

Installer dotenv : `npm i dotenv`

Dans le fichier `index.ts` ajouter en début de fichier :

```
import config from './config';

dotenv.config();
```

Compléter le fichier `.env` avec les valeurs contenues dans `config/index` :

```
NODE_ENV = developement
...
```

Dans l'ensemble du projet, remplacer :
- `config.env` par `process.env.NODE_ENV`
- `config.port` par `process.env.PORT`
- `config.jwtSecret` par `process.env.JWT_SECRET`

Supprimer le répertoire `config`

Passer la valeur de `PORT` à `4000` (`3000` sera utilisé par le serveur de dev de React)

