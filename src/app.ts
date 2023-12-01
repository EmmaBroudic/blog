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

    console.log('Nouvel enregistrement créé avec succès');

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

app.get('/home', (req: Request, res: Response) => {
  // Utilisez le nom du fichier Pug sans extension
  res.render('home', { pageTitle: 'home' });
});

app.get('/login', (req: Request, res: Response) => {
  // Utilisez le nom du fichier Pug sans extension
  res.render('login', { pageTitle: 'login', error: '' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', async (req, res) => {
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
    res.redirect('/home');

  } catch (error) {
    console.error('Erreur lors de l\'insertion des données :', error);
    res.status(500).send(`Erreur lors de l'insertion des données : ${error}`);
  } finally {
    // Fermeture de la connexion à la base de données
    await client.end();
  }
});

app.post('/login', async (req, res) => {
  const loginClient = new Client(dbConfig); // Create a new client for login

  try {
    // Connexion au client PostgreSQL
    await loginClient.connect();

    // Données du formulaire
    const userEmail = req.body.User_Email;
    const userPassword = req.body.User_Password;
    console.log('Données du formulaire :', userEmail, userPassword);

    // Requête SQL pour vérifier les informations d'identification
    const loginQuery = `
      SELECT * 
      FROM bloguser 
      WHERE User_Email = $1 AND User_Password = $2
    `;

    // Paramètres à passer à la requête
    const loginValues = [userEmail, userPassword];

    // Exécution de la requête de connexion
    const result = await loginClient.query(loginQuery, loginValues);

    // Vérifier si des résultats ont été renvoyés (utilisateur authentifié)
    if (result.rows.length > 0) {
      console.log('Connexion réussie');
      res.redirect('/home');
    } else {
      const errorMessage = 'Adresse e-mail ou mot de passe incorrect.';
      console.log('Échec de la connexion :', errorMessage);
      res.status(401).render('login', { pageTitle: 'login', error: errorMessage });
    }
  } catch (error) {
    const errorMessage = 'Une erreur s\'est produite lors de la connexion.';
    console.error('Erreur lors de la connexion :', error);
    res.status(500).render('login', { pageTitle: 'login', error: errorMessage });
  } finally {
    // Fermeture de la connexion à la base de données
    await loginClient.end();
  }
});
