<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Venta</title>
    <script src="app.js" defer></script>
</head>
<body>
    <button id="btnVenta">Venta</button>
    <button id="btnInicio" style="display:none;">Inicio</button>
    
    <div id="ventaDiv" style="display:;">
        <h2>Formulario de Venta</h2>
        <form id="ventaForm">
            <label>Seleccionar Usuario:</label>
            <select id="usuarioSelect"></select><br><br>

            <label>Seleccionar Producto:</label>
            <select id="productoSelect"></select><br><br>

            <label>Código de Barra:</label>
            <input type="text" id="codBarra" disabled><br><br>

            <label>Cantidad:</label>
            <input type="number" id="cantidad" min="1" value="1"><br><br>

            <button type="button" id="btnAgregar">Agregar</button>
        </form>

        <h3>Carrito de Ventas</h3>
        <table border="1" id="tablaVentas">
            <button type="button" id="btnCancelarVenta">Cancelar Venta</button>
            <p id="cantidadDisponible"></p>

            <thead>
                <tr>
                    <th>Código</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody></tbody>
            <tfoot>
                <tr>
                    <td colspan="4">Total</td>
                    <td id="total">0</td>
                </tr>
            </tfoot>
        </table>
        <button id="btnPagar">Pagar</button>
    </div>
    
</body>
</html>
