# SQLite Database

Nous allons maintenant construire une base de données et créer un jeu de donnée de test pour notre application en utilisate SQLite.

## sqlite3

Créer un fichier `db/.gitkeep` à la racine du projet et ajouter la ligne `db/*.db` au fichier `.gitignore` car nous ne voulons pas que les bases soient versionnées.

Dans la config ajouter la ligne : `dbPath: process.env.DB_PATH || './db/dev.db',`

Installer sqlite3 : `npm i sqlite3`

Créer un fichier `./src/seeds/dev.ts` qui permettra d'alimenter la base sur un poste de développement.

Créer un script npm `seed:dev` pour lancer ce script :
`"seed:dev": "ts-node src/seeds/dev.ts"`

Créer une variable dbPath dans `./src/seeds/dev.ts` qui est le chemin absolu vers le fichier `db/dev.db` en utilisant la fonction `resolve` de Node et les variables `__dirname` et `config.dbPath`.

Ajoutez-y ensuite le code suivant (la classe `Database` doit être importée de `sqlite3`) :

```
const db = new Database(dbPath);

db.serialize(() => {
  db.run('DROP TABLE IF EXISTS user;');
  db.run('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR (40) UNIQUE, password CHAR (32));');
  db.run("INSERT INTO user (id, username, password) VALUES (1, 'romain', '123456');");
})

db.close();
```

Lancer le script npm `seed:dev`

Installer ensuite le programme SQLiteStudio https://sqlitestudio.pl pour vérifier avec cet outil que la base `dev.db` a bien créé et rempli la table `user`

## TypeORM

Plutôt que d'utiliser le client `sqlite3` nous allons maintenant utiliser un ORM.

Un ORM (Object Relationnal Mapper) est une bibliothèque qui va nous permettre de discuter avec notre base de données en utilisant le moins possible le langage SQL.

Pour cela on va créer un mapping, c'est à dire un fichier de traduction entre une classe et une table.

Exemple :
- un enregistrement de la table `quizzes` est liée à une classe `Quiz`
- la colonne `name` de cette table est liée à la propriété `title` de cette classe
- la colonne `questions` est liées à la propriété de type `Question[]` et le passage de l'un à l'autre se fait en passant par une conversion JSON
- ...

L'ORM à la mode sous Node.js en ce moment est TypeORM qui utilise les décorateurs TypeScript pour décrire le mapping Objet/Relationnel.

Installer TypeORM : `npm install typeorm reflect-metadata`

Dans `app.ts` et `seeds/dev.ts` ajouter en début de fichier la ligne `import "reflect-metadata";`

Dans le fichier `tsconfig.json`, activer les paramètres suivants :

```
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
```

Créer ensuite à la racine du projet un fichier `.env`, y ajouter le paramètres de configuration pour TypeORM :

```
TYPEORM_CONNECTION = sqlite
TYPEORM_DATABASE = ./db/dev.db
TYPEORM_ENTITIES = src/entities/**/*.ts
TYPEORM_SYNCHRONIZE = true
TYPEORM_LOGGING = true
```

Les paramètres sont les suivants :

- `TYPEORM_CONNECTION` le type de base, TypeORM est compatible avec les bases suivantes : MySQL / MariaDB / Postgres / CockroachDB / SQLite / Microsoft SQL Server / Oracle / SAP Hana / sql.js
- `TYPEORM_DATABASE` dans le cas de SQLite, le chemin vers la base
- `TYPEORM_ENTITIES` les dossiers où trouver les entitées (et les mappings)
- `TYPEORM_LOGGING` affiche des logs (par défaut dans le terminal)
- `TYPEORM_SYNCHRONIZE` si true, un changement dans le mapping est répercuté dans la base immédiatement (à ne pas mettre en prod, utiliser les migrations à la place)

Créer un fichier `src/entities/user.ts` y ajouter le contenu suivant :

```
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  username: string;

  @Column()
  password: string;
}
```

Pour gagner du temps, notre classe contient directement le mapping Objet/Relationnel sous forme de décorateur (les `@Entity()`, `@Column()`...)

- `@Entity()` déclare l'entité, la table aura le même nom en minuscule
- `@PrimaryGeneratedColumn()` déclare la clé primaire, auto-incrémentée
- `@Column()`

Le nom des colonnes sera le nom des propriétés (par défaut), les types de mapping seront déduit des types TypeScript (par défaut)

Remplacer le contenu du fichier `src/seeds/dev.ts` par :

```
import { createConnection, getRepository } from 'typeorm';

import { User } from '../entities/user';

(async () => {
  await createConnection();
  const userRepository = getRepository(User);
  await userRepository.clear();

  const user = new User();
  user.username = 'romain';
  user.password = '123456';

  await userRepository.insert(user);
})();
```

Beaucoup plus simple que du SQL non ?

`createConnection()` lit le fichier `.env` et créé un pool de 10 connexion 

`getRepository(User)` créé un objet Repository dont l'appel des méthodes sont traduits en requêtes SQL

Modifier les options de l'entité `User` pour :

```
@Column({length: 40})
username: string;

@Column({type: 'character', length: 65})
password: string;
```

Relancer le script `seed:dev` et vérifier dans les logs le changement.

Editer le fichier `index.ts`, on créé le pool de connexion avant même de démarrer le serveur HTTP :

```
createConnection().then(() => {
  server.listen(config.PORT, () => {
    console.log('Server started on port ' + config.PORT);
  });
});
```

Regarder la documentation de TypeORM pour apprendre à ajouter des options de recherche (select, where...) :
https://typeorm.io/#/find-options

Puis éditer le fichier `models/users` :

- la méthode `login` doit rechercher l'utilisateur en base de données à partir du username et password (s'il est présent ont génère le token, sinon null)
- la méthode `getCurrent` doit retourne le user de la base à partir du username contenu dans le token, sinon null (par sécurité le user retourne ne doit pas afficher le mot de passe)

Ajouter ensuite une méthode `create` pour créer des utilisateurs. Comme login elle recevra en paramètre `{username: string, password: string}`, cette méthode devra vérifier que le username n'existe pas déjà en base de données (`throw new Error('username already exists')` sinon)

Créer les controleurs et routes correspondantes pour qu'on puisse s'inscrire en envoyant une requête `POST /api/users/register/`

