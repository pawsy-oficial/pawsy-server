const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate({
            body: req.body
        });
        return next();
    } catch (err) {
       res.status(400).send({error: err.errors});
    }
    // return next();
} 

module.exports = validate