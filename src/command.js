// require('dotenv').config();
const {
    REST,
    Routes,
    ApplicationCommandOptionType,
    ApplicationCommandManager,
    ApplicationCommandPermissionsManager,
    PermissionsBitField,
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

const add = new SlashCommandBuilder()

    .setName("add")
    .setDescription("Add two Numbers")
    .addIntegerOption(option =>
        option

            .setName("first-number")
            .setDescription("null")
            //.se(ApplicationCommandOptionType.Number)
            .setRequired(true)
    )
    .addIntegerOption(option =>
        option
            .setName("sec-number")
            .setDescription("null")
            //type: (ApplicationCommandOptionType.Number)
            .setRequired(true));

const message = new SlashCommandBuilder()
    .setName('message')
    .setDescription('Add your message!')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option =>
        option
            .setName('message_1')
            .setDescription('Look dude be carefull!')
            .setRequired(true))
    .addAttachmentOption(option =>
        option
            .setName('attachment')
            .setDescription('null')
            .setRequired(false)
    );
    

const embedMaker = new SlashCommandBuilder()
    .setName('embedmaker')
    .setDescription('Maker of embeds!')
    .addStringOption(option =>
        option
            .setName('title')
            .setDescription(' embedmaker ')
            .setRequired(true)
    )
    .addStringOption(option =>
        option
            .setName('field_1_title')
            .setDescription(' embedmaker ')
            .setRequired(true)
    )
    .addStringOption(option =>
        option
            .setName('value_1')
            .setDescription(' embedmaker ')
            .setRequired(true)
            
    ).addStringOption(option =>
        option
            .setName('field_2_title')
            .setDescription(' embedmaker ')
            .setRequired(false)
    )
    .addStringOption(option =>
        option
            .setName('value_2')
            .setDescription(' embedmaker ')
            .setRequired(false)
    )

const commands = [add, message, embedMaker];
const rest = new REST({version: '10'}).setToken('YOUR_TOKEN');
(async() => {
    try{
        console.log('Joining...')
        await rest.put(
            Routes.applicationGuildCommands('BOT_ID' ,'SERVER_ID'),
            { body: commands }
        );
        console.log('Joined!')
    } catch (error){
        console.log(`error : ${error}`)
    }
})();
