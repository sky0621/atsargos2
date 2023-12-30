provider "google" {
  project = var.project_id
  region  = var.region
}

module "random" {
  source = "../modules/random"
}

module "artifact_registry" {
  source        = "../modules/artifact_registry"
  project_id    = var.project_id
  region        = var.region
  repository_id = "app"
}

module "iam_workload_identity_pool_for_github_actions" {
  source                             = "../modules/iam_workload_identity_pool_provider"
  project_id                         = var.project_id
  workload_identity_pool_id          = "gha-pool-${module.random.util_random_id}"
  workload_identity_pool_provider_id = "gha-prov-${module.random.util_random_id}"
}

module "service_account_for_github_actions" {
  source     = "../modules/service_account"
  project_id = var.project_id
  account_id = "github-actions-sa"
  roles = [
    "iam.serviceAccountUser",
    "artifactregistry.writer",
    "cloudbuild.builds.builder",
    "clouddeploy.operator",
    "storage.admin",
    "run.admin",
  ]
}

module "service_account_iam_binding_for_github_actions" {
  source             = "../modules/service_account_iam_binding"
  service_account_id = module.service_account_for_github_actions.name
  members            = ["principalSet://iam.googleapis.com/${module.iam_workload_identity_pool_for_github_actions.name}/attribute.repository/sky0621/atsargos2"]
}

module "cloud_run_service_account" {
  source     = "../modules/service_account"
  project_id = var.project_id
  account_id = "cloud-run-sa"
  roles = [
    "iam.serviceAccountUser",
    "firebase.admin",
  ]
}

module "cloud_run" {
  source          = "../modules/cloud_run"
  project_id      = var.project_id
  region          = var.region
  service_account = module.cloud_run_service_account.email
  container_image = var.container_image
  ingress_pattern = var.ingress_pattern
}

module "cloud_scheduler" {
  source = "../modules/cloud_scheduler"

  project_id           = var.project_id
  region               = var.region
  cloudrun_service_uri = module.cloud_run.cloud_run_notify_endpoint
}
