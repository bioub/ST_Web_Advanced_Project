# Password Hashing

Jusqu'à présent le mot de passe était stocké en clair dans la base de données. Toutes les personnes ayant accès à la base y ont accès, en cas de fuite de données ce serait une très mauvaise nouvelle.

Pour améliorer la sécurité nous allons hasher le mot de passe avec un algorithme de hashage (contrairement au cryptage il n'y a pas possibilité de le décrypter)

Nous allons choisir un algorithme volontairement lent, pour rendre plus difficile des attaques en bruteforce (où le hacker tenterait toutes les combinaisons)

L'algo de hashage sera "salé", on va ajouter une chaine de caractère aléatoire rendant difficile la création d'un dictionnaire.

Pour vérifier le mot de passe il faudra comparer les versions hashées.

Dans le fichier .env, renommer la clé JWT_SECRET en SECRET (elle nous servira aussi pour le hashage), faites les modifications dans le reste de l'application

Dans le fichier `models/user.ts` importer la fonction de hashage `scrypt` ou `scriptSync` du module `crypto` de Node.js.

Créér et exporter une fonction `hashPassword` qui reçoit le user en entrée `scrypt` avec les paramètres suivants :
- le mot de passe
- le username concaténé avec la clé SECRET de la config
- 32 (le nombre de caractères généré)

Le retour de scrypt pourra être convertir en hexadécimal en appelant `.toString('hex')`

Utiliser ce mot de passe hashé pour créer et vérifier le mot de passe dans `models/user.ts` et `seeds/dev.ts`
