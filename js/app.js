document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("title");
  const mainContent = document.getElementById("mainContent");

  document.getElementById("btnInicio").addEventListener("click", () => {
    title.textContent = "INICIO";
    mainContent.innerHTML = "<p>Bienvenido al sistema de administración.</p>";
  });

  document.getElementById("btnUsuarios").addEventListener("click", () => {
    title.textContent = "USUARIOS";
    loadUsuarios();
  });

  document.getElementById("btnProductos").addEventListener("click", () => {
    title.textContent = "PRODUCTOS";
    loadProductos();
  });

    document.getElementById("btnVentas").addEventListener("click", () => {
  window.location.href = "ventas/index.php";
});


  // Funciones para cargar usuarios
  async function loadUsuarios() {
    const response = await fetch("php/usuarios.php?action=list");
    const usuarios = await response.json();

    mainContent.innerHTML = `
      <button onclick="showUserForm()">Agregar</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Tipo</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          ${usuarios.map(u => `
            <tr>
              <td>${u.ID_USER}</td>
              <td>${u.NOM_USER}</td>
              <td>${u.AP_USER}</td>
              <td>${u.AM_USER || "N/A"}</td>
              <td>${u.TIPO_USER}</td>
              <td>${u.TEL_USER || "N/A"}</td>
              <td>${u.MAIL_USER || "N/A"}</td>
              <td>
                <button onclick="editUser(${u.ID_USER})">Editar</button>
                <button onclick="deleteUser(${u.ID_USER})">Eliminar</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }

  // Función para mostrar el formulario de agregar usuario
  window.showUserForm = () => {
    mainContent.innerHTML = `
      <h2>Agregar Usuario</h2>
      <form id="userForm">
        <input type="hidden" name="action" value="add">
        <label>Nombre: <input type="text" name="NOM_USER" required></label>
        <label>Apellido Paterno: <input type="text" name="AP_USER" required></label>
        <label>Apellido Materno: <input type="text" name="AM_USER"></label>
        <label>Tipo: 
          <select name="TIPO_USER">
            <option value="admin">Admin</option>
            <option value="cliente">Cliente</option>
            <option value="empleado">Empleado</option>
          </select>
        </label>
        <label>Teléfono: <input type="text" name="TEL_USER"></label>
        <label>Email: <input type="email" name="MAIL_USER"></label>
        <button type="submit">Guardar</button>
        <button type="button" onclick="loadUsuarios()">Cancelar</button>
      </form>
    `;

    document.getElementById("userForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      await fetch("php/usuarios.php", { method: "POST", body: formData });
      loadUsuarios();
    });
  };

  // Función para editar un usuario
  window.editUser = async (id) => {
    const response = await fetch(`php/usuarios.php?action=get&id=${id}`);
    const user = await response.json();

    mainContent.innerHTML = `
      <h2>Editar Usuario</h2>
      <form id="editUserForm">
        <input type="hidden" name="action" value="edit">
        <input type="hidden" name="ID_USER" value="${user.ID_USER}">
        <label>Nombre: <input type="text" name="NOM_USER" value="${user.NOM_USER}" required></label>
        <label>Apellido Paterno: <input type="text" name="AP_USER" value="${user.AP_USER}" required></label>
        <label>Apellido Materno: <input type="text" name="AM_USER" value="${user.AM_USER || ""}"></label>
        <label>Tipo: 
          <select name="TIPO_USER">
            <option value="admin" ${user.TIPO_USER === "admin" ? "selected" : ""}>Admin</option>
            <option value="cliente" ${user.TIPO_USER === "cliente" ? "selected" : ""}>Cliente</option>
            <option value="empleado" ${user.TIPO_USER === "empleado" ? "selected" : ""}>Empleado</option>
          </select>
        </label>
        <label>Teléfono: <input type="text" name="TEL_USER" value="${user.TEL_USER || ""}"></label>
        <label>Email: <input type="email" name="MAIL_USER" value="${user.MAIL_USER || ""}"></label>
        <button type="submit">Guardar</button>
        <button type="button" onclick="loadUsuarios()">Cancelar</button>
      </form>
    `;

    document.getElementById("editUserForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      await fetch("php/usuarios.php", { method: "POST", body: formData });
      loadUsuarios();
    });
  };

  // Función para eliminar un usuario
  window.deleteUser = async (id) => {
    if (confirm("¿Está seguro de eliminar este usuario?")) {
      await fetch("php/usuarios.php?action=delete", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `id=${id}`,
      });
      loadUsuarios();
    }
  };

  // Funciones similares para productos
  async function loadProductos() {
    const response = await fetch("php/productos.php?action=list");
    const productos = await response.json();

    mainContent.innerHTML = `
      <button onclick="showProductForm()">Agregar</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Código de Barras</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Proveedor</th>
            <th>Especificaciones</th>
            <th>Fecha Caducidad</th>
            <th>Costo Compra</th>
            <th>Costo Venta</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          ${productos.map(p => `
            <tr>
              <td>${p.ID_PROD}</td>
              <td>${p.COD_BARRA}</td>
              <td>${p.NOM_PRODU}</td>
              <td>${p.CANT_PROD}</td>
              <td>${p.PROVEEDOR || "N/A"}</td>
              <td>${p.ESPECIFICACIONES || "N/A"}</td>
              <td>${p.EC_CAD_PROD || "N/A"}</td>
              <td>${p.COST_COMP || "N/A"}</td>
              <td>${p.COST_VENT || "N/A"}</td>
              <td>
                <button onclick="editProduct(${p.ID_PROD})">Editar</button>
                <button onclick="deleteProduct(${p.ID_PROD})">Eliminar</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }

  window.showProductForm = () => {
    mainContent.innerHTML = `
      <h2>Agregar Producto</h2>
      <form id="productForm">
        <input type="hidden" name="action" value="add">
        <label>Código de Barras: <input type="text" name="COD_BARRA" required></label>
        <label>Nombre: <input type="text" name="NOM_PRODU" required></label>
        <label>Cantidad: <input type="number" name="CANT_PROD" value="0" required></label>
        <label>Proveedor: <input type="text" name="PROVEEDOR"></label>
        <label>Especificaciones: <textarea name="ESPECIFICACIONES"></textarea></label>
        <label>Fecha de Caducidad: <input type="date" name="EC_CAD_PROD"></label>
        <label>Costo Compra: <input type="number" step="0.01" name="COST_COMP"></label>
        <label>Costo Venta: <input type="number" step="0.01" name="COST_VENT"></label>
        <button type="submit">Guardar</button>
        <button type="button" onclick="loadProductos()">Cancelar</button>
      </form>
    `;

    document.getElementById("productForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      await fetch("php/productos.php", { method: "POST", body: formData });
      loadProductos();
    });
  };

  window.editProduct = async (id) => {
    const response = await fetch(`php/productos.php?action=get&id=${id}`);
    const product = await response.json();

    mainContent.innerHTML = `
      <h2>Editar Producto</h2>
      <form id="editProductForm">
        <input type="hidden" name="action" value="edit">
        <input type="hidden" name="ID_PROD" value="${product.ID_PROD}">
        <label>Código de Barras: <input type="text" name="COD_BARRA" value="${product.COD_BARRA}" required></label>
        <label>Nombre: <input type="text" name="NOM_PRODU" value="${product.NOM_PRODU}" required></label>
        <label>Cantidad: <input type="number" name="CANT_PROD" value="${product.CANT_PROD}" required></label>
        <label>Proveedor: <input type="text" name="PROVEEDOR" value="${product.PROVEEDOR || ""}"></label>
        <label>Especificaciones: <textarea name="ESPECIFICACIONES">${product.ESPECIFICACIONES || ""}</textarea></label>
        <label>Fecha de Caducidad: <input type="date" name="EC_CAD_PROD" value="${product.EC_CAD_PROD || ""}"></label>
        <label>Costo Compra: <input type="number" step="0.01" name="COST_COMP" value="${product.COST_COMP || ""}"></label>
        <label>Costo Venta: <input type="number" step="0.01" name="COST_VENT" value="${product.COST_VENT || ""}"></label>
        <button type="submit">Guardar</button>
        <button type="button" onclick="loadProductos()">Cancelar</button>
      </form>
    `;

    document.getElementById("editProductForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      await fetch("php/productos.php", { method: "POST", body: formData });
      loadProductos();
    });
  };

  window.deleteProduct = async (id) => {
    if (confirm("¿Está seguro de eliminar este producto?")) {
      await fetch("php/productos.php?action=delete", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `id=${id}`,
      });
      loadProductos();
    }
  };
});
// Función para cargar el formulario de ventas
async function loadVentas() {
  // Obtén empleados (usuarios con TIPO_USER = 'empleado')
  const response = await fetch("php/usuarios.php?action=getEmployees");
  const empleados = await response.json();

  mainContent.innerHTML = `
    <h2>VENTAS</h2>
    <form id="ventasForm">
      <!-- Seleccionar empleado -->
      <label>Empleado:
        <select id="empleado" name="empleado" required>
          <option value="">Seleccionar</option>
          ${empleados
            .map(
              (emp) => `<option value="${emp.ID_USER}">${emp.NOM_USER} ${emp.AP_USER}</option>`
            )
            .join("")}
        </select>
      </label>

      <!-- Seleccionar fecha -->
      <label>Fecha:
        <input type="date" id="fecha" name="fecha" required>
      </label>

      <!-- Buscar producto -->
      <label>Buscar Producto:
        <input type="text" id="buscarProducto" placeholder="Nombre o código de barra">
        <button type="button" id="buscarBtn">Buscar</button>
      </label>

      <!-- Tabla de productos seleccionados -->
      <table id="productosSeleccionados">
        <thead>
          <tr>
            <th>Código de Barra</th>
            <th>Nombre Producto</th>
            <th>Precio Venta</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          <!-- Aquí se mostrarán los productos seleccionados -->
        </tbody>
      </table>

      <!-- Total general -->
      <h3>Total General: $<span id="totalGeneral">0.00</span></h3>

      <!-- Botones -->
      <button type="submit">Guardar Venta</button>
      <button type="button" id="cancelarVenta">Cancelar</button>
    </form>
  `;

  // Evento para buscar productos
  document.getElementById("buscarBtn").addEventListener("click", buscarProducto);

  // Evento para cancelar el formulario de ventas
  document.getElementById("cancelarVenta").addEventListener("click", () => {
    mainContent.innerHTML = "<h2>VENTAS CANCELADA</h2>"; // Opcional
    loadVentas(); // Regresa al formulario limpio
  });

  // Evento para guardar la venta
  document.getElementById("ventasForm").addEventListener("submit", guardarVenta);
}

