const { ipcRenderer } = require("electron");

const taskForm = document.querySelector("#taskForm");
const taskCodigo = document.querySelector("#taskCodigo");
const taskList = document.querySelector("#taskList");
const taskNombre = document.querySelector("#taskNombre");
const taskCategoria = document.querySelector("#taskCategoria");
const taskCantidad = document.querySelector("#taskCantidad");
const taskPrecio = document.querySelector("#taskPreciocompra");
const taskPrecioventa = document.querySelector("#taskPrecioventa");
const taskIva = document.querySelector("#taskIva");
const taskProveedor = document.querySelector("#taskProveedor");



const codigoIdUsuario = document.querySelector("#codigoIdUsuario");
const formularioUsuario = document.querySelector("#formularioUsuario");
const usuarioForm = document.querySelector("#usuarioForm");
const usuarioName = document.querySelector("#usuarioName");
const usuarioDescription = document.querySelector("#usuarioDescription");
const usuarioList = document.querySelector("#usuarioList");
const usuarioCorreo = document.querySelector("#usuarioCorreo");
const usuarioCargo = document.querySelector("#usuarioCargo");

const proveedorForm = document.querySelector("#proveedorForm");
const proveedorName = document.querySelector("#proveedorName");
const proveedorTelefono = document.querySelector("#proveedorTelefono");
const proveedorDireccion = document.querySelector("#proveedorDireccion");
const proveedorList = document.querySelector("#proveedorList");
const proveedorContacto = document.querySelector("#proveedorContacto");
const proveedorProductos = document.querySelector("#proveedorProductos");
const proveedorCodigo = document.querySelector("#proveedorCodigo");

//*.VARIABLES VENTAS......//
const ventaForm = document.querySelector("#ventaForm");
const ventaName = document.querySelector("#ventaName");
const ventaPrecio = document.querySelector("#ventaPrecio");
const ventaList = document.querySelector("#ventaList");


let updateStatus = false;
let idTaskToUpdate = "";

function deleteTask(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-task", id);
  }
  return;
}

function editTask(id) {
  updateStatus = true;
  idTaskToUpdate = id;
  const task = tasks.find((task) => task._id === id);
  taskCodigo.value = task.codigo;
  taskNombre.value = task.nombre;
  taskCategoria.value = task.categoria;
  taskCantidad.value = task.cantidad;
  taskPreciocompra.value = task.preciocompra;
  taskProveedor.value = task.proveedor;
  taskPrecioventa.value = task.precioventa;
  taskIva.value = task.iva;

}

function renderTasks(tasks) {
  taskList.innerHTML = "";
  tasks.map((t) => {
    taskList.innerHTML += `
          <tr class="card">
            <td>
            ${t._id}
            </td>
            <td>
             ${t.Codigo}
            </td>
            <td>
            ${t.Nombre}
            </td>
            <td>
            ${t.Categoria}
            </td>
             <td>
            ${t.Cantidad}
            </td>
            <td>
            ${t.Preciocompra}
            </td>
            <td>
            ${t.Precioventa}
            </td>
            <td>
            ${t.Iva}
            </td>
            <td>
            ${t.Proveedor}
            </td>
            <td>
            <button class="btn btn-danger" onclick="deleteTask('${t._id}')">
              🗑 Delete
            </button>
            </td>
            <td>
            <button class="btn btn-secondary" onclick="editTask('${t._id}')">
              ✎ Edit
            </button>
            </td>

            
            
            
          </tr>
        `;
  });

  seleccionProductoLista.innerHTML = "";

  for(let i = 0; i < tasks.length; i++){
    tasks[i].Precioventa
    seleccionProductoLista.innerHTML += `
    <option value="${tasks[i].Precioventa}" data-name="${tasks[i].Nombre}" data-index="${i}" data-cantidad="${tasks[i].Cantidad}">
    ${tasks[i].Nombre}
    ${tasks[i].Precioventa}
    </option>
  ` ;
  }
}


