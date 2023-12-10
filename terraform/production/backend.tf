# 環境ごとに変わる
terraform {
  backend "gcs" {
    bucket = "tf-state-atsargos2"
  }
}
