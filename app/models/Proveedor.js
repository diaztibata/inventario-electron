const { model, Schema } = require("mongoose");

const newProveedorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  contacto: {
    type: String,
    required: true,
  },
  productos: {
    type: String,
    required: true,
  },
  codigo: {
    type: String,
    required: true,
  }

});

module.exports = model("Proveedor", newProveedorSchema);
