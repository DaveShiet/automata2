<?php
// Incluir la librería FPDF
require('fpdf.php');
include("conexion.php");

// Recuperar los datos del formulario
$periodo = $_POST['periodo'];
$usuario_id = $_POST['usuario'];
$fecha_inicio = $_POST['fecha_inicio'];

// Definir la consulta
$query = "SELECT dv.id_detalle, dv.nom_produ, dv.cantidad, dv.precio, dv.subtotal, v.fecha, u.NOM_USER, u.AP_USER
          FROM detalle_ventas dv
          JOIN ventas v ON dv.id_venta = v.id_venta
          JOIN usuario u ON v.id_user = u.ID_USER
          WHERE 1=1";

// Filtrar por periodo (día, mes, año)
if ($periodo == 'dia' && !empty($fecha_inicio)) {
    $query .= " AND DATE(v.fecha) = '$fecha_inicio'";
} elseif ($periodo == 'mes' && !empty($fecha_inicio)) {
    $query .= " AND MONTH(v.fecha) = MONTH('$fecha_inicio') AND YEAR(v.fecha) = YEAR('$fecha_inicio')";
} elseif ($periodo == 'ano' && !empty($fecha_inicio)) {
    $query .= " AND YEAR(v.fecha) = YEAR('$fecha_inicio')";
}

// Filtrar por usuario
if (!empty($usuario_id)) {
    $query .= " AND v.id_user = $usuario_id";
}

// Ejecutar la consulta
$result = mysqli_query($conn, $query);

// Crear una instancia de FPDF
$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 12);

// Título del reporte
$pdf->Cell(0, 10, 'Reporte de Detalles de Ventas', 0, 1, 'C');

// Encabezados de la tabla
$pdf->Cell(30, 10, 'Producto', 1, 0, 'C');
$pdf->Cell(30, 10, 'Cantidad', 1, 0, 'C');
$pdf->Cell(30, 10, 'Precio', 1, 0, 'C');
$pdf->Cell(30, 10, 'Subtotal', 1, 0, 'C');
$pdf->Cell(50, 10, 'Fecha', 1, 1, 'C');

// Poner los datos de la consulta en la tabla
while ($row = mysqli_fetch_assoc($result)) {
    $pdf->Cell(30, 10, $row['nom_produ'], 1, 0, 'C');
    $pdf->Cell(30, 10, $row['cantidad'], 1, 0, 'C');
    $pdf->Cell(30, 10, '$' . number_format($row['precio'], 2), 1, 0, 'C');
    $pdf->Cell(30, 10, '$' . number_format($row['subtotal'], 2), 1, 0, 'C');
    $pdf->Cell(50, 10, $row['fecha'], 1, 1, 'C');
}

// Salida del archivo PDF
$pdf->Output();
?>
