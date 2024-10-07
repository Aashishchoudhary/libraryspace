
import imageCompression from 'browser-image-compression';
export const url ='http://127.0.0.1:8000' 


 

export function getCookie(name) {
  if (typeof document !== 'undefined') {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
   
   
    if ( parts.length === 2) return JSON.parse(parts.pop().split(";").shift());
  }
  }

 export async function handleImageUpload(event) {
    const imageFile = event;

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,

      mediaType: "photo",
      quality: 0.2,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      // console.log('ddddd',event , compressedFile)
      // console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
      console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB` ,event ,compressedFile); // smaller than maxSizeMB
      return compressedFile;
      // write your own logic
    } catch (error) {
      console.log(error);
    }
  }

  export function yyyymmdd(date) {

    let year = date.getFullYear()
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    
    const fullDate = `${year}-${month}-${day}`;
    return fullDate;
  }