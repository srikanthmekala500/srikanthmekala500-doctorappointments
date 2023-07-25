const { error } = require("console")
const fs = require("fs")

const filedalete = (destinaton ,file)=>{
    fs.unlink(destinaton+flie,function(err){
        if(error)
        console.error(err)
    })
}

module.exports ={
    filedalete
}