output "cloud_run_notify_endpoint" {
  value = "${google_cloud_run_v2_service.default.uri}/api2/notify"
}
