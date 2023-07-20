'use strict';

const expensesService = require('../services/expenses.js');
const userService = require('../services/users.js');

const getAll = (req, res) => {
  const {
    userId,
    from,
    to,
    categories,
  } = req.query;

  const expenses = expensesService.getAll({
    userId,
    from,
    to,
    categories,
  });

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const body = req.body;

  const {
    userId,
    title,
  } = req.body;

  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  if (!userId || !title) {
    res.sendStatus(422);

    return;
  }

  const newExpense = expensesService.create(body);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expenseId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.update({
    id: expenseId, ...req.body,
  });

  res.send(foundExpense);
};

module.exports = {
  getAll, getOne, add, remove, update,
};
