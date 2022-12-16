/*----------------------------

       Inclusione moduli

------------------------------*/

const express = require('express');
const app = express();
const path = require('path'); //per i percorsi dei file o directory



/*---------------------------------------------------

Dichiarazione cartella public e collegamento pagine

----------------------------------------------------*/

let first_path = path.join(__dirname,"public");
app.use(express.static(first_path));

app.get('/', (req, res) => res.sendFile(path.join(first_path, "index.html")));

app.get('/:id', (req,res) => res.sendFile(path.join(first_path,"movie.html")));

app.use((req, res) =>{ res.json("ERROR 404: PAGE NOT FOUND")});//usato come controllo, nel caso di una pagina non esistente.

/*----------------------------

        Local server

------------------------------*/

const port = 3000;
app.listen(port, () => console.log(`Connesso sulla porta ${port}!`));


