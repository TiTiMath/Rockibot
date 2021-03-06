const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const Keyv = require('keyv');

module.exports = class help2 extends Command {
	constructor(client) {
		super(client, {
			name: 'help',
			group: 'miscellaneous',
			memberName: 'help',
			description: 'Shows the list of commands',
			args: [
				{
					key: 'page',
					prompt: 'Which page number would you like to go to?',
					type: 'string',
					default: '0'
				},
			],
		});
	}
	run(message, { page }) {
		const home = new Discord.MessageEmbed()
		.setColor('#03d3fc')
		.setTitle('Rockibot | Help')
		.addField('Page 1: General Commands', 'These commands are given to everyone, and is the module that every user gets when they use the bot.')
		.addField('Page 2: Moderation Commands', 'These commands are for moderating servers, such as `!ban`, `!kick` and more!')
		.addField('Page 3: Music Commands', 'These commands are for the music aspect of the bot. Here, you can find information of `!play`, `!join` and more!')
		.addField('Page 4: Suggestion Commands', 'These commands relate to suggestions! Here, you can find information about `!suggest`, `!suggest-channel` and more!')
		.addField('Page 5: PizzaTown Commands', 'These commands are for PizzaTown! Here, you can find information about `!pstart`, `!menu` and more!')
		.addField('Links', '[Website](https://rockibot.ml)\n[Dashboard](https://dash.rockibot.ml)')

		const basic = new Discord.MessageEmbed()
			.setColor('#4e03fc')
			.setTitle('Rockibot | General Commands')
			.setDescription('Please remove the `<>` when using the commands!')
			.addField('help', 'Displays a list of available commands for Rockibot.')
			.addField('prefix', 'Display\'s the prefix of the bot on the server. To change, just do `!prefix <new prefix>`.')
			.addField('ping', 'See how fast the API reponse is between you and the bot.')
			.addField('status', 'Used to check if the bot is working or not.')
			.addField('stats', 'Nerdy stats for those who want to see who made the bot, and how much memory is being used, and what version the bot is.')
			.addField('invite', 'Allows other users to invite the bot to their own server.')
			.addField('dashboard', 'Takes you to the bot\'s dashboard.')
			.addField('vote', 'Takes you to the bot\'s vote page.')
			.addField('changelog', 'Shows the latest changelog of the bot from the support server.')

		const suggestions = new Discord.MessageEmbed()
			.setColor('#71EEB8')
			.setTitle('Rockibot | Suggestions Commands')
			.setDescription('Please remove the `<>` when using the commands!')
			.addField('suggest-channel', 'Sets the channel where the suggestions will be found. Usage: `!suggest-channel <Suggestion Channel Name without #>`.')
			.addField('suggestion', 'Sends a suggestion to the suggestion channel. Usage: `!suggestion <Suggestion>`.')
			.addField('approve', 'Says that the suggestion is approved. Usage: `!approve <Suggestion Message ID> <Comments>`.')
			.addField('consider', 'Says that the suggestion is considered. Usage: `!consider <Suggestion Message ID> <Comments>`.')
			.addField('implement', 'Says that the suggestion is implemented. Usage: `!implement <Suggestion Message ID> <Comments>`.')
			.addField('deny', 'Says that the suggestion is denied. Usage: `!deny <Suggestion Message ID> <Comments>`.')

		const mod = new Discord.MessageEmbed()
			.setColor('#ff2050')
			.setTitle('Rockibot | Moderation Commands')
			.setDescription('Please remove the `<>` when using the commands!')
			.addField('ban', 'Bans users from the server. Usage: `!ban <Mention User or User ID> <Reason>`.')
			.addField('kick', 'Kicks users from the server. Usage: `!kick <Mention User or User ID> <Reason>`.')
			.addField('modlog', 'Sets the modeation log channel of the server. Usage: `!modlog <Channel Name without #>`.')
			.addField('mute', 'Used to mute members on the server. Usage: `!mute <Mention User or User ID> <Reason> <time>`.')
			.addField('unmute', 'Un-mutes the mentioned muted user. Usage: `!unmute <Mention User or User ID>`.')
			.addField('purge', 'Used to remove specific number of messages on the server. Usage: `!purge <Number of messages>`.')
			.addField('warn', 'Allows staff to warn a member. Usage: `!warn <Mention User or User ID> <Reason>`.')
			.addField('unwarn', 'Allows staff to remove a warn from a member. Usage: `!unwarn <Mention User or User ID> <Reason>`.')
			.addField('warns', 'Allows staff to see how many warns a user has. Usage: `!warns <Mention User or User ID>`.')

		const music = new Discord.MessageEmbed()
			.setColor('#2e77b8')
			.setTitle('Rockibot | Music Commands')
			.setDescription('Please remove the `<>` when using the commands!')
			.addField('join', 'Makes the bot join the voice channel the user is in.')
			.addField('leave', 'Makes the bot leave the voice channel it was in.')
			.addField('play', 'Plays Youtube links in the voice channel. Usage: `!play <Youtube link>`.')
			.addField('pause', 'Pauses the music being played.')
			.addField('queue', 'Shows the next song in the queue.')
			.addField('skip', 'Skips to the next song in the queue.')
			.addField('clear', 'Clears the queue.')
		const pizzatown = new Discord.MessageEmbed()
			.setColor('#66ff00')
			.setTitle('Rockibot | PizzaTown Commands')
			.setDescription('Please remove the `<>` when using the commands!')
			.addField('findadvertisers', 'Allows advertisers to advertise their advertising agency to sellers.')
			.addField('lookforstands', 'Allows advertisers to advertise their advertising agency to sellers.')
			.addField('menu', 'View your shack\'s menu.')
			.addField('menuadd', 'Adds an item to your menu.')
			.addField('menuedelete', 'Deletes an item from your menu.')
			.addField('menuedit', 'Edits an item from your menu.')
			.addField('pstart', 'Starts your pizza town journey.')
			.addField('pstats', 'Shows your pizza town stats.')
			.addField('storebuy', 'Buys a store.')
			.addField('stores', 'Views your stores.')


		switch (page) {
			case "1":
				return message.channel.send({ embed: basic })
			case "2":
				return message.channel.send({ embed: mod })
			case "3":
				return message.channel.send({ embed: music })
			case "4":
				return message.channel.send({ embed: suggestions })
			case "5":
				return message.channel.send({ embed: pizzatown})
			default:
				home.setDescription(`Use \`${message.guild.commandPrefix}help [page]\` to switch pages!`)
				return message.channel.send({ embed: home })
			}
	}
};
