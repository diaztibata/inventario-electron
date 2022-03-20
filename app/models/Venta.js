const { model, Schema } = require("mongoose");

const newVentaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  precio: {
    type: String,
    required: true,
  },
});

module.exports = model("Venta", newVentaSchema);
