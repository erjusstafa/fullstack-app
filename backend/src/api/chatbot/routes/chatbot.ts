module.exports = {
    routes: [
      {
        method: "POST",
        path: "/chatbot",
        handler: "chatbot.create",
        config: {
          policies: [],
          auth: false
        }
      }
    ]
  };
  