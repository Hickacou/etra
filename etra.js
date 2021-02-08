const Discord = require("discord.js");
const fs = require('fs');
const client = new Discord.Client();

client.on('ready', () => {
	console.log('Connected as ' + client.user.tag);
});

client.on('message', async message => {
	if (message.author.id !== client.user.id)
		return;
	if (message.content === 'etra help')
		return message.channel.send('https://hicka.dev/etra#readme');
	if (message.content === 'etra save') {
		const emojis = message.guild.emojis.map(e => new Object({ 'animated': e.animated, 'name': e.name, 'url': e.url }));
		fs.writeFileSync(`${message.guild.id}.json`, JSON.stringify(emojis));
		const g = countNecessaryGuilds(emojis);
		message.channel.send(`\`Data saved (${emojis.length} elements).\`\n> **Run etra copy <id> to copy the elements automatically** *(Will require ${g} guild${g > 1 ? 's' : ''} for ${message.guild.name})*`);
	}
	if (message.content === 'etra copy') {
		// Will commit this shit later
		// In a lot of time because I'm too lazy to clean my code
	}

});


function countNecessaryGuilds(emojis) {
	let animated = emojis.filter(e => e.animated).length;
	let static = emojis.length - animated;
	let guilds = 0;
	while (animated > 0 || static > 0) {
		animated -= 50;
		static -= 50;
		guilds++;
	}
	return guilds;
}

client.login(require('./token.json').token);
