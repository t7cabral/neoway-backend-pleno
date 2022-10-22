const path = require('path')
import * as dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../../.env') })
import app from './app'

app.listen(process.env.API_PORT || 3000, () => console.log(`[NEOWAY] API running on port ${process.env.API_PORT}`));