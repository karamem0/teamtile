@description('The name for all resources.')
param name string

@description('The Microsoft App ID for Teams SSO.')
param microsoftAppId string

@description('The Microsoft App Password for Teams SSO.')
@secure()
param microsoftAppPassword string

@description('The Microsoft App Tenant ID for Teams SSO.')
param microsoftAppTenantId string

module logAnalyticsWorkspace './modules/log-analytics-workspace.bicep' = {
  name: '${name}-log-analytics-workspace'
  params: {
    name: 'log-${name}'
  }
}

module appInsights './modules/app-insights.bicep' = {
  name: '${name}-app-insights'
  params: {
    name: 'appi-${name}'
    logAnalyticsWorkspaceId: logAnalyticsWorkspace.outputs.logAnalyticsWorkspaceId
  }
}

module appServicePlan './modules/app-service-plan.bicep' = {
  name: '${name}-app-service-plan'
  params: {
    name: 'asp-${name}'
  }
}

module webApp './modules/web-app.bicep' = {
  name: '${name}-web-app'
  params: {
    name: 'app-${name}'
    appServicePlanResourceId: appServicePlan.outputs.appServicePlanResourceId
    appInsightsConnectionString: appInsights.outputs.applicationInsightsConnectionString
    microsoftAppId: microsoftAppId
    microsoftAppPassword: microsoftAppPassword
    microsoftAppTenantId: microsoftAppTenantId
  }
}
