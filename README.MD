# EdyIa
## PEAN Stack
EdyIa est une application web qui utilise l'intelligence artificielle pour améliorer l'apprentissage des cours. Elle offre une expérience interactive et personnalisée pour chaque utilisateur.

## Table des matières

- [Installation](#installation)
- [Utilisation](#utilisation)
- [Fonctionnalités](#fonctionnalités)
- [Contribuer](#contribuer)
- [Licence](#licence)

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/EdyIa-PEAN.git
   ```
2. Accédez au répertoire du projet :
   ```bash
   cd EdyIa-PEAN
   ```
3. Installez les dépendances du projet :
   ```bash
   npm i
   ```
4. Installez les dépendances pour le frontend :
   ```bash
   cd frontend
   npm install
   ```
5. Installez les dépendances pour le backend :
   ```bash
   cd ..
   cd backend
   npm install
   ```

## Utilisation

### Frontend

1. Démarrez le serveur de développement Angular :
   ```bash
   npm run frontend
   ```
2. Ouvrez votre navigateur et accédez à `http://localhost:4200`.

### Backend

1. Configurez votre base de données PostgreSQL et mettez à jour le fichier `.env` avec votre `DATABASE_URL`.
2. Démarrez le serveur backend :
   ```bash
   npm run backend
   ```

## Fonctionnalités

- **Inscription et Connexion** : Les utilisateurs peuvent s'inscrire et se connecter pour accéder à leurs cours.
- **Tableau de Bord** : Vue d'ensemble des statistiques et des cours de l'utilisateur.
- **Gestion des Cours** : Les utilisateurs peuvent visualiser et interagir avec leurs cours.
- **Quizz et Résumés** : Fonctionnalités pour tester les connaissances et résumer les cours.

## Contribuer

Les contributions sont les bienvenues ! Veuillez suivre les étapes ci-dessous pour contribuer :

1. Forkez le projet.
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`).
3. Commitez vos modifications (`git commit -m 'Add some AmazingFeature'`).
4. Poussez vers la branche (`git push origin feature/AmazingFeature`).
5. Ouvrez une Pull Request.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
