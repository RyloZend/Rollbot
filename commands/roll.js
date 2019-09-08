const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  (function theLoop (i) {
    setTimeout(function () {
      bot.channels.get("593483144334671873").send("$w");
      if (--i) {          // If i > 0, keep going
       theLoop(i);       // Call the loop again, and pass it the current value of i
     }
   }, 2000);
  })(13);
}

module.exports.help = {
    name: "roll"
}
