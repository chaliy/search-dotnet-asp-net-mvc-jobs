In general this will not work, to run template we need search_service_api_key, but it is impossible with terraform for the time being...

# Deploy

    SETX ARM_SUBSCRIPTION_ID xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx
    SETX ARM_CLIENT_ID xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx
    SETX ARM_CLIENT_SECRET jsdfe345fds...23sdeww=
    SETX ARM_TENANT_ID xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx

    - comment out azurerm_template_deployment.jobsearch and related stuff
    - terraform apply -var "name=$Env:JOB_SEARCH_SERVICE_NAME"
    - get SEARCH API Key | $Env:JOB_SEARCH_API_KEY = "NeWsErChKeY"
    - /data/Upload.ps1
    - uncomment azurerm_template_deployment.jobsearch  and related stuff
    - terraform apply -var "name=$Env:JOB_SEARCH_SERVICE_NAME" -var "search_service_api_key=$Env:JOB_SEARCH_API_KEY"

# Destroy

   - terraform destroy -var "name=$Env:JOB_SEARCH_SERVICE_NAME" -var "search_service_api_key=$Env:JOB_SEARCH_API_KEY"

# Plan B

    azure group deployment create -f template.json -e template.parameters.json "$Env:JOB_SEARCH_SERVICE_NAME-staging" "Initial"
