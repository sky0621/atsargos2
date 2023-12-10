variable "project_id" {
  type    = string
  default = null
}

variable "account_id" {
  type    = string
  default = null
}

variable "roles" {
  type    = set(string)
  default = []
}
