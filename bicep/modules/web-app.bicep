@description('The name of the Web App.')
param name string

@description('The location of the Web App.')
param location string = resourceGroup().location

@description('The resource ID of the App Service Plan to associate with the Web App.')
param appServicePlanResourceId string

@description('The connection string of the Application Insights to associate with the Web App.')
param appInsightsConnectionString string

@description('The Microsoft App ID for the bot authentication.')
param microsoftAppId string

@description('The Microsoft App Password for the bot authentication.')
@secure()
param microsoftAppPassword string

@description('The Microsoft App Tenant ID for the bot authentication.')
param microsoftAppTenantId string

resource webApp 'Microsoft.Web/sites@2024-11-01' = {
  name: name
  location: location
  kind: 'app,linux'
  properties: {
    serverFarmId: appServicePlanResourceId
    siteConfig: {
      linuxFxVersion: 'DOTNETCORE|10.0'
      alwaysOn: true
      ftpsState: 'Disabled'
      http20Enabled: true
      appSettings: [
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: appInsightsConnectionString
        }
        {
          name: 'MicrosoftIdentity__ClientId'
          value: microsoftAppId
        }
        {
          name: 'MicrosoftIdentity__ClientSecret'
          value: microsoftAppPassword
        }
        {
          name: 'MicrosoftIdentity__TenantId'
          value: microsoftAppTenantId
        }
        {
          name: 'WEBSITE_RUN_FROM_PACKAGE'
          value: '1'
        }
      ]
    }
  }
}

output webAppHostName string = webApp.properties.defaultHostName
