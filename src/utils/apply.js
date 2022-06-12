const { MessageActionRow, MessageButton, MessageEmbed, ReactionUserManager } = require('discord.js');
const youtubeThumbnail = require('youtube-thumbnail');

module.exports = {
    apply: async function(user, videoLink) {
        const guild = global.client.guilds.cache.get("984838790545809419");
        const role = guild.roles.cache.find(r => r.id == '984844919812268043');
        guild.members.fetch(user).then(m => m.roles.add(role));
        for (let i = 0; i < global.queue.length; i++) {
            if (global.queue[i].toString() === user.id.toString()) {
              global.queue.splice(i, 1);
              i--;
            }
        }
        const tdata = youtubeThumbnail(videoLink);
        const thumbnail = tdata.high.url;
        const embed = new MessageEmbed().setColor(random(['#FFAA00', '#AA00AA', '#55FF55', '#FFFF55', '#FFFFFF', '#FF55FF', '#FF5555', '#55FFFF', '#5555FF'])).setTitle(user.username + "'s Application")
		.setAuthor({ name: 'Application has arrived!', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU' })
		.setDescription('Click the \'Accept\' button if the conditions below are met or the \'Reject\' button if not.')
		.setThumbnail(thumbnail)
		.addFields(
			{ name: 'If this person isn\'t like this, reject.', value: '1. Able to record Minecraft video in 1080p quality or higher with OBS or other recording programs.\n2. Never use profanity and inappropriate remarks.\n3. Read all of this.' },
			{ name: 'Treat this person', value: '1. Can use the mic on Discord (Many recordings will be done with people who can use a microphone)' },
			{ name: 'Should have applied like this', value: '1. Click Apply Button\n2. Upload a Minecraft video (5 seconds to 1 minute) to YouTube, including your in game name. (ex: type your in game name in chat)\n3. Paste the video\'s link here. (Only link works!)' },
		)
		.setTimestamp()
		.setFooter({ text: 'Love.', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU' });

	
		const row = new MessageActionRow().addComponents(new MessageButton().setCustomId('Accept_' + user.id).setLabel('Accept').setStyle('SUCCESS'), new MessageButton().setCustomId('Reject_' + user.id).setLabel('Reject').setStyle('DANGER'));
	
        global.client.channels.cache.get("984839758444363786").send({ content: "**" + videoLink + "**", ephemeral: true, embeds: [embed], components: [row] });
    
    },

    isWaiting: async function(user, callback) {
        const guild = global.client.guilds.cache.get("984838790545809419");
        guild.members.fetch(user).then(m => {
            callback(m.roles.cache.some(role => role.id === "984844919812268043"))
        }
        );
    },

    isVerified: async function(user, callback) {
        const guild = global.client.guilds.cache.get("984838790545809419");
        guild.members.fetch(user).then(m => {
            callback(m.roles.cache.some(role => role.id === "984839843626504304"))});
    },

    accept: async function(userId, callback) {
        this.isInGuild(userId, (boolean) => {
            if (!boolean) return;
            const guild = global.client.guilds.cache.get("984838790545809419");
            const addRole = guild.roles.cache.find(r => r.id == '984839843626504304');
            const removeRole = guild.roles.cache.find(r => r.id == '984844919812268043') 
            guild.members.fetch(userId).then(m => {
            m.roles.add(addRole);
            m.roles.remove(removeRole);
            
            const embed = new MessageEmbed().setColor('#55FF55').setTitle("Your application has been accepted")
            .setAuthor({ name: 'Congratulation!', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU' })
            .setDescription('From now on, you can apply to participate whenever toto is doing audience engagement content')
            .setTimestamp()
            .setFooter({ text: 'Love.', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU' });
            m.send({embeds: [embed]})
            });
        });
    },

    reject: async function(userId, callback) {
        this.isInGuild(userId, (boolean) => {
            global.rejected.push(userId);
            setTimeout(function() {
                for (let i = 0; i < global.rejected.length; i++) {
                    if (global.rejected[i].toString() === userId.toString()) {
                      global.rejected.splice(i, 1);
                      i--;
                    }
                }
              }, 432000000);
            if (!boolean) return;
            const guild = global.client.guilds.cache.get("984838790545809419");
            guild.members.fetch(userId).then(m => {
            const embed = new MessageEmbed().setColor('#AA0000').setTitle("Your application has been rejected")
            .setAuthor({ name: 'Oh, uh!', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU' })
            .setDescription('Please read the article below carefully. You can apply again within about 1 day.')
            .addFields(
                { name: 'Participation Prerequisites', value: '1. Able to record Minecraft video in 1080p quality or higher with OBS or other recording programs.\n2. Never use profanity and inappropriate remarks.\n3. Read all of this.' },
                { name: 'Preferential Treatment', value: '1. Can use the mic on Discord (Many recordings will be done with people who can use a microphone)' },
                { name: 'To Apply', value: '1. Click Apply Button\n2. Upload a Minecraft video (5 seconds to 1 minute) to YouTube, including your in game name. (ex: type your in game name in chat)\n3. Paste the video\'s link here. (Only link works!)' },
            )
            .setTimestamp()
            .setFooter({ text: 'Love.', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU' });
            m.send({embeds: [embed]})
            const removeRole = guild.roles.cache.find(r => r.id == '984844919812268043');
            m.roles.remove(removeRole);
        });
        }
        );
    },

    isInGuild: async function(userId, callback) {
        const guild = global.client.guilds.cache.get("984838790545809419");
        callback(guild.members.cache.find(userId));
    },
 
    isRecruitStarted: async function(callback) {
        callback(global.mic_recruit === null);
    },

    startRecruit: async function(mic_limit, no_mic_limit, message) {
        global.micConfirms = [];
        global.noMicConfirms = [];
        global.mic_recruit = [];
        global.no_mic_recruit = [];
        global.mic_recruit_limit = mic_limit;
        global.no_mic_recruit_limit = no_mic_limit;
        global.participateConfirms = [];

        global.recruit_interaction_message = message;
    },

    stopRecruit: async function() {
        global.mic_recruit = null;
        global.no_mic_recruit = null;
        global.mic_recruit_limit = null;
        global.mic_recruit_limit = null;

        global.recruit_interaction_message.delete();

        global.recruit_interaction_message = null;
    },

    addMicRecruit: async function(userId) {
        for (let i = 0; i < global.micConfirms.length; i++) {
            if (global.micConfirms[i].toString() === userId.toString()) {
                global.micConfirms.splice(i, 1);
              i--;
            }
        }
        global.mic_recruit.push(userId);

        const guild = global.client.guilds.cache.get("984838790545809419");
        const addRole = guild.roles.cache.find(r => r.id == '985114929365401671');
        guild.members.fetch(userId).then(m => m.roles.add(addRole));

        if (global.mic_recruit_limit <= global.mic_recruit.length) {
            const fullEmbed = new MessageEmbed().setColor('#FF5555').setTitle(("This application (With mic) is full!"))
            .setDescription("Try apply for a no mic!")
            .setTimestamp()
            .setFooter({ text: 'Love.', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU' });
            global.micConfirms.forEach(ui => {
                guild.members.fetch(ui).then(m => m.send({embeds: [fullEmbed]}));
            });
            global.micConfirms = [];
        }

        if (global.mic_recruit_limit <= global.mic_recruit.length && global.no_mic_recruit_limit <= global.no_mic_recruit.length) {
            global.mic_recruit = null;
            global.no_mic_recruit = null;
            global.mic_recruit_limit = null;
            global.mic_recruit_limit = null;

            global.recruit_interaction_message.delete();

            global.recruit_interaction_message = null;
        }

        const embed = new MessageEmbed().setColor('55FF55').setTitle("You have successfully joined toto's content. Go to the server and check the ON AIR category!").setDescription("Since you applied with Mic, you can use the mic.")
		.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
		.setAuthor({ name: 'Congratulations!!!!!!!!!!!!!!!!!!', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })
		.setTimestamp()
		.setFooter({ text: 'Love.', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU' });

        guild.members.fetch(userId).then(m => m.send({embeds: [embed]}));
    },

    addNoMicRecruit: async function(userId) {
        for (let i = 0; i < global.noMicConfirms.length; i++) {
            if (global.noMicConfirms[i].toString() === userId.toString()) {
                global.noMicConfirms.splice(i, 1);
              i--;
            }
        }

        global.no_mic_recruit.push(userId);

        const guild = global.client.guilds.cache.get("984838790545809419");
        const addRole = guild.roles.cache.find(r => r.id == '985134702627270686');
        guild.members.fetch(userId).then(m => m.roles.add(addRole));

        if (global.no_mic_recruit_limit <= global.no_mic_recruit.length) {
            const fullEmbed = new MessageEmbed().setColor('#FF5555').setTitle(("This application (With no mic) is full!"))
            .setDescription("If you can use a mic, try apply for a mic!")
            .setTimestamp()
            .setFooter({ text: 'Love.', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU' });
            global.noMicConfirms.forEach(ui => {
                guild.members.fetch(ui).then(m => m.send({embeds: [fullEmbed]}));
            });
            global.noMicConfirms = [];
        }

        if (global.mic_recruit_limit <= global.mic_recruit.length && global.no_mic_recruit_limit <= global.no_mic_recruit.length) {
            global.mic_recruit = null;
            global.no_mic_recruit = null;
            global.mic_recruit_limit = null;
            global.mic_recruit_limit = null;

            global.recruit_interaction_message.delete();

            global.recruit_interaction_message = null;
        }

        const embed = new MessageEmbed().setColor('55FF55').setTitle("You have successfully joined toto's content. Go to the server and check the ON AIR category!").setDescription("Since you applied with No Mic, you can't use the mic")
		.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
		.setAuthor({ name: 'Congratulations!!!!!!!!!!!!!!!!!!', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })
		.setTimestamp()
		.setFooter({ text: 'Love.', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU' });

        guild.members.fetch(userId).then(m => m.send({embeds: [embed]}));
    },

}

function random(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
};