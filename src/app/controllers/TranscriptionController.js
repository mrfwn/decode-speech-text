import { Op } from 'sequelize';
import url from 'url';
import { format } from 'date-fns';
import Transcription from '../models/Transcription';

class TranscriptionController {
  async index(req, res) {
    const {
      title='',
      program='',
      name='',
      login='',
      locality='',
      text='',
    } = req.query;
    const transcriptions = await Transcription.findAll({
      where: {
        [Op.and]: {
          program: { [Op.like]: `%${program}%` },
          title: { [Op.like]: `%${title}%` },
          name: { [Op.like]: `%${name}%` },
          login: { [Op.like]: `%${login}%` },
          text: { [Op.like]: `%${text}%` },
          locality: { [Op.like]: `%${locality}%` },
        },
      },
      order: ['created_at'],
    });
  
    return res.json(transcriptions);
  }

  async store(req, res) {
    const transcriptionExist = await Transcription.findOne({
      where: { title: req.body.title, locality: req.body.locality },
    });
    if (transcriptionExist) {
      return res.status(400).json({ error: 'Transcription already exists.' });
    }
    req.body.formated_date = format(new Date(),'dd/MM/yyyy');
    req.body.accumulated_time = req.body.accumulatedTime;
    const response = await Transcription.create(req.body);
    return res.json(response);
  }

  async update(req, res) {
    const { id } = req.params;
    const { title } = req.body;
    const transcription = await Transcription.findByPk(id);

    if (!transcription) {
      return res.status(400).json({ error: 'Transcription not found!' });
    }

    if (title !== transcription.title) {
      const transcriptionExist = await Transcription.findOne({
        where: { title },
      });
      if (transcriptionExist) {
        return res.status(400).json({ error: 'Transcription already exists.' });
      }
    }

    await transcription.update(req.body);
    const {
      program,
      name,
      login,
      text,
      locality,
    } = await Transcription.findByPk(id);
    return res.json({ id, title, program, name, login, text, locality });
  }

  async delete(req, res) {
    const { id } = req.params;
    const transcription = await Transcription.findByPk(id);

    if (!transcription) {
      return res.status(400).json({ error: 'Transcription not found!' });
    }

    await transcription.destroy();

    return res.status(204).send();
  }
}

export default new TranscriptionController();
