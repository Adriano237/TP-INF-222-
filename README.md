# 📝 Blog API – INF222 EC1 TAF1

> API REST backend pour la gestion d'articles de blog, développée avec **Node.js**, **Express** et **SQLite**.  
> Projet réalisé dans le cadre du TAF 1 de l'UE INF 222 EC1 – Développement Backend | Université de Yaoundé I

---

## 📋 Table des matières

- [Présentation](#-présentation)
- [Technologies](#-technologies)
- [Structure du projet](#-structure-du-projet)
- [Installation](#-installation)
- [Lancement](#-lancement)
- [Endpoints de l'API](#-endpoints-de-lapi)
- [Exemples d'utilisation](#-exemples-dutilisation)
- [Validation des données](#-validation-des-données)
- [Sécurité](#-sécurité)
- [Documentation Swagger](#-documentation-swagger)
- [Auteur](#-auteur)

---

## 🚀 Présentation

**Blog API** est une application web complète qui expose une API REST permettant de **créer, lire, modifier et supprimer** des articles de blog. Elle inclut :

- 6 endpoints REST complets (CRUD + recherche)
- Validation rigoureuse des entrées utilisateurs
- Documentation interactive via **Swagger UI**
- Sécurisation avec Helmet, CORS et Rate Limiting
- Architecture **MVC** claire (Modèles, Contrôleurs, Routes)

---

## 🛠 Technologies

| Technologie | Version | Rôle |
|---|---|---|
| Node.js | v18+ | Environnement d'exécution |
| Express.js | ^4.18.2 | Framework web REST |
| SQLite / sqlite3 | ^5.1.6 | Base de données embarquée |
| express-validator | ^7.0.1 | Validation des entrées |
| Helmet | ^7.0.0 | Sécurisation des en-têtes HTTP |
| CORS | ^2.8.5 | Partage des ressources cross-origin |
| express-rate-limit | ^6.10.0 | Limitation du taux de requêtes |
| swagger-jsdoc | ^6.2.8 | Génération spec OpenAPI |
| swagger-ui-express | ^5.0.0 | Interface Swagger dans le navigateur |
| nodemon | ^3.0.1 | Rechargement automatique (dev) |

---

## 📁 Structure du projet

```
blog-api/
├── src/
│   ├── config/
│   │   └── database.js          # Connexion et initialisation SQLite
│   ├── controllers/
│   │   └── articleController.js # Logique métier (CRUD)
│   ├── models/
│   │   └── articleModel.js      # Requêtes SQL sur la base de données
│   ├── routes/
│   │   └── articleRoutes.js     # Endpoints + annotations Swagger
│   ├── middlewares/
│   │   └── validation.js        # Validation des entrées utilisateurs
│   └── app.js                   # Configuration Express (middlewares, routes)
├── database/
│   └── blog.db                  # Fichier SQLite (auto-créé au démarrage)
├── server.js                    # Point d'entrée – démarrage du serveur
├── package.json
└── README.md
```

---

## ⚙️ Installation

### Prérequis

- [Node.js](https://nodejs.org/) v18 ou supérieur
- npm (inclus avec Node.js)

### Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/votre-username/blog-api.git
cd blog-api

# 2. Installer les dépendances
npm install

# 3. (Optionnel) Créer un fichier .env pour personnaliser le port
echo "PORT=3000" > .env
```

---

## ▶️ Lancement

```bash
# Mode production
npm start

# Mode développement (rechargement automatique)
npm run dev
```

Le serveur démarre sur **http://localhost:3000**

Au premier démarrage, la base de données SQLite (`database/blog.db`) et la table `articles` sont créées automatiquement.

```
✅ Base de données initialisée avec succès
🚀 Serveur démarré sur http://localhost:3000
📚 Documentation Swagger: http://localhost:3000/api-docs
```

---

## 🔗 Endpoints de l'API

### Base URL : `http://localhost:3000/api`

| Méthode | Route | Description | Code HTTP |
|---|---|---|---|
| `GET` | `/articles` | Récupérer tous les articles (filtres optionnels) | 200 |
| `GET` | `/articles/:id` | Récupérer un article par son ID | 200 / 404 |
| `POST` | `/articles` | Créer un nouvel article | 201 / 400 |
| `PUT` | `/articles/:id` | Modifier un article existant | 200 / 404 |
| `DELETE` | `/articles/:id` | Supprimer un article | 200 / 404 |
| `GET` | `/articles/search?query=texte` | Rechercher par mot-clé | 200 |

### Paramètres de filtrage — `GET /api/articles`

| Paramètre | Type | Exemple |
|---|---|---|
| `category` | string | `/api/articles?category=Tech` |
| `author` | string | `/api/articles?author=Adriel` |
| `date` | string (YYYY-MM-DD) | `/api/articles?date=2026-03-22` |

### Schéma d'un Article

```json
{
  "id": 1,
  "title": "Introduction à Node.js",
  "content": "Node.js est un environnement d'exécution JavaScript côté serveur...",
  "author": "Adriel",
  "category": "Programmation",
  "tags": ["Node.js", "JavaScript", "Backend"],
  "created_at": "2026-03-23T12:00:00.000Z",
  "updated_at": "2026-03-23T12:00:00.000Z"
}
```

---

## 💡 Exemples d'utilisation

### Créer un article

```bash
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mon premier article",
    "content": "Contenu de mon premier article sur Node.js.",
    "author": "Adriel",
    "category": "Tech",
    "tags": ["Node.js", "API", "Backend"]
  }'
```

**Réponse (201) :**
```json
{
  "status": "success",
  "message": "Article créé avec succès",
  "data": {
    "id": 1,
    "title": "Mon premier article",
    "content": "Contenu de mon premier article sur Node.js.",
    "author": "Adriel",
    "category": "Tech",
    "tags": ["Node.js", "API", "Backend"],
    "created_at": "2026-03-23T12:00:00.000Z",
    "updated_at": "2026-03-23T12:00:00.000Z"
  }
}
```

---

### Récupérer tous les articles

```bash
curl http://localhost:3000/api/articles
```

---

### Récupérer tous les articles filtrés

```bash
# Par catégorie
curl "http://localhost:3000/api/articles?category=Tech"

# Par auteur et date
curl "http://localhost:3000/api/articles?author=Adriel&date=2026-03-23"
```

---

### Récupérer un article par ID

```bash
curl http://localhost:3000/api/articles/1
```

**Réponse (404) si non trouvé :**
```json
{
  "status": "error",
  "message": "Article non trouvé"
}
```

---

### Modifier un article

```bash
curl -X PUT http://localhost:3000/api/articles/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Titre mis à jour",
    "category": "JavaScript"
  }'
```

---

### Supprimer un article

```bash
curl -X DELETE http://localhost:3000/api/articles/1
```

---

### Rechercher des articles

```bash
curl "http://localhost:3000/api/articles/search?query=node"
```

---

## ✅ Validation des données

Les entrées sont validées via **express-validator** avant toute opération en base de données.

| Champ | Règles |
|---|---|
| `title` | Obligatoire, string, 3–200 caractères |
| `content` | Obligatoire, string, minimum 10 caractères |
| `author` | Obligatoire, string, 2–100 caractères |
| `category` | Obligatoire, string |
| `tags` | Optionnel, tableau de strings |
| `id` (param) | Entier positif |
| `date` (query) | Format ISO 8601 (YYYY-MM-DD) |

**Exemple d'erreur de validation (400) :**
```json
{
  "status": "error",
  "errors": [
    {
      "msg": "Le titre est obligatoire",
      "path": "title",
      "location": "body"
    }
  ]
}
```

---

## 🔒 Sécurité

- **Helmet** : sécurise automatiquement les en-têtes HTTP (XSS, clickjacking, MIME sniffing, etc.)
- **CORS** : autorise les requêtes cross-origin
- **Rate Limiting** : max 100 requêtes par IP par fenêtre de 15 minutes
- **Requêtes préparées** : protection contre les injections SQL via des paramètres positionnels `?`
- **Codes HTTP corrects** : `200`, `201`, `400`, `404`, `500`

---

## 📚 Documentation Swagger

La documentation interactive est accessible après démarrage du serveur :

```
http://localhost:3000/api-docs
```

Elle permet de :
- Visualiser tous les endpoints avec leurs paramètres
- Tester les requêtes directement depuis le navigateur
- Consulter les schémas de données (modèle Article)

---

## 👤 Auteur

**ATIWA SELATSA ADRIEL**  
Informatique Fondamentale – Niveau 2  
Université de Yaoundé I – Département d'Informatique  
UE INF 222 EC1 – Développement Backend  
Sous la supervision de **Dr. Charles NJIOSSEU**  
Année académique : 2025 – 2026
