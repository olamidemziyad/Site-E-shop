const express = require('express');
const router = express.Router();
const { addReview, getReviews } = require('../Controllers/reviewController');
const { authenticateToken, requireAdmin } = require('../middlewares/authenticate');

router.post('/reviews', authenticateToken, addReview);
router.get('/reviews/:productId', getReviews);
// Route réservée aux administrateurs
router.get('/admin/dashboard', authenticateToken, requireAdmin, (req, res) => {
    res.json({ message: 'Bienvenue sur le tableau de bord admin.' });
});

module.exports = router;
