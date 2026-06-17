<?php

session_start();

include("db.php");

$phone=$_SESSION['student_phone'];

$student=mysqli_query($conn,
"SELECT * FROM students WHERE phone='$phone'");

$s=mysqli_fetch_assoc($student);

if(isset($_POST['submit'])){

$name=$_POST['name'];

$room=$_POST['room'];

$title=$_POST['title'];

$category=$_POST['category'];

$description=$_POST['description'];

$date=date("Y-m-d");

mysqli_query($conn,"INSERT INTO complaints
(student_id,room_number,complaint_type,description,complaint_date,status)
VALUES
('".$s['id']."','$room','$category','$description','$date','Pending')");

echo "<script>

alert('Complaint Submitted Successfully');

window.location='complaint_history.php';

</script>";

}

?>

<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Submit Complaint</title>

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
    background:#eef2ff;
    
}

/* Main Container */

.main-container{
    width:55%;
    max-width:600px;
    margin:5px auto;
}

/* Top Section */

.top-section{

    display:flex;
    align-items:flex-start;
    gap:15px;
    margin-bottom:15px;

}

.back-btn{

    text-decoration:none;
    color:black;
    font-weight:500;
    margin-top:10px;

}

.back-btn:hover{

    color:#2563eb;

}

.heading h1{

    font-size:32px;
    font-weight:700;
    margin-bottom:0;

}

.heading p{

    color:#64748b;
    font-size:15px;

}

/* Form Card */

.form-card{

    background:white;
    border-radius:15px;
    padding:20px;
    box-shadow:0 4px 12px rgba(0,0,0,0.05);

}

/* Titles */

.section-title{

    font-size:20px;
    font-weight:700;

}

.section-subtitle{

    color:#64748b;
    margin-bottom:15px;
    font-size:14px;

}

/* Labels */

label{

    font-size:15px;
    font-weight:600;
    margin-bottom:6px;
    display:block;

}

/* Inputs */

.form-control,
.form-select{

    height:45px;
    border:none;
    border-radius:10px;
    background:#f3f4f6;
    margin-bottom:15px;

}

.form-control:focus,
.form-select:focus{

    box-shadow:none;
    border:2px solid #2563eb;
    background:white;

}

/* Textarea */

textarea.form-control{

    height:50px;
    resize:none;
    padding-top:10px;

}

/* Upload */

.upload-box{

    border:2px dashed #cbd5e1;
    border-radius:12px;
    padding:5px;
    text-align:center;
    margin-bottom:20px;
    background:#fafafa;

}

.upload-box i{

    font-size:30px;
    color:#94a3b8;

}

.upload-box p{

    color:#64748b;
    margin-top:10px;
    font-size:14px;

}

/* Buttons */

.button-group{

    display:flex;
    gap:10px;

}

.cancel-btn{

    width:50%;
    height:45px;
    border:none;
    border-radius:10px;
    background:#f3f4f6;
    font-weight:600;

}

.submit-btn{

    width:50%;
    height:45px;
    border:none;
    border-radius:10px;
    background:#2563eb;
    color:white;
    font-weight:600;

}

.submit-btn:hover{

    background:#1d4ed8;

}

/* Mobile */

@media(max-width:768px){

    .main-container{

        width:95%;

    }

    .heading h1{

        font-size:26px;

    }

    .button-group{

        flex-direction:column;

    }

    .cancel-btn,
    .submit-btn{

        width:100%;

    }

}

</style>

</head>

<body>

<div class="main-container">

    <div class="top-section">

        <a href="student_dashboard.php" class="back-btn">

            <i class="bi bi-arrow-left"></i> Back

        </a>

        <div class="heading">

            <h1>Submit Complaint</h1>

            <p>Submit maintenance or facility complaints</p>

        </div>

    </div>

    <div class="form-card">

        <div class="section-title">

            Complaint Details

        </div>

        <div class="section-subtitle">

            Please provide detailed information about your complaint

        </div>

        <form method="POST">

            <label>Student Name</label>

            <input
type="text"
class="form-control"
name="name"
value="<?php echo $s['name']; ?>"
readonly>

            <label>Room Number</label>

            <input type="text"
            class="form-control"
            placeholder="Enter Room Number"
            required>

            <label>Complaint Title</label>

            <input
type="text"
class="form-control"
name="title"
placeholder="Brief description of the issue"
required>

            <label>Category</label>

           <select
class="form-select"
name="category"
required>

                <option value="">Select complaint category</option>

                <option>Water Leakage</option>
                <option>Electricity Issue</option>
                <option>Fan Not Working</option>
                <option>WiFi Problem</option>
                <option>Room Cleaning</option>
                <option>Bathroom Issue</option>
                <option>Food Quality Issue</option>
                <option>Other</option>

            </select>

            <label>Description</label>

           <textarea
class="form-control"
name="description"
placeholder="Provide detailed information about the issue..."
required></textarea>

            <label>Upload Image (Optional)</label>

            <div class="upload-box">

                <i class="bi bi-upload"></i>

                <p>

                    Upload complaint proof image

                </p>

                <input type="file" class="form-control">

            </div>

            <div class="button-group">

                <button type="reset" class="cancel-btn">

                    Cancel

                </button>

                <button
type="submit"
name="submit"
class="submit-btn">

                    Submit Complaint

                </button>

            </div>

        </form>

    </div>

</div>

</body>

</html>