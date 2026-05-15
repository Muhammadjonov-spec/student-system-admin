const table = document.getElementById("studentsTable");
let currentPage = 1;

const rowsPerPage = 5;

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


function renderStudents(students){
    table.innerHTML = "";
    const start =(currentPage - 1) * rowsPerPage;
    const end =start + rowsPerPage;
    const paginated = students.slice(start,end);
    paginated.forEach(student => {
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
    renderPagination(students);
}


const renderPagination=(students)=>{
    const totalPages=Math.ceil(students.length/rowsPerPage)
    const pagination=document.getElementById("pagination")

    pagination.innerHTML=""
    for(let i=1; i<=totalPages; i++){
        pagination.innerHTML+=`
         <button
            class="page-btn ${currentPage === i ? "active" : ""}"
            onclick="changePage(${i})">
            ${i}
        </button>
        `
    }
}

const changePage=(page)=>{
    currentPage=page
    renderStudents(allStudents)
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
    if (
        !student.studentId ||
        !student.firstName ||
        !student.lastName ||
        !student.age ||
        !student.course ||
        !student.phone
    ) {
        showToast("Please fill all fields");
        return;
    }
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
    showToast("Student added successfully");
    loadStudents();
}
async function deleteStudent(id){
    const check =confirm("Delete this student?");
    if(!check) return;
    await fetch(`/api/students/${id}`,{
        method:"DELETE"
    });
    showToast("Student deleted");
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
    showToast("Student updated");
    closeModal();
    loadStudents();
}

const showToast = message=>{
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    },3000);
}
function sortStudents(){
    const value =
        document.getElementById("sortSelect").value;
    if(value === "asc"){
        allStudents.sort((a,b) =>
            a.firstName.localeCompare(b.firstName)
        );
    }
    if(value === "desc"){
        allStudents.sort((a,b) =>
            b.firstName.localeCompare(a.firstName)
        );
    }
    renderStudents(allStudents);
}

function showPage(pageId, element){
    document.querySelectorAll(".page")
    .forEach(page => {
        page.classList.remove("active");
    });
    document.getElementById(pageId)
    .classList.add("active")
    document.querySelectorAll(".sidebar li")
    .forEach(li => {
        li.classList.remove("active");
    });
    element.classList.add("active");
}
loadStudents();