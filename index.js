import express from 'express';
import cors from 'cors';
import 'dotenv/config'; 
import cookieParser from 'cookie-parser';
import connectToDatabase from './database/connect.js';
import authRouter from './routes/routes.js'
const app = express();

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whiteList.includes(origin)) {
        return callback(null, origin);
      }
      return callback('Error de CORS origin: ' + origin + ' No autorizado!');
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/api/v1/test', (req, res) => {
  res.send('Ruta de prueba funcionando correctamente');
});

app.use('/api', authRouter); 

const PORT = process.env.PORT || 5000;

// Conectar a la base de datos y luego iniciar el servidor
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => console.log('🔑🔑  http://localhost:' + PORT));
  })
  .catch((error) => {
    console.error('No se pudo conectar a la base de datos, servidor no iniciado.', error);
    // Finaliza el proceso con un código de error
    process.exit(1); 
  });
