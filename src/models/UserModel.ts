import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  admin?: boolean;
  createdDate?: Date;
  updatedDate?: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 7,
      maxlength: 60,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 60,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" } }
);

const User = model<IUser>("User", userSchema);

export default User;
