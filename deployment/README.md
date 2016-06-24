# Deploy

    SETX ARM_SUBSCRIPTION_ID xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx
    SETX ARM_CLIENT_ID xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx
    SETX ARM_CLIENT_SECRET jsdfe345fds...23sdeww=
    SETX ARM_TENANT_ID xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx

    terraform plan
    terraform apply -var "search_service_api_key=$Env:JOB_SEARCH_API_KEY" -var "search_service_name=$Env:JOB_SEARCH_SERVICE_NAME"
