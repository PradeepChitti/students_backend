const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const Student = require("../models/studentModel");

// GET all students
const getAllStudents = asyncHandler(async (req, res) => {
  // get all the students of a logged in user
  const allStudents = await Student.find({ user_id: req.user.id });
  res.status(200).json(allStudents);
});

// POST add new student
const addStudent = asyncHandler(async (req, res) => {
  const { name, father, mother, phone, email, address } = req.body;
  //   const students = require("./students.json");
  //   const student = req.body;
  try {
    const student = await Student.create({
      user_id: req.user.id,
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
    throw new Error(`Failed to add student ${error.message}`);
  }
});

// GET student by id
const getStudentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const studentId = new mongoose.Types.ObjectId(id);
  const student = await Student.findById(studentId);
  if (!student) {
    res.status(404);
    throw new Error("Student not found !!");
  }
  res.status(200).json(student);
});

// UPDATE student by id
const updateStudentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const studentId = new mongoose.Types.ObjectId(id);
  const student = await Student.findById(studentId);
  if (!student) {
    res.status(404);
    throw new Error("Student not found !!");
  }
  if (student.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User dont have permission to update other user contacts");
  }
  const updatedContact = await Student.findByIdAndUpdate(studentId, req.body, {
    new: true,
  });
  res.status(200).json(updatedContact);
});

// DELETE student by id
const deleteStudentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const studentId = new mongoose.Types.ObjectId(id);
  const student = await Student.findById(studentId);
  if (!student) {
    res.status(404);
    throw new Error("Student not found !!");
  }
  if (student.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User dont have permission to update other user contacts");
  }
  await Student.deleteOne({ _id: studentId });
  res.status(200).json(student);
});

module.exports = {
  getAllStudents,
  addStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
};
