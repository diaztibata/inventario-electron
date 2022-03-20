const { model, Schema } = require("mongoose");

const newUsuarioSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
  },
  cargo: {
    type: String,
    required: true,
  }
});

module.exports = model("Usuario", newUsuarioSchema);
