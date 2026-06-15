<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Leave Requests</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<link rel="stylesheet"
href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
rel="stylesheet">

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Poppins',sans-serif;
}

body{
background:linear-gradient(135deg,#e0f2fe,#f8fafc);
min-height:100vh;
}

.container-box{
width:90%;
max-width:1200px;
margin:30px auto;
}

.header{
display:flex;
align-items:center;
gap:15px;
margin-bottom:25px;
}

.back-btn{
text-decoration:none;
font-size:18px;
font-weight:600;
color:#111827;
}

.back-btn:hover{
color:#2563eb;
}

.heading h2{
font-weight:700;
margin:0;
}

.heading p{
margin:0;
color:#64748b;
}

.notification-box{
display:none;
background:#dcfce7;
color:#166534;
padding:15px;
border-radius:12px;
margin-bottom:20px;
font-weight:600;
}

.request-card{
background:white;
padding:20px;
border-radius:20px;
margin-bottom:20px;
box-shadow:0 5px 15px rgba(0,0,0,0.08);
}

.student-name{
font-size:20px;
font-weight:700;
margin-bottom:10px;
}

.info{
margin-bottom:8px;
color:#475569;
}

.status{
display:inline-block;
padding:6px 12px;
border-radius:20px;
background:#fef3c7;
color:#92400e;
font-weight:600;
margin-top:10px;
}

.action-buttons{
margin-top:15px;
display:flex;
gap:10px;
}

.approve-btn{
background:#22c55e;
border:none;
color:white;
padding:10px 18px;
border-radius:10px;
font-weight:600;
}

.reject-btn{
background:#ef4444;
border:none;
color:white;
padding:10px 18px;
border-radius:10px;
font-weight:600;
}

</style>

</head>

<body>

<div class="container-box">

<div class="header">

<a href="warden_dashboard.php"
class="back-btn">

<i class="bi bi-arrow-left"></i>
Back

</a>

<div class="heading">

<h2>Leave Requests</h2>

<p>
Approve or reject student leave requests
</p>

</div>

</div>

<div class="notification-box"
id="notificationBox">

Action completed successfully

</div>

<!-- Student 1 -->

<div class="request-card">

<div class="student-name">

Shanmukopriya

</div>

<div class="info">

📍 Destination : Hyderabad

</div>

<div class="info">

📅 From : 10-Jun-2026

</div>

<div class="info">

📅 To : 12-Jun-2026

</div>

<div class="info">

📞 Parent Contact : 9876543210

</div>

<div class="info">

📝 Reason : Going Home

</div>

<span class="status">

Pending 🟡

</span>

<div class="action-buttons">

<button
class="approve-btn"
onclick="approveRequest(this)">

Approve

</button>

<button
class="reject-btn"
onclick="openRejectModal(this)">

Reject

</button>

</div>

</div>
<!-- Student 2 -->

<div class="request-card">

<div class="student-name">

Sruthi

</div>

<div class="info">

📍 Destination : Chennai

</div>

<div class="info">

📅 From : 15-Jun-2026

</div>

<div class="info">

📅 To : 16-Jun-2026

</div>

<div class="info">

📞 Parent Contact : 9876543211

</div>

<div class="info">

📝 Reason : Family Function

</div>

<span class="status">

Pending 🟡

</span>

<div class="action-buttons">

<button
class="approve-btn"
onclick="approveRequest(this)">

Approve

</button>

<button
class="reject-btn"
onclick="openRejectModal(this)">

Reject

</button>

</div>

</div>

</div>

<!-- Reject Modal -->

<div class="modal fade"
id="rejectModal"
tabindex="-1">

<div class="modal-dialog">

<div class="modal-content">

<div class="modal-header">

<h5 class="modal-title">

Reject Leave Request

</h5>

<button
type="button"
class="btn-close"
data-bs-dismiss="modal">

</button>

</div>

<div class="modal-body">

<label class="form-label">

Reason For Rejection

</label>

<textarea
id="rejectReason"
class="form-control"
rows="4"
placeholder="Enter rejection reason here...">

</textarea>

</div>

<div class="modal-footer">

<button
type="button"
class="btn btn-secondary"
data-bs-dismiss="modal">

Cancel

</button>

<button
type="button"
class="btn btn-danger"
onclick="confirmReject()">

Reject Request

</button>

</div>

</div>

</div>

</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script>

let currentCard = null;

function approveRequest(button){

const card =
button.closest('.request-card');

const status =
card.querySelector('.status');

status.innerHTML =
'Approved 🟢';

status.style.background =
'#dcfce7';

status.style.color =
'#166534';

const details =
document.createElement('div');

details.style.marginTop =
'12px';

details.style.fontWeight =
'600';

details.style.color =
'#166534';

details.innerHTML =

'Approved By : Priya Madam <br>' +
'Approved Date : ' +
new Date().toLocaleDateString();

card.appendChild(details);

card.querySelector(
'.action-buttons'
).remove();

showNotification(
'Leave Request Approved Successfully ✅'
);

}

function openRejectModal(button){

currentCard =
button.closest('.request-card');

const modal =
new bootstrap.Modal(
document.getElementById(
'rejectModal'
)
);

modal.show();

}

function confirmReject(){

const reason =
document.getElementById(
'rejectReason'
).value;

if(reason.trim() === ""){

alert(
"Please enter a rejection reason."
);

return;

}

const status =
currentCard.querySelector(
'.status'
);

status.innerHTML =
'Rejected 🔴';

status.style.background =
'#fee2e2';

status.style.color =
'#991b1b';

const details =
document.createElement('div');

details.style.marginTop =
'12px';

details.style.fontWeight =
'600';

details.style.color =
'#991b1b';

details.innerHTML =

'Reason : ' + reason +
'<br>' +
'Rejected By : Priya Madam' +
'<br>' +
'Rejected Date : ' +
new Date().toLocaleDateString();

currentCard.appendChild(
details
);

currentCard.querySelector(
'.action-buttons'
).remove();

bootstrap.Modal.getInstance(
document.getElementById(
'rejectModal'
)
).hide();

document.getElementById(
'rejectReason'
).value = "";

showNotification(
'Leave Request Rejected Successfully ❌'
);

}

function showNotification(message){

const box =
document.getElementById(
'notificationBox'
);

box.innerHTML =
message;

box.style.display =
'block';

setTimeout(()=>{

box.style.display =
'none';

},3000);

}

</script>

</body>

</html>