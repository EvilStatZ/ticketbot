
/*
Made by Gabe P.
Date: 4/20/21
For: Fun
*/

const Discord = require('discord.js');
const bot = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

let ticketCount = 1;
let prefix = 't!';


bot.on('message', async (message) =>{

    if (message.content === (prefix + 'setup')) {


        let everyoneID = message.guild.roles.everyone.id
        message.channel.send('Starting First time setup. Please stand by.')
        await message.guild.channels.create('Ticket', { type: 'category' })
        let categoryID = message.guild.channels.cache.find(channel => channel.name === "Ticket", 'category')
        await message.guild.channels.create('📄create-a-ticket📄', {
            type: 'text',
            parent: categoryID,
            permissionOverwrites: [
            {
                id: everyoneID,
                allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'], 
                deny: ['SEND_MESSAGES', 'ATTACH_FILES', 'ADD_REACTIONS'],

            }
        ]});

        let channel = message.guild.channels.cache.find(channel => channel.name === "📄create-a-ticket📄")
        channel.send('Please react to this message if you would like to create a ticket.').then(sentMessage => {
            sentMessage.react('👍')
        }

    )}
    if (message.content === "!delchan") {
        message.guild.channels.cache.find(channel => channel.name.startsWith === 'ticket-').delete

    }
            
});  

bot.on('messageReactionAdd', async (reaction, user) => { 
    let reactionMessageID = await reaction.message.channel.fetch()
    let ticketChannelID = reaction.message.guild.channels.cache.find(channel => channel.name === "📄create-a-ticket📄")
    let categoryID = reaction.message.guild.channels.cache.find(channel => channel.name === "Ticket", 'category')
    
    if (reactionMessageID.id !== ticketChannelID.id) return;
    if (reaction.message.partial) await reaction.message.fetch();   
    if (user.id === bot.user.id) return;
    if (!reaction.message.guild) return;
    
    if (reaction.emoji.name === "👍") {
        if (user.id === bot.user.id) return;
        let guild = reaction.message.guild
        let userID = user.id
        let everyoneID = reaction.message.guild.roles.everyone.id
        
        reaction.users.remove(userID)
        await guild.channels.create("ticket - " + ticketCount, {
            type: 'text',
            parent: categoryID,
            permissionOverwrites: [
            {
                id: guild.id,
                deny: 'VIEW_CHANNEL',
            },
            {
                id: user.id,
                allow: 'VIEW_CHANNEL',
            },
            {
                id: guild.roles.cache.find(role => role.name === "rolrs"),
                deny: 'VIEW_CHANNEL',

            },
            {
                id: everyoneID,
                deny: 'VIEW_CHANNEL',

            }
        
            ]
        });
        
        
        let channelID = reaction.message.guild.channels.cache.find(channel => channel.name === "ticket-" + ticketCount)
        let channel = bot.channels.cache.find(channel => channel.name === "ticket-" + ticketCount)
        let tickerEmbed = new Discord.MessageEmbed()
            .setColor('#228B22')
            .setTitle('Open a ticket!')
            .setDescription("Have something on the mind that you need help from the staff team with? No worries! You can say whatever you would like to say without any other users being able to see what you are saying! \n\n Once you're done with what you have to say, a mod will try to respond as soon as they possibly can.")
            .setFooter('Created by EvilStatZ')

        channel.send(tickerEmbed).then(embedMessage => {
            
        })

        
        console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction by ${user}!`);
        console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
        console.log("There have been " + ticketCount + " ticket(s) made")
        console.log("The newly made channel id is: " + channelID)
        void ticketCount++;
        
    }
    
    
});



    
        














bot.login('ODMyNDQ5ODg0MTc4MDg3OTQ2.YHj9Xg.-f1nRqO9MBGw7AQboZ_PdqhQdG0')