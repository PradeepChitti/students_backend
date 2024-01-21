const express = require("express");
const fs = require("fs");

const {
  getAllStudents,
  addStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
} = require("./controller/studentController");
const validateToken = require("./middleware/validateTokenHandler");

const appRouter = express.Router();

// making all the routes private/protected

// GET all students
appRouter.get("/students", validateToken, getAllStudents);

// POST req --> new student registration
appRouter.post("/register", validateToken, addStudent);

// GET student by id
appRouter.get("/students/:id", validateToken, getStudentById);

// UPDATE student by id
appRouter.put("/students/:id", validateToken, updateStudentById);

// DELETE student by id
appRouter.delete("/students/:id", validateToken, deleteStudentById);

module.exports = appRouter;
