const express = require('express');
const { createUser, getUserById, getUsers } = require('../controllers/userController');

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);


module.exports = router;
