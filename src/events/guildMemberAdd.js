const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const embed = new MessageEmbed().setColor(random(['#FFAA00', '#AA00AA', '#55FF55', '#FFFF55', '#FFFFFF', '#FF55FF', '#FF5555', '#55FFFF', '#5555FF'])).setTitle('Check Participate availability')
		.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
		.setAuthor({ name: 'Welcome! Please read everything below slowly (I know you hate to read long texts, but please!)', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })
		.setDescription('This is an opportunity to participate in Toto\'s contents. But before you participate, there are some conditions and preferential treatment.')
		.setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6rhBzmjKKorCmTjxFrx4llGimeJ0Jj_Cf4g&usqp=CAU')
		.addFields(
			{ name: 'Participation Prerequisites', value: '1. Able to record Minecraft video in 1080p quality or higher with OBS or other recording programs.\n2. Never use profanity and inappropriate remarks.\n3. Read all of this.' },
			{ name: 'Preferential Treatment', value: '1. Can use the mic on Discord (Many recordings will be done with people who can use a microphone)' },
			{ name: 'To Apply', value: '1. Click Apply Button\n2. Upload a Minecraft video (5 seconds to 1 minute) to YouTube, including your in game name. (ex: type your in game name in chat)\n3. Paste the video\'s link here. (Only link works!)' },
		)
		.setTimestamp()
		.setFooter({ text: 'Love.', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU' });

	
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('Apply')
				.setLabel('Apply')
				.setStyle('SUCCESS')
		);
	
		member.send({ embeds: [embed], components: [row] });
    }
};

function random(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
  };