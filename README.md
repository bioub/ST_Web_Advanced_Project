# Projet ST Web Advanced

L'objectif de ce projet est de créer une application dont les fonctionnalités sont similaires à celles rencontrées lors des Quizzes sur Socrative.com.

## Fonctionnalités

L'application sera composée de 3 grands modules :

- Module public composé de :
  - Page d'accueil
  - Page d'erreur 404

- Module teacher composé de :
  - Formulaire d'inscription (teacher)
  - Formulaire de connexion (teacher)
  - Liste des questionnaires
  - Création d'un questionnaire

- Module student composé de :
  - Formulaire de connexion (student)
  - Réponse au questionnaire

## Technologies

L'application sera créé sous forme de Single Page Application et donc constituées de 2 applications :
- client React
- serveur Express sous forme d'API REST

Les 2 applications seront écrites en TypeScript.

Les échanges réseaux se feront via HTTP et le client axios

Les données seront stockées dans une base SQLite.

Les tests seront écrits avec Jest et Supertest.

## Application Serveur

- [01 - Outils](./serveur/01-outils.md)
- [02 - TypeScript](./serveur/02-typescript.md)
- [03 - Token JWT](./serveur/03-tokens-JWT.md)
- [04 - Base de données](./serveur/04-database.md)
- [05 - Config](./serveur/05-dotenv.md)
- [06 - Password hashing](./serveur/06-password-hashing.md)
- [07 - Tests](./serveur/07-tests.md)
- [08 - Autres routes](./serveur/08-other-routes.md)

## Application Client

- [01 - Creation](./client/01-creation.md)
- [02 - Router](./client/02-router.md)
- [03 - CSS](./client/03-css.md)
- [04 - Teacher Login](./client/04-teacher-login.md)
- [05 - Quizzes](./client/05-quizzes.md)
- [06 - Student](./client/06-student.md)
- [07 - Other](./client/07-other.md)
- [08 - Tests](./client/08-tests.md)
