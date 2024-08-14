

const handleError = async (err,req,res,next,statusCode) => {
    
    console.log("err", err);
   // let statusCode = 409
    console.log(req.originalUrl);
    

    
 res.json({
  status: statusCode,
  message: err?.message,
  stack: err?.stack,
});
    
    //next();
}

module.exports = handleError;