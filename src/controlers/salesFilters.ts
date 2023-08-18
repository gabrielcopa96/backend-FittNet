import ShopCart from "../models/ShopCart";
import User from "../models/User";
import Partner from "../models/Partner";
import { getAllGyms } from "./gyms";

export const getPartnerSales = async (idUser: any) => {
  try {
    console.log("si entro a la funcion", idUser);
    const userPartner: any = await User.findById(idUser);
    const partner: any = await Partner.findById(userPartner.partner);
    const gyms = partner.gyms
    const sales: any = [];
    const salesPerGym = [];
    let totalSales = 0;
    let salesNumber = 0;
    if(gyms.length > 0){
      for(let i = 0; i < gyms.length; i++){
        const gymSales = await ShopCart.find({ gyms: gyms[i], status: "Payed" })
        .populate({
          path: "user gyms services"
        })
        sales.push(gymSales);
      }
    };
    if(sales.length > 0){
      for(let i = 0; i < sales.length; i++){
        if(sales[i].length > 0){
          let gymCount = 0;
          let salesCountPerGym = 0;
          for(let g = 0; g < sales[i].length; g++){
            salesCountPerGym++
            if(!isNaN(sales[i][g].price)) gymCount = gymCount + parseFloat(sales[i][g].price); 
            salesNumber = salesNumber + 1;
            if(!isNaN(sales[i][g].price)) totalSales = totalSales + parseFloat(sales[i][g].price);
          }
          salesPerGym.push({gym: sales[i][0].gyms[0]._id, gymName: sales[i][0].gyms[0].name, totalSales: gymCount, salesNumber: salesCountPerGym})
          gymCount = 0;
          salesCountPerGym = 0;
        }
      }
    };
    const response = {userId: idUser, partner: partner.name, salesNumber: salesNumber, totalSales: totalSales, salesPreGym: salesPerGym};
    return response
  } catch (error: any) {
    console.log(error.message);
    return error.message;
  }
};


export const getAdminSales = async (idUser: any) => {
  try {
    const userAdmin: any = await User.findById(idUser);
    if(userAdmin.type !== "admin"){
      return "No esta autorizado para ver esta informacion"
    };
    console.log("si llega aqui")
    const gyms = await getAllGyms();
    const sales: any = [];
    const salesPerGym = [];
    let totalSales = 0;
    let salesNumber = 0;
    // console.log(gyms[0])
    if(gyms.length > 0){
      console.log("entra al primer if")
      for(let i = 0; i < gyms.length; i++){
        const gymSales = await ShopCart.find({ gyms: gyms[i]._id, status: "Payed" })
        .populate({
          path: "user gyms services"
        })
        // console.log(gyms[i])
        sales.push(gymSales);
      }
    };
    if(sales.length > 0){
      for(let i = 0; i < sales.length; i++){
        if(sales[i].length > 0){
          let gymCount = 0;
          let salesCountPerGym = 0;
          for(let g = 0; g < sales[i].length; g++){
            salesCountPerGym++
            if(!isNaN((sales as any)[i][g].price)) gymCount = gymCount + parseFloat((sales as any)[i][g].price); 
            salesNumber = salesNumber + 1;
            if(!isNaN(sales[i][g].price)) totalSales = totalSales + parseFloat(sales[i][g].price);
          }
          salesPerGym.push({gym: sales[i][0].gyms[0]._id, gymName: sales[i][0].gyms[0].name, totalSales: gymCount, salesNumber: salesCountPerGym})
          gymCount = 0;
          salesCountPerGym = 0;
        }
      }
    };
    const response = {userId: idUser, admin: userAdmin.name, salesNumber: salesNumber, totalSales: totalSales, salesPreGym: salesPerGym};
    return response
    // return allgyms
  } catch (error: any) {
    console.log(error.message);
    return error.message;
  }
};
