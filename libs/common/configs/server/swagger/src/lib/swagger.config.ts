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
                  description: 'Please enter token in following format: Bearer <JWT>',
                  name: 'Authorization',
                  bearerFormat: 'Bearer',
                  scheme: 'Bearer',
                  type: 'http',
                  in: 'Header',
              },
              'access-token'
          )
        : documentOptions;

    const documentOptionsBuilt = documentOptionsWithBearerAuth.build();

    const document = SwaggerModule.createDocument(app, documentOptionsBuilt);

    SwaggerModule.setup(options.path, app, document);
};
