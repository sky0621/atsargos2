provider "google" {
  project = var.project_id
  region  = var.region
}

module "cloud_run_service_account" {
  source     = "../modules/service_account"
  project_id = var.project_id
  account_id = var.cloud_run_account_id
  roles      = ["iam.serviceAccountUser", "firebase.admin"]
}

module "cloud_run" {
  source          = "../modules/cloud_run"
  project_id      = var.project_id
  region          = var.region
  service_account = module.cloud_run_service_account.email
  container_image = var.container_image
  ingress_pattern = var.ingress_pattern
}
