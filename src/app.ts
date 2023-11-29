// app.ts

import express, { Request, Response } from 'express';
import * as path from 'path';

const app = express();
const port = 3000;

// Définissez le dossier "views" pour les fichiers Pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Définissez le dossier "styles" pour les fichiers CSS
app.use('/styles', express.static(path.join(__dirname, 'styles')));

app.get('/register', (req: Request, res: Response) => {
  // Utilisez le nom du fichier Pug sans extension
  res.render('register', { pageTitle: 'register' });
});

app.get('/login', (req: Request, res: Response) => {
  // Utilisez le nom du fichier Pug sans extension
  res.render('login', { pageTitle: 'login' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
