# Student

## Login

Reprendre le code et la mise en forme du formulaire de login teacher.

Remplacer les champs `username` par `studentName` et `password` par `teacherUsername` (`teacherUsername` sera l'équivalent de `Room Name` sur Socrative).

Au submit du formulaire il n'y a pas de requête à envoyer. 

A la place stockez `studentName` et `teacherUsername` dans le localStorage et redirigez vers la page `/student`.

## Answer

Ajouter un fichier `student/api.ts` et créer 2 méthodes :

- `fetchActiveQuiz` qui va requêter `GET http://localhost:4000/api/quizzes/active?username=romain` (`romain` sera à remplacer par `teacherUsername` contenu dans le localStorage)
- `postAnswer` qui va poster les réponses

Dans le composant `Answer` :

- afficher la liste des questions
- afficher les `possibleAnswers` sous forme de boutons
- au click d'une `possibleAnswer` appeler `postAnswer` et changer la couleur du bouton (vert si la réponse est bonne, rouge sinon).

`postAnswer` devra envoyer une requête `POST /api/answers` avec en body un objet de la forme :

```
{
  question: 1,
  answer: 'HyperText Markup Language',
  studentName: 'Cédric'
  teacherUsername: 'romain'
}
```

Pour faciliter la mise en forme vert/rouge du bouton, vous pouvez stocker les réponses dans le state sous la forme :

```
{
  1: 'HyperText Markup Language',
  2: 'Bof'
}
```

où 1 et 2 sont les id des questions.

En TypeScript cet objet serait de type `{ [questionId: number]: string }`.

Bonus 1 : factoriser la ligne avec les boutons en créant composant PossibleAnswers qui recevra via les props : 
  - possibleAnswers: PossibleAnswer[]
  - selectedAnswer: Answer
  - onSelectedAnswer: (answer: Answer) => void

Bonus 2 : ajouter côté Express une route `GET /api/answers` à laquelle on pourra passer en query `?studentName=NOM_DU_STUDENT&teacherName=USERNAME_DU_TEACHER`

Elle devra retourner un tableau de réponse stockées en DB (associées à ces `studentName` et `teacherName`)

Appeler cette méthode au componentDidMount pour afficher les réponses précédentes.