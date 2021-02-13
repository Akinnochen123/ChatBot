class ConversationService {
  static async run(response, text, context) {
    if(!context.conversation) {
      context.conversation = {
        response: {},
        followUp: {},
        compelete: false,
        exit: false,
      }
    }

    context.conversation.response = {...context.conversation.response, ...response}

    
  }

  nextQuestion() {
    
  }
}

module.exports = ConversationService;