const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
var mysql = require('mysql');
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
process.setMaxListeners(0);
bot.commands = new Discord.Collection();


var con = mysql.createConnection({
  host: botconfig.host,
  user: botconfig.user,
  password: botconfig.pass,
  database: botconfig.database
});


con.connect();
let sql;
con.query('SELECT * FROM tokens WHERE id = ' + botconfig.name, function (err, result) {
  sql = result[0].lic
});

//Hier bitte alle Waifus mit Namen reinschreiben!
//Bitte genau wie der Bot diesen Oben in Weiß schreibt
var claims = ["Iron Man (Tony Stark)", "Brian Griffin", "Cleveland Brown", "Joe Swanson", "Meg Griffin", "Stewie Griffin", "Peter Griffin", "Squidward Tentacles", "SpongeBob SquarePants", "Stan Lee", "Hulk", "Groot", "Kingpin (Wilson Fisk)", "Nick Fury", "Scarlet Witch (Wanda Maximoff)", "Spider-Ham (Peter Porker)", "Spider-Man (Miles Morales)", "Thanos", "Vision", "Ultron", "The Spider-Man (Peter Parker)"];
console.log("Waifus die der Bot Auto Claimt: " + claims);



 fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couln't find CMDs");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
     console.log(`${f} geladen!`)
      bot.commands.set(props.help.name, props);
  });

})

bot.on("ready", async() => {
  console.log(`${bot.user.username} hat sich angemeldet.`);
  bot.user.setActivity('Niemandem', {type: 'LISTENING'});

  setInterval(function () {
    var myDate = new Date(),
    min = myDate.getMinutes();
    sek = myDate.getSeconds();
      if(sek === 30) {
        if(min === 37) {
          if(sql === botconfig.auth) {
            console.log("Gerollt")
            bot.channels.get("593483144334671873").send(".-.roll")
            return;
          } else {
            console.log("Bitte Überprüfe den Auth Token in der Botconfig!")
            process.exit(22);
          }
        }
      }
  }, 1000);
});


bot.on("message", async message => {


  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);


let commandfile = bot.commands.get(cmd.slice(prefix.length));
if(commandfile) commandfile.run(bot,message,args);

  if(message.content.startsWith("Hallo")) {

    message.reply("Hallöchen");

    return true;
  };


  if(cmd === `${prefix}love`){
    return message.channel.send("$mu")
  }

  if(cmd === `${prefix}botinfo`){
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Infos")
    .setColor("#32a852")
    .addField("Bot Name", bot.user.username)
    .setThumbnail(bicon)
    .addField("Version", "1.4")
    .addField("Erstellt am", bot.user.createdAt)
    .addField("Ersteller", "RyloZend | Anton");
    return message.channel.send(botembed);
  }

  if(message.embeds.length === 1) {
    //console.log(message.embeds[0])
   //console.log("-----Trenner-----")
  //console.log(claims)
    if(claims.includes(message.embeds[0].author.name))  {
    let emoji1 = message.guild.emojis.find('name', "Smile");
    let emoji2 = message.guild.emojis.find('name', "Smugmegu");
    let emoji3 = message.guild.emojis.find('name', "ayayaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    let emoji4 = message.guild.emojis.find('name', "smugnagisa");
      message.react(emoji1)
        .then(message.react(emoji2))
        .then(message.react(emoji3))
        .then(message.react(emoji4));
  }

}

});

setTimeout(() => {
  if(sql === botconfig.auth) {
    console.log("Token erkannt!")
    bot.login(botconfig.token);
  } else {
    console.log("Bitte überprüfe den Auth Code in der Botconfig!")
  }
}, 2000);