// Función para buscar productos por nombre o código de barra
async function buscarProducto() {
  const query = document.getElementById("buscarProducto").value.trim();
  if (query === "") return alert("Ingresa un nombre o código de barra para buscar.");

  const response = await fetch(`php/productos.php?action=search&query=${query}`);
  const productos = await response.json();

  if (productos.length === 0) {
    alert("No se encontraron productos.");
    return;
  }

  const resultadosDiv = document.createElement("div");
  resultadosDiv.innerHTML = `
    <ul>
      ${productos
        .map(
          (prod) =>
            `<li>${prod.NOM_PRODU} - $${prod.COST_VENT}
              <button onclick="agregarProducto(${prod.ID_PROD}, '${prod.COD_BARRA}', '${prod.NOM_PRODU}', ${prod.COST_VENT})">
                Agregar
              </button>
            </li>`
        )
        .join("")}
    </ul>
  `;

  mainContent.appendChild(resultadosDiv);
}

// Función para agregar un producto a la tabla de productos seleccionados
function agregarProducto(id, codigo, nombre, precioVenta) {
  const tbody = document.querySelector("#productosSeleccionados tbody");

  // Verificar si el producto ya está agregado
  if ([...tbody.children].some((row) => row.dataset.id === id.toString())) {
    alert("El producto ya está en la lista.");
    return;
  }

  const row = document.createElement("tr");
  row.dataset.id = id;

  row.innerHTML = `
    <td>${codigo}</td>
    <td>${nombre}</td>
    <td>$${precioVenta.toFixed(2)}</td>
    <td>
      <input type="number" value="1" min="1" onchange="actualizarTotalProducto(this, ${precioVenta})">
    </td>
    <td class="total">$${precioVenta.toFixed(2)}</td>
    <td><button onclick="eliminarProducto(this)">Eliminar</button></td>
  `;

  tbody.appendChild(row);
  actualizarTotalGeneral();
}

