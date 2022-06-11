const { MessageActionRow, MessageButton, MessageEmbed, ReactionUserManager } = require('discord.js');
const { user } = require('youtube-feeds');
const applyClass = require("../utils/apply.js");

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;
            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.log(error);
                await interaction.reply({
                    content: 'There was an error while executing this command!', 
                    ephemeral: true
                });
            } 
        } else if (interaction.isButton()) {
            if (interaction.customId === 'Apply') {
                if (global.rejected.includes(interaction.user.id)) {
                    const embedWait = new MessageEmbed().setColor('#FF5555').setTitle('Please wait for up to 5 days to apply!')
                    .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
                    .setAuthor({ name: 'Cooling down!', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })
                    .setTimestamp()
                    .setFooter({ text: 'Love.', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU' });
                    interaction.channel.send({ ephemeral: true, embeds: [embedWait] });
                    return;
                }
                applyClass.isVerified(interaction.user, (boolean) => {
                    if (boolean) {
                        const embedAlready = new MessageEmbed().setColor('#55FF55').setTitle('You will get a chance to apply for participation when toto does viewer engagement content!')
                        .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
                        .setAuthor({ name: 'You are already verified!', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })
                        .setTimestamp()
                        .setFooter({ text: 'Love.', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU' });
                        interaction.channel.send({ ephemeral: true, embeds: [embedAlready] });
                    } else {
                        applyClass.isWaiting(interaction.user, (boolean) => {
                            if (boolean) {
                                const embed0 = new MessageEmbed().setColor('#55FFFF').setTitle('Thank you for your interest. We\'ll take care of your application ASAP.')
                                .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
                                .setAuthor({ name: 'Applications have already been received!', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })
                                .setTimestamp()
                                .setFooter({ text: 'Love.', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU' });
                                interaction.channel.send({ ephemeral: true, embeds: [embed0] });
                            } else {
                                const row = new MessageActionRow().addComponents(
                                    new MessageButton()
                                        .setCustomId('Apply')
                                        .setLabel('Apply')
                                        .setStyle('SUCCESS').setDisabled(true)
                                );
                                interaction.update({
                                    components: [row]
                                });
                                if (global.queue.includes(interaction.user.id)) {
                                    return;
                                } 
                                global.queue.push(interaction.user.id);
                        
                                const embed = new MessageEmbed().setColor('#FFFF55').setTitle('Let\'s Verify!')
                                .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
                                .setAuthor({ name: 'Please send your YouTube video\'s URL!', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })
                                .addFields(
                                    { name: 'Only your video!', value: 'If it turns out that the video in the link you sent is not yours, you may be subject to penalties. Therefore, it is recommended to verify that you are yourself by typing your name in the chat in the video.' },
                                    { name: 'YouTube video link only!', value: 'If it is not a YouTube video\'s link, it would not recognized' },
                                )
                                .setTimestamp()
                                .setFooter({ text: 'Love.', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU' });
                
                                interaction.channel.send({ ephemeral: true, embeds: [embed] });
                            }
                        });
                    }
                });
            } else if (interaction.customId.includes("Accept")) {
                applyClass.accept(interaction.customId.replace("Accept_", ""));
                interaction.message.delete();
            } else if (interaction.customId.includes("Reject")) {
                applyClass.reject(interaction.customId.replace("Reject_", ""));
                interaction.message.delete();
            } else if (interaction.customId == "ApplyWithMic") {
            // } else if (interaction.customId == "ApplyWithMic" && !global.micConfirms.includes(interaction.user.id) && !global.mic_recruit.includes(interaction.user.id) && !global.noMicConfirms.includes(interaction.user.id) && !global.no_mic_recruit.includes(interaction.user.id)) {
                if (global.mic_recruit_limit <= global.mic_recruit.length) {
                    const embed = new MessageEmbed().setColor('#FF5555').setTitle(("This application (With mic) is full!"))
                    .setDescription("Try apply for a no mic!")
                    .setTimestamp()
                    .setFooter({ text: 'Love.', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU' });
    
                    interaction.user.send({embeds: [embed]});
                    return;
                }
                global.micConfirms.push(interaction.user.id);
                
                const embed = new MessageEmbed().setColor('#FF8000').setTitle(("PLEASE READ THE TEXT BELOW"))
                .setAuthor({ name: 'IF YOU DO NOT READ THE ARTICLE BELOW, THERE IS A HIGH PROBABILITY THAT YOU WILL BE BANNED', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })
                .setThumbnail('https://i.imgur.com/ejscU6R.png')
                .addFields(
                    { name: '1. If you leave while recording, you will be 90% banned.', value: "I love you but I love others too, so if you don't follow the rules above, you will be banned" },
                    { name: '2. Please refrain from hate/discriminatory comments while recording', value: "No one likes hate/discriminatory comments" },
                    { name: '3. Please record your screen in 1080p or higher', value: 'This is for video\'s POV. Thank you!\nㅤ\n_If you write the text in the picture below in the chat, you can participate._' },
                )
                .setTimestamp()
                .setFooter({ text: 'Love.', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU' });

                interaction.user.send({ embeds: [embed]});
            } else if (interaction.customId == "ApplyWithNoMic") {
            // } else if (interaction.customId == "ApplyWithNoMic" && !global.micConfirms.includes(interaction.user.id) && !global.mic_recruit.includes(interaction.user.id) && !global.noMicConfirms.includes(interaction.user.id) && !global.no_mic_recruit.includes(interaction.user.id)) {
                if (global.no_mic_recruit_limit <= global.no_mic_recruit.length) {
                    const embed = new MessageEmbed().setColor('#FF5555').setTitle(("This application (With no mic) is full!"))
                    .setDescription("If you can use a mic, try apply for a mic!")
                    .setTimestamp()
                    .setFooter({ text: 'Love.', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU' });
                    interaction.user.send({embeds: [embed]});
                    return;
                }
        
                global.noMicConfirms.push(interaction.user.id);

                const embed = new MessageEmbed().setColor('#FF8000').setTitle(("PLEASE READ THE TEXT BELOW"))
                .setAuthor({ name: 'IF YOU DO NOT READ THE ARTICLE BELOW, THERE IS A HIGH PROBABILITY THAT YOU WILL BE BANNED', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })
                .setThumbnail('https://i.imgur.com/ejscU6R.png')
                .addFields(
                    { name: '1. If you leave while recording, you will be 90% banned.', value: "I love you but I love others too, so if you don't follow the rules above, you will be banned" },
                    { name: '2. Please refrain from hate/discriminatory comments while recording', value: "No one likes hate/discriminatory comments" },
                    { name: '3. Please record your screen in 1080p or higher', value: 'This is for video\'s POV. Thank you!\nㅤ\n_If you write the text in the picture above in the chat, you can participate._' },
                )
                .setTimestamp()
                .setFooter({ text: 'Love.', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsVtEkRjOvQJdL6SOO_FkBbCBcSVrUB4QA&usqp=CAU' });

                interaction.user.send({embeds: [embed]});
            }
      }   
    },
};