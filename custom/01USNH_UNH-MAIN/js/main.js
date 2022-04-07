import "@orbis-cascade/primo-explore-external-search";
import "primo-explore-search-bar-sub-menu";

import "./components/helpMenu/helpMenu.module";

import ExternalSearchConfig from "./components/externalSearch/externalSearch.config";
import HelpMenuConfig from "./components/helpMenu/helpMenu.config";
import SearchBarSubMenuConfig from "./components/searchBarSubMenu/searchBarSubMenu.config";
import PRMSearchBarAfterDirective from "./directives/prmSearchBarAfter.directive";

const app = angular.module("viewCustom", [
  "angularLoad",
  "externalSearch",
  "helpMenuContentDisplay",
  "helpMenuTopbar",
  "searchBarSubMenu",
]);

// Adds the chat slide out
(function () {
  const lc = document.createElement("script");
  lc.type = "text/javascript";
  lc.async = "true";
  lc.src =
    "https://v2.libanswers.com/load_chat.php?hash=17b1fa99b577483a418172851f40a779";
  const s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(lc, s);
})();

app
  .constant("helpMenuConfig", HelpMenuConfig)
  .constant("searchBarSubMenuItems", SearchBarSubMenuConfig)
  .component("prmSearchBarAfter", PRMSearchBarAfterDirective)
  .value("searchTargets", ExternalSearchConfig);
