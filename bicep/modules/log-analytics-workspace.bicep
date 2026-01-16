@description('The name of the Log Analytics Workspace.')
param name string

@description('The location of the Log Analytics Workspace.')
param location string = resourceGroup().location

resource logAnalyticsWorkspace 'Microsoft.OperationalInsights/workspaces@2025-02-01' = {
  name: name
  location: location
  properties: {
    sku: {
      name: 'pergb2018'
    }
  }
}

@description('The resource ID of the Log Analytics Workspace.')
output logAnalyticsWorkspaceId string = logAnalyticsWorkspace.id
