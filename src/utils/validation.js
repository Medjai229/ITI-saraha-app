export const validation = (schema) => {
  return (req, res, next) => {
    let validation = schema.validate(req.body, {
      abortEarly: false,
    });

    if (validation.error && validation.error.details) {
      let errors = validation.error.details.map((ele) => ele.message);
      return res.status(400).json({ message: 'validation error', errors });
    } else {
      next();
    }
  };
};