// Función para actualizar el total de un producto en la tabla
function actualizarTotalProducto(input, precioVenta) {
  const cantidad = parseInt(input.value) || 1;
  const totalCell = input.closest("tr").querySelector(".total");
  totalCell.textContent = `$${(cantidad * precioVenta).toFixed(2)}`;
  actualizarTotalGeneral();
}

// Función para eliminar un producto de la tabla
function eliminarProducto(button) {
  button.closest("tr").remove();
  actualizarTotalGeneral();
}

// Función para actualizar el total general
function actualizarTotalGeneral() {
  const totalCells = document.querySelectorAll("#productosSeleccionados .total");
  const total = [...totalCells].reduce((sum, cell) => sum + parseFloat(cell.textContent.slice(1)), 0);
  document.getElementById("totalGeneral").textContent = total.toFixed(2);
}

// Función para guardar la venta
async function guardarVenta(e) {
  e.preventDefault();

  const empleado = document.getElementById("empleado").value;
  const fecha = document.getElementById("fecha").value;
  const productos = [...document.querySelectorAll("#productosSeleccionados tbody tr")].map((row) => ({
    id: row.dataset.id,
    cantidad: row.querySelector("input").value,
  }));

  if (!empleado || !fecha || productos.length === 0) {
    alert("Por favor completa todos los campos y selecciona al menos un producto.");
    return;
  }

  const data = { empleado, fecha, productos };

  const response = await fetch("php/ventas.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    alert("Venta guardada exitosamente.");
    loadVentas();
  } else {
    alert("Error al guardar la venta.");
  }
}
