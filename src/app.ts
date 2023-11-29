// app.ts
import { Client } from 'pg';
import express, { Request, Response } from 'express';
import * as path from 'path';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Configuration de la connexion à la base de données (remplacez ces informations par les vôtres)
const dbConfig = {
  user: 'adminuser',
  password: 'adminpassword',
  database: 'mydatabase',
  host: 'postgresdb', 
  port: 5432, // Port par défaut de PostgreSQL
};

// Création d'un nouveau client pour se connecter à la base de données
const client = new Client(dbConfig);
async function insertUserData(User_Surname: string, User_First_name: string, User_Nickname: string, User_Email: string, User_Password: string) {
  try {
    // Connexion au client PostgreSQL
    await client.connect();

    // Requête SQL pour insérer les données dans la table
    const insertQuery = `INSERT INTO bloguser (User_Surname, User_First_Name, User_Nickname, User_Email, User_Password)
                         VALUES ($1, $2, $3, $4, $5)`;

    // Paramètres à passer à la requête
    const values = [User_Surname, User_First_name, User_Nickname, User_Email, User_Password];

    // Exécution de la requête d'insertion
    await client.query(insertQuery, values);

    console.log('Nouvel créé avec succès');

  } catch (error) {
    console.error('Erreur lors de l\'insertion des données :', error);
  } finally {
    // Fermeture de la connexion à la base de données
    await client.end();
  }
}

// Définissez le dossier "views" pour les fichiers Pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Définissez le dossier "styles" pour les fichiers CSS
app.use('/styles', express.static(path.join(__dirname, 'styles')));

// Utilisez bodyParser pour analyser les données du formulaire
app.use(bodyParser.urlencoded({ extended: true }));

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

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit-register', async (req, res) => {
  const client = new Client(dbConfig);

  try {
    // Connexion au client PostgreSQL
    await client.connect();

    // Données du formulaire
    const userSurname = req.body.User_Surname;
    const userFirstName = req.body.User_First_name;
    const userNickname = req.body.User_Nickname;
    const userEmail = req.body.User_Email;
    const userPassword = req.body.User_Password;

    // Requête SQL pour insérer les données dans la table
    const insertQuery = `INSERT INTO bloguser (User_Surname, User_First_Name, User_Nickname, User_Email, User_Password)
                         VALUES ($1, $2, $3, $4, $5)`;

    // Paramètres à passer à la requête
    const values = [userSurname, userFirstName, userNickname, userEmail, userPassword];

    // Exécution de la requête d'insertion
    await client.query(insertQuery, values);

    console.log('Nouvel enregistrement créé avec succès');
    res.send('Nouvel enregistrement créé avec succès');

  } catch (error) {
    console.error('Erreur lors de l\'insertion des données :', error);
    res.status(500).send(`Erreur lors de l'insertion des données : ${error}`);
  } finally {
    // Fermeture de la connexion à la base de données
    await client.end();
  }
});
