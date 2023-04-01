import { Schema, model ,Model} from "mongoose";


export interface IUser {
  id: any;
  username: string;
  password: string;
  role: string;
}

export const userSchema: Schema = new Schema<IUser>(
  {
    username: { type:String,required: true, unique: true },
    password: { type:String,required: true, unique: true, select: false },
    role: {
      enum: {
        values: ["Patient"],
      },
    },
  },
  {
    versionKey: false,
    autoIndex: false,
    autoCreate: false,
  }
);


const User:Model<IUser> = model<IUser>("users", userSchema);
export default User;