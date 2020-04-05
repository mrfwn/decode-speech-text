import Sequelize, { Model } from 'sequelize';

class Transcription extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        program: Sequelize.STRING,
        owner: Sequelize.STRING,
        text: Sequelize.STRING,
        locality: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}
export default Transcription;
