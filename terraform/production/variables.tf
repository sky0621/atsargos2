variable "project_id" {
  description = "ID of a GCP project"
  type        = string
  default     = null
}

variable "region" {
  description = "A region to use the module"
  type        = string
  default     = "asia-northeast1"

  validation {
    condition     = var.region == "asia-northeast1"
    error_message = "The region must be asia-northeast1."
  }
}

variable "container_image" {
  description = "container image"
  type        = string
  default     = "us-docker.pkg.dev/cloudrun/container/hello"
}

variable "ingress_pattern" {
  description = "ingress pattern"
  type        = string
  default     = "INGRESS_TRAFFIC_ALL"
}

variable "notify_api_key" {
  description = "api key for call notify"
  type        = string
  default     = null
}
