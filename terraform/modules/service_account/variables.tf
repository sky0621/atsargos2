variable "project_id" {
  description = "ID of a GCP project"
  type        = string
  default     = null
}

variable "account_id" {
  description = "account ID of Service Account"
  type        = string
  default     = null
}

variable "roles" {
  description = "roles"
  type        = set(string)
  default     = []
}
