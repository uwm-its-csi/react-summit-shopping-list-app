metadata description = 'Creates an Azure Static Web Apps instance.'
param name string
param location string = resourceGroup().location

param sku object = {
  name: 'Free'
  tier: 'Free'
}

resource web 'Microsoft.Web/staticSites@2023-01-01' = {
  name: name
  location: location
  sku: sku
  properties: {
    provider: 'Custom'
  }
}

output name string = web.name
output uri string = 'https://${web.properties.defaultHostname}'