let tasks = [];

ipcRenderer.send("get-tasks");

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const task = {
    Codigo: taskCodigo.value,
    Nombre: taskNombre.value,
    Categoria: taskCategoria.value,
    Cantidad: taskCantidad.value,
    Preciocompra: taskPreciocompra.value,
    Precioventa: taskPrecioventa.value,
    Iva: taskIva.value,
    Proveedor: taskProveedor.value,
  


  };

  if (!updateStatus) {
    ipcRenderer.send("new-task", task);
  } else {
    ipcRenderer.send("update-task", { ...task, idTaskToUpdate });
  }

  taskForm.reset();
});

ipcRenderer.on("new-task-created", (e, arg) => {
  console.log(arg);
  const taskSaved = JSON.parse(arg);
  tasks.push(taskSaved);
  console.log(tasks);
  renderTasks(tasks);
  alert("Task Created Successfully");
  taskName.focus();
});

ipcRenderer.on("get-tasks", (e, args) => {
  const receivedTasks = JSON.parse(args);
  tasks = receivedTasks;
  renderTasks(tasks);
});

ipcRenderer.on("delete-task-success", (e, args) => {
  const deletedTask = JSON.parse(args);
  const newTasks = tasks.filter((t) => {
    return t._id !== deletedTask._id;
  });
  tasks = newTasks;
  renderTasks(tasks);
});

ipcRenderer.on("update-task-success", (e, args) => {
  updateStatus = false;
  const updatedTask = JSON.parse(args);
  tasks = tasks.map((t, i) => {
    if (t._id === updatedTask._id) {
      t.Codigo = updatedTask.Codigo;
      t.Nombre = updatedTask.Nombre;
      t.Categoria = updatedTask.Categoria;
      t.Cantidad = updatedTask.Cantidad;
      t.Preciocompra = updatedTask.Preciocompra;
      t.Precioventa = updatedTask.Precioventa;
      t.Proveedor = updatedTask.Proveedor;
      t.Iva = updatedTask.Iva;
      
      
    }
    return t;
  });
  renderTasks(tasks);
});
/*---------------------------------------------------------------------------------------------*/
function deleteUsuario(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-usuario", id);
  }
  return;
}

function editUsuario(id) {
  updateStatus = true;
  idUsuarioToUpdate = id;
  const usuarios = usuarios.find((usuario) => usuario._id === id);
  usuarioName.value = usuario.name;
  usuarioDescription.value = usuario.description;
  usuarioCorreo.value = usuario.correo;
  usuarioCargo.value = usuario.cargo;
}

function renderUsuarios(usuarios) {
  usuarioList.innerHTML = "";
  usuarios.map((t) => {
    usuarioList.innerHTML += `
     
<tr class="card">
            <td>
            ${t._id}
            </td>
            <td>
             ${t.name}
            </td>
            <td>
            ${t.description}
            </td>
            <td>
            ${t.correo}
            </td>
             <td>
            ${t.cargo}
            </td>
            <td>
            <button class="btn btn-danger" onclick="deleteUsuario('${t._id}')">
              🗑 Delete
            </button>
            </td>
            <td>
            <button class="btn btn-secondary" onclick="editUsuario('${t._id}')">
              ✎ Edit
            </button>
            </td>
          </tr>
        `;
  });
}




let Usuarios = [];

ipcRenderer.send("get-usuarios");

usuarioForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuario = {
    name: usuarioName.value,
    description: usuarioDescription.value,
    correo: usuarioCorreo.value,
    cargo: usuarioCargo.value,
  };

  if (!updateStatus) {
    ipcRenderer.send("new-usuario", usuario);
  } else {
    ipcRenderer.send("update-usuario", { ...usuario, idUsuarioToUpdate });
  }

  usuarioForm.reset();
});

