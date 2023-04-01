import mongoose, { Schema, model, Model } from "mongoose";
import config from "../../common/manager/config";


export interface IPhoto {
  filename: string;
  contentType: string;
  metadata: any;
}

export const photosSchema = new Schema<IPhoto>(
  {
    filename: String,
    contentType: String,
    metadata: Object,
  },
  {
    versionKey: false,
    autoIndex: false,
    autoCreate: false,
  }
);

export const Photo: Model<IPhoto> = model<IPhoto>("photos", photosSchema);

/**
 * connecting  mongodb
 */
let db=new mongoose.mongo.MongoClient(config)
let db2=new mongoose.mongo.Db(db,"photosGrid")
export const bucket = new mongoose.mongo.GridFSBucket(db2, {
  bucketName: "files",
});
