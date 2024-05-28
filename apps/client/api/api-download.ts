import { default as download } from 'download';
import * as fs from 'node:fs';

import { default as config } from './services.json';

type MicroserviceConfig = {
  baseUrl: string;
  swaggerSchemaUrl: string;
  schemaFile: string;
};

const microservicesConfig: MicroserviceConfig[] = config;

await Promise.all(
  microservicesConfig.map((microservice) =>
    download(microservice.swaggerSchemaUrl).pipe(
      fs.createWriteStream(microservice.schemaFile)
    )
  )
);
