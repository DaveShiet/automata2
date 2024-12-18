document.addEventListener("DOMContentLoaded", function () {
    const btnVenta = document.getElementById("btnVenta");
    const btnInicio = document.getElementById("btnInicio");
    const ventaDiv = document.getElementById("ventaDiv");
    const usuarioSelect = document.getElementById("usuarioSelect");
    const productoSelect = document.getElementById("productoSelect");
    const codBarra = document.getElementById("codBarra");
    const cantidadInput = document.getElementById("cantidad");
    const btnAgregar = document.getElementById("btnAgregar");
    const tablaVentas = document.querySelector("#tablaVentas tbody");
    const totalElement = document.getElementById("total");
    const cantidadDisponibleElement = document.getElementById("cantidadDisponible");
    const tipoPagoSelect = document.getElementById("tipoPago");
    const tarjetaDiv = document.getElementById("tarjetaDiv");
    const transferenciaDiv = document.getElementById("transferenciaDiv");
    const efectivoBtn = document.getElementById("btnPagarEfectivo");
    const tarjetaBtn = document.getElementById("btnPagarTarjeta");
    const transferenciaBtn = document.getElementById("btnPagarTransferencia");
    const numeroTarjeta = document.getElementById("numeroTarjeta");
    const comisionInfo = document.getElementById("comisionInfo");
    const qrTransferencia = document.getElementById("qrTransferencia");

    let carrito = [];
    let productosDisponibles = {}; // Almacenar las cantidades disponibles de los productos
    let totalVenta = 0;

    // Mostrar/ocultar venta
    btnVenta.addEventListener("click", () => {
        ventaDiv.style.display = "block";
        btnInicio.style.display = "inline";
        btnVenta.style.display = "none";
        cargarUsuarios();
        cargarProductos();
    });

    btnInicio.addEventListener("click", () => {
        ventaDiv.style.display = "none";
        btnVenta.style.display = "inline";
        btnInicio.style.display = "none";
    });

    // Cargar usuarios
    function cargarUsuarios() {
        fetch("venta.php?action=list_users")
            .then(res => res.json())
            .then(data => {
                usuarioSelect.innerHTML = data.map(u => `<option value="${u.ID_USER}">${u.NOM_USER}</option>`).join('');
            });
    }

    // Cargar productos
    function cargarProductos() {
        fetch("venta.php?action=list_products")
            .then(res => res.json())
            .then(data => {
                productoSelect.innerHTML = data.map(p =>
                    `<option value="${p.COD_BARRA}" data-price="${p.COST_VENT}" data-name="${p.NOM_PRODU}" data-stock="${p.CANT_PROD}">${p.NOM_PRODU}</option>`
                ).join('');

                // Almacenamos las cantidades de los productos en un objeto
                productosDisponibles = data.reduce((acc, p) => {
                    acc[p.COD_BARRA] = p.CANT_PROD; // Cambiar de stock a CANT_PROD
                    return acc;
                }, {});
            });
    }

    // Mostrar código de barra y cantidad disponible
    productoSelect.addEventListener("change", function () {
        const selectedOption = productoSelect.selectedOptions[0];
        codBarra.value = selectedOption.value;

        // Mostrar la cantidad disponible para el producto seleccionado
        const cantidadDisponible = selectedOption.getAttribute("data-stock");
        cantidadDisponibleElement.textContent = `Cantidad disponible: ${cantidadDisponible}`;
    });

    // Agregar producto al carrito
    btnAgregar.addEventListener("click", function () {
        const selectedOption = productoSelect.selectedOptions[0];
        const codigo = selectedOption.value;
        const nombre = selectedOption.getAttribute("data-name");
        const precio = parseFloat(selectedOption.getAttribute("data-price"));
        const cantidadDisponible = parseInt(selectedOption.getAttribute("data-stock"));
        const cantidad = parseInt(cantidadInput.value);
        const subtotal = precio * cantidad;

        // Verificar si la cantidad solicitada excede la cantidad disponible en el inventario
        if (cantidad > cantidadDisponible) {
            alert(`Solo puedes agregar hasta ${cantidadDisponible} unidades de este producto.`);
            return;
        }

        // Verificar si el producto ya está en el carrito
        let productoExistente = carrito.find(item => item.codigo === codigo);

        if (productoExistente) {
            // Si ya existe, solo sumamos la cantidad, pero no excedemos la cantidad disponible
            const nuevaCantidad = productoExistente.cantidad + cantidad;
            if (nuevaCantidad > cantidadDisponible) {
                alert(`Solo puedes agregar hasta ${cantidadDisponible} unidades de este producto.`);
                return;
            }
            productoExistente.cantidad += cantidad;
            productoExistente.subtotal = productoExistente.precio * productoExistente.cantidad;
        } else {
            // Si no existe, agregamos el nuevo producto
            carrito.push({ codigo, nombre, cantidad, precio, subtotal });
        }

        actualizarTabla();
    });

    // Actualizar tabla y total
    function actualizarTabla() {
        tablaVentas.innerHTML = carrito.map((item, index) =>
            `<tr>
                <td>${item.codigo}</td>
                <td>${item.nombre}</td>
                <td>${item.cantidad}</td>
                <td>${item.precio}</td>
                <td>${item.subtotal}</td>
                <td>
                    <button class="btn-editar" data-index="${index}">Editar</button>
                    <button class="btn-eliminar" data-index="${index}">Eliminar</button>
                </td>
            </tr>`
        ).join('');

        totalVenta = carrito.reduce((sum, item) => sum + item.subtotal, 0);
        totalElement.textContent = totalVenta.toFixed(2);
    }

    // Editar cantidad de producto
    document.addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("btn-editar")) {
            const index = e.target.getAttribute("data-index");
            const producto = carrito[index];
            cantidadInput.value = producto.cantidad;
            // Opcional: cambiar la selección del producto en el select
            productoSelect.value = producto.codigo;
            // Eliminar temporalmente el producto para editarlo (luego lo actualizamos)
            carrito.splice(index, 1);
            actualizarTabla();
        }

        if (e.target && e.target.classList.contains("btn-eliminar")) {
            const index = e.target.getAttribute("data-index");
            carrito.splice(index, 1);
            actualizarTabla();
        }
    });

    // Mostrar tipo de pago seleccionado
    tipoPagoSelect.addEventListener("change", function () {
        const tipoPago = tipoPagoSelect.value;
        tarjetaDiv.style.display = 'none';
        transferenciaDiv.style.display = 'none';
        comisionInfo.style.display = 'none';

        if (tipoPago === 'tarjeta') {
            tarjetaDiv.style.display = 'block';
        } else if (tipoPago === 'transferencia') {
            transferenciaDiv.style.display = 'block';
            generarQRTransferencia(totalVenta);
        }
    });

    // Lógica para pagar en efectivo
    efectivoBtn.addEventListener("click", function () {
        procesarPago('efectivo', totalVenta);
    });

    // Lógica para pagar con tarjeta
    tarjetaBtn.addEventListener("click", function () {
        const tarjeta = numeroTarjeta.value;
        if (tarjeta.length === 4) {
            const banco = identificarBanco(tarjeta);
            const comision = calcularComision(totalVenta);
            const totalConComision = totalVenta + comision;
            procesarPago('tarjeta', totalConComision, comision, banco);
        } else {
            alert("Por favor, ingresa los primeros 4 dígitos de la tarjeta.");
        }
    });

    // Lógica para pagar con transferencia
    transferenciaBtn.addEventListener("click", function () {
        procesarPago('transferencia', totalVenta);
    });

    // Generar QR para transferencia
    function generarQRTransferencia(total) {
        qrTransferencia.textContent = `QR generado con el monto: $${total.toFixed(2)}. Escanea para pagar.`;
        qrTransferencia.style.display = 'block';
    }

    // Identificar el banco por los primeros 4 dígitos de la tarjeta (ejemplo simple)
    function identificarBanco(digitos) {
        const bancos = {
            "1234": "Banco A",
            "5678": "Banco B",
            "4321": "Banco C"
        };
        return bancos[digitos] || "Banco desconocido";
    }

    // Calcular comisión del 3% si paga con tarjeta
    function calcularComision(total) {
        return total * 0.03; // 3% de comisión
    }

    // Procesar el pago
    function procesarPago(tipo, monto, comision = 0, banco = "") {
        let mensaje = `Pago realizado con éxito: $${monto.toFixed(2)}`;
        if (tipo === 'tarjeta') {
            mensaje += ` (Comisión: $${comision.toFixed(2)} de ${banco})`;
        }

        // Simulación de generar el ticket después de pago
        alert(mensaje);
        window.location.href = `ticket.php?id_venta=12345`; // Aquí rediriges al ticket de venta
    }
});
    