const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
    });



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

