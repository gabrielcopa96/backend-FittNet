import { Schema, model } from 'mongoose';

const lockAccountSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
    },
});

const LockAccountsModel = model('LockAccounts', lockAccountSchema);
export default LockAccountsModel;