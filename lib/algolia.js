import algoliasearch from "algoliasearch";

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);

const searchingIndex = client.initIndex("vendor-list-algolia");
const sourcingIndex = client.initIndex("vender-sourcing");
const algoliaSourcingCounter = client.initIndex("algoliaSourcingCounter");
export { client, searchingIndex, sourcingIndex, algoliaSourcingCounter };
