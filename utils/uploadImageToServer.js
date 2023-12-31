import { nanoid } from "@reduxjs/toolkit";
import { storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadImageToServer = async ({ imageUri, folder }) => {
  const uniqueAvatarId = nanoid();

  if (imageUri) {
    try {
      const response = await fetch(imageUri);

      const file = await response.blob();

      const imageRef = await ref(storage, `${folder}/${uniqueAvatarId}`);

      await uploadBytes(imageRef, file);

      const downloadURL = await getDownloadURL(imageRef);

      return downloadURL;
    } catch (error) {
      console.warn("uploadImageToServer: ", error);
    }
  }
};
