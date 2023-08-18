import "dotenv/config";

import mongoose from "mongoose";

const MONGO_DB = process.env.MONGO_DB || "mongodb://localhost/prueba"

export const conn = mongoose.connect(MONGO_DB)
