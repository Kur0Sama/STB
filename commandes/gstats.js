const Discord = require('discord.js');
const moment = require('moment');
const config = require('../storage/config.json');
moment.locale('fr');

exports.run = (client, message, args) => {
    let embed = new Discord.RichEmbed();
    let auteur = message.author.id;

    let guildMoney = 0;
    let guildUsers = 0;
    let guildRichest = '';
    let guildRichest$ = 0;

    let iMoney = [];

    client.grice.array().forEach(function (i) {
        iMoney.push(i);
        guildMoney += parseInt(i);
        guildUsers += 1;
        if (i > guildRichest$) {
            guildRichest$ = i;
        }
    });

    let i = -1;

    client.grice.keyArray().forEach(function (i2) {
        i++;
        if (client.grice.get(i2) == guildRichest$) {
            guildRichest = client.users.get(i2).username;
        }
    });

    embed.setDescription(`Nombre de comptes : **${guildUsers}**\nRiz total des serveurs : **${guildMoney}** :rice_cracker:\nLe plus riche : **${guildRichest}** avec **${guildRichest$}** :rice_cracker:`);
    embed.setFooter(moment().format('LLLL'));
    embed.setColor(0x45f442);
    message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['global', 'leaderboard', 'lb', 'grichest'],
    permLevel: 0
};

exports.help = {
    name: 'gstats',
    description: 'Voir qui est le plus riche de l\'empire sama !',
    usage: 'gstats'
};