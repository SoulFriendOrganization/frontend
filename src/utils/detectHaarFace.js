import cv from "@techstark/opencv-js";
import { loadDataFile } from "./cvDataFile";

export async function loadHaarFaceModels() {
    try {
        await loadDataFile(
            "haarcascade_frontalface_default.xml",
            "/models/haarcascade_frontalface_default.xml"
        );
    } catch (error) {
        console.error("Error loading Haar cascade models:", error);
    }
}

export function detectHaarFace(img) {
    const newImg = img.clone();
    const gray = new cv.Mat();
    cv.cvtColor(newImg, gray, cv.COLOR_RGBA2GRAY, 0);

    const faces = new cv.RectVector();
    const faceCascade = new cv.CascadeClassifier();
    faceCascade.load("/haarcascade_frontalface_default.xml");

    const msize = new cv.Size(0, 0);
    faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, msize, msize);

    for (let i = 0; i < faces.size(); ++i) {
        const roiGray = gray.roi(faces.get(i));
        const roiSrc = newImg.roi(faces.get(i));
        const point1 = new cv.Point(faces.get(i).x, faces.get(i).y);
        const point2 = new cv.Point(
            faces.get(i).x + faces.get(i).width,
            faces.get(i).y + faces.get(i).height
        );
        cv.rectangle(newImg, point1, point2, [255, 0, 0, 255]);
        roiGray.delete();
        roiSrc.delete();
    }

    const result = { image: newImg, faces };

    gray.delete();
    faceCascade.delete();

    return result;
}
