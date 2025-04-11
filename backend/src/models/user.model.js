import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        },
        image: {
            type: String,
            default: "",
        },
        searchHistory: {
            type: Array,
            default: [],
        },
    }, { timestamps: true }
)

const User = mongoose.model("User", usersSchema);

export default User;