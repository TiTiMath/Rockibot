const { Command } = require('discord.js-commando');
const path = require('path');
const mconfig = require(path.join(__dirname, 'mconfig.json'));
const Discord = require("discord.js");
const {Seller} = require("./models/Sellers");
const client = new Discord.Client();
const ms = require("ms");
const Advertiser = require('./models/Advertiser.js');
// We now have a giveawaysManager property to access the manager everywhere!


module.exports = class gstart extends Command {
	constructor(client) {
		super(client, {
			name: 'findadvertisers',
			group: 'pizzatown',
			memberName: 'findadvertisers',
            description: 'Allows advertisers to advertise their advertising agency to sellers.',
            args:[
                {
                    key:'advertiser',
                    prompt:'What is the name of the advertising agency you want to advertise your stand with?',
                    type:'string'
                }, 
                {
                    key:'offer',
                    prompt:'How much money do you want to offer?',
                    type:'integer'
                }
            ],
			guildOnly: false,
		});
	}
	async run(message, {advertiser, offer}) {
		Seller.findOne({discord_id:message.author.id}).then(async user => {
            const padvertiser=await Advertiser.findOne({name:advertiser});

            if(!padvertiser){
                message.reply(`${advertiser} is not an advertiser!`)
                return
            }
            else if(user.pizzaTokens<offer){
                message.reply(`You only have ${user.pizzaTokens} PizzaTokens!`)
                return
            }
            else if(padvertiser.sellers.map(seller => seller.discord_id).includes(message.author.id)){
                message.reply(`You already advertise with ${padvertiser.name}!`)
                return
            }
            else{
                message.reply("A DM has been sent to "+padvertiser.name+".")
                user.pizzaTokens -= offer;
                await user.save()
                client.users.cache.get(padvertiser.discord_id).send(`Hello! A stand named ${user.name} owned by ${message.author.username} wants to advertise with you for ${offer} PizzaTokens. React with ✅ to accept, react with ❌ to decline. Consider declining and getting contact with the seller to negotiate a price.`).then(botMessage => {
                    botMessage.react("✅")
                    botMessage.react("❌")
                    const filter = (reaction, user) => {
                        return ['✅', '❌'].includes(reaction.emoji.name) && user === client.users.cache.get(padvertiser.discord_id);
                    };
                    botMessage.awaitReactions(filter, {max:1}).then(async collection => {
                        const reaction = collection.first();

                        if(reaction.emoji.name === '✅'){
                            padvertiser.pizzaTokens += offer;
                            padvertiser.sellers.push(user)
                            await padvertiser.save()
                            message.author.send(`Your offer with ${padvertiser.name} has been accepted. `)
                            client.users.cache.get(padvertiser.discord_id).send(`Offer accepted.`)

                        }
                        else{
                            user.pizzaTokens += offer;
                            await user.save()
                            message.author.send(`Your offer with ${padvertiser.name} has been declined`)
                            client.users.cache.get(padvertiser.discord_id).send(`Offer declined.`)
                        }
                        
                    })
                })
            }

        }).catch((err) => {
            console.log(err)
            message.reply("You are not a Seller!")
        })
	}
};

client.login(require("../../config").token)