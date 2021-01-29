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
- afficher les possibleAnswers sous forme de boutons
- au click d'une possibleAnswer appeler postAnswer et changer la couleur du bouton (vert si la réponse est bonne, rouge sinon).
