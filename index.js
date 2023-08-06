const {
  Client,
  IntentsBitField,
  GatewayIntentBits,
  ActivityType,
  Partials,
  EmbedBuilder,
  SlashCommandBuilder,
  PermissionsBitField,
  Collection
} = require("discord.js");
const keepAlive = require('./keepalive.js');
// require('dotenv').config();
const client = new Client({
  intents: 131071,
});
const { commands, commands1 } = require('./src/command.js');
console.log(commands)

let status = [
  {
    name: 'League of fuck!',
    type: ActivityType.Streaming,
    url: 'https://www.twitch.tv/katawina_'
  },
  {
    name: 'With Your Mom',
    type: ActivityType.Playing
  },
  {
    name: 'Your Mom!',
    type: ActivityType.Watching
  },
  {
    name: 'Moaning..',
    type: ActivityType.Listening
  },
  {
    name: 'Bos El wawa',
    type: ActivityType.Listening,
    url: 'https://open.spotify.com/track/4IHkC9lpm2GrDFJ34Eo194?si=b1dfe4494e6547d1'
  }
]

client.on('ready', (c) => {
  console.log("Now", `${c.user.username}`, "is online!");

  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 30000);
  client.application.commands.set([
    {
      name: "ping",
      description: "To Know the Ping of the bot!",

    },
  ]);
});

client.on('interactionCreate', (inter) => {
  if (!inter.isChatInputCommand()) return;
  console.log(inter.commandName);
  if (inter.commandName === 'add') {
    const num1 = inter.options.get('first-number').value;
    const num2 = inter.options.get('sec-number').value;
    inter.reply(`Let me guess ... its ==> ~**${num1 + num2}**~`)
  }
  if (inter.commandName === 'message') {
    const message = inter.options.get('message_1').value;
    let Attachment = inter.options.getAttachment('attachment');
    if (Attachment == null) { inter.channel.send(`${message}`); }
    if (Attachment !== null) { inter.channel.send({ content: `${message}`, files: [Attachment] }); }
    inter.reply({
      content: `you success sent the message:[**${message}**]`,
      ephemeral: true,
    })
    return;
  } if (inter.commandName === 'ping') {
    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle("The letancy and API letancy!")
      .addFields(
        {
          name: "Latency is",
          value: `${Date.now() - inter.createdTimestamp}ms`,
        },
        {
          name: `API Latency is`,
          value: `${Math.round(client.ws.ping)}ms`,
        }
      );
    inter.reply({ embeds: [embed] });
  } if (inter.commandName === "embedmaker") {
    const title = inter.options.get("title").value;
    const field_1_title = inter.options.get("field_1_title").value;
    const value_1 = inter.options.get("value_1").value;
    const field_2_title = inter.options.getString("field_2_title");
    const value_2 = inter.options.getString("value_2");

    const embed_one = new EmbedBuilder()
      .setColor('DarkRed')
      .setTitle(`${title}`)
      .addFields({
        name: `${field_1_title}`,
        value: `${value_1}`,
        inline: true
      },)

      .setImage('https://i.imgur.com/xBSbvhe.gif')
      .setTimestamp()
      .setFooter({ text: 'Cyber Community!', iconURL: 'https://i.imgur.com/4rW1h2T.gif' })
    if (field_2_title !== null) {
      embed_one.addFields({
        name: `${field_2_title}`,
        value: `${value_2}`,
        inline: true

      })
    } else () => {
      // embed_one.options.delete(field_2_title);
      // embed_one.options.delete(value_2);
      //   return;
    }
    inter.reply({ embeds: [embed_one] })
  }
})
const warningMessages = [
  'We have noticed that you are using very vulgar language. Please do not repeat this, otherwise you will be dealt with in a way that you did not like. If you were attacked by a member of the Cyber Community, please tell us as an administration to be disposed of. Please adhere to the instructions that have been set, please.',
  'Please refrain from using inappropriate language. This community values respect and courtesy. Kindly follow the established guidelines.',
  'Using offensive language is strictly against our rules. Let us maintain a positive and welcoming atmosphere for everyone.',
  'Your language is not appropriate for this server. Please be mindful of your words and treat others with respect.'
];
const cWs = ['fuck', 'bitch', 'dick', 'pussy', 'sex', 'fucking'];
client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;

  if (cWs.some(cW => msg.content.toLowerCase().includes(cW))) {
    const randomWarning = warningMessages[Math.floor(Math.random() * warningMessages.length)];
    msg.reply(randomWarning);}
});

client.login('MTEzMTE0NzM2MDg5NDk3NjA3MA.G9Oh4J.C1FVEvoW23B0UimuAt_nStyztiT8Taz2mnvges');

