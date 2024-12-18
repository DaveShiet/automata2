document.addEventListener('DOMContentLoaded', () => {
    const formReporte = document.getElementById('formReporte');
    const mensaje = document.getElementById('mensaje');

    formReporte.addEventListener('submit', (e) => {
        e.preventDefault();

        const empleado = document.getElementById('empleado').value;
        const rangoFecha = document.getElementById('rangoFecha').value;
        const fecha = document.getElementById('fecha').value;

        if (!empleado || !rangoFecha || !fecha) {
            mensaje.textContent = "Por favor, complete todos los campos.";
            return;
        }

        generarReporte(empleado, rangoFecha, fecha);
    });
});

async function generarReporte(empleado, rangoFecha, fecha) {
    // Aquí podrías hacer una llamada al servidor para obtener los datos del reporte
    // Por ejemplo, usando fetch para obtener los datos de ventas

    // Simulación de datos de ventas
    const ventas = [
        { producto: 'Producto A', cantidad: 10, total: 100 },
        { producto: 'Producto B', cantidad: 5, total: 50 }
    ];

    // Crear PDF con jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text('Reporte de Ventas', 10, 10);
    doc.text(`Empleado: ${empleado}`, 10, 20);
    doc.text(`Rango de Fecha: ${rangoFecha} - ${fecha}`, 10, 30);

    let y = 40;
    ventas.forEach(venta => {
        doc.text(`Producto: ${venta.producto} - Cantidad: ${venta.cantidad} - Total: $${venta.total}`, 10, y);
        y += 10;
    });

    // Guardar el PDF
    doc.save('reporte_ventas.pdf');
}
