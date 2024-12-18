<?php
require_once('fpdf/fpdf.php'); // Asegúrate de tener la librería FPDF instalada

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $tipoReporte = $_POST['tipoReporte'];
    $empleadoId = $_POST['empleado'];
    $fecha = $_POST['fecha'];

    // Conexión a la base de datos
    $conn = new mysqli("localhost", "root", "", "automata");

    // Consulta según el tipo de reporte
    switch ($tipoReporte) {
        case 'dia':
            $sql = "SELECT * FROM ventas WHERE id_user = $empleadoId AND DATE(fecha) = '$fecha'";
            break;
        case 'mes':
            $sql = "SELECT * FROM ventas WHERE id_user = $empleadoId AND MONTH(fecha) = MONTH('$fecha') AND YEAR(fecha) = YEAR('$fecha')";
            break;
        case 'año':
            $sql = "SELECT * FROM ventas WHERE id_user = $empleadoId AND YEAR(fecha) = YEAR('$fecha')";
            break;
    }

    $result = $conn->query($sql);

    // Crear un objeto FPDF
    $pdf = new FPDF();
    $pdf->AddPage();
    $pdf->SetFont('Arial', 'B', 12);
    $pdf->Cell(200, 10, 'Reporte de Ventas', 0, 1, 'C');
    $pdf->Ln(10);

    // Encabezado de la tabla
    $pdf->Cell(40, 10, 'ID Venta', 1);
    $pdf->Cell(40, 10, 'Empleado', 1);
    $pdf->Cell(40, 10, 'Total', 1);
    $pdf->Cell(60, 10, 'Fecha', 1);
    $pdf->Ln();

    // Agregar los datos de las ventas
    while ($row = $result->fetch_assoc()) {
        $pdf->Cell(40, 10, $row['id_venta'], 1);
        $pdf->Cell(40, 10, $row['id_user'], 1); // Aquí podrías agregar el nombre del empleado
        $pdf->Cell(40, 10, '$' . number_format($row['total'], 2), 1);
        $pdf->Cell(60, 10, $row['fecha'], 1);
        $pdf->Ln();
    }

    // Output del PDF
    $pdf->Output('I', 'reporte.pdf');
}
?>
