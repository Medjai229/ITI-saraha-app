import userModel from '../../../db/models/user.model.js';
import CryptoJS from 'crypto-js';
import bcrypt from 'bcrypt';

export default class User {
  static async updateUser(req, res) {
    try {
      const { name, phone, gender } = req.body;

      if (!name && !phone && !gender)
        return res.status(400).json({ message: 'No provided fields' });

      const updates = {};

      if (name) updates.name = name;
      if (phone) {
        const encryptPhone = CryptoJS.AES.encrypt(
          phone,
          process.env.SECRET_WORD_CRYPTO
        ).toString();
        updates.phone = encryptPhone;
      }
      if (gender) updates.gender = gender;

      const user = await userModel.findByIdAndUpdate(req.userId, updates, {
        new: true,
      });

      if (!user) return res.status(404).json({ message: 'user not found' });

      res.status(200).json({ message: 'User info is updated' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async changePassword(req, res) {
    try {
      const { oldPassword, newPassword, repeatPassword } = req.body;
      const user = await userModel.findById(req.userId);

      if (!oldPassword || !newPassword || !repeatPassword) {
        return res.status(400).json({ message: 'fill all the fields' });
      }

      const match = bcrypt.compareSync(oldPassword, user.password);

      if (!match) {
        return res.status(400).json({ message: 'invalid password' });
      }

      if (newPassword !== repeatPassword) {
        return res
          .status(422)
          .json({ message: "repeatPassword doesn't match password" });
      }

      const hashedPassword = bcrypt.hashSync(
        newPassword,
        parseInt(process.env.SALT_ROUNDS)
      );

      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ message: 'password changed succesfully' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { password } = req.body;

      if (!password) {
        return res.status(400).json({ message: 'password is required' });
      }

      const user = await userModel.findById(req.userId);

      const match = bcrypt.compareSync(password, user.password);

      if (!match) return res.status(400).json({ message: 'invalid password' });

      await userModel.findByIdAndDelete(req.userId);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
