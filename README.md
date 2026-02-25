# 💼 JobFinder

Application de recherche d'emploi développée en **Angular 17** sous forme de **Single Page Application (SPA)**.

## 📌 Description

**JobFinder** est une application permettant aux chercheurs d'emploi de :

- 🔎 Rechercher des offres d’emploi via une API publique
- ⭐ Ajouter des offres en favoris
- 📄 Suivre l’état de leurs candidatures
- 👤 Gérer leur profil utilisateur

Le projet utilise **JSON Server** pour simuler une API REST et persister les données (utilisateurs, favoris, candidatures).  
Aucun backend personnalisé n’a été développé.

---

## 🛠️ Technologies utilisées

- Angular 17+
- TypeScript
- NgRx (gestion d’état pour les favoris)
- RxJS / Observables
- Angular Router
- Guards & Resolvers
- Reactive Forms
- HTTP Client
- JSON Server
- Bootstrap / Tailwind CSS
- Redux DevTools

---

## 🏗️ Architecture du projet

L’application est structurée en plusieurs modules et composants :

- **Auth Module**
  - Inscription
  - Connexion
  - AuthGuard

- **Home / Search Module**
  - Barre de recherche
  - Liste des offres (pagination)
  - Filtres

- **Favorites Module (NgRx)**
  - Gestion des favoris via Store
  - Actions / Reducers / Effects
  - Synchronisation avec JSON Server

- **Applications Module**
  - Suivi des candidatures
  - Gestion des statuts (En attente / Accepté / Refusé)
  - Notes personnelles

- **Profile Module**
  - Modification des informations personnelles
  - Suppression du compte

Au moins une route est configurée en **Lazy Loading**.

---

## 🔐 Authentification (Fake Auth)

Les utilisateurs sont stockés dans `db.json` (JSON Server).

### Fonctionnement :

1. Vérification email/mot de passe dans la table `users`
2. Si valide :
   - L’objet utilisateur (sans mot de passe) est stocké dans `localStorage` ou `sessionStorage`
3. AuthGuard protège les routes privées

📌 Les données stockées :

- `localStorage / sessionStorage` → Session utilisateur
- JSON Server → Users, Favorites, Applications

---

## 🔎 Recherche d’emplois

### Filtres obligatoires

- Mot clé (titre du poste)
- Localisation

### Règles métier

- La recherche filtre uniquement sur le **titre**
- Tri par date (du plus récent au plus ancien)
- Loader affiché pendant la requête
- Pagination (10 résultats par page)

### Informations affichées

- Titre
- Entreprise
- Localisation
- Date
- Description courte
- Salaire (si disponible)
- Bouton "Voir l’offre"
- Bouton "Ajouter aux favoris" (authentifié)
- Bouton "Suivre cette candidature" (authentifié)

---

## ⭐ Gestion des Favoris (NgRx)

Fonctionnalités :

- Ajouter une offre aux favoris
- Empêcher les doublons
- Indicateur visuel si déjà en favori
- Supprimer un favori
- Page dédiée aux favoris

Structure JSON :

```json
{
  "id": 1,
  "userId": 2,
  "offerId": 101,
  "title": "Développeur Angular",
  "company": "Entreprise A",
  "location": "Casablanca"
}