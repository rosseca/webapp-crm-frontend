# Project Configuration
project_id     = "wa-aichat-test"
project_number = "1038920093558"
region         = "europe-west1"
environment    = "staging"

# Cloud Run Configuration
service_name  = "leadtech-crm"
artifact_repo = "leadtech-crm"
image_tag     = "latest"

# Resource Configuration
cpu           = "1"
memory        = "512Mi"
min_instances = 0
max_instances = 10

# Access Configuration
allow_unauthenticated = true

# Environment Variables are passed from Cloud Build substitutions:
# - _VITE_API_URL (CRM Backend URL)

# Secret Environment Variables (from Secret Manager)
# Uncomment and configure as needed:
# secret_env_vars = {
#   API_SECRET = {
#     secret_name = "api-secret"
#     version     = "latest"
#   }
# }
