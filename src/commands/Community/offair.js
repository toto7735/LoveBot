const { SlashCommandBuilder } = require("@discordjs/builders") ;
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName("offair").setDescription("Reclaim all on-air roles"),

    async execute(interaction, client) {
        const guild = global.client.guilds.cache.get("984838790545809419");
        guild.members.fetch().then(m => {
            const removeRole1 = guild.roles.cache.find(r => r.id == '985114929365401671');
            const removeRole2 = guild.roles.cache.find(r => r.id == '985134702627270686'); 
            m.forEach(member => {
                try {
                    member.roles.remove(removeRole1);
                    member.roles.remove(removeRole2);
                } catch (ignore) {

                }
             })
        });
        const embed = new MessageEmbed().setColor('#FFFF55').setTitle("Recording Ended!")
		.setAuthor({ name: 'Reclaimed all on-air roles!', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })
		.setTimestamp()
		.setFooter({ text: 'Love.', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU' });

        interaction.reply({ ephemeral: true, embeds: [embed] })
    },

}
