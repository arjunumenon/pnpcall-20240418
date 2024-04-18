import { Activity, TurnContext } from "botbuilder";
import {
  CommandMessage,
  TriggerPatterns,
  TeamsFxBotCommandHandler,
} from "@microsoft/teamsfx";
import "isomorphic-fetch";
import axios from "axios";
import config from "../internal/config";

export class GetM365Information implements TeamsFxBotCommandHandler {
  triggerPatterns: TriggerPatterns = ".";
  async handleCommandReceived(
    context: TurnContext,
    message: CommandMessage
  ): Promise<string | Partial<Activity> | void> {
    console.log(`Bot received message: ${message.text}`);

    const neededSiteURL = message.text;

    await context.sendActivity("Retrieving user information from Microsoft Graph ...");
    const siteURL = {
      "siteUrl": neededSiteURL
    }

    const userResult = await callAzureFunction("getSiteTitle", siteURL)


    if (true) {
      // Bot will send the user profile info to user
      return `Name of the site which you entered is :   '${userResult}'`;
    } else {
      return "Could not retrieve profile information from Microsoft Graph.";
    }

  }
}

/**
 * This function calls the Azure Function
 * @param functionName Name of the Azure Function to be called
 * @param teamsfx TeamsFx Context from the Bot
 * @param qnarequestProperties Request Properties needed for Azure QnA Maker
 * @returns Result from the Azure Function
 */
async function callAzureFunction(functionName: string, body: any): Promise<any> {

  const endpoint = `https://azfn-clim365.azurewebsites.net/api/${functionName}`;
  let message: any = null;
  let funcErrorMsg: string = null;
  try {
    const { data, status } = await axios.post<any>(
      endpoint,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    message = data;
  }
  catch (err: any) {
    if (err.response && err.response.status && err.response.status === 404) {
      funcErrorMsg =
        'There may be a problem with the deployment of Azure Function App, please deploy Azure Function (Run command palette "TeamsFx - Deploy Package") first before running this App';
    } else if (err.message === "Network Error") {
      funcErrorMsg =
        "Cannot call Azure Function due to network error, please check your network connection status and ";
      if (err.config.url.indexOf("localhost") >= 0) {
        funcErrorMsg +=
          'make sure to start Azure Function locally (Run "npm run start" command inside api folder from terminal) first before running this App';
      } else {
        funcErrorMsg +=
          'make sure to provision and deploy Azure Function (Run command palette "TeamsFx - Provision Resource" and "TeamsFx - Deploy Package") first before running this App';
      }
    } else {
      funcErrorMsg = err.toString();
      if (err.response?.data?.error) {
        funcErrorMsg += ": " + err.response.data.error;
      }
      alert(funcErrorMsg);
    }
  }
  return message;
}