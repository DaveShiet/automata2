<?php
include 'conexion.php';

$action = $_GET['action'] ?? '';

if ($action === 'list') {
    $result = $conn->query("SELECT * FROM usuario");
    $usuarios = [];
    while ($row = $result->fetch_assoc()) {
        $usuarios[] = $row;
    }
    echo json_encode($usuarios);
} elseif ($action === 'get') {
    $id = $_GET['id'];
    $result = $conn->query("SELECT * FROM usuario WHERE ID_USER = $id");
    echo json_encode($result->fetch_assoc());
} elseif ($action === 'delete') {
    $id = $_POST['id'];
    $conn->query("DELETE FROM usuario WHERE ID_USER = $id");
    echo json_encode(['status' => 'success']);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];

    if ($action === 'add') {
        $NOM_USER = $_POST['NOM_USER'];
        $AP_USER = $_POST['AP_USER'];
        $AM_USER = $_POST['AM_USER'] ?? null;
        $TIPO_USER = $_POST['TIPO_USER'];
        $TEL_USER = $_POST['TEL_USER'] ?? null;
        $MAIL_USER = $_POST['MAIL_USER'] ?? null;

        $conn->query("INSERT INTO usuario (NOM_USER, AP_USER, AM_USER, TIPO_USER, TEL_USER, MAIL_USER) 
                      VALUES ('$NOM_USER', '$AP_USER', '$AM_USER', '$TIPO_USER', '$TEL_USER', '$MAIL_USER')");
    } elseif ($action === 'edit') {
        $ID_USER = $_POST['ID_USER'];
        $NOM_USER = $_POST['NOM_USER'];
        $AP_USER = $_POST['AP_USER'];
        $AM_USER = $_POST['AM_USER'] ?? null;
        $TIPO_USER = $_POST['TIPO_USER'];
        $TEL_USER = $_POST['TEL_USER'] ?? null;
        $MAIL_USER = $_POST['MAIL_USER'] ?? null;

        $conn->query("UPDATE usuario SET 
                      NOM_USER = '$NOM_USER', 
                      AP_USER = '$AP_USER', 
                      AM_USER = '$AM_USER', 
                      TIPO_USER = '$TIPO_USER', 
                      TEL_USER = '$TEL_USER', 
                      MAIL_USER = '$MAIL_USER'
                      WHERE ID_USER = $ID_USER");
    }
    echo json_encode(['status' => 'success']);
}
?>
