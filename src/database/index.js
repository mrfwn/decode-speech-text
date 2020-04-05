import Sequelize from 'sequelize';
import Transcription from '../app/models/Transcription';

import databaseConfig from '../config/database';

const models = [Transcription];
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
