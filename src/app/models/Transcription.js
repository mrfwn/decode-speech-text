import Sequelize, { Model } from 'sequelize';

class Transcription extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        program: Sequelize.STRING,
        name: Sequelize.STRING,
        login: Sequelize.STRING,
        formated_date: Sequelize.STRING,
        text: Sequelize.TEXT,
        locality: Sequelize.STRING,
        accumulated_time : Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}
export default Transcription;
