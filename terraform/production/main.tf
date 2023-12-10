provider "google" {
  project = var.project_id
  region  = var.region
}

module "service_account" {
  source     = "../modules/service_account"
  project_id = var.project_id
}

module "cloud_run" {
  source          = "../modules/cloud_run"
  project_id      = var.project_id
  region          = var.region
  service_account = module.service_account.cloud_run_service_account_email
  container_image = var.container_image
  ingress_pattern = var.ingress_pattern
}
