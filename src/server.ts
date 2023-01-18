import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { logger, errorLogger } from 'express-winston';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import config from './config';
import logs from './utils/logger';
import router from './routes';
import handle from './config/errors/error-handler';

const app = express();
const port = config.PORT;

app.use(helmet({ contentSecurityPolicy: true }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set up logger
app.use(
  logger({
    winstonInstance: logs,
    expressFormat: true,
    colorize: true,
  })
);

// Load swagger except in production
if(config.NODE_ENV !== 'PRODUCTION') {
  const swaggerDoc = YAML.load(config.DIR_SWAGGER || '');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
}

// Routes

app.use('/api/v1', router);

// logs error routes
app.use(
  errorLogger({
    winstonInstance: logs,
  })
);

// error handlers

handle(app);

app.listen(port, () => {
  logs.info(`Listening on http://localhost:${port}`);
});
