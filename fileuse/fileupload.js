 const fileupload = (file,uploadpafth)=>{
    const extension = file.name.split('')[1]
    const filename = 'profile_'+Date.now() +'.'+extension
    path = uploadpafth +filename
    const movefile = file.mv(path)
    if(!movefile){
        return res.status(400).send({
            message:"file upload error"
        })
    }
    console.log(movefile);
    return filename
 }

 module.exports ={
    fileupload
 }