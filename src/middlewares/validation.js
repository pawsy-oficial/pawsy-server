const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate({
            body: req.body
        });
        return next();
    } catch (err) {
       res.status(500).send({error: err});
    }
    // return next();
} 

module.exports = validate