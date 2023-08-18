import { Schema, model, SchemaTypes, Types } from "mongoose";

const gymSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Types.Decimal128,
  },
  raiting: {
    type: Number,
    enum: [1,2,3,4,5]
  },
  image: {
    type: Array,
    of: String,
  },
  latitude: {
      type: Types.Decimal128,        
  },
  longitude: {
      type: Types.Decimal128,
  },  
  address: {
    type: SchemaTypes.ObjectId,
    ref: "Address",
  },
  services: {
    type: Array,
    of: SchemaTypes.ObjectId,
    ref: "Services",
  },
  trainers: {
    type: Array,
    of: String,
    // ref: "Users",
  },
  logo: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,   
  },
  uEnd: {
    type: Array,
    of: SchemaTypes.ObjectId,
    ref: "Users",
  },
  socialNetworks: {
    type: Array,
    of: SchemaTypes.ObjectId,
    ref: "SocialMedia",
  },
  gymActive: {
    type: Boolean,   
    default: true,
  },
  favourite: {
    type: Number,
  },
  clients: {
    type: Array,
    of: String,    
  }
});

const GymsModel = model("Gyms", gymSchema);
export default GymsModel;
