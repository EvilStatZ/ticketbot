
/*
Made by Gabe P.
Date: 4/20/21
For: Fun
*/

const Discord = require('discord.js');
const bot = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

let ticketCount = 1;
let prefix = 't!';
var hasBeenClaimed = [];
var arr = [];


bot.on('message', async (message) =>{           //commands

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
    if (message.content === (prefix + 'claim')) {
        
        let channelName = message.channel.name
        let userName = message.author.id

        if (hasBeenClaimed.includes(channelName) ) {
            message.channel.send('This ticket has already been claimed.')
            message.delete()
            return;
        } else {
            message.channel.send('This ticket has been claimed by <@' + userName + '>')
            message.delete()
            hasBeenClaimed.push(channelName)
        }
    }
    if (message.content === (prefix + 'close')) {
        const test = message.channel.name()
        
        

    }
    if (message.content === (prefix + 'remind')) {


    }
});  

bot.on('messageReactionAdd', async (reaction, user) => {            //reactions
    let reactionMessageID = await reaction.message.channel.fetch()
    let ticketChannelID = reaction.message.guild.channels.cache.find(channel => channel.name === "📄create-a-ticket📄")
    let categoryID = reaction.message.guild.channels.cache.find(channel => channel.name === "Ticket", 'category')
    
    if (reaction.emoji.name === "👍") {
        if (reactionMessageID.id !== ticketChannelID.id) return;
        if (reaction.message.partial) await reaction.message.fetch();   
        if (user.id === bot.user.id) return;
        if (!reaction.message.guild) return;
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
                allow: [
                    'VIEW_CHANNEL',
                    'SEND_MESSAGES',
                    'ATTACH_FILES',
                    'ADD_REACTIONS',
                ]            
            },
            {
                id: guild.roles.cache.find(role => role.name === "rolrs"),
                deny: 'VIEW_CHANNEL',

            },
            {
                id: guild.roles.cache.find(role => role.name === "ticket mod"),
                allow: [
                    'VIEW_CHANNEL',
                    'SEND_MESSAGES',
                    'ATTACH_FILES',
                    'ADD_REACTIONS',
                ]
            },
            {
                id: everyoneID,
                deny: 'VIEW_CHANNEL',

            }
        
            ]
        });
        let channelNumber = ('ticket-' + ticketCount)
        let channel = reaction.message.guild.channels.cache.find(channel => channel.name === "ticket-" + ticketCount)
        let tickerEmbed = new Discord.MessageEmbed()
            .setColor('#228B22')
            .setTitle('Open a ticket!')
            .setDescription("Have something on the mind that you need help from the staff team with? No worries! You can say whatever you would like to say without any other users being able to see what you are saying! \n\n Once you're done with what you have to say, a mod will try to respond as soon as they possibly can.")
            .setFooter('Created by EvilStatZ')

        channel.send(tickerEmbed)
            


        let channelID = reaction.message.guild.channels.cache.find(channel => channel.name === "ticket-" + ticketCount)
        
        arr.push(userID + ": " + channelID)

        console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction by ${user}!`);
        console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
        console.log("There have been " + ticketCount + " ticket(s) made")
        console.log("The newly made channel id is: " + channelID)
        console.log(arr)
        void ticketCount++;
        void channelNumber;
        void arr;
    }
    
    
});




