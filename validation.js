const { body, param, query, validationResult } = require('express-validator');

// Validation pour la création d'article
const validateArticle = [
    body('title')
        .notEmpty().withMessage('Le titre est obligatoire')
        .isString().withMessage('Le titre doit être une chaîne de caractères')
        .trim()
        .isLength({ min: 3, max: 200 }).withMessage('Le titre doit contenir entre 3 et 200 caractères'),
    
    body('content')
        .notEmpty().withMessage('Le contenu est obligatoire')
        .isString().withMessage('Le contenu doit être une chaîne de caractères')
        .isLength({ min: 10 }).withMessage('Le contenu doit contenir au moins 10 caractères'),
    
    body('author')
        .notEmpty().withMessage('L\'auteur est obligatoire')
        .isString().withMessage('L\'auteur doit être une chaîne de caractères')
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage('Le nom de l\'auteur doit contenir entre 2 et 100 caractères'),
    
    body('category')
        .notEmpty().withMessage('La catégorie est obligatoire')
        .isString().withMessage('La catégorie doit être une chaîne de caractères')
        .trim(),
    
    body('tags')
        .optional()
        .isArray().withMessage('Les tags doivent être un tableau')
        .custom((tags) => {
            if (tags && tags.some(tag => typeof tag !== 'string')) {
                throw new Error('Chaque tag doit être une chaîne de caractères');
            }
            return true;
        })
];

// Validation pour la mise à jour
const validateUpdate = [
    param('id')
        .isInt({ min: 1 }).withMessage('L\'ID doit être un nombre entier positif'),
    
    body('title')
        .optional()
        .isString().withMessage('Le titre doit être une chaîne de caractères')
        .trim()
        .isLength({ min: 3, max: 200 }).withMessage('Le titre doit contenir entre 3 et 200 caractères'),
    
    body('content')
        .optional()
        .isString().withMessage('Le contenu doit être une chaîne de caractères')
        .isLength({ min: 10 }).withMessage('Le contenu doit contenir au moins 10 caractères'),
    
    body('author')
        .optional()
        .isString().withMessage('L\'auteur doit être une chaîne de caractères')
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage('Le nom de l\'auteur doit contenir entre 2 et 100 caractères'),
    
    body('category')
        .optional()
        .isString().withMessage('La catégorie doit être une chaîne de caractères')
        .trim(),
    
    body('tags')
        .optional()
        .isArray().withMessage('Les tags doivent être un tableau')
        .custom((tags) => {
            if (tags && tags.some(tag => typeof tag !== 'string')) {
                throw new Error('Chaque tag doit être une chaîne de caractères');
            }
            return true;
        })
];

// Validation pour l'ID
const validateId = [
    param('id')
        .isInt({ min: 1 }).withMessage('L\'ID doit être un nombre entier positif')
];

// Validation pour la recherche
const validateSearch = [
    query('query')
        .notEmpty().withMessage('Le terme de recherche est obligatoire')
        .isString().withMessage('Le terme de recherche doit être une chaîne de caractères')
        .trim()
];

// Validation pour les filtres
const validateFilters = [
    query('category')
        .optional()
        .isString().withMessage('La catégorie doit être une chaîne de caractères')
        .trim(),
    
    query('author')
        .optional()
        .isString().withMessage('L\'auteur doit être une chaîne de caractères')
        .trim(),
    
    query('date')
        .optional()
        .isISO8601().withMessage('La date doit être au format ISO 8601 (YYYY-MM-DD)')
];

// Middleware pour gérer les erreurs de validation
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            errors: errors.array()
        });
    }
    next();
};

module.exports = {
    validateArticle,
    validateUpdate,
    validateId,
    validateSearch,
    validateFilters,
    handleValidationErrors
};