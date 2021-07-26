exports.getPrivateData = (req,res,next) => {
    return res.status(200).send({
        success : true,
        data : "You got access to Private route"
    })
}