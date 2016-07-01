$API_KEY=$Env:JOB_SEARCH_API_KEY
$SERVICE_NAME="$Env:JOB_SEARCH_SERVICE_NAME-staging"

#curl -X POST -H "Content-Type: application/json" -H "api-key:$API_KEY" -d "@nycjobs.schema" -k "https://$SERVICE_NAME.search.windows.net/indexes?api-version=2015-02-28"
#
#for($i=1; $i -le 6; $i++){
#  curl -X POST -H "Content-Type: application/json" -H "api-key:$API_KEY" -d "@nycjobs$i.json" -k https://$SERVICE_NAME.search.windows.net/indexes/nycjobs/docs/index?api-version=2015-02-28
#}

curl -X POST -H "Content-Type: application/json" -H "api-key:$API_KEY" -d "@zipcodes.schema" -k "https://$SERVICE_NAME.search.windows.net/indexes?api-version=2015-02-28"

for($i=1; $i -le 88; $i++){
  curl -X POST -H "Content-Type: application/json" -H "api-key:$API_KEY" -d "@zipcodes$i.json" -k https://$SERVICE_NAME.search.windows.net/indexes/zipcodes/docs/index?api-version=2015-02-28
}

curl -X POST -H "Content-Type: application/json" -H "api-key:$API_KEY" -d "@nurs.schema" -k "https://$SERVICE_NAME.search.windows.net/indexes?api-version=2015-02-28"

for($i=1; $i -le 3; $i++){
  curl -X POST -H "Content-Type: application/json" -H "api-key:$API_KEY" -d "@nurs$i.json" -k https://$SERVICE_NAME.search.windows.net/indexes/nurs/docs/index?api-version=2015-02-28
}
