import nextConnect from 'next-connect';
import { getIdFromURL } from '../../utils';
import scraper from '../../services/scraper';
import middleware from '../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const body = JSON.parse(req.body);
  const { url } = body;
  // Create Stamp object
  const stamp = {
    ...body,
    id: getIdFromURL(url),
  };

  // Checking if Stamp alredy exist
  console.log('Existence checking for new Stamp');
  const exist = await req.db
    .collection('stamps')
    .find({ url }, { url: 1 })
    .limit(1)
    .toArray();

  if (!!exist.length) {
    // Notify Stamp alredy exist
    console.log('Stamp already exist');
    res.status(303).json({
      message: 'Stamp ya existente',
      description:
        'El enlace fue ingresado anteriormente y ya se encuentra registrado en la aplicación.',
      type: 'info',
    });
  } else {
    // Insert new stamp
    console.log('Saving new Stamp');
    await req.db.collection('stamps').insertOne(stamp);

    // Scraping new stamp
    console.log('Scraping recent Stamp as Tweet');
    const tweet = await scraper(url);

    // Insert new tweet
    console.log('Saving Tweet');
    await req.db.collection('tweets').insertOne(tweet);

    res.status(200).json({
      message: 'Stamp guardado con éxito',
      type: 'success',
      refresh: true,
    });
  }
});

export default handler;
