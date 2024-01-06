const express = require("express");
const fs = require("fs");

const Student = require("./models/studentModel");

const appRouter = express.Router();

// GET all students
appRouter.get("/students", async (req, res) => {
  const allStudents = await Student.find();
  res.status(200).json(allStudents);
});

// POST req --> new student registration
appRouter.post("/register", async (req, res) => {
  const { name, father, mother, phone, email, address } = req.body;
  //   const students = require("./students.json");
  //   const student = req.body;
  try {
    const student = await Student.create({
      name,
      father,
      mother,
      phone,
      email,
      address,
    });
    //   students.push(student);
    //   data = JSON.stringify(students)
    //   fs.writeFile("./students.json", data, (err) => console.log(err));
    res.status(201).json(student);
  } catch (error) {
    throw Error(`Error occurred ${error.message}`);
  }
});

// GET student by id
appRouter.get("/students/:id", async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id);
  if (!student) {
    res.status(404);
    throw new Error("Student not found !!");
  }
  res.status(200).json(student);
});

// UPDATE student by id
appRouter.put("/students/:id", async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id);
  if (!student) {
    res.status(404);
    throw new Error("Student not found !!");
  }
  const updatedContact = await Student.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json(updatedContact);
});

// DELETE student by id
appRouter.delete("/students/:id", async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id);
  if (!student) {
    res.status(404);
    throw new Error("Student not found !!");
  }
  const response = await Student.deleteOne({ _id: id });
  console.log("RESPONSE======", response);
  res.status(200).json(student);
});

module.exports = appRouter;
