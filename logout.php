<?php

session_start();

session_destroy();

header("Location: select_role.php");

exit();

?>