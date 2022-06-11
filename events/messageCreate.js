const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const youtube = require("youtube-feeds");
const applyClass = require("../utils/apply.js");

module.exports = {
	
    name: 'messageCreate',
    async execute(msg) {
		if (msg.author.bot) return;
		if (msg.channel.type === 'DM') {
			console.log(global.micConfirms);
			if (global.micConfirms.includes(msg.author.id)) {
				if (msg.content != "I have read all of the above rules and agree that if I do not follow any of the above rules, I will be banned from the server") return;
				applyClass.addMicRecruit(msg.author.id);
				return;
			} else if (global.noMicConfirms.includes(msg.author.id)) {
				if (msg.content != "I have read all of the above rules and agree that if I do not follow any of the above rules, I will be banned from the server") return;
				applyClass.addNoMicRecruit(msg.author.id);
				return;
			}
			if (global.rejected.includes(msg.author.id)) {
				const embedWait = new MessageEmbed().setColor('#FF5555').setTitle('Please wait for up to 5 days to apply!')
				.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
				.setAuthor({ name: 'Cooling down!', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })
				.setTimestamp()
				.setFooter({ text: 'Love.', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU' });
				msg.channel.send({ ephemeral: true, embeds: [embedWait] });
				return;
			}
			applyClass.isVerified(msg.author, (boolean) => {
				if (boolean) {
					const embedAlready = new MessageEmbed().setColor('#55FF55').setTitle('You will get a chance to apply for participation when toto does viewer engagement content!')
					.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
					.setAuthor({ name: 'You are already verified!', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })
					.setTimestamp()
					.setFooter({ text: 'Love.', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU' });
					msg.channel.send({ ephemeral: true, embeds: [embedAlready] });
				} else {
					applyClass.isWaiting(msg.author, (boolean) => {
						if (boolean) {
							const embed0 = new MessageEmbed().setColor('#55FFFF').setTitle('Thank you for your interest. We\'ll take care of your application ASAP.')
							.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
							.setAuthor({ name: 'Applications have already been received!', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })
							.setTimestamp()
							.setFooter({ text: 'Love.', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU' });
							msg.channel.send({ ephemeral: true, embeds: [embed0] });
						} else {
							if (!global.queue.includes(msg.author.id)) {
								const embed1 = new MessageEmbed().setColor('#FF5555').setTitle('Please click the button below to start authentication.')
								.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
								.setAuthor({ name: 'Verification is not queued!', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })
								.setTimestamp()
								.setFooter({ text: 'Love.', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU' });
					
								const row = new MessageActionRow().addComponents(
									new MessageButton()
										.setCustomId('Apply')
										.setLabel('Apply')
										.setStyle('SUCCESS')
								);
							
								msg.channel.send({ ephemeral: true, embeds: [embed1], components: [row] });
								return;
							}	
							const linkNotValidEmbed = new MessageEmbed().setColor('#FF5555').setDescription('Please just post a YouTube link. (ex: https://www.youtube.com/watch?v=dQw4w9WgXcQ)')
						.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
						.setAuthor({ name: 'This is not a YouTube video\'s link!', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })
					const videoNoExistsEmbed = new MessageEmbed().setColor('#FF5555').setDescription('Please check if the link is correct and just post a YouTube link. (ex: https://www.youtube.com/watch?v=dQw4w9WgXcQ)')
						.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
						.setAuthor({ name: 'This is not a valid YouTube video!', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })
					const submittedEmbed = new MessageEmbed().setColor('#55FF55').setDescription('Thank you very much for your interest in this work and for your hard work. I wish you good results!')
						.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
						.setAuthor({ name: 'Your application has been successfully received!', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })
					if (!msg.content.startsWith("https://www.youtube.com/watch?v=") || msg.content.length !== 43) {
						msg.channel.send({ ephemeral: true, embeds: [linkNotValidEmbed] });
						return;
					}
					const youtubeId = msg.content.replace("https://www.youtube.com/watch?v=", "");
					isValidYoutubeID(youtubeId, () => {
						msg.channel.send({ ephemeral: true, embeds: [submittedEmbed] });
						applyClass.apply(msg.author, "https://www.youtube.com/watch?v=" + youtubeId);
					}, () => { msg.channel.send({ ephemeral: true, embeds: [videoNoExistsEmbed] });	});
						}
					});
				}
			})
			
		}
	},
};

var http = require('http');

async function isValidYoutubeID(youtubeID, validCallback, invalidCallback) {
  var options = {
    method: 'HEAD',
    host: 'img.youtube.com',
    path: '/vi/' + youtubeID + '/0.jpg'
  };

  var req = http.request(options, function(res) {
    if (res.statusCode == 200) {
		validCallback();
    } else {
        invalidCallback();
    }
  });

  req.end();
}
  
  
