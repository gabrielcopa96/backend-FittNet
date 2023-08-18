import { Schema, model } from "mongoose";

const diseasesTypeSchema = new Schema({
    deseaseName: {
        type: String,
        required: true,
    },
    
    benefits: { //beneficios del ejercicio en relacion al tipo de enfermedad
        type: String,
    },

})

const DiseasesTypeModel = model('DiseasesType', diseasesTypeSchema)
export default DiseasesTypeModel;
