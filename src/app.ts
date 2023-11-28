// app.ts

import express, { Request, Response } from 'express';
import * as path from 'path';

const app = express();
const port = 3000;

<<<<<<< HEAD
// Définissez le dossier "views" pour les fichiers Pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Définissez le dossier "styles" pour les fichiers CSS
app.use('/styles', express.static(path.join(__dirname, 'styles')));

app.get('/register', (req: Request, res: Response) => {
  // Utilisez le nom du fichier Pug sans extension
=======
// Définit le dossier "views" pour les fichiers Pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Définit le dossier "styles" pour les fichiers CSS
app.use('/styles', express.static(path.join(__dirname, 'styles')));

app.get('/register', (req: Request, res: Response) => {
  // Utilise le nom du fichier Pug sans extension
>>>>>>> 6d70b24 (Add component header.pug+css)
  res.render('register', { pageTitle: 'register' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
