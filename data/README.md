# NYC Jobs Demo Data & Schema

This is the data used for the <a href="http://azure.microsoft.com/en-us/services/search/">Azure Search</a> Jobs demo website based on data from the <a href="https://nycopendata.socrata.com/">NYC Open Data initiative</a>.  Jobs listed here should not be considered active or accurate.

# Upload

curl -X POST -H "Content-Type: application/json" -H "api-key:3E...1E" -d "@nycjobs.schema" -k https://xxxxx-job-search.search.windows.net/indexes?api-version=2015-02-28
curl -X POST -H "Content-Type: application/json" -H "api-key:3E...1E" -d "@nycjobs1.json" -k https://xxxxx-job-search.search.windows.net/indexes/nycjobs/docs/index?api-version=2015-02-28
