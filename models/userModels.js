import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../database/connectdb.js';

const User = sequelize.define('User', {
  use_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  use_mail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  use_password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  use_photo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  use_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: false
});

User.beforeSave(async (user) => {
  if (user.changed('use_password')) {
    const salt = await bcrypt.genSalt(10);
    user.use_password = await bcrypt.hash(user.use_password, salt);
  }
});

User.prototype.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.use_password);
};

export default User;
