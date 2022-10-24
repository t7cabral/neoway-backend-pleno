const path = require('path')
import * as dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../../.env') })
import { start_processor } from './worker';

start_processor();

