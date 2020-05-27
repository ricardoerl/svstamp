import Cors from 'cors';
import nextConnect from 'next-connect';
import middleware from '../../middleware/database';
import initMiddleware from '../../middleware/init-middleware';
import scraper from '../../services/scraper';
import { getIdFromURL } from '../../utils';

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
    origin: ['http://localhost:3000', 'https://stampi-sv.now.sh', 'https://svstamp.com'],
  })
);

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  // Run cors
  await cors(req, res);

  const doc = await req.db.collection('tweets').find().toArray();
  res.json(doc);
});

handler.post(async (req, res) => {
  // Run cors
  await cors(req, res);

  const body = JSON.parse(req.body);
  const { url } = body;
  const stampId = getIdFromURL(url);

  // Checking if Stamp alredy exist
  console.log('Existence checking for new Stamp');
  let exist = [];
  try {
    exist = await req.db
      .collection('tweets')
      .find({ 'stamp.id': stampId })
      .limit(1)
      .toArray();
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({
      message: 'Error al consultar Stamp',
      description:
        'Hubo un error al verificar el enlace, por favor intenta en otro momento.',
      type: 'error',
    });
  }

  if (!exist.length) {
    // Notify Stamp alredy exist
    console.log('Stamp already exist');
    res.status(303).json({
      message: 'Stamp ya existente',
      description:
        'El enlace fue ingresado anteriormente y ya se encuentra registrado en la aplicación.',
      type: 'info',
    });
  } else {
    // Scraping new stamp
    console.log('Scraping recent Stamp as Tweet');
    let tweet = {};
    try {
      const scrap = await scraper(url);
      tweet = {
        ...scrap,
        stamp: {
          id: stampId,
          url,
        },
      };
    } catch (error) {
      console.log('Error', error);
      res.status(500).json({
        message: 'Error al consultar Stamp',
        description:
          'Hubo un error al consultar el enlace, por favor verifica si es un enlace existente.',
        type: 'error',
      });
      return;
    }

    // Insert new tweet
    console.log('Saving Tweet');
    try {
      await req.db.collection('tweets').insertOne(tweet);
    } catch (error) {
      console.log('Error', error);
      res.status(500).json({
        message: 'Error al guardar Tweet',
        description:
          'Hubo un error al guardar el enlace, por favor intenta en otro momento.',
        type: 'error',
      });
      return;
    }

    res.status(200).json({
      message: 'Stamp guardado con éxito',
      type: 'success',
      refresh: true,
    });
  }
});

export default handler;
