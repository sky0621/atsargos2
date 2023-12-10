variable "project_id" {
  description = "ID of a GCP project"
  type        = string
  default     = null
}

variable "region" {
  description = "A region to use the module"
  type        = string
  default     = null
}

variable "service_account" {
  description = "A service account for Cloud Run"
  type        = string
  default     = null
}

variable "container_image" {
  description = "container image"
  type        = string
  default     = null
}

variable "ingress_pattern" {
  description = "ingress pattern"
  type        = string
  default     = null
}
