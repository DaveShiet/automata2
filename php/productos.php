<?php
include 'conexion.php';

$action = $_GET['action'] ?? '';

if ($action === 'list') {
    $result = $conn->query("SELECT * FROM productos");
    $productos = [];
    while ($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }
    echo json_encode($productos);
} elseif ($action === 'get') {
    $id = $_GET['id'];
    $result = $conn->query("SELECT * FROM productos WHERE ID_PROD = $id");
    echo json_encode($result->fetch_assoc());
} elseif ($action === 'delete') {
    $id = $_POST['id'];
    $conn->query("DELETE FROM productos WHERE ID_PROD = $id");
    echo json_encode(['status' => 'success']);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];

    if ($action === 'add') {
        $COD_BARRA = $_POST['COD_BARRA'];
        $NOM_PRODU = $_POST['NOM_PRODU'];
        $CANT_PROD = $_POST['CANT_PROD'];
        $PROVEEDOR = $_POST['PROVEEDOR'] ?? null;
        $ESPECIFICACIONES = $_POST['ESPECIFICACIONES'] ?? null;
        $EC_CAD_PROD = $_POST['EC_CAD_PROD'] ?? null;
        $COST_COMP = $_POST['COST_COMP'] ?? null;
        $COST_VENT = $_POST['COST_VENT'] ?? null;

        $conn->query("INSERT INTO productos (COD_BARRA, NOM_PRODU, CANT_PROD, PROVEEDOR, ESPECIFICACIONES, EC_CAD_PROD, COST_COMP, COST_VENT) 
                      VALUES ('$COD_BARRA', '$NOM_PRODU', $CANT_PROD, '$PROVEEDOR', '$ESPECIFICACIONES', '$EC_CAD_PROD', $COST_COMP, $COST_VENT)");
    } elseif ($action === 'edit') {
        $ID_PROD = $_POST['ID_PROD'];
        $COD_BARRA = $_POST['COD_BARRA'];
        $NOM_PRODU = $_POST['NOM_PRODU'];
        $CANT_PROD = $_POST['CANT_PROD'];
        $PROVEEDOR = $_POST['PROVEEDOR'] ?? null;
        $ESPECIFICACIONES = $_POST['ESPECIFICACIONES'] ?? null;
        $EC_CAD_PROD = $_POST['EC_CAD_PROD'] ?? null;
        $COST_COMP = $_POST['COST_COMP'] ?? null;
        $COST_VENT = $_POST['COST_VENT'] ?? null;

        $conn->query("UPDATE productos SET 
                      COD_BARRA = '$COD_BARRA',
                      NOM_PRODU = '$NOM_PRODU',
                      CANT_PROD = $CANT_PROD,
                      PROVEEDOR = '$PROVEEDOR',
                      ESPECIFICACIONES = '$ESPECIFICACIONES',
                      EC_CAD_PROD = '$EC_CAD_PROD',
                      COST_COMP = $COST_COMP,
                      COST_VENT = $COST_VENT
                      WHERE ID_PROD = $ID_PROD");
    }
    echo json_encode(['status' => 'success']);
}
?>
