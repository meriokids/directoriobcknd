const mongoose = require("mongoose");
const Client = require("../models/Client"); // Asegúrate de tener el modelo correcto
const dotenv = require("dotenv");
dotenv.config();
const MONGO_URI = process.env.MONGO_URI; // Asegúrate de tener la variable de entorno configurada

async function seedClients() {
  try {
    // Asegúrate de usar datos válidos para cada campo
    const clients = [
      {
        nombre: "Cam Ward",
        telefono: "+1 (555) 101-0101",
        correo: "camward@miami.edu",
        puesto: "QB",
        empresa: "Tennessee Titans",
        categoria: "1ra Ronda"
      },
      {
        nombre: "Travis Hunter",
        telefono: "+1 (555) 102-0102",
        correo: "travishunter@colorado.edu",
        puesto: "WR/CB",
        empresa: "Jacksonville Jaguars",
        categoria: "1ra Ronda"
      },
      {
        nombre: "Abdul Carter",
        telefono: "+1 (555) 103-0103",
        correo: "abdulcarter@psu.edu",
        puesto: "LB",
        empresa: "New York Giants",
        categoria: "1ra Ronda"
      },
      {
        nombre: "Will Campbell",
        telefono: "+1 (555) 104-0104",
        correo: "willcampbell@lsu.edu",
        puesto: "OT",
        empresa: "New England Patriots",
        categoria: "1ra Ronda"
      },
      {
        nombre: "Mason Graham",
        telefono: "+1 (555) 105-0105",
        correo: "masongraham@umich.edu",
        puesto: "DT",
        empresa: "Cleveland Browns",
        categoria: "1ra Ronda"
      },
      {
        nombre: "Ashton Jeanty",
        telefono: "+1 (555) 106-0106",
        correo: "ashtonjeanty@boisestate.edu",
        puesto: "RB",
        empresa: "Las Vegas Raiders",
        categoria: "1ra Ronda"
      },
      {
        nombre: "Armand Membou",
        telefono: "+1 (555) 107-0107",
        correo: "armandmembou@nyu.edu",
        puesto: "OT",
        empresa: "New York Jets",
        categoria: "1ra Ronda"
      },
      {
        nombre: "Tetairoa McMillan",
        telefono: "+1 (555) 108-0108",
        correo: "tetairoamcmillan@arizona.edu",
        puesto: "WR",
        empresa: "Carolina Panthers",
        categoria: "1ra Ronda"
      },
      {
        nombre: "Colston Loveland",
        telefono: "+1 (555) 109-0109",
        correo: "colstonloveland@umich.edu",
        puesto: "TE",
        empresa: "Chicago Bears",
        categoria: "1ra Ronda"
      },
      {
        nombre: "Mykel Williams",
        telefono: "+1 (555) 110-0101",
        correo: "mykelwilliams@uga.edu",
        puesto: "DE",
        empresa: "San Francisco 49ers",
        categoria: "1ra Ronda"
      },
      {
        nombre: "Javon Baker",
        telefono: "+1 (555) 111-0102",
        correo: "javonbaker@alabama.edu",
        puesto: "WR",
        empresa: "Arizona Cardinals",
        categoria: "1ra Ronda"
      },
      {
        nombre: "Cade McNamara",
        telefono: "+1 (555) 112-0103",
        correo: "cadetmcnamara@psu.edu",
        puesto: "QB",
        empresa: "Miami Dolphins",
        categoria: "1ra Ronda"
      },
      {
        nombre: "Shemar Turner",
        telefono: "+1 (555) 113-0104",
        correo: "shemarturner@texas.edu",
        puesto: "DT",
        empresa: "Dallas Cowboys",
        categoria: "1ra Ronda"
      },
      {
        nombre: "Jordan Hancock",
        telefono: "+1 (555) 114-0105",
        correo: "jordanhancock@osu.edu",
        puesto: "CB",
        empresa: "Baltimore Ravens",
        categoria: "1ra Ronda"
      },
      {
        nombre: "Blake Corum",
        telefono: "+1 (555) 115-0106",
        correo: "blakecorum@umich.edu",
        puesto: "RB",
        empresa: "Los Angeles Rams",
        categoria: "1ra Ronda"
      },
      {
        nombre: "Darnell Washington",
        telefono: "+1 (555) 116-0107",
        correo: "darnellwashington@uga.edu",
        puesto: "TE",
        empresa: "Buffalo Bills",
        categoria: "1ra Ronda"
      },
      {
        nombre: "Jalen Carter",
        telefono: "+1 (555) 117-0108",
        correo: "jalencarter@uga.edu",
        puesto: "DT",
        empresa: "Detroit Lions",
        categoria: "1ra Ronda"
      },
      {
        nombre: "Devin Neal",
        telefono: "+1 (555) 118-0109",
        correo: "devinneal@kansas.edu",
        puesto: "RB",
        empresa: "Kansas City Chiefs",
        categoria: "1ra Ronda"
      },
      {
        nombre: "Brock Bowers",
        telefono: "+1 (555) 119-0110",
        correo: "brockbowers@uga.edu",
        puesto: "TE",
        empresa: "Minnesota Vikings",
        categoria: "1ra Ronda"
      },
      {
        nombre: "Evan Stewart",
        telefono: "+1 (555) 120-0111",
        correo: "evanstewart@texas.edu",
        puesto: "WR",
        empresa: "Tampa Bay Buccaneers",
        categoria: "1ra Ronda"
      },
      {
        nombre: "Bryce Ford-Wheaton",
        telefono: "+1 (555) 121-0112",
        correo: "brycefordwheaton@wvu.edu",
        puesto: "WR",
        empresa: "Indianapolis Colts",
        categoria: "1ra Ronda"
      },
      {
        nombre: "Keiondre Coburn",
        telefono: "+1 (555) 122-0113",
        correo: "keiondecoburn@texas.edu",
        puesto: "DT",
        empresa: "Seattle Seahawks",
        categoria: "1ra Ronda"
      },
      {
        nombre: "Tyler Van Dyke",
        telefono: "+1 (555) 123-0114",
        correo: "tylervandyke@miami.edu",
        puesto: "QB",
        empresa: "Atlanta Falcons",
        categoria: "1ra Ronda"
      },
      {
        nombre: "Kelee Ringo",
        telefono: "+1 (555) 124-0115",
        correo: "keleeringo@uga.edu",
        puesto: "CB",
        empresa: "Green Bay Packers",
        categoria: "1ra Ronda"
      },
      {
        nombre: "Josh Downs",
        telefono: "+1 (555) 125-0116",
        correo: "joshdowns@unc.edu",
        puesto: "WR",
        empresa: "New Orleans Saints",
        categoria: "1ra Ronda"
      },
      {
        nombre: "Kenny McIntosh",
        telefono: "+1 (555) 126-0117",
        correo: "kennymcintosh@uga.edu",
        puesto: "RB",
        empresa: "Los Angeles Chargers",
        categoria: "1ra Ronda"
      },
      {
        nombre: "Javon Bullard",
        telefono: "+1 (555) 127-0118",
        correo: "javonbullard@uga.edu",
        puesto: "S",
        empresa: "Philadelphia Eagles",
        categoria: "1ra Ronda"
      },
      {
        nombre: "Jovany Baldwin",
        telefono: "+1 (555) 128-0119",
        correo: "jovanybaldwin@usc.edu",
        puesto: "WR",
        empresa: "Pittsburgh Steelers",
        categoria: "1ra Ronda"
      }
    ]
    // Puedes agregar más clientes aquí si lo deseas    

    // Insertar los clientes en la base de datos
    await Client.insertMany(clients);
    console.log("Clientes insertados correctamente.");
  } catch (error) {
    console.error("Error al hacer el seed de clientes:", error);
  } finally {
    mongoose.connection.close(); // Cerrar la conexión después de insertar
  }
}

// Conexión a la base de datos de MongoDB
mongoose
  .connect(MONGO_URI) // Usa tu URI de MongoDB
  .then(() => {
    console.log("Conectado a MongoDB");
    seedClients();
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error);
  });
