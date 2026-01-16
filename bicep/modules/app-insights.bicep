@description('The name of the Application Insights.')
param name string

@description('The location of the Application Insights.')
param location string = resourceGroup().location

@description('The resource ID of the Log Analytics Workspace to associate with the Application Insights.')
param logAnalyticsWorkspaceId string

resource appInsights 'microsoft.insights/components@2020-02-02' = {
  name: name
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: logAnalyticsWorkspaceId
    IngestionMode: 'LogAnalytics'
  }
}

@description('The connection string of the App Service Plan.')
output applicationInsightsConnectionString string = appInsights.properties.ConnectionString
