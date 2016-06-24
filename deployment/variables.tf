variable "name" {
  default = "job-search"
  description = "The slug of the application"
}

variable "environment" {
  default = "staging"
  description = "The name of the environment"
}

variable "region" {
  default = "West US"
  description = "The datacenter location"
}

variable "search_service_api_key" {
  description = "Query key for search service"
}

variable "search_service_name" {
  default = "job-search"
  description = "Search service slug"
}
