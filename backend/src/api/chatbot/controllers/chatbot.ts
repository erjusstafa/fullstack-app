const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = {
  async create(ctx) {
    const { userMessage } = ctx.request.body;

    if (!userMessage) {
      return ctx.badRequest("Missing userMessage in request body");
    }

    try {
      console.log("Sending message to OpenAI:", userMessage);

      const completion = await openai.chat.completions.create({
        model: "gpt-4.1",
        messages: [{ role: "user", content: userMessage }],
      });

      const botReply = completion.choices[0].message.content;
      console.log("OpenAI reply:", botReply);

      const savedChat = await strapi.entityService.create(
        "api::chatbot.chatbot",
        {
          data: {
            userMessage,
            botReply,
          },
        }
      );

      ctx.send({
        reply: botReply,
        saved: savedChat,
      });
    } catch (err) {
      console.error("OpenAI error:", err);
      ctx.internalServerError("Something went wrong while calling OpenAI.");
    }
  },
};
