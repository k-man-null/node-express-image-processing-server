const { Router } = require('express');
const multer = require('multer');
const storage = require('multer').diskStorage({destination: 'api/uploads/',filename:filename});

const router = Router();

function filename(request,file,callback){
    callback(null,file.originalname);
}

function fileFilter(request,file,callback){
    if(file.mimetype != 'image/png'){
        request.fileValidationError = 'Wrong file type';
        callback(null,false, new Error('Wrong file type'));
    }else{
        callback(null,true);
    }
}

const upload = multer({storage:storage,fileFilter:fileFilter});

router.post('/upload',upload.single('photo'),(request,response)=>{
    if(request.fileValidationError){
        response.status(400).json({error:request.fileValidationError});
    }else {
        response.status(201).json({sucess:true});
    }
});

module.exports = router;