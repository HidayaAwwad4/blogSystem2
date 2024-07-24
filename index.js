import express from 'express'
import {initApp} from './src/initApp.js'
const app = express();
const port =3306;
initApp(app,express);
app.listen(port , ()=>console.log(`example app listening on port ${port}!`))