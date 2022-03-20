const { BrowserWindow, ipcMain } = require("electron");
const Task = require("./models/Task");
const Usuario = require("./models/Usuario");
const Proveedor = require("./models/Proveedor");
const Venta = require("./models/Venta");


function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    autoHideMenuBar: true,
  });

  win.loadFile("app/index.html");
}

ipcMain.on("new-task", async (e, arg) => {
  const newTask = new Task(arg);
  const taskSaved = await newTask.save();
  e.reply("new-task-created", JSON.stringify(taskSaved));
});

ipcMain.on("get-tasks", async (e, arg) => {
  const tasks = await Task.find();
  e.reply("get-tasks", JSON.stringify(tasks));
});

ipcMain.on("delete-task", async (e, args) => {
  const taskDeleted = await Task.findByIdAndDelete(args);
  e.reply("delete-task-success", JSON.stringify(taskDeleted));
});

ipcMain.on("update-task", async (e, args) => {
  console.log(args);
  const updatedTask = await Task.findByIdAndUpdate(
    args.idTaskToUpdate,
    { Codigo: args.Codigo, Nombre: args.Nombre, Categoria: args.Categoria, Cantidad: args.Cantidad,Preciocompra: args.Preciocompra, Proveedor: args.Proveedor, Precioventa: args.Precioventa, Iva: args.Iva },
    { new: true }
  );
  e.reply("update-task-success", JSON.stringify(updatedTask));
});

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------*/
ipcMain.on("new-usuario", async (e, arg) => {
  const newUsuario = new Usuario(arg);
  const usuarioSaved = await newUsuario.save();
  e.reply("new-usuario-created", JSON.stringify(usuarioSaved));
});

ipcMain.on("get-usuarios", async (e, arg) => {
  const usuarios = await Usuario.find();
  e.reply("get-usuarios", JSON.stringify(usuarios));
});

ipcMain.on("delete-usuario", async (e, args) => {
  const usuarioDeleted = await Usuario.findByIdAndDelete(args);
  e.reply("delete-usuario-success", JSON.stringify(usuarioDeleted));
});

ipcMain.on("update-usuario", async (e, args) => {
  console.log(args);
  const updatedUsuario = await Usuario.findByIdAndUpdate(
    args.idUsuarioToUpdate,
    { name: args.name, description: args.description,correo: args.correo,cargo: args.cargo},
    { new: true }
  );
  e.reply("update-usuario-success", JSON.stringify(updatedUsuario));
});

/*----------------------------------------------------------------------------------------------*/

ipcMain.on("new-proveedor", async (e, arg) => {
  const newProveedor = new Proveedor(arg);
  const proveedorSaved = await newProveedor.save();
  e.reply("new-proveedor-created", JSON.stringify(proveedorSaved));
});

ipcMain.on("get-proveedores", async (e, arg) => {
  const proveedores = await Proveedor.find();
  e.reply("get-proveedores", JSON.stringify(proveedores));
});

ipcMain.on("delete-proveedor", async (e, args) => {
  const proveedorDeleted = await Proveedor.findByIdAndDelete(args);
  e.reply("delete-proveedor-success", JSON.stringify(proveedorDeleted));
});

ipcMain.on("update-proveedor", async (e, args) => {
  console.log(args);
  const updatedProveedor = await Proveedor.findByIdAndUpdate(
    args.idProveedorToUpdate,
    { name: args.name, telefono: args.telefono, direccion: args.direccion, contacto: args.contacto, productos: args.productos, codigo: args.codigo,  },
    { new: true }
  );
  e.reply("update-proveedor-success", JSON.stringify(updatedProveedor));
});

//*------------------------------------------------------------------------------------------------------

ipcMain.on("new-venta", async (e, arg) => {
  const newVenta = new Venta(arg);
  const ventaSaved = await newVenta.save();
  e.reply("new-venta-created", JSON.stringify(ventaSaved));
});

ipcMain.on("get-ventas", async (e, arg) => {
  const ventas = await Venta.find();
  e.reply("get-ventas", JSON.stringify(ventas));
});

ipcMain.on("delete-venta", async (e, args) => {
  const ventaDeleted = await Venta.findByIdAndDelete(args);
  e.reply("delete-venta-success", JSON.stringify(ventaDeleted));
});

ipcMain.on("update-venta", async (e, args) => {
  console.log(args);
  const updatedVenta = await Venta.findByIdAndUpdate(
    args.idVentaToUpdate,
    { name: args.name, precio: args.precio },
    { new: true }
  );
  e.reply("update-venta-success", JSON.stringify(updatedVenta));
});

module.exports = { createWindow };






