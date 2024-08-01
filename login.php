<?php
$host = 'localhost';
$username = 'root';
$password = '';
$dbname = 'login';
$m = new mysqli($host, $username, $password, $dbname);
$m->set_charset('utf8');

$z1 = $_POST['z1'];
$z2 = $_POST['z2'];
$S = "SELECT * FROM loginuser WHERE username='$z1' AND password='$z2'";

$r = $m->query($S);

if ($r) {
    $c = $r->num_rows;

    if ($c > 0) {
        header('Location: http://localhost/login1/index.html');
    } else {
        echo "<script type='text/javascript'>
                alert('اسم المستخدم أو كلمة المرور غير صحيحة');
                window.location.href = 'http://localhost/login1/login.html';
              </script>";
    }
} else {
    echo "Error: " . $S . "<br>" . $m->error;
}

$m->close();
?>
