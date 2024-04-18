import { Activity, TurnContext } from "botbuilder";
import {
  CommandMessage,
  TriggerPatterns,
  TeamsFxBotCommandHandler,
} from "@microsoft/teamsfx";
import "isomorphic-fetch";

export class GetM365Information implements TeamsFxBotCommandHandler {
  triggerPatterns: TriggerPatterns = "getInfo";
  async handleCommandReceived(
    context: TurnContext,
    message: CommandMessage
  ): Promise<string | Partial<Activity> | void> {
    console.log(`Bot received message: ${message.text}`);

    await context.sendActivity("Retrieving user information from Microsoft Graph ...");


    if (true) {
      // Bot will send the user profile info to user
      return `Your command is '${message.text}' and you're logged in as`;
    } else {
      return "Could not retrieve profile information from Microsoft Graph.";
    }

  }
}