ipcRenderer.on("new-usuario-created", (e, arg) => {
  console.log(arg);
  const usuarioSaved = JSON.parse(arg);
  usuarios.push(usuarioSaved);
  console.log(usuarios);
  renderUsuarios(usuarios);
  alert("Usuario Created Successfully");
  usuarioName.focus();
});

ipcRenderer.on("get-usuarios", (e, args) => {
  const receivedUsuarios = JSON.parse(args);
  usuarios = receivedUsuarios;
  renderUsuarios(usuarios);
});

ipcRenderer.on("delete-usuario-success", (e, args) => {
  const deletedUsuario = JSON.parse(args);
  const newUsuarios = usuarios.filter((t) => {
    return t._id !== deletedUsuario._id;
  });
  usuarios = newUsuarios;
  renderUsuarios(usuarios);
});

ipcRenderer.on("update-usuario-success", (e, args) => {
  updateStatus = false;
  const updatedUsuario = JSON.parse(args);
  usuarios = usuarios.map((t, i) => {
    if (t._id === updatedUsuario._id) {
      t.name = updatedUsuario.name;
      t.description = updatedUsuario.description;
      t.correo = updatedUsuario.correo;
      t.cargo = updatedUsuario.cargo;
    }
    return t;
  });
  renderUsuarios(usuarios);
});

/*---------------------------------------------------------------------------------------------*/

function deleteProveedor(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-proveedor", id);
  }
  return;
}

function editProveedor(id) {
  updateStatus = true;
  idProveedorToUpdate = id;
  const proveedor = proveedores.find((proveedor) => proveedor._id === id);
  proveedorName.value = proveedor.name;
  proveedorTelefono.value = proveedor.telefono;
  proveedorDireccion.value = proveedor.direccion;
  proveedorContacto.value = proveedor.contacto;
  proveedorProductos.value = proveedor.productos;
  proveedorCodigo.value = proveedor.codigo;
}

function renderProveedores(proveedores) {
  proveedorList.innerHTML = "";
  proveedores.map((t) => {
    proveedorList.innerHTML += `
<tr class="card">
<td>
${t._id}
</td>
<td>
 ${t.codigo}
</td>
<td>
${t.name}
</td>
<td>
${t.direccion}
</td>
<td>
${t.telefono}
</td>
 <td>
${t.contacto}
</td>
<td>
${t.productos}
</td>
<td>
<button class="btn btn-danger" onclick="deleteProveedor('${t._id}')">
  🗑 Delete
</button>
</td>
<td>
<button class="btn btn-secondary" onclick="editProveedor('${t._id}')">
  ✎ Edit
</button>
</td>

</tr>
`;
});
}




let proveedores = [];

ipcRenderer.send("get-proveedores");

proveedorForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const proveedor = {
    name: proveedorName.value,
    telefono: proveedorTelefono.value,
    direccion: proveedorDireccion.value,
    contacto: proveedorContacto.value,
    productos: proveedorProductos.value,
    codigo: proveedorCodigo.value,
  };

  if (!updateStatus) {
    ipcRenderer.send("new-proveedor", proveedor);
  } else {
    ipcRenderer.send("update-proveedor", { ...proveedor, idProveedorToUpdate });
  }

  proveedorForm.reset();
});

ipcRenderer.on("new-proveedor-created", (e, arg) => {
  console.log(arg);
  const proveedorSaved = JSON.parse(arg);
  proveedores.push(proveedorSaved);
  console.log(proveedores);
  renderProveedores(proveedores);
  alert("Proveedor Created Successfully");
  proveedorName.focus();
});

ipcRenderer.on("get-proveedores", (e, args) => {
  const receivedProveedores = JSON.parse(args);
  proveedores = receivedProveedores;
  renderProveedores(proveedores);
});

ipcRenderer.on("delete-proveedor-success", (e, args) => {
  const deletedProveedor = JSON.parse(args);
  const newProveedores = proveedores.filter((t) => {
    return t._id !== deletedProveedor._id;
  });
  proveedores = newProveedores;
  renderProveedores(proveedores);
});

