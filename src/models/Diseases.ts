import { Schema, model, SchemaTypes } from "mongoose";

const diseaseSchema = new Schema({
    desease: {
        type: Array,
        of: SchemaTypes.ObjectId, 
        required: true,
    },
    trainlimits: { //limitantes de entrenamiento
        type: String,
    },
    considerations: { //consideraciones especiales
        type: String,        
    },
})

const DiseasesModel = model('Diseases', diseaseSchema);
export default DiseasesModel;