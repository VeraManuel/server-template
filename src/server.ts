import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { logger, errorLogger } from 'express-winston';
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

// Routes

app.use('/api', router);

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
