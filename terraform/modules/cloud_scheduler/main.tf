resource "google_cloud_scheduler_job" "default" {
  name             = "notify"
  project          = var.project_id
  region           = var.region
  schedule         = "00 9 * * *"
  time_zone        = "Asia/Tokyo"
  attempt_deadline = "60s"

  retry_config {
    retry_count = 3
  }

  http_target {
    http_method = "POST"
    uri         = var.cloudrun_service_uri
    body        = base64encode("{}") // empty body
    headers = {
      "Content-Type" = "application/json"
    }
  }
}
