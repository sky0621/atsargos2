resource "google_service_account" "cloud_run" {
  project = var.project_id

  account_id   = "cloud-run"
  display_name = "For Cloud Run"
}

resource "google_project_iam_member" "cloud_run_iam" {
  project = var.project_id

  member = "serviceAccount:${google_service_account.cloud_run.email}"
  role   = "roles/iam.serviceAccountUser"
}

resource "google_project_iam_member" "cloud_run_firebase" {
  project = var.project_id

  member = "serviceAccount:${google_service_account.cloud_run.email}"
  role   = "roles/firebase.admin"
}
