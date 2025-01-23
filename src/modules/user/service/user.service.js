import userModel from '../../../db/models/user.model.js';

export default class User {
  static async updateUser(req, res) {
    try {
      const { name, phone, gender } = req.body;

      if (!name && !phone && !gender)
        return res.status(400).json({ message: 'No provided fields' });

      const updates = {};

      if (name) updates.name = name;
      if (phone) updates.phone = phone;
      if (gender) updates.gender = gender;

      const user = await userModel.findByIdAndUpdate(id, updates, {
        new: true,
      });

      if (!user) return res.status(404).json({ message: 'user not found' });

      res.status(200).json({ message: 'User info is updated' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
