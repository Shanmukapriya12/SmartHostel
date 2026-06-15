<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>Student Overview</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
rel="stylesheet">

<link rel="stylesheet"
href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
rel="stylesheet">

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Poppins',sans-serif;
}

body{
background:#0f172a;
color:white;
min-height:100vh;
}

.container-box{
width:90%;
max-width:1350px;
margin:30px auto;
}

.header{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:30px;
}

.left-header{
display:flex;
align-items:center;
gap:15px;
}

.back-btn{
text-decoration:none;
font-size:18px;
font-weight:600;
color:white;
}

.heading h2{
font-size:40px;
font-weight:700;
margin:0;
}

.heading p{
margin:0;
color:#94a3b8;
}

.search-box{
width:300px;
}

.search-box input{
border-radius:12px;
padding:10px;
background:#1e293b;
border:none;
color:white;
}

.stats-grid{
display:grid;
grid-template-columns:
repeat(auto-fit,minmax(220px,1fr));
gap:20px;
margin-bottom:30px;
}

.stats-card{
background:#1e293b;
padding:25px;
border-radius:20px;
}

.stats-icon{
font-size:35px;
margin-bottom:10px;
color:#38bdf8;
}

.stats-number{
font-size:36px;
font-weight:700;
}

.stats-title{
color:#94a3b8;
}

.student-table{
background:#1e293b;
padding:25px;
border-radius:20px;
overflow-x:auto;
}

table{
width:100%;
border-collapse:collapse;
}

th{
padding:15px;
text-align:left;
background:#334155;
font-size:17px;
}

td{
padding:15px;
border-bottom:1px solid #334155;
color:#e2e8f0;
}

.status-active{
background:#dcfce7;
color:#166534;
padding:6px 14px;
border-radius:20px;
font-weight:600;
display:inline-block;
}

.status-leave{
background:#fef3c7;
color:#92400e;
padding:6px 14px;
border-radius:20px;
font-weight:600;
display:inline-block;
}

.view-btn{
background:#2563eb;
color:white;
border:none;
padding:8px 14px;
border-radius:10px;
font-weight:600;
}
.details-modal{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background:rgba(0,0,0,0.7);
display:none;
justify-content:center;
align-items:center;
z-index:1000;
}

.details-box{
background:#1e293b;
padding:30px;
border-radius:20px;
width:400px;
color:white;
box-shadow:0 5px 20px rgba(0,0,0,0.3);
}

.details-header{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:20px;
}

.details-header button{
background:red;
border:none;
color:white;
padding:5px 12px;
border-radius:8px;
font-weight:700;
}

pre{
white-space:pre-wrap;
font-size:16px;
line-height:1.8;
}

</style>

</head>

<body>

<div class="container-box">

<div class="header">

<div class="left-header">

<a href="admin_dashboard.php"
class="back-btn">

<i class="bi bi-arrow-left"></i>
Back

</a>

<div class="heading">

<h2>👨‍🎓 Student Overview</h2>

<p>
Monitor all hostel students centrally
</p>

</div>

</div>

<div class="search-box">

<input type="text"
placeholder="Search Student"
id="searchInput"
onkeyup="searchStudent()">

</div>

</div>

<div class="stats-grid">

<div class="stats-card">

<div class="stats-icon">
<i class="bi bi-people-fill"></i>
</div>

<div class="stats-number">
250
</div>

<div class="stats-title">
Total Students
</div>

</div>

<div class="stats-card">

<div class="stats-icon">
<i class="bi bi-house-door-fill"></i>
</div>

<div class="stats-number">
120
</div>

<div class="stats-title">
Allocated Rooms
</div>

</div>

<div class="stats-card">

<div class="stats-icon">
<i class="bi bi-calendar-check-fill"></i>
</div>

<div class="stats-number">
92%
</div>

<div class="stats-title">
Attendance
</div>

</div>

<div class="stats-card">

<div class="stats-icon">
<i class="bi bi-exclamation-circle-fill"></i>
</div>

<div class="stats-number">
14
</div>

<div class="stats-title">
Pending Complaints
</div>

</div>

</div>

<div class="student-table">

<table id="studentTable">

<thead>

<tr>

<th>Name</th>
<th>Department</th>
<th>Room</th>
<th>Status</th>
<th>Action</th>

</tr>

</thead>

<tbody>

<tr>

<td>Shanmukopriya</td>
<td>CSE</td>
<td>A-204</td>

<td>
<span class="status-active">
Active
</span>
</td>

<td>

<button class="view-btn"
onclick="viewStudent('Shanmukopriya')">

View

</button>

</td>

</tr>

<tr>

<td>Sruthi</td>
<td>ECE</td>
<td>B-105</td>

<td>
<span class="status-leave">
On Leave
</span>
</td>

<td>

<button class="view-btn"
onclick="viewStudent('Sruthi')">

View

</button>

</td>

</tr>

<tr>

<td>Kavya</td>
<td>IT</td>
<td>C-301</td>

<td>
<span class="status-active">
Active
</span>
</td>

<td>

<button class="view-btn"
onclick="viewStudent('Kavya')">

View

</button>

</td>

</tr>

</tbody>

</table>

</div>
<script>

function searchStudent(){

let input =
document.getElementById(
'searchInput'
).value.toLowerCase();

let rows =
document.querySelectorAll(
"#studentTable tbody tr"
);

rows.forEach(row => {

let name =
row.cells[0].innerText
.toLowerCase();

if(name.includes(input)){

row.style.display = "";

}
else{

row.style.display = "none";

}

});

}

function viewStudent(name){

let details = "";

if(name == "Shanmukopriya"){

details = `
Name : Shanmukopriya
Department : CSE
Year : 3rd Year
Room Number : A-204
Parent Contact : 9876543210
Attendance : 92%
Leave History : 2 Leaves
Complaints : 1 Pending
Fee Status : Paid
`;

}

else if(name == "Sruthi"){

details = `
Name : Sruthi
Department : ECE
Year : 2nd Year
Room Number : B-105
Parent Contact : 9876501234
Attendance : 85%
Leave History : 5 Leaves
Complaints : 0
Fee Status : Pending
`;

}

else if(name == "Kavya"){

details = `
Name : Kavya
Department : IT
Year : 4th Year
Room Number : C-301
Parent Contact : 9123456780
Attendance : 95%
Leave History : 1 Leave
Complaints : 0
Fee Status : Paid
`;

}

document.getElementById(
'studentDetails'
).innerText = details;

document.getElementById(
'detailsModal'
).style.display = "flex";

}
function closeModal(){

document.getElementById(
'detailsModal'
).style.display = "none";

}

</script>
<div class="details-modal"
id="detailsModal">

<div class="details-box">

<div class="details-header">

<h3>Student Details</h3>

<button
onclick="closeModal()">

✖

</button>

</div>

<pre id="studentDetails"></pre>

</div>

</div>

</body>
</html>