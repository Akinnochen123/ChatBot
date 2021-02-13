const questions = [
  {
    "blocks": [
      {
        "type": "header",
        "text": {
          "type": "plain_text",
          "text": "Welcome, How are you doing?",
          "emoji": true
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Pick an item from the dropdown list"
        },
        "accessory": {
          "type": "static_select",
          "placeholder": {
            "type": "plain_text",
            "text": "Select an item",
            "emoji": true
          },
          "options": [
            {
              "text": {
                "type": "plain_text",
                "text": "Doing Well",
                "emoji": true
              },
              "value": "doing_well"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "Neutral",
                "emoji": true
              },
              "value": "neutral"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "Feeling Lucky",
                "emoji": true
              },
              "value": "feeling_lucky"
            }
          ],
          "action_id": "feeling"
        }
      }
    ]
  },
  {
    "blocks": [
      {
        "type": "header",
        "text": {
          "type": "plain_text",
          "text": "What are your hobbies?",
          "emoji": true
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Pick an item from the dropdown list"
        },
        "accessory": {
          "type": "static_select",
          "placeholder": {
            "type": "plain_text",
            "text": "Select an item",
            "emoji": true
          },
          "options": [
            {
              "text": {
                "type": "plain_text",
                "text": "Doing Well",
                "emoji": true
              },
              "value": "doing_well"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "Neutral",
                "emoji": true
              },
              "value": "neutral"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "Feeling Lucky",
                "emoji": true
              },
              "value": "feeling_lucky"
            }
          ],
          "action_id": "hobbies"
        }
      }
    ]
  },
]

module.exports = {questions};