import { Schema, model, Types } from "mongoose";

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String, 
    required: true,
  },
  duration: {
    type: Number,   
  },
  price: {
    type: Types.Decimal128,
    required: true,
  },
  photo: {
    type: Array,
    of: String,
  },
  profileCategory: {
    type: Array, //debe contener las caracteristicas asociadas de los avatares con el perfil del gym
    of: String,
  },
});

const ServicesModel = model("Service", serviceSchema);
export default ServicesModel;
