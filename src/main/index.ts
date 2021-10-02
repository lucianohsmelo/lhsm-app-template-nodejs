import { createServer } from 'http';

import { app } from './config';

const server = createServer(app);

server.listen(8000, '0.0.0.0', () => console.log('Server running'));
