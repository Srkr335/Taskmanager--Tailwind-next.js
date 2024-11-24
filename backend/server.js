const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const tasksRoutes = require('./routes/tasks');

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/tasks', tasksRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
