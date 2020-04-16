import sequelize,{ Op, QueryTypes } from 'sequelize';
import url from 'url';
import { format } from 'date-fns';
import Transcription from '../models/Transcription';

class DashboardController {
  async index(req, res) {
    
     const dashboard = {
      'totalTrans': await Transcription
                .sequelize.
                query('SELECT COUNT(id) as total FROM transcriptions',
                  { type: QueryTypes.SELECT 
                }),

      'totalTime': await Transcription
                .sequelize.
                query('SELECT SUM(accumulated_time) FROM transcriptions',
                  { type: QueryTypes.SELECT 
                }),

      'totalTransProgram': await Transcription
                .sequelize.
                query('SELECT program,COUNT(program) FROM transcriptions GROUP BY program',
                  { type: QueryTypes.SELECT 
                }),

      'totalTransLocality': await Transcription
                .sequelize.
                query('SELECT locality,COUNT(locality) FROM transcriptions GROUP BY locality',
                  { type: QueryTypes.SELECT 
                }),

      'totalHoursLocality': await Transcription
                .sequelize.
                query('SELECT locality,SUM(accumulated_time) FROM transcriptions GROUP BY locality',
                  { type: QueryTypes.SELECT 
                }),

      'totalHoursProgram': await Transcription
                .sequelize.
                query('SELECT program,SUM(accumulated_time) FROM transcriptions GROUP BY program',
                  { type: QueryTypes.SELECT 
                }),

      'totalTransUser': await Transcription
                .sequelize.
                query('SELECT login,COUNT(login) FROM transcriptions GROUP BY login',
                  { type: QueryTypes.SELECT 
                }),

      'totalHoursUser': await Transcription
                .sequelize.
                query('SELECT login,SUM(accumulated_time) FROM transcriptions GROUP BY login',
                  { type: QueryTypes.SELECT 
                }),
            
          
     }
     
     
    
    return res.json(dashboard);
  }




}

export default new DashboardController();
