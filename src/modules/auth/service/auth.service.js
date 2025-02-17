import userModel from '../../../db/models/user.model.js';
import bcrypt from 'bcrypt';
import CryptoJS from 'crypto-js';
import sendEmail from '../../../utils/mailer.js';
import jwt from 'jsonwebtoken';

export default class Auth {
  static async register(req, res) {
    try {
      const { name, email, phone, password, repeatPassword } = req.body;

      const profileImage = req.file ? req.file.filename : null;

      if (await userModel.findOne({ email })) {
        return res.status(409).json({ message: 'email already exists' });
      }

      const hashedPassword = bcrypt.hashSync(
        password,
        parseInt(process.env.SALT_ROUNDS)
      );

      const encryptPhone = CryptoJS.AES.encrypt(
        phone,
        process.env.SECRET_WORD_CRYPTO
      );

      const user = await userModel.create({
        name,
        email,
        password: hashedPassword,
        phone: encryptPhone,
        profileImage,
      });

      let token = jwt.sign({ email }, process.env.JWT_VERIFY_SECRET);
      console.log(token);

      await sendEmail(
        email,
        name,
        `${req.protocol}://${req.host}:8080${req.baseUrl}/verify/${token}`
      );

      const objUser = user.toObject();
      delete objUser.hashedPassword;

      res
        .status(201)
        .json({ message: `${email} registered successfully`, user: objUser });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await userModel.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "email doesn't exist" });
      }

      const match = bcrypt.compareSync(password, user.password);

      if (!match) {
        return res.status(400).json({ message: 'invalid password' });
      }

      let token = jwt.sign(
        { id: user._id, isLoggedIn: true },
        process.env.JWT_LOGIN_TOKEN
      );

      res
        .status(200)
        .json({ message: `${user.name} is logged in, Welcome`, token });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async verify(req, res) {
    try {
      const { token } = req.params;
      const decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET);
      const user = await userModel.findOne({ email: decoded.email });
      if (!user) return res.status(404).json({ message: 'Email not found' });
      await userModel.findByIdAndUpdate(
        user._id,
        { confirmEmail: true },
        { new: true }
      );
      res.status(200).json({ message: 'you email is verified' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
