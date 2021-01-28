# Quiz Creation et Register

Pour finir créer un formulaire dans le composant `QuizCreation`, le nombre de question et de possibleAnswer est variable.

Au submit, il faudra envoyer une requête `POST http://localhost:4000/api/quizzes` avec le body au format suivant :

```
{
    "name": "Nouveau questionnaire",
    "questions": [
        {
            "id": 1,
            "title": "Quand est-ce qu'on mange ?",
            "possibleAnswers": [
                {
                    "title": "A 12h",
                    "good": false
                },
                {
                    "title": "A 12h30",
                    "good": true
                }
            ]
        }
    ]
}
```

Créer également un composant Register pour s'inscrire sur la plateforme en tant que Teacher.