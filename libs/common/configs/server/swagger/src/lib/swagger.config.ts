import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { SwaggerOptions } from './types';

export const cCSSSetupSwaggerDocument = (app: INestApplication, options: SwaggerOptions) => {
    const documentOptions = new DocumentBuilder()
        .setTitle(options.title)
        .setDescription(options.description)
        .setVersion(options.version);

    const documentOptionsWithBearerAuth = options.hasBearerAuth
        ? documentOptions.addBearerAuth(
              {
                  bearerFormat: 'Bearer',
                  description: 'Please enter token in following format: Bearer <JWT>',
                  in: 'Header',
                  name: 'Authorization',
                  scheme: 'Bearer',
                  type: 'http',
              },
              'access-token'
          )
        : documentOptions;

    const documentOptionsBuilt = documentOptionsWithBearerAuth.build();

    const document = SwaggerModule.createDocument(app, documentOptionsBuilt);

    SwaggerModule.setup(options.path, app, document);
};
