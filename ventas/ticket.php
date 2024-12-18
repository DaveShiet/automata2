<?php
require('fpdf/fpdf.php');
include 'conexion.php';

$id_venta = $_GET['id_venta'];

// Obtener detalles de la venta
$result = $conn->query("SELECT v.id_venta, v.total, v.fecha, u.NOM_USER 
                        FROM ventas v 
                        JOIN usuario u ON v.id_user = u.ID_USER 
                        WHERE v.id_venta = $id_venta");
$venta = $result->fetch_assoc();

$detalles = $conn->query("SELECT * FROM detalle_ventas WHERE id_venta = $id_venta");

// Crear el PDF
$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 16);
$pdf->Cell(0, 10, "Ticket de Venta #{$venta['id_venta']}", 0, 1, 'C');
$pdf->Ln(10);

$pdf->SetFont('Arial', '', 12);
$pdf->Cell(0, 10, "Cliente: {$venta['NOM_USER']}", 0, 1);
$pdf->Cell(0, 10, "Fecha: {$venta['fecha']}", 0, 1);
$pdf->Ln(5);

$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(40, 10, "Producto", 1);
$pdf->Cell(30, 10, "Cantidad", 1);
$pdf->Cell(30, 10, "Precio", 1);
$pdf->Cell(30, 10, "Subtotal", 1);
$pdf->Ln();

$pdf->SetFont('Arial', '', 12);
while ($row = $detalles->fetch_assoc()) {
    $pdf->Cell(40, 10, $row['nom_produ'], 1);
    $pdf->Cell(30, 10, $row['cantidad'], 1);
    $pdf->Cell(30, 10, $row['precio'], 1);
    $pdf->Cell(30, 10, $row['subtotal'], 1);
    $pdf->Ln();
}

$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(100, 10, "Total: ", 1);
$pdf->Cell(30, 10, $venta['total'], 1);
$pdf->Output();
?>
