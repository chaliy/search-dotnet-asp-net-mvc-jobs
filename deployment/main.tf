provider "azurerm" {
}

resource "azurerm_resource_group" "jobsearch" {
  name = "${var.name}-${var.environment}"
  location = "${var.region}"

  tags {
    environment = "${var.environment}"
  }
}

resource "azurerm_template_deployment" "jobsearch" {
  name = "${var.name}-${var.environment}"
  resource_group_name = "${azurerm_resource_group.jobsearch.name}"
  template_body = "${file("template.json")}"
  parameters = {
    site_name = "${var.name}-${var.environment}"
    server_farm_name = "${var.name}-${var.environment}-farm"
    region = "${var.region}"

    search_service_api_key = "${var.search_service_api_key}"
    search_service_name = "${var.name}-${var.environment}"
  }
  deployment_mode = "Incremental"
}

resource "azurerm_search_service" "jobsearch" {
    name = "${var.name}-${var.environment}"
    resource_group_name = "${azurerm_resource_group.jobsearch.name}"
    location = "${var.region}"
    sku = "basic"
}

output "app_name" {
  value = "${azurerm_template_deployment.jobsearch.name}"
}

output "git_url" {
  value = "https://${azurerm_template_deployment.jobsearch.name}.scm.azurewebsites.net/${azurerm_template_deployment.jobsearch.name}.git"
}

output "url" {
  value = "http://${azurerm_template_deployment.jobsearch.name}.azurewebsites.net"
}
