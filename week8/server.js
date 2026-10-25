
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Student data
let students = [
  {
    name: "Sahasra",
    rollNo: "101",
    sem: 3,
    grade: "A"
  },
  {
    name: "Priya",
    rollNo: "102",
    sem: 3,
    grade: "A+"
  },
  {
    name: "Rahul",
    rollNo: "103",
    sem: 2,
    grade: "B"
  }
];

// Home route
app.get("/", (req, res) => {
  res.send("Student Management REST API is running");
});

// GET - All students
app.get("/api/students", (req, res) => {
  res.json(students);
});

// GET - Student by roll number
app.get("/api/students/:rollNo", (req, res) => {
  const student = students.find(
    s => s.rollNo === req.params.rollNo
  );

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  res.json(student);
});

// POST - Add new student
app.post("/api/students", (req, res) => {
  const { name, rollNo, sem, grade } = req.body;

  if (!name || !rollNo || sem === undefined || !grade) {
    return res.status(400).json({
      message: "All student details are required"
    });
  }

  const exists = students.find(s => s.rollNo === String(rollNo));

  if (exists) {
    return res.status(409).json({
      message: "Roll number already exists"
    });
  }

  const newStudent = {
    name,
    rollNo: String(rollNo),
    sem,
    grade
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Student added successfully",
    student: newStudent
  });
});

// PUT - Update semester
app.put("/api/students/:rollNo", (req, res) => {
  const student = students.find(
    s => s.rollNo === req.params.rollNo
  );

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  const { sem } = req.body;

  if (sem === undefined) {
    return res.status(400).json({
      message: "Semester is required"
    });
  }

  student.sem = sem;

  res.json({
    message: "Semester updated successfully",
    student
  });
});

// DELETE - Remove student
app.delete("/api/students/:rollNo", (req, res) => {
  const index = students.findIndex(
    s => s.rollNo === req.params.rollNo
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  const deletedStudent = students.splice(index, 1);

  res.json({
    message: "Student deleted successfully",
    student: deletedStudent[0]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
