import { model, Schema } from 'mongoose';

const roleType = {
  user: 'user',
  admin: 'admin',
};

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    phone: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      default: 'male',
    },
    role: {
      type: String,
      enum: Object.values(roleType),
      default: roleType.user,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

export default User;
