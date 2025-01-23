import mongoose from "mongoose";

const registeredMemberSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

const registeredMemberModel = mongoose.model('registeredMembers', registeredMemberSchema);

export default registeredMemberModel; 