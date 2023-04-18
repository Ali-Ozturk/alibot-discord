const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ranks')
        .setDescription('Replies with converted status')
        .addStringOption(option =>
            option
                .setName('status')
                .setDescription('The reason for banning')
                .setRequired(true)),
    async execute(interaction) {
        console.log(interaction.options);
        const status = interaction.options.getString('status') ?? 'No reason provided';
        const regex = /STEAM_\d:\d:\d+/g;
        let match;
        let steamIds = '';

        while ((match = regex.exec(status)) !== null) {
            steamIds += (steamIds === '' ? '' : ', ') + match[0];
        }

        await interaction.reply(steamIds);
        await interaction.followUp('https://faceitfinder.com/');
    },
};
