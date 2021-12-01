//---------------------------------------------REQUIREMENTS--------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
require('Math.js');
require('calendar-utils');

const randomanime = require('random-anime');
const ytdl = require('ytdl-core');
const Discord = require('discord.js');

const Calendar = require('calendar-base').Calendar;

const client = new Discord.Client;
const prefix = '!';
const token = ''; //discord token

const queue = new Map();


//------------------------------------------BOT STARTING-----------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------

client.once('ready', ()=>{        
    console.log('Bot is online !');
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const serverQueue = queue.get(message.guild.id);
//------------------------------------------------COMMANDS---------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
    switch(command) {
        case 'ping':
            message.channel.send('pong!');
            break;

//---Info Commands------------

        case 'myid':
            message.channel.send("<@" + message.author.id + ">");
            break;
        case 'showid':
            showID(message);
            break;
        case 'opgg':
            OPGG(message);
            break;
        case 'tierlist':
            message.channel.send('https://lolalytics.com/lol/tierlist/');
            break;
        case 'blitz':
            message.channel.send(`https://blitz.gg/lol/champions/${args[0]}?`);
            break;
        case 'patch':
            patch(message);
            break;

//---Cancer Commands----------

        case 'poke':
            poke(message);
            break;
        case 'kled':
            const exampleEmbed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Ta turbochienne de Mèèère!')
            .setDescription(`Non je rage pas, c'est juste les mates`)
            .attachFiles(['../DiscordBot/Assets/Kled.png'])
            .setTimestamp();
            message. channel.send(exampleEmbed);
            message.content += " ", "https://www.youtube.com/watch?v=MelClnwbdaA";
            execute(message, serverQueue);
        break;
        case 'comp_gj':
            const exampleEmbed2 = new Discord.MessageEmbed()
            .setColor('AQUA')
            .setTitle('Alors le pick Darius ???')
            .setDescription(`Vas-y coach, dis nous quoi prendre!`)
            .attachFiles(['../DiscordBot/Assets/troll_comp.jpg'])
            .setTimestamp();
            message. channel.send(exampleEmbed2);
            break;
        case 'allo':
            allo(message, serverQueue);
            break;

//---NSFW---------------------  

        case 'dicksize':
            dicksize(message);
            break;
        case 'anime':
            anime(message);
            break;
        case 'anime_nsfw':
            anime_nsfw(message);
            break;
//        case 'porn_gif':
//            porn_gif(message);
//            break;

//---Youtube Commands---------
        case 'play':
            execute(message, serverQueue);
            break;
        case 'skip':
            skip(message, serverQueue);
            break;
        case 'stop':
            stop(message, serverQueue);
            break;

//---Reaction Function--------
        case 'scrim_team':
            const exampleEmbed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('Scrim Team Composer !')
            .setDescription(`Mettez un react pour vous voir attribuer une team`)
            .setTimestamp();
            message. channel.send(exampleEmbed);
            team_comp(exampleEmbed);
            break;

        default:
            message.channel.send('Entre une commande valide, connard !');
    }
});




//-------------------------------------------------------FUNCTIONS-------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------

//-----------Info functions----------------- 

function showID(message){
    let target = message.mentions.members.first();
    if (!target) {
        return message.channel.send(`L'utilisateur n'existe pas\nEssaie encore trouduc`);}
    return message.channel.send(target.id);
}

function OPGG(message){
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    for(let i=0; i < (args.length-1); i++){
        let target = args[i+1];
        message.channel.send(`https://euw.op.gg/summoner/userName=${target}`);
    }
    return;
}

function patch(message){

//    Calendar calendar = Calendar.getInstance();
//    var week_num = calendar.get( Calendar.WEEK_OF_YEAR);
    return message.channel.send(`https://euw.leagueoflegends.com/fr-fr/news/game-updates/patch-11-3-notes/`);
}

//----------Cancer functions----------------

function poke(message){
    let target = message.mentions.members.first();
    if (!target) {
        return message.channel.send(`L'utilisateur n'existe pas\nEssaie encore trouduc`);
    }
    const embed = new Discord.MessageEmbed()
        .setTitle('<@' + message.author.id + `> t'a poke !`)
        .setColor('BLUE')
    return target.send(embed);
}

