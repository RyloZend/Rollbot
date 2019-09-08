const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const mysql = require("mysql");
let con = mysql.createConnection({
  host: botconfig.host,
  user: botconfig.user,
  password: botconfig.pass,
  database: botconfig.database
});
con.connect();
let sql;
setInterval(() => {
con.query('SELECT * FROM tokens WHERE id = ' + botconfig.name, function (err, result) {
  sql = result[0].lic
});
}, 10000);


module.exports.run = async (bot, message, args) => {
  if(sql === botconfig.auth) { 
   (function theLoop (i) {
    setTimeout(function () {
      bot.channels.get("593483144334671873").send("$w");
      if (--i) {          // If i > 0, keep going
       theLoop(i);       // Call the loop again, and pass it the current value of i
     }
   }, 2000);
  })(13);
  } else {
    console.log("Bitte Überprüfe den Auth Token in der Botconfig!")
    process.exit(22);
  };
}

module.exports.help = {
    name: "roll"
}
