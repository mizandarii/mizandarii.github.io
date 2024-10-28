# WEBFOOD 
## Kasutatud paketid
Projekti arendamiseks on kasutatud järgmisi väliseid pakette:

- @babel/core (^7.9.0): Babel on JavaScripti kompilaator, mis võimaldab kirjutada uusimas JavaScripti (ES6 ja hiljem) ning konverteerib selle tagasi vanemasse versiooni, et see töötaks vanemates brauserites.

- @babel/preset-env (^7.9.5): See on Babeli eeldefineeritud konfigureerimine, mis võimaldab automaatselt lisada vajalikud funktsioonid, et teie kood töötaks erinevates keskkondades.

- babel-loader (^8.1.0): Webpacki loader, mis võimaldab Babelit kasutada, et konverteerida JavaScripti faile enne nende bundeldamist.

- core-js (^3.6.5): Teek, mis lisab uusima JavaScripti funktsioone ja globaalseid objekte, et tagada vanemate brauserite toetamine.

- json-server (^0.16.1): Lihtne ja kiire server JSON-failide alusel, mis võimaldab luua REST API prototüüpe ilma serveripoolse kodeerimiseta.

- webpack (^4.47.0): Moodulite bundler, mis võimaldab teil oma JavaScripti faile ja ressursse (nt CSS, pildid) pakendada üheks või mitmeks failiks, et optimeerida veebirakenduse laadimisaega.

- webpack-cli (^3.3.12): Komandireal kasutatav liides Webpacki tööriistade jaoks, mis võimaldab kasutada Webpacki käsurea kaudu.

## Projekti ehitamine

- Kloneerige projekt githubist
- Liikuge projekti kausta
- Paigaldage sõltuvused: Veenduge, et teil oleks paigaldatud Node.js. Paigaldage kõik vajalikud sõltuvused, kasutades järgmisi käske:
  `npm install` 


## Projekti käivitamine
Pärast sõltuvuste paigaldamist saate projekti käivitada järgmise käsuga:
` npm start` 
See käivitab serveri, mis võimaldab teil projektis töötada.
