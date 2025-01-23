import joi from 'joi';

export const signUpValidationSchema = joi
  .object({
    name: joi.string().min(2).max(15).required(),
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: ['com', 'net'] })
      .required(),
    password: joi.string().required(),
    repeatPassword: joi.string().valid(joi.ref('password')).required(),
    phone: joi.string().required(),
    gender: joi.string(),
  })
  .options({ allowUnknown: false });

export const signInValidationSchema = joi
  .object({
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: ['com', 'net'] })
      .required(),
    password: joi.string().required(),
  })
  .options({ allowUnknown: false });
