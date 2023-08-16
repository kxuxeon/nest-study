import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(async () => {
    console.log('Inserting a new user into the database...');

    console.log('Loading users from the database...');

    console.log(
      'Here you can setup and run express / fastify / any other framework.',
    );
  })
  .catch((error) => console.log(error));
