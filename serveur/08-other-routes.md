# Autres routes

Pour l'instant le projet ne contient que les routes de users, dans notre application les users sont les personnes qui vont créer les quizzes, les autres n'ont pas besoin de se connecter.

Il manque 2 fonctionnalités importantes dans l'application :

- pouvoir lister, créer et lancer des quizzes
- pouvoir répondre à un quiz qui est lancé

## Visualiser, créer des quizzes

Ajouter une entité `Quiz` dans le repertoire `entities`.

Un quiz aura 3 propriétés :
- `id` (entier auto-incrémenté)
- `name` (string)
- `questions` (tableau de questions serialisé en JSON dans la base)
- `active` (boolean, le quiz auquel les participants peuvent répondre)

Pour simplifier le projet, les questions sont sérialisées en JSON, sinon il aurait fallu créer une entité supplémentaire (et donc une table dans la database).

Voici à quoi va ressembler le tableau `questions` :

```
[
  {
    "id": 1,
    "title": "Quelle société a créé React ?",
    "possibleAnswers": [{
      "title": "Facebook",
      "good": true
    }, {
      "title": "Google",
      "good": false
    }]
  },
  {
    "id": 2,
    "title": "Express simplifie la création de serveur HTTP",
    "possibleAnswers": [{
      "title": "Vrai",
      "good": true
    }, {
      "title": "Faux",
      "good": false
    }]
  }
]
```

Vous pouvez créer les interfaces TypeScript `Question` et `PossibleAnswer` pour améliorer la complétion.

Pour facilement créer le JSON nous utiliserons le type "simple-json" de TypeORM : https://github.com/typeorm/typeorm/blob/master/docs/entities.md#simple-json-column-type

Ajouter ensuite une Relation, c'est à dire un lien entre Quiz et User (qui sera traduit dans SQLite par une clé étrangère) :

La relation utilisé sera une relation `1..n` ce qui signifie :

- pour `1` quiz on retrouve jusqu'à `1` user (pas possibilité d'éditer le quiz à plusieurs)
- pour `1` user on retrouve jusqu'à `n` quizzes (un user peut créer plusieurs quiz)

Dans la doc de TypeORM vous trouverez un exemple entre `User` et `Photos` très proche du notre : https://github.com/typeorm/typeorm/blob/master/docs/many-to-one-one-to-many-relations.md

Créer dans `User` une propriété `quizzes` qui contiendra un tableau de Quiz (`photos` dans la doc)

Créer dans `Quiz` une propriété `user` comme dans la doc.

Editer ensuite le fichier `seeds/dev.ts` pour générer des questionnaires de tests.

Ecrire les fichiers `models/quiz.ts`, `controllers/quiz.ts` et `routes/quiz.ts` qui contiendront 4 routes supplémentaires :

`GET /api/quizzes` liste l'ensemble des quizzes du user connecté, vous avez accès à l'utilisateur connecté via `getCurrent` (nécessite `authenticate`)

`POST /api/quizzes` pour créer un quiz associé au user connecté(nécessite `authenticate`)

`POST /api/quizzes/:id/activate` active le quizz dont l'id est en paramètres et désactive les autres du même user (nécessite `authenticate`)

`GET /api/users/active` pour afficher le quiz actif de l'utilisateur (sera accessible par tous, donc ne pas utiliser `authenticate`)

Ces 2 routes seront protégées par le middlewares `authenticate` (il faudra être connecté pour y accéder)

Penser à ajouter vos routes à `app.ts`.

## Répondre à un quiz

Ajouter une entité `Answer` qui contiendra :

```
@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 40 })
  studentName: string;

  @Column()
  question: number;

  @Column()
  answer: string;

  @ManyToOne(() => Quiz)
  quiz: Quiz;
}
```

Créer une route `POST /api/answers` qui ne nécessite pas d'être connecté.

Le body de la requête pourra ressembler à : 

```
{
    "studentName": "Romain B",
    "question": 2,
    "value": "Vrai"
}
```

Au moment d'insérer la réponse dans la base, sélectionner le quiz actif pour l'ajouter à `Answer`.

Idéalement vérifier qu'il n'y a pas déjà une réponse ayant les mêmes `studentName`, `quiz`, `question`.

BONUS : ajouter la bibliothèque `class-validator` et valider les données reçues en JSON (champs obligatoire...) : https://github.com/typeorm/typeorm/blob/master/docs/validation.md