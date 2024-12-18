<?php
include 'conexion.php';

$action = $_GET['action'] ?? '';

if ($action === 'list_users') {
    // Obtener la lista de usuarios
    $result = $conn->query("SELECT * FROM usuario");
    $usuarios = [];
    while ($row = $result->fetch_assoc()) {
        $usuarios[] = $row;
    }
    echo json_encode($usuarios);

} elseif ($action === 'list_products') {
    // Obtener la lista de productos
    $result = $conn->query("SELECT * FROM productos");
    $productos = [];
    while ($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }
    echo json_encode($productos);

} elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'save_sale') {
    // Guardar la venta y actualizar el inventario
    $data = json_decode(file_get_contents("php://input"), true);
    $id_user = $data['id_user'];
    $total = $data['total'];
    $carrito = $data['carrito'];

    // Iniciar transacción para asegurar la consistencia
    $conn->begin_transaction();
    try {
        // Insertar la venta en la tabla de ventas
        $conn->query("INSERT INTO ventas (id_user, total) VALUES ('$id_user', '$total')");
        $id_venta = $conn->insert_id; // Obtener el ID de la venta recién insertada

        // Insertar los productos de la venta en la tabla de detalle_venta
        foreach ($carrito as $producto) {
            $codigo = $producto['codigo'];
            $cantidad = $producto['cantidad'];
            $precio = $producto['precio'];
            $subtotal = $producto['subtotal'];

            // Insertar el detalle de la venta
            $conn->query("INSERT INTO detalle_ventas (id_venta, cod_barra, cantidad, precio, subtotal) 
                          VALUES ('$id_venta', '$codigo', '$cantidad', '$precio', '$subtotal')");

            // Actualizar la cantidad en la tabla de productos
            $conn->query("UPDATE productos SET CANT_PROD = CANT_PROD - $cantidad WHERE COD_BARRA = '$codigo'");
        }

        // Confirmar la transacción
        $conn->commit();

        // Enviar respuesta de éxito
        echo json_encode(['status' => 'success', 'id_venta' => $id_venta]);

    } catch (Exception $e) {
        // Si hay un error, revertir la transacción
        $conn->rollback();
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }

} else {
    // Acción no válida
    echo json_encode(['status' => 'error', 'message' => 'Acción no válida']);
}
?>
