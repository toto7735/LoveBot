const { SlashCommandBuilder } = require("@discordjs/builders") ;
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const applyClass = require("../../utils/apply.js")

module.exports = {
    data: new SlashCommandBuilder().setName("recruit").setDescription("Recruit people to play with!")
    .addStringOption(option => option.setName("title").setDescription("Title of content!").setRequired(true))
    .addStringOption(option => option.setName("description").setDescription("Content Description!").setRequired(true))
    .addStringOption(option => option.setName("estimatedplaytime").setDescription("Estimated Play Time!").setRequired(true).addChoices(
        { name: '1 minute ~ 10 minutes', value: '1 minute ~ 10 minutes' },
        { name: '10 minutes ~ 30 minutes', value: '10 minutes ~ 30 minutes' },
        { name: '30 minutes ~ 1 hours', value: '30 minutes ~ 1 hours' },
        { name: '1 hours ~ 1 hours 30 minutes', value: '1 hours ~ 1 hours 30 minutes' },
        { name: '1 hours 30 minutes ~ 2 hours', value: '1 hours 30 minutes ~ 2 hours' },
        { name: '2 hours ~ 3 hours', value: '2 hours ~ 3 hours' },
        { name: '3 hours ~ 5 hours', value: '3 hours ~ 5 hours' },
        { name: '5 hours ~ 10 hours', value: '5 hours ~ 10 hours' },
        { name: '10 hours ~ ?', value: '10 hours ~ ?' },
        ))
    .addNumberOption(option => option.setName("microphonespeopleamount").setDescription("Number Of People With Microphones!").setRequired(true))
    .addNumberOption(option => option.setName("nomicrophonespeopleamount").setDescription("Number Of People With No Microphones!").setRequired(true)),
    

    async execute(interaction, client) {
        const embed = new MessageEmbed().setColor(random(['#FFAA00', '#AA00AA', '#55FF55', '#FFFF55', '#FFFFFF', '#FF55FF', '#FF5555', '#55FFFF', '#5555FF'])).setTitle(interaction.options.getString("title"))
		.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
		.setAuthor({ name: 'Audience Engagement Content', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })
		.setThumbnail('https://media.istockphoto.com/photos/heart-in-sky-picture-id155368405?b=1&k=20&m=155368405&s=170667a&w=0&h=HY9VePUTxb_AIC-abNEGVOblnk9I5DsdTefkk_My8dU=')
		.addFields(
			{ name: 'Content Description', value: interaction.options.getString("description") },
			{ name: 'Estimated Play Time', value: interaction.options.getString("estimatedplaytime") },
			{ name: 'To Apply', value: '1. If you can use the microphone while recording (Discord voice room), click \'Apply With Mic\', if not, click \'Apply With No Mic\'' },
            { name: 'IF YOU DO NOT FOLLOW ANY OF THE RULES BELOW AND APPLY, YOU WILL BE BANNED FROM 90% SERVER (FOR MORE PEOPLE TO PARTICIPATE)', value: '1. You have to record Minecraft video in 1080p quality or higher with OBS or other recording programs.\n2. Derogatory/hateful saying are prohibited.\n3. No leaving during recording.\n4. Read all of this.\nㅤ\nIf you are confident that you will abide by the above rules, please apply.\nLove you. :heart:' },
		)
		.setTimestamp()
		.setFooter({ text: 'Love.', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU' });

	
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('ApplyWithMic')
				.setLabel('Apply With Mic')
				.setStyle('PRIMARY'),
                new MessageButton()
				.setCustomId('ApplyWithNoMic')
				.setLabel('Apply With No Mic')
				.setStyle('SECONDARY')
		);
        const message = global.client.channels.cache.get("984839319313330206").send({content: "<@&984839843626504304>", embeds: [embed], components: [row]});
        message.then(m => applyClass.startRecruit(interaction.options.getNumber("microphonespeopleamount"), interaction.options.getNumber("nomicrophonespeopleamount"), m));

        
    },
}

function random(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
  };