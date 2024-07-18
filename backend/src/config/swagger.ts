import swaggerUI from 'swagger-ui-express';
import { Express } from 'express';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { cwd } from 'process';

const setupSwaggerDocs = async (app: Express) => {
  const pathToFile = join(cwd(), 'doc', 'swagger.yaml');
  const file = await readFile(pathToFile, {
    encoding: 'utf-8',
  });
  const swaggerDocument = parse(file);

  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
};

export default setupSwaggerDocs;
