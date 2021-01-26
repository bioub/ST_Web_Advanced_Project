# Autres routes

Pour l'instant le projet ne contient que les routes de users, dans notre application les users sont les personnes qui vont créer les quizzes, les autres n'ont pas besoin de se connecter.

Il manque 2 fonctionnalités importantes dans l'application :

- pouvoir lister, créer et lancer des quizzes
- pouvoir répondre à un quiz qui est lancé

## Lister, créer des quizzes

Ajouter une entité `Quiz` dans le repertoire `entities`.

Un quiz aura 3 propriétés :
- `id` (entier auto-incrémenté)
- `name` (string)
- `questions` (tableau de questions serialisé en JSON dans la base)

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

Ecrire les fichiers `models/quiz.ts`, `controllers/quiz.ts` et `routes/quiz.ts` qui contiendront 2 routes :

`GET /api/quizzes` liste l'ensemble des quizzes du user connecté (vous pourrez réutiliser la méthode getCurrent de `User`)

`POST /api/quizzes` pour créer un quiz

Ces 2 routes seront protégées par le middlewares `authenticate` (il faudra être connecté pour y accéder)

Penser à ajouter vos routes à `app.ts`.

## Lancer un quiz

Pour simplifier le projet, le quiz lancé sera simplement en activant une Relation `OneToOne` de quiz dans `User`.

Contrairement à Socrative on ne saisira pas une `Room Name` pour se connecter à un qui mais un `Username` qui permettra de retrouve le quiz actif.

Ajouter une relation OneToOne `activeQuiz` dans `User` comme dans la doc (`Quiz` plutôt que `Profile`) :
https://github.com/typeorm/typeorm/blob/master/docs/one-to-one-relations.md

Créer une route `PATCH /api/users/:id` qui permettra d'éditer cette propriété.

## Répondre à un quiz

Ajouter une entité `Answer` qui contiendra :

- id (auto incrémenté)
- name (string, le nom de la personne qui répond)
- quiz (de type Quiz, relation vers le quiz auxquel on répond)
- answer (la réponse à une question)

La réponse à une question sera de la forme :
{
  "id": 1,
  "answer": "Facebook"
}

Comme pour `possibleAnswers`, créer la stocker dans la base en JSON.

Créer les fichiers nécessaires pour envoyer une réponse (pas besoin d'être connecté) :

La route sera `POST /api/answers`

BONUS : ajouter la bibliothèque `class-validator` et valider les données reçues en JSON (champs obligatoire...) : https://github.com/typeorm/typeorm/blob/master/docs/validation.md