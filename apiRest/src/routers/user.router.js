const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getUser);
router.get('/bye', (req, res) => {
    res.status(200).json({ ok: true, message: 'Adios!' });
  });
  

module.exports = router;
