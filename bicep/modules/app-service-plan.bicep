@description('The name of the App Service Plan.')
param name string

@description('The location of the App Service Plan.')
param location string = resourceGroup().location

@description('The SKU of the App Service Plan. Default is B1.')
param sku string = 'B1'

resource appServicePlan 'Microsoft.Web/serverfarms@2024-11-01' = {
  name: name
  location: location
  kind: 'linux'
  sku: {
    name: sku
  }
  properties: {
    reserved: true
  }
}

@description('The resource ID of the App Service Plan.')
output appServicePlanResourceId string = appServicePlan.id
