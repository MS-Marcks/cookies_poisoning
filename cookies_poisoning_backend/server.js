const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const cors = require("cors");

const db = require("./db/db.json")

const app = express();
const port = 3000;

// Usar cookie-parser middleware para manejar cookies
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(morgan("combined"));
app.use(express.json())

// Ruta para establecer la cookie admin
app.post('/v1/login', (req, res) => {
    const body = req.body;
    const isValidUser = db.users.find((user) => user.userName === body.user && user.password === body.password);

    if (!isValidUser) {
        return res.sendStatus(403).json({ message: 'Credenciales invalidas' });
    }
    res.cookie('admin', isValidUser.admin, {
        //httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 3600000,
    }); // Solo el servidor puede acceder a esta cookie
    res.json({ message: 'Credenciales validas' });
});

app.get('/check-admin', (req, res) => {
    const adminStatus = req.cookies.admin;

    if (adminStatus === 'true') {
        res.json({ message: true });
    } else {
        res.json({ message: false });
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('admin');
    res.json({ message: 'Cierre de sesión correcto' });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
