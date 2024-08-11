import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }, /// Автоматическое создание полей createdAt и updatedAt
);

usersSchema.methods.toJson = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

/// Создание модели пользователя из схемы
export const UsersCollection = model('users', usersSchema);