function allo(message, serverQueue){ 
    message.content += ' https://youtu.be/zZDbmDN2meM';
    execute(message, serverQueue);
}
//-----------NSFW functions-----------------

function dicksize(message){
    let target = message.mentions.members.first();
    if (!target) {
        return message.channel.send(`L'utilisateur n'existe pas\nEssaie encore trouduc`);
    }
    const dickS = 3 + Math.floor(Math.random()*20);
    if(dickS <= 10){
        return message.channel.send(`Bah alors, on fait moins le malin avec une bite de ${dickS}cm :laughing:`)    
    }
    else if(10 < dickS && dickS < 21){
        return message.channel.send(`Plutôt correct dans la moyenne avec ses ${dickS}cm :ok_hand:`);
    }
    else {
        return message.channel.send(`:scream: Ce n'est plus une teub que tu as là, c'est un pic, c'est un cap, que dis-je c'est une péninsule!\nBien joué pour ton chibrax de ${dickS}cm :clap:`);
    }    
} 

function anime(message){
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const anime = randomanime.anime();
    const embedmessage = new Discord.MessageEmbed().setImage(anime);

    var argint = parseInt(args[1],10);   

    if (typeof args[1] != undefined && argint<=10){
        let pas=1;
        while (pas < argint){
            const anime = randomanime.anime();
            const embedmessage = new Discord.MessageEmbed().setImage(anime);
            message.channel.send(embedmessage);
            pas+=1
        }
    }
    else {
    };
    return message.channel.send(embedmessage);

}

function anime_nsfw(message){
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const nsfw = randomanime.nsfw();
    const embedmessage = new Discord.MessageEmbed().setImage(nsfw);
    
    var argint = parseInt(args[1],10);   

    if (typeof args[1] != undefined && argint<=10){
        let pas=1;
        while (pas < argint){
            const nsfw = randomanime.nsfw();
            const embedmessage = new Discord.MessageEmbed().setImage(nsfw);
            message.channel.send(embedmessage);
            pas+=1
        }
    }
    else {
    };
    return message.channel.send(embedmessage);
}   

//function porn_gif(message){
//    return message.channel.send(`https://fr.pornhub.com/gif/2986457`);
//}

//------------Youtube functions-------------

async function execute(message, serverQueue){
    const args = message.content.split(" ");

    const voiceChannel = message.member.voice.channel;
    if(!voiceChannel)
        return message.channel.send('Mets toi dans un channel vocal pour jouer de la musique !\nOh le con :tired_face:');
    
        const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
        return message.channel.send('Donne moi la permission de join et de speak dans ton channel vocal, enculé !');
    }   

    const songInfo = await ytdl.getInfo(args[1]);
    const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
    };

    if (!serverQueue) {
        const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true,
        };
    
        queue.set(message.guild.id, queueContruct);
    
        queueContruct.songs.push(song);
    
        try {
            var connection = await voiceChannel.join();
            queueContruct.connection = connection;
            play(message.guild, queueContruct.songs[0]);
        } 
        catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
            }
    }
    else {
        serverQueue.songs.push(song);
        console.log(serveurQueue.songs);
        return message.channel.send(`${song.title} a été ajoutée à la grosse queue!`);
    }
}

function play(guild, song){
    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    } 

    const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on('finish', () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume /5);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}

function skip(message, serverQueue){
    if (!message.member.voice.channel)
      return message.channel.send('Pour skip la musique faut que tu sois dans un vocal ducon!');

    if (!serverQueue)
      return message.channel.send(`Il n'y a pas de musique à passer!`);
    serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue){
    if (!message.member.voice.channel)
      return message.channel.send('Pour arrêter la musique faut que tu sois dans un vocal ducon!');
    
    if (!serverQueue)
      return message.channel.send(`Il n'y a pas de musique à arrêter!`);
      
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
}

//------------Reaction Functions------------

function team_comp(exampleEmbed){
    players = [];

    if (players.length() < 5) {
        
    }

    
}

//---------------------------------------------------CLIENT LOGIN-----------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
client.login(token);
