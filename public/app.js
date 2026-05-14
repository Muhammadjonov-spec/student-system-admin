const table = document.getElementById("studentsTable");


let currentEditId = null;
let allStudents = [];

async function loadStudents() {
    const response = await fetch("/api/students");
    const students = await response.json();
    allStudents = students;
    renderStudents(students);
    document.getElementById("totalStudents").innerText =
        students.length;
}


function renderStudents(students) {
    table.innerHTML = "";
    students.forEach(student => {
        table.innerHTML += `
        <tr>
            <td>${student.studentId}</td>
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.age}</td>
            <td>${student.course}</td>
            <td>${student.phone}</td>
            <td class="actions">
                <button class="edit"
                    onclick="openEditModal('${student._id}')">
                    Edit
                </button>
                <button class="delete"
                    onclick="deleteStudent('${student._id}')">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });
}
async function addStudent() {
    const student = {
        studentId:
            document.getElementById("studentId").value,
        firstName:
            document.getElementById("firstName").value,
        lastName:
            document.getElementById("lastName").value,
        age:
            document.getElementById("age").value,
        course:
            document.getElementById("course").value,
        phone:
            document.getElementById("phone").value
    };
    await fetch("/api/students", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    });
    document.getElementById("studentId").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("age").value = "";
    document.getElementById("course").value = "";
    document.getElementById("phone").value = "";
    loadStudents();
}

async function deleteStudent(id) {
    await fetch(`/api/students/${id}`, {
        method: "DELETE"
    });
    loadStudents();
}

const searchStudent = () => {
    const value = document.getElementById("search").value.toLowerCase();

    const filtered = allStudents.filter(student =>
        student.firstName.toLowerCase().includes(value) ||
        student.lastName.toLowerCase().includes(value)
    );

    renderStudents(filtered);
}

const openEditModal = (studentId) => {
    const student = allStudents.find(s => s._id === studentId);
    if (!student) return;

    currentEditId = student._id;
    document.getElementById("editStudentId").value = student.studentId;
    document.getElementById("editFirstName").value = student.firstName;
    document.getElementById("editLastName").value = student.lastName;
    document.getElementById("editAge").value = student.age;
    document.getElementById("editCourse").value = student.course;
    document.getElementById("editPhone").value = student.phone;
    document.getElementById("editModal").style.display = "flex";
}

const closeModal = () => {
    document.getElementById("editModal").style.display = "none";
}
async function updateStudent(id) {
   const updatedStudent = {
        studentId:
            document.getElementById("editStudentId").value,
        firstName:
            document.getElementById("editFirstName").value,
        lastName:
            document.getElementById("editLastName").value,
        age:
            document.getElementById("editAge").value,
        course:
            document.getElementById("editCourse").value,
        phone:
            document.getElementById("editPhone").value
    };
    await fetch(`/api/students/${currentEditId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedStudent)
    });
    closeModal();
    loadStudents();
}
loadStudents();