ipcRenderer.on("update-proveedor-success", (e, args) => {
  updateStatus = false;
  const updatedProveedor = JSON.parse(args);
  proveedores = proveedores.map((t, i) => {
    if (t._id === updatedProveedor._id) {
      t.name = updatedProveedor.name;
      t.telefono = updatedProveedor.telefono;
      t.direccion = updatedProveedor.direccion;
      t.contacto = updatedProveedor.contacto;
      t.productos = updatedProveedor.productos;
      t.codigo = updatedProveedor.codigo;
    }
    return t;
  });
  renderProveedores(proveedores);
});

//..........................................................................................................


function deleteVenta(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-venta", id);
  }
  return;
}

function renderVentas(ventas) {
  ventaList.innerHTML = "";
  ventas.map((t) => {
    ventaList.innerHTML += `
          <li class="card">
            <h4>
              Venta id: ${t._id}
            </h4>
            <p>
              Venta Name: ${t.name}
            </p>
            <p>
              Venta precio: ${t.precio}
            </p>
            <button class="btn btn-danger" onclick="deleteVenta('${t._id}')">
              🗑 Delete
            </button>
          </li>
        `;
  });
}

let ventas = [];
let listaProductosCompra = [];
const seleccionProductoLista = document.querySelector("#seleccionProductoLista");


ipcRenderer.send("get-ventas");

const completarVenta = document.querySelector("#completar-venta");
const listaProductoVenta = document.querySelector("#lista-productos-venta");
const totalSuma = document.querySelector("#total-suma");
let sumaProductos = 0;
let n = 0;
const pagaCon = document.querySelector("#paga-con");

completarVenta.addEventListener("click", async (e) => {
  e.preventDefault();
  for (const value of listaProductosCompra) {
    const venta = {
      name: value.nombreProducto,
      precio: value.productoPrecio,
    };
    ipcRenderer.send("new-venta", venta);
    listaProductoVenta.innerHTML = "";
    let cantidadDeProductos = 0;
    for(let k = 0; k < listaProductosCompra.length; k++){
      if(value.indexProducto ==  listaProductosCompra[k].indexProducto){
        cantidadDeProductos++;
        console.log("cantidad de productos = " + cantidadDeProductos)
      }
    }

    restarProducto(value.indexProducto, value.cantidadProducto, cantidadDeProductos)
  }

  alert("las vueltas son " + (parseInt(pagaCon.value) - sumaProductos));

  totalSuma.innerHTML= "";
  pagaCon.value = "";
  sumaProductos = 0;
  listaProductosCompra =[];
  n = 0;
});


function addProductoVenta(){

  let productoSeleccionado = {
    nombreProducto: seleccionProductoLista.options[seleccionProductoLista.selectedIndex].dataset.name,
    indexProducto: seleccionProductoLista.options[seleccionProductoLista.selectedIndex].dataset.index, 
    cantidadProducto: seleccionProductoLista.options[seleccionProductoLista.selectedIndex].dataset.cantidad, 
    productoPrecio: seleccionProductoLista.value
  }

  listaProductosCompra.push(productoSeleccionado);
  listaProductoVenta.innerHTML += `
    <li>${ seleccionProductoLista.options[seleccionProductoLista.selectedIndex].dataset.name } ${ seleccionProductoLista.value } ${ n } index ${seleccionProductoLista.options[seleccionProductoLista.selectedIndex].dataset.index} <button onclick="borrarElementoArray(${n})">borrar</button></li>
  `

  n ++;
  sumaProductos = sumaProductos + parseInt(seleccionProductoLista.value);
  totalSuma.innerHTML = `<p>total: ${ sumaProductos }</p>`;

}

function cancelarVenta(){
  listaProductosCompra = [];
  listaProductoVenta.innerHTML = "";
}

