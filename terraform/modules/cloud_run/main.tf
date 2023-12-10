resource "google_cloud_run_v2_service" "default" {
  project  = var.project_id
  location = var.region

  name    = "app"
  ingress = var.ingress_pattern

  template {
    service_account = var.service_account

    scaling {
      max_instance_count = 10
    }

    containers {
      image = var.container_image
    }
  }
}

data "google_iam_policy" "all_users_available" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  project  = google_cloud_run_v2_service.default.project
  location = google_cloud_run_v2_service.default.location
  service  = google_cloud_run_v2_service.default.name

  policy_data = data.google_iam_policy.all_users_available.policy_data
}
