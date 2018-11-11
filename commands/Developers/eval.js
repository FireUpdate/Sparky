const Discord = require("discord.js");
const botconfig = require('../../botconfig.json');
var tkn = "bot.token,token".split(",");
module.exports.run = async (bot, message, args) => {

  if(!["259008949427109891","310830923744673803","285149851572895744"].includes(message.author.id)) return;
    function clean(text) {
      if (typeof(text) === "string")
        return text.replace(/'/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else
          return text;
    }
  
 let argresult = args.join(' ');
 if(!["259008949427109891","310830923744673803","285149851572895744"].includes(message.author.id)) {
           // Check if user have Permissions to use the command
          message.channel.send('You Don\'t Have Permissions To Use This Command !'); // Send Message to the channel if they dont have permissions
          return; // Returns the code so the rest doesn't run
        }
        if (!argresult) {
          return message.channel.send("Please Specify a Code To Run!");
        }
  
        try {
  
          var evaled = eval(argresult);
          let token = botconfig.token;

          if (typeof evaled !== "string")
         evaled = require("util").inspect(evaled);
 

          let embed = new Discord.RichEmbed()
          .addField(`${bot.user.username} JavaScript Eval Success:`, `** **`)
          .addField(":inbox_tray: **INPUT**", "```js\n" + args.join(" ") + "```")
          .addField(":outbox_tray: **OUTPUT**", "```" + clean(evaled) + "```")
          .setColor("#FF5733")
          .setFooter(message.createdAt, message.author.avatarURL)
          message.channel.send(embed);

        } catch (err){
  
          message.channel.send(new Discord.RichEmbed()
          .addField(`${bot.user.username} - JavaScript Eval Error:`, "There Was a Problem With The Code That You Are Trying To Run!")
          .addField("Error", "```" + clean(err) + "```")
          .setColor(0xFF5733)
          .setFooter(message.createdAt, message.author.avatarURL))
          
              .catch( error => message.channel.send(`**ERROR:** ${error.message}`))
        }

}
//Exporting command
module.exports.command = {
    name: 'eval',
    permission: "ADMINISTRATOR",
    description: "To Compile Javascript Code ",
    usage: `${botconfig.PREFIX}eval //code`,
    category: "OWNER",
    enabled: true
};
