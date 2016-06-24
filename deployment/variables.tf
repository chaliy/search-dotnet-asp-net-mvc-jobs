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
