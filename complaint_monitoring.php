<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Complaint Monitoring</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

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
max-width:1400px;
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
color:white;
font-size:18px;
font-weight:600;
}

.heading h2{
font-size:42px;
font-weight:700;
margin:0;
}

.heading p{
margin:0;
color:#94a3b8;
}

.search-box input{
padding:12px;
border:none;
border-radius:12px;
background:#1e293b;
color:white;
width:280px;
}

.stats-grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
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
color:#38bdf8;
margin-bottom:10px;
}

.stats-number{
font-size:38px;
font-weight:700;
}

.stats-title{
color:#94a3b8;
}

.table-box{
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
background:#334155;
padding:15px;
text-align:left;
}

td{
padding:15px;
border-bottom:1px solid #334155;
}

.priority-high{
background:#fee2e2;
color:#b91c1c;
padding:6px 12px;
border-radius:20px;
font-weight:600;
}

.priority-medium{
background:#fef3c7;
color:#92400e;
padding:6px 12px;
border-radius:20px;
font-weight:600;
}

.status-pending{
background:#fef3c7;
color:#92400e;
padding:6px 12px;
border-radius:20px;
font-weight:600;
}

.status-resolved{
background:#dcfce7;
color:#166534;
padding:6px 12px;
border-radius:20px;
font-weight:600;
}

.action-btn{
border:none;
padding:8px 15px;
border-radius:10px;
font-weight:600;
margin-right:5px;
}

.view-btn{
background:#2563eb;
color:white;
}

.resolve-btn{
background:#16a34a;
color:white;
}

</style>

</head>

<body>

<div class="container-box">

<div class="header">

<div class="left-header">

<a href="admin_dashboard.php" class="back-btn">

<i class="bi bi-arrow-left"></i>
Back

</a>

<div class="heading">

<h2>⚠ Complaint Monitoring</h2>

<p>Monitor and manage hostel complaints</p>

</div>

</div>

<div class="search-box">

<input type="text"
id="searchInput"
placeholder="Search Complaint"
onkeyup="searchComplaint()">

</div>

</div>

<div class="stats-grid">

<div class="stats-card">

<div class="stats-icon">
<i class="bi bi-chat-left-text-fill"></i>
</div>

<div class="stats-number">42</div>

<div class="stats-title">
Total Complaints
</div>

</div>

<div class="stats-card">

<div class="stats-icon">
<i class="bi bi-check-circle-fill"></i>
</div>

<div class="stats-number">28</div>

<div class="stats-title">
Resolved
</div>

</div>

<div class="stats-card">

<div class="stats-icon">
<i class="bi bi-hourglass-split"></i>
</div>

<div class="stats-number">10</div>

<div class="stats-title">
Pending
</div>

</div>

<div class="stats-card">

<div class="stats-icon">
<i class="bi bi-exclamation-triangle-fill"></i>
</div>

<div class="stats-number">4</div>

<div class="stats-title">
Critical
</div>

</div>

</div>

<div class="table-box">

<table id="complaintTable">

<thead>

<tr>

<th>ID</th>
<th>Student</th>
<th>Category</th>
<th>Date</th>
<th>Priority</th>
<th>Status</th>
<th>Action</th>

</tr>

</thead>

<tbody>

<tr>

<td>C001</td>
<td>Shanmukopriya</td>
<td>Water Issue</td>
<td>29-05-2026</td>

<td>
<span class="priority-high">
High
</span>
</td>

<td>
<span class="status-pending">
Pending
</span>
</td>

<td>

<button class="action-btn view-btn"
onclick="viewComplaint('Water Issue')">

View

</button>

<button class="action-btn resolve-btn"
onclick="resolveComplaint(this)">

Resolve

</button>

</td>

</tr>

<tr>

<td>C002</td>
<td>Sruthi</td>
<td>Mess Food</td>
<td>28-05-2026</td>

<td>
<span class="priority-medium">
Medium
</span>
</td>

<td>
<span class="status-pending">
Pending
</span>
</td>

<td>

<button class="action-btn view-btn"
onclick="viewComplaint('Mess Food')">

View

</button>

<button class="action-btn resolve-btn"
onclick="resolveComplaint(this)">

Resolve

</button>

</td>

</tr>

<tr>

<td>C003</td>
<td>Kavya</td>
<td>Fan Repair</td>
<td>27-05-2026</td>

<td>
<span class="priority-medium">
Medium
</span>
</td>

<td>
<span class="status-resolved">
Resolved
</span>
</td>

<td>

<button class="action-btn view-btn"
onclick="viewComplaint('Fan Repair')">

View

</button>

</td>

</tr>

</tbody>

</table>

</div>
<script>

function searchComplaint(){

let input =
document.getElementById(
'searchInput'
).value.toLowerCase();

let rows =
document.querySelectorAll(
'#complaintTable tbody tr'
);

rows.forEach(row=>{

let text =
row.innerText.toLowerCase();

row.style.display =
text.includes(input)
?
''
:
'none';

});

}

function viewComplaint(issue){

alert(
"Complaint Details:\n\n" + issue
);

}

function resolveComplaint(button){

let row =
button.closest('tr');

let status =
row.querySelector('.status-pending');

if(status){

status.innerHTML =
"Resolved";

status.classList.remove(
'status-pending'
);

status.classList.add(
'status-resolved'
);

button.remove();

}

}

</script>

</body>
</html>