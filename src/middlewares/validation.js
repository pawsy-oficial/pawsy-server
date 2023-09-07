const validate = (schema) => async (req, res, next) => {
    try {   
        // console.log(req.body)
        await schema.validate({
            body: req.body
        });
        return next();
    } catch (err) {
       res.status(400).send({error: err.errors});
    }
} 

module.exports = validate