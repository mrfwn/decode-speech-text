import Transcription from '../models/Transcription';

class UserController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const appointments = await Transcription.findAll({
      order: ['created_at'],
      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json(appointments);
  }

  async store(req, res) {
    const transcriptionExist = await Transcription.findOne({
      where: { title: req.body.title },
    });
    if (transcriptionExist) {
      return res.status(400).json({ error: 'Transcription already exists.' });
    }

    const {
      id,
      title,
      program,
      owner,
      text,
      locality,
    } = await Transcription.create(req.body);
    return res.json({ id, title, program, owner, text, locality });
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
    const { program, owner, text, locality } = await Transcription.findByPk(id);
    return res.json({ id, title, program, owner, text, locality });
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

export default new UserController();
