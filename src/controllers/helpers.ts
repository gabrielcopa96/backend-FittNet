import User from "../models/User";
import Partner from "../models/Partner";
import SocialMedia from "../models/SocialMedia";
// import Address from "../models/Address";
import Gyms from "../models/Gyms";
import Address_model from "../Address/models/address_model";



export const putSocialMedia = async (idUser: any, socialNetworks: any) => {
  try {
    const userToAdd: any = await User.findById(idUser).populate("partner");
    const idPartner = userToAdd.partner[0]._id;
    // const sMediaUser = userToAdd.partner[0].socialNetworks;

    let newSocialNetworks: any = [];
    if (socialNetworks && socialNetworks.length > 0) {
      for (let i = 0; i < socialNetworks.length; i++) {
        if (!socialNetworks[i].id) {
          let newSM = {
            socialMedia: socialNetworks[i].socialMedia,
            userSM: socialNetworks[i].userSM,
          };
          const smToPush = new SocialMedia(newSM);
          await smToPush.save();
          newSocialNetworks = [...newSocialNetworks, smToPush._id];
        } else if (socialNetworks[i].id) {
          newSocialNetworks.push(socialNetworks[i].id);
          let newSM = {
            socialMedia: socialNetworks[i].socialMedia,
            userSM: socialNetworks[i].userSM,
          };
          await SocialMedia.findByIdAndUpdate(
            socialNetworks[i].id,
            newSM,
            { new: true }
          );
        }
      }
    }
    await Partner.findByIdAndUpdate(
      idPartner,
      { socialNetworks: newSocialNetworks },
      { new: true }
    );
    return "Redes Actualizadas";
  } catch (error: any) {
    return error.message;
  }
};

export const putGymsSocialMedia = async (idGym: any, socialNetworks: any) => {
  try {
    await Gyms.findById(idGym);

    let newSocialNetworks: any = [];
    if (socialNetworks && socialNetworks.length > 0) {
      for (let i = 0; i < socialNetworks.length; i++) {
        if (!socialNetworks[i].id) {
          let newSM = {
            socialMedia: socialNetworks[i].socialMedia,
            userSM: socialNetworks[i].userSM,
          };
          const smToPush = new SocialMedia(newSM);
          await smToPush.save();
          newSocialNetworks = [...newSocialNetworks, smToPush._id];
        } else if (socialNetworks[i].id) {
          newSocialNetworks.push(socialNetworks[i].id);
          let newSM = {
            socialMedia: socialNetworks[i].socialMedia,
            userSM: socialNetworks[i].userSM,
          };
          await SocialMedia.findByIdAndUpdate(
            socialNetworks[i].id,
            newSM,
            { new: true }
          );
        }
      }
    }
    await Gyms.findByIdAndUpdate(
      idGym,
      { socialNetworks: newSocialNetworks },
      { new: true }
    );
    return "Redes Actualizadas";
  } catch (error: any) {
    return error.message;
  }
};

export const putGymAddresses = async (idGym: any, gymAddress: any) => {
  try {
    const gymToAdd: any = await Gyms.findById(idGym);
    let addressId = gymToAdd.address ? gymToAdd.address : "";

    if (!addressId || addressId === "") {
      const newAddress = new Address_model(gymAddress);
      await newAddress.save();
      addressId = newAddress._id;
    } else {
      delete gymAddress.id
      await Address_model.findByIdAndUpdate(
        addressId,
        gymAddress,
        { new: true }
      );
    }
    const gymUpdated = await Gyms.findByIdAndUpdate(
      idGym,
      { address: addressId },
      { new: true }
    );

    return gymUpdated;
  } catch (error: any) {
    return error.message;
  }
};