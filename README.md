# Teamtile

You can quickly access participating teams by displaying them as tiles.

[![.github/workflows/trigger-on-main.yml](https://github.com/karamem0/teamtile/actions/workflows/trigger-on-main.yml/badge.svg)](https://github.com/karamem0/teamtile/actions/workflows/trigger-on-main.yml)
[![codecov](https://codecov.io/gh/karamem0/teamtile/graph/badge.svg?token=UY4ZU4E73I)](https://codecov.io/gh/karamem0/teamtile)
[![license](https://img.shields.io/github/license/karamem0/teamtile.svg)](https://github.com/karamem0/teamtile/blob/main/LICENSE)

## Features

Are you frustrated with finding a team? Teamtile provides these features to you😊:

- 🧱Display participating teams as tiles
- 📖Show team members and channels
- 📁Navigate to files (SharePoint Document Library)
- 📅Access the Channel Calendar
- 🪄Filter teams, channels, and members
- 📌Pin favorite teams

## Screenshot

### Teams

![screenshot1](./assets/screenshots/001.png)

### Channels

![screenshot2](./assets/screenshots/002.png)

### Members

![screenshot3](./assets/screenshots/003.png)

### Tags

![screenshot4](./assets/screenshots/004.png)

## Installation

### Register Microsoft Entra ID Application

1. Go to [Azure Portal](https://portal.azure.com).

2. Click **≡** - **Microsoft Entra ID**.

3. Click **App registrations** - **New registration**.

4. Enter information and click **Register**.

    |Parameter|Value|
    |-|-|
    |Name|Teamtile|
    |Supported account types|Single tenant|

5. Click **Authentication** and add a platform.

    |Parameter|Value|
    |-|-|
    |Type|Single-page application|
    |Redirect URL|**URL of Azure Web App**/auth/callback|
    |Access tokens|Checked|
    |ID tokens|Checked|

6. Click **Certificates & secrets** and add a client secret.

7. Click **API permissions** and add permissions.

    |API|Permission|Type|
    |-|-|-|
    |Microsoft Graph|Channel.ReadBasic.All|Delegate|
    ||Group.Read.All|Delegate|
    ||Team.ReadBasic.All|Delegate|
    ||TeamMember.Read.All|Delegate|
    ||TeamworkTag.Read|Delegate|
    ||User.Read|Delegate|
    ||User.ReadBasic.All|Delegate|

8. Click **Expose an API** and add a scope and client applications.

    **Scope**

    |Parameter|Value|
    |-|-|
    |Application ID URL|api://**Domain name of Azure Web App**/**Application ID**|
    |Scope name|user_impersonation|
    |User|Admins and users|
    |Admin consent display name|Access Teamtile|
    |Admin consent description|Allow the application to access Teamtile on behalf of the signed-in user.|
    |User consent display name|Access Teamtile|
    |User consent description|Allow the application to access Teamtile on behalf of the signed-in user.|
    |State|Enabled|

    **Client application**

    |Application|Scope|
    |-|-|
    |1fec8e78-bce4-4aaf-ab1b-5451cc387264|user_impersonation|
    |5e3ce6c0-2b1f-4285-8d4b-75ee78787346|user_impersonation|

### Create Azure resources

1. Deploy resources using Azure CLI.

```
az deployment group create --template-file ./bicep/main.bicep --resource-group <Resource Group Name> --parameters name=<Application Name> microsoftAppId=<Application ID> microsoftAppPassword=<Application Secret> microsoftAppTenantId=<Tenant Id>
```

### Build Application

### Application

1. Go to `source/client` folder.

2. Edit `.env` file.

    |Placeholder|Replace|
    |-|-|
    |`{{MICROSOFT_APP_ID}}`|**Application ID**|
    |`{{MICROSOFT_TENANT_ID}}`|**Tenent ID**|
    |`{{TELEMETRY_CONNECTION_STRING}}`|**Connection String of Application Insights**|

3. Build application.

```
dotnet publish --configuration Release
```

4. Compress contents of `publish` folder.

```
Compress-Archive -Path ./bin/Release/net10.0/publish/* -DestinationPath ../../build.zip
```

### Manifest

1. Go to `manifest` folder.

2. Edit `manifest.json` file.

    |Placeholder|Replace|
    |-|-|
    |`{{AZURE_WEB_APP_DOMAIN_NAME}}`|**Domain name of Azure Web App**|
    |`{{MICROSOFT_APP_ID}}`|**Application ID**|

3. Compress contents of `manifest` folder.

```
Compress-Archive -Path ./* -DestinationPath ../manifest.zip
```

## Deploy Application

### Azure Web App

1. Go to [Azure Portal](https://portal.azure.com).

2. Click **≡** - **All resources** - **`Azure Web App`**.

3. Click **Advanced Tools** - **Go**.

4. Click **Debug console** - **PowerShell**.

5. Go to `site\wwwroot` folder.

6. Upload `build.zip` file (Drag the file into the browser).

### Microsoft Teams App

1. Go to [Microsoft Teams Admin Center](https://admin.teams.microsoft.com/).

2. Click **Teams apps** - **Manage apps**.

3. Click **Upload** and select `manifest.zip` file.

## Assets

The assets are licensed by [unDraw](https://undraw.co/illustrations).
