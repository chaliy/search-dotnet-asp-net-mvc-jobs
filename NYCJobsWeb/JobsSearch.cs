using Microsoft.Azure.Search;
using Microsoft.Azure.Search.Models;
using System;
using System.Collections.Generic;
using System.Globalization;

namespace NYCJobsWeb
{
    public class JobsSearch
    {
        private readonly SearchServiceClient _searchClient;
        private readonly SearchIndexClient _indexClient;
        private readonly string IndexName = "nurs";
        private readonly SearchIndexClient _indexZipClient;
        private readonly string IndexZipCodes = "zipcodes";

        public JobsSearch()
        {

            var searchServiceName = Environment.GetEnvironmentVariable("JOB_SEARCH_SERVICE_NAME");
            var apiKey = Environment.GetEnvironmentVariable("JOB_SEARCH_API_KEY");

            // Create an HTTP reference to the catalog index
            _searchClient = new SearchServiceClient(searchServiceName, new SearchCredentials(apiKey));
            _indexClient = _searchClient.Indexes.GetClient(IndexName);
            _indexZipClient = _searchClient.Indexes.GetClient(IndexZipCodes);

        }

        public DocumentSearchResult Search(string searchText, string businessTitleFacet, string postingTypeFacet, string salaryRangeFacet,
            string sortType, double lat, double lon, int currentPage, int maxDistance, string maxDistanceLat, string maxDistanceLon)
        {
            // Execute search based on query string
            var sp = new SearchParameters
            {
                SearchMode = SearchMode.Any,
                Top = 10,
                Skip = currentPage - 1,
                // Limit results
                Select = new List<String>() {"id", "posting_type", "full_name", "age", "business_title",
                    "salary_range_from", "salary_range_to", "salary_frequency", "work_location", "description",
                    "posting_date", "geo_location", "tags"},
                // Add count
                IncludeTotalResultCount = true,
                // Add search highlights
                HighlightFields = new List<String>() { "description" },
                HighlightPreTag = "<b>",
                HighlightPostTag = "</b>",
                // Add facets
                Facets = new List<String>() { "business_title", "posting_type", "level", "age,interval:5", "salary_range_from,interval:10000" },
            };
            // Define the sort type
            if (sortType == "featured")
            {
                sp.ScoringProfile = "jobsScoringFeatured";      // Use a scoring profile
                sp.ScoringParameters = new List<ScoringParameter>();
                sp.ScoringParameters.Add(new ScoringParameter("featuredParam", "featured"));
                sp.ScoringParameters.Add(new ScoringParameter("mapCenterParam", lon.ToString(CultureInfo.InvariantCulture) + "," + lat.ToString(CultureInfo.InvariantCulture)));
            }
            else if (sortType == "salaryDesc")
                sp.OrderBy = new List<String>() { "salary_range_from desc" };
            else if (sortType == "salaryIncr")
                sp.OrderBy = new List<String>() { "salary_range_from" };
            else if (sortType == "mostRecent")
                sp.OrderBy = new List<String>() { "posting_date desc" };


            // Add filtering
            string filter = null;
            if (businessTitleFacet != "")
                filter = "business_title eq '" + businessTitleFacet + "'";
            if (postingTypeFacet != "")
            {
                if (filter != null)
                    filter += " and ";
                filter += "posting_type eq '" + postingTypeFacet + "'";

            }
            if (salaryRangeFacet != "" && salaryRangeFacet != "0")
            {
                if (filter != null)
                    filter += " and ";
                filter += "salary_range_from ge " + salaryRangeFacet + " and salary_range_from lt " + (Convert.ToInt32(salaryRangeFacet) + 10000).ToString();
            }

            if (maxDistance > 0)
            {
                if (filter != null)
                    filter += " and ";
                filter += "geo.distance(geo_location, geography'POINT(" + maxDistanceLon + " " + maxDistanceLat + ")') le " + maxDistance.ToString();
            }

            sp.Filter = filter;

            return _indexClient.Documents.Search(searchText, sp);
           
        }

        public DocumentSearchResult SearchZip(string zipCode)
        {
            // Execute search based on query string
            var sp = new SearchParameters
            {
                SearchMode = SearchMode.All,
                Top = 1,
            };
            return _indexZipClient.Documents.Search(zipCode, sp);
        }

        public DocumentSuggestResult Suggest(string searchText, bool fuzzy)
        {
            // Execute search based on query string
            SuggestParameters sp = new SuggestParameters()
            {
                UseFuzzyMatching = fuzzy,
                Top = 8
            };

            return _indexClient.Documents.Suggest(searchText, "sg", sp);
            
        }

        public Document LookUp(string id)
        {
            // Execute geo search based on query string
            return _indexClient.Documents.Get(id);

        }

    }
}
