import User from './userModels.js';
import Person from './personModels.js';

// Un usuario tiene una persona asociada
User.hasOne(Person, { foreignKey: 'use_id' });
// Una persona pertenece a un usuario
Person.belongsTo(User, { foreignKey: 'use_id' });
