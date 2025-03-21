/* This whole page was copied directly from and modified- https://codesandbox.io/p/sandbox/photo-gallery-capacitor-react-85m2c?file=%2Fsrc%2Fpages%2FTab2.tsx%3A4%2C1-4%2C71*/

import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { isPlatform } from '@ionic/react';


import { Camera, CameraResultType, CameraSource, Photo, CameraDirection } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';

const PHOTO_STORAGE = 'photos';
export function usePhotoGallery() {

    const [photos, setPhotos] = useState<UserPhoto[]>([]);
    const [allPhotos, setAllPhotos] = useState<UserPhoto[]>([]);
    const { date } = useParams<{ date: string }>();

    /**
     * On page load, load photos
     */
    useEffect(() => {
        const loadSaved = async () => {
            const { value } = await Preferences.get({ key: PHOTO_STORAGE });

            var photosInPreferences = (value ? JSON.parse(value) : []) as UserPhoto[];

            // filter the photos so that only the ones with the date given are shown
            var filteredPhotos: UserPhoto[] = [];
            var allPhoto: UserPhoto[] = [];
            photosInPreferences.forEach(photo => {
                // all photos should get added to the all photos array - they are being pushed twice???
                if (!allPhoto.includes(photo)) {
                    allPhoto.push(photo);
                }
                // ok it likes it when you hard code the date, but doesn't like it if you use the date variable
                if (photo.filepath.includes(date)) {
                    filteredPhotos.push(photo);
                }
            });
            // If running on the web...
            if (!isPlatform('hybrid')) {
                for (let photo of filteredPhotos) {
                    const file = await Filesystem.readFile({
                        path: photo.filepath,
                        directory: Directory.Data
                    });
                    // Web platform only: Load the photo as base64 data
                    photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
                }
                for (let photo of allPhoto) {
                    const file = await Filesystem.readFile({
                        path: photo.filepath,
                        directory: Directory.Data
                    });
                    // Web platform only: Load the photo as base64 data
                    photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
                }
            }
            setPhotos(filteredPhotos);
            setAllPhotos(allPhoto);
        };
        loadSaved();
    }, []);


    /**
     * Take a photo
     * @param date the date that has been selected by the user when they are tracking
     */
    const takePhoto = async (selectedDate: string) => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100,
            direction: CameraDirection.Front //default to front camera
        });
        // need to store the date and Date().getTime() so that multiple photos for the same day don't get overwritten
        const fileName = selectedDate + new Date().getTime() + '.jpeg';
        return {
            fileName,
            photo,
            selectedDate
        };
    };

    const setUpSave = async (fileName: string, photo: Photo, selectedDate: string) =>
    {
        const savedFileImage = await savePicture(photo, fileName);

        // get the old photos to make sure it doesn't overwrite them
        const storedPhotos = await Preferences.get({ key: PHOTO_STORAGE });
        const oldPhotos = storedPhotos.value ? JSON.parse(storedPhotos.value) : [];

        const newPhotos = [savedFileImage, ...oldPhotos];
        await Preferences.set({
            key: PHOTO_STORAGE,
            value: JSON.stringify(newPhotos)
        });

        // also save dates to local storage, but only need to save each date once
        var photoDates: string[] = JSON.parse(localStorage.photoDates || '[]');
        if (!photoDates.includes(selectedDate)) {
            photoDates.push(selectedDate);
            // save them to local storage so we know what dates have photos stored
            localStorage.setItem("photoDates", JSON.stringify(photoDates));
            console.log("saved to local storage")
        }
    }

    /**
     * Save picture
     */
    const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
        let base64Data: string;
        // "hybrid" will detect Cordova or Capacitor;
        if (isPlatform('hybrid')) {
            const file = await Filesystem.readFile({
                path: photo.path!
            });
            base64Data = typeof file.data === 'string' ? file.data : await file.data.text();
        } else {
            base64Data = await base64FromPath(photo.webPath!);
        }
        const savedFile = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Data
        });

        if (isPlatform('hybrid')) {
            // Display the new image by rewriting the 'file://' path to HTTP
            // Details: https://ionicframework.com/docs/building/webview#file-protocol
            return {
                filepath: savedFile.uri,
                webviewPath: Capacitor.convertFileSrc(savedFile.uri),
            };
        }
        else {
            // Use webPath to display the new image instead of base64 since it's
            // already loaded into memory
            return {
                filepath: fileName,
                webviewPath: photo.webPath
            };
        }
    };

    const deletePhoto = async (photo: UserPhoto) => {
        // Remove this photo from the Photos reference data array
        // need to do this using the all photos array so that photos from other dates aren't deleted by overwriting
        // otherwise the non-deleted photos from this day are all that is left and other days get deleted by overwriting
        const newAllPhotos = allPhotos.filter(p => p.filepath !== photo.filepath);

        const newPhotos = photos.filter(p => p.filepath !== photo.filepath);

        // Update photos array cache by overwriting the existing photo array
        // this should overwrite the existing array but either its appending to it, or there is duplication on filter
        Preferences.set({ key: PHOTO_STORAGE, value: JSON.stringify(newAllPhotos) });

        // delete photo file from filesystem
        const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
        await Filesystem.deleteFile({
            path: filename,
            directory: Directory.Data
        });
        setPhotos(newPhotos); // the photos to show for this page still needs to be the filtered photos
    };

    return {
        deletePhoto,
        photos,
        takePhoto,
        setUpSave
    };
}

export interface UserPhoto {
    filepath: string;
    webviewPath?: string;
}

export async function base64FromPath(path: string): Promise<string> {
    const response = await fetch(path);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject('method did not return a string')
            }
        };
        reader.readAsDataURL(blob);
    });
}