function borrarElementoArray(borrarElemento){
  sumaProductos = sumaProductos - parseInt(listaProductosCompra[borrarElemento].productoPrecio);
  totalSuma.innerHTML = `<p>total: ${ sumaProductos }</p>`;

  listaProductosCompra.splice(borrarElemento, 1);
  listaProductoVenta.innerHTML = "";
  //mostrar array
  n = listaProductosCompra.length;
  for (let step = 0; step < listaProductosCompra.length; step++) {
    listaProductoVenta.innerHTML += `
    <li>${ listaProductosCompra[step].nombreProducto } ${ listaProductosCompra[step].productoPrecio } ${step}<button onclick="borrarElementoArray(${step})">borrar</button></li>
    `
  }
}


//----------------------------------------------------------------------------------------------

ipcRenderer.on("new-venta-created", (e, arg) => {
  console.log(arg);
  const ventaSaved = JSON.parse(arg);
  ventas.push(ventaSaved);
  console.log(ventas);
  renderVentas(ventas);
});

ipcRenderer.on("get-ventas", (e, args) => {
  const receivedVentas = JSON.parse(args);
  ventas = receivedVentas;
  renderVentas(ventas);
});

ipcRenderer.on("delete-venta-success", (e, args) => {
  const deletedVenta = JSON.parse(args);
  const newVentas = ventas.filter((t) => {
    return t._id !== deletedVenta._id;
  });
  ventas = newVentas;
  renderVentas(ventas);
});



function restarProducto(idProductoResta, cantidadProducto, menosTantosProductos) {
  let idTaskToUpdate = tasks[idProductoResta]._id
  //console.log(idTaskToUpdate)

  const task = {
    Cantidad: cantidadProducto - menosTantosProductos,
  };
  console.log(idTaskToUpdate + " " + task.Cantidad + " " + menosTantosProductos)
  ipcRenderer.send("update-task", { ...task, idTaskToUpdate });
}


//---------------------------------------------------------------------------

function loguearse() {
  let inputCorreo = document.getElementById("correo-usuario").value
  let inputPass = document.getElementById("pass-usuario").value
  let status;
  let indiceUsuario;

  for (let i = 0; i < usuarios.length; i++) {
    console.log(usuarios[i].name + " " + usuarios[i].correo)
    if((usuarios[i].name == inputCorreo) && (usuarios[i].correo == inputPass)){
      status = true;
      indiceUsuario = i;
    }
  }
  if(status == true){
    cargo = usuarios[indiceUsuario].cargo

    if(cargo == "vendedor"){
      mostrarVendedor()
    }
    if(cargo == "administrador"){
      mostrarAdministrador()
    }
  }else{
    alert("datos incorrectos")
  }


}

function mostrarAdministrador(){
  document.getElementById("menu").style.display = "block";
  document.getElementById("inventario").style.display = "block";

  document.getElementById("login").style.display = "none";

  listaMenu = document.querySelectorAll("#menu button");

  for (let i = 0; i < listaMenu.length; i++) {
    listaMenu[i].style.display = "block";
  }
}

function mostrarVendedor(){
  document.getElementById("menu").style.display = "block";
  document.getElementById("vender").style.display = "block";

  document.getElementById("login").style.display = "none";

  listaMenu = document.querySelectorAll("#menu button");

  for (let i = 0; i < listaMenu.length; i++) {
    listaMenu[i].style.display = "none";
  }
  document.getElementById("logout").style.display = "block";
}


function logout(){
  document.getElementById("correo-usuario").value = "";
  document.getElementById("pass-usuario").value = "";

  document.getElementById("login").style.display = "block";
  document.getElementById("menu").style.display = "none";
  mostrarVentana("login")
}

function mostrarVentana(mostrarLaVentana){
  listaVentanas = document.querySelectorAll(".ventana");

  for (let i = 0; i < listaVentanas.length; i++) {
    listaVentanas[i].style.display = "none";
  }
  document.getElementById(mostrarLaVentana).style.display = "block";
}


