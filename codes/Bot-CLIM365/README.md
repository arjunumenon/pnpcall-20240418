# Overview of the Workflow bot template

This template showcases an app that responds to chat commands by displaying UI using an Adaptive Card. The card has a button that demonstrates how to receive user input on the card, do something like call an API, and update the UI of that card. This can be further customized to create richer, more complex sequence of steps which forms a complete workflow.

The app template is built using the TeamsFx SDK, which provides a simple set of functions over the Microsoft Bot Framework to implement this scenario.

## Get Started with the Workflow bot

> **Prerequisites**
>
> To run the workflow bot template in your local dev machine, you will need:
>
> - [Node.js](https://nodejs.org/), supported versions: 16, 18
> - [Teams Toolkit Visual Studio Code Extension](https://aka.ms/teams-toolkit) version 5.0.0 and higher or [TeamsFx CLI](https://aka.ms/teams-toolkit-cli)
>
> **Note**
>
> Your app can be installed into a team, or a group chat, or as personal app. See [Installation and Uninstallation](https://aka.ms/teamsfx-command-response#customize-installation).

1. First, select the Teams Toolkit icon on the left in the VS Code toolbar.
2. Press F5 to start debugging which launches your app in Teams App Test Tool using a web browser. Select `Debug in Test Tool (Preview)`.
3. The browser will pop up to open Teams App Test Tool.
4. Type or select `helloWorld` in the chat to send it to your bot - this is the default command provided by the template.
5. In the response from the bot, select the **DoStuff** button.

The bot will respond by updating the existing Adaptive Card to show the workflow is now complete! Continue reading to learn more about what's included in the template and how to customize it.

## Additional information and references

- [Manage multiple environments](https://docs.microsoft.com/microsoftteams/platform/toolkit/teamsfx-multi-env)
- [Collaborate with others](https://docs.microsoft.com/microsoftteams/platform/toolkit/teamsfx-collaboration)
- [Teams Toolkit Documentations](https://docs.microsoft.com/microsoftteams/platform/toolkit/teams-toolkit-fundamentals)
- [Teams Toolkit CLI](https://docs.microsoft.com/microsoftteams/platform/toolkit/teamsfx-cli)
- [TeamsFx SDK](https://docs.microsoft.com/microsoftteams/platform/toolkit/teamsfx-sdk)
- [Teams Toolkit Samples](https://github.com/OfficeDev/TeamsFx-Samples)
