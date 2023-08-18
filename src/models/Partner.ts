import { Schema, model, SchemaTypes } from "mongoose";
import { regEmail, regWord, regCBU, regCUIL } from '../controllers/regExes';

const partnerSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (v: any) => regWord.test(v),
      message: (props: any) => `${props.value} is not a valid Name`
  }
  },
  lastName: {
    type: String,
    validate: {
      validator: (v: any) => regWord.test(v),
      message: (props: any) => `${props.value} is not a valid Name`
  }
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: {
      validator: (e: any) => regEmail.test(e),
      message: (e: any) => `${e.value} is not a valid email address`,
    },
  },
  phone: {
    type: Number,
  },
  planType: {
    type: SchemaTypes.ObjectId,
    ref: "Plan",
  },
  cbu: {
    type: String,
    validate: {
      validator: (e: any) => regCBU.test(e),
      message: (e: any) => `${e.value} is not a valid CBU`,
    },
  },
  cuil: {
    type: String,
    validate: {
      validator: (e: any) => regCUIL.test(e),
      message: (e: any) => `${e.value} is not a valid CUIL`,
    },
  },
  socialNetworks: {
    type: Array,
    of: SchemaTypes.ObjectId,
    ref: "SocialMedia",
  },
  gyms: {
    type: Array,
    of: SchemaTypes.ObjectId,
    ref: "Gyms",
  },
  category: {
    type: SchemaTypes.ObjectId,
    ref: "Category",
  },
  userActive: {
    type: Boolean,
  },
  paymentMethods: {
    type: Array,
    of: SchemaTypes.ObjectId,
    ref: "PaymentType",
  },
  paidOut: {
    type: Boolean,
  },
  status:{
    type: String,
    enum: ["Pending", "Payed", "Canceled"],
    default: "Pending"
  },
  incomes: {
    type: Array,
    of: SchemaTypes.ObjectId,
    ref: "ShopCart"
  },
  payments: {
    type: Array,
    of: SchemaTypes.ObjectId,
    ref: "Payments"
  }
});

const PartnerModel = model("Partner", partnerSchema);
export default PartnerModel;
