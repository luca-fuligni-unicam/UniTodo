const express = require("express");
const todosController = require("./../controllers/todosController");

const auth = require("./../middlewares/authMiddleware");

const router = express.Router();
router.route('/')
.get(auth.checkIfAuthenticated, todosController.getAllTodos)
.post(auth.checkIfAuthenticated, todosController.createTodo);

router.route('/:id')
.get(auth.checkIfAuthenticated, todosController.getTodo)
.patch(auth.checkIfAuthenticated, todosController.updateTodo)
.delete(auth.checkIfAuthenticated, todosController.deleteTodo);

module.exports = router;
