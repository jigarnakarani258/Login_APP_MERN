
/************convert image into base64  **********/
 
function imageToBase64Converter(file){
    return new Promise(  (resolve , reject) => {

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result) ;
        }

        fileReader.onerror = (error) => {
            reject(error) ;
        }
    })
}

export default imageToBase64Converter ; 