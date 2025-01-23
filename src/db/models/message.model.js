import { model, Schema, Types } from 'mongoose';

const messageSchema = new Schema(
  {
    message: {
      type: String,
      required: [true, 'message is required'],
    },
    receiverId: {
      type: Types.ObjectId(),
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Message = model('Message', messageSchema);

export default Message;
