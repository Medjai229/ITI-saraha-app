import jwt from 'jsonwebtoken';
import messageModel from '../../../db/models/message.model.js';

export default class Message {
  static async sendMessage(req, res) {
    try {
      const { id } = req.params;
      const { message } = req.body;

      if (!id) return res.status(400).json({ message: 'no id provided' });

      if (!message)
        return res.status(400).json({ message: 'message is required' });

      const msg = await messageModel.create({ message, receiverId: id });
      res.status(201).json({ message: 'Message is sent', msg });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deleteMessage(req, res) {
    try {
      const { msgId } = req.params;

      if (!msgId) {
        return res.status(400).json({ message: 'no message ID' });
      }

      const message = await messageModel.findById(msgId);

      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }

      if (message.receiverId.toString() !== req.userId) {
        return res.status(403).json({
          message: 'You do not have permission to delete this message',
        });
      }

      await messageModel.findByIdAndDelete(msgId);

      res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getAllMessages(req, res) {
    try {
      const messages = await messageModel.find({ receiverId: req.userId });
      return res.status(200).json(messages);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getMessage(req, res) {
    try {
      const { msgId } = req.params;

      if (!msgId) {
        return res.status(400).json({ message: 'invalid message ID' });
      }

      const message = await messageModel.findById(msgId);

      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }

      if (message.receiverId.toString() !== req.userId) {
        return res.status(403).json({
          message: 'You do not have permission to view this message',
        });
      }

      return res.status(200).json(message);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
