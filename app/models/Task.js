const { model, Schema } = require("mongoose");

const newTaskSchema = new Schema({
  Codigo: {
    type: String,
    required: true,
  },
  Nombre: {
    type: String,
    required: true,
  },
  Categoria: {
    type: String,
    required: true,
  },
  Cantidad: {
    type: String,
    required: true,
  },
  Preciocompra: {
    type: String,
    required: true,
  },
  Precioventa: {
    type: String,
    required: true,
  },
  Iva: {
    type: String,
    required: true,
  },

  Proveedor: {
    type: String,
    required: true,
  }

 
});

module.exports = model("Task", newTaskSchema);
