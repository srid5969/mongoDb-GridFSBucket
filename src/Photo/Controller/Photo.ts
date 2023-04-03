import { Request, Response } from "express";
import mongoose, { ObjectId as ObjectID } from "mongoose";

import { bucket, Photo as GridFile } from "../Model/Photo";

export const createFile = async (req: Request | any, res: Response) => {
  try {
    const { originalname, buffer, mimetype } = req.file;

    const uploadStream = bucket.openUploadStream(originalname, {
      metadata: {
        owner:" req.user._id",
      },
    });
    uploadStream.end(buffer);

    const file = new GridFile({
      filename: originalname,
      contentType: mimetype,
      metadata: {
        owner: "req.user._id",
        fileId: uploadStream.id,
      },
    });

    await file.save();
    res.status(200).send(file);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const getFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const file = await GridFile.findOne({_id:id});

    if (!file) {
      res.status(404).send("File not found");
      return;
    }

    const downloadStream = bucket.openDownloadStream(
      new mongoose.Types.ObjectId(file.metadata.fileId)
    );
    res.set("Content-Type", file.contentType);
    res.set("Content-Disposition", `attachment; filename="${file.filename}"`);
    downloadStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const updateFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { filename, metadata } = req.body;

    const file = await GridFile.findById(id);
    if (!file) {
      res.status(404).send("File not found");
      return;
    }

    if (filename) {
      await bucket.rename(
        new mongoose.Types.ObjectId(file.metadata.fileId),
        filename
      );
      file.filename = filename;
    }
  } catch {}
};
