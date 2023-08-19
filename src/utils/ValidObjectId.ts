import { Types } from "mongoose";

export const isValidObjectId = (id: any) => {
    if (Types.ObjectId.isValid(id)) {
        if ((String)(new Types.ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}