import { env } from "./env"
import { Client, GatewayIntentBits } from "discord.js"

const client = new Client({
  // need to read messages
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent
  ],
})

client.on('ready', () => {

  if (client.user === null) {
    throw new Error("client.user is null")
  }

  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {

  if (message.author.bot) {
    return;
  }

  const body = {
    id: message.id,
    channelId: message.channelId,
    authorId: message.author.id,
    content: message.content,
  }

  // console.log(body)

  const response = await fetch(env.ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: env.ENDPOINT_TOKEN,
    },
    body: JSON.stringify(body)
  })

  if (response.status !== 200) {
    console.error("response status was not 200")
  }
})

client.on('error', console.error);
client.on('warn', console.warn);

client.login(env.DISCORD_BOT_KEY)