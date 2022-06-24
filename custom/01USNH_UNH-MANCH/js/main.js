import "@orbis-cascade/primo-explore-external-search";
import "primo-explore-lod-author-card";

import "./components/helpMenu/helpMenu.module";

import ExternalSearchConfig from "./components/externalSearch/externalSearch.config";
import HelpMenuConfig from "./components/helpMenu/helpMenu.config";
import PRMFullViewAfterDirective from "./directives/prmFullViewAfter.directive";

// eslint-disable-next-line no-undef
const app = angular.module("viewCustom", [
  "angularLoad",
  "externalSearch",
  "helpMenuContentDisplay",
  "helpMenuTopbar",
  "lodAuthorCard",
]);

app
  .constant("helpMenuConfig", HelpMenuConfig)
  .component("prmFullViewAfter", PRMFullViewAfterDirective)
  .value("searchTargets", ExternalSearchConfig);

// Set vid value and safe path
app.vid = "01USNH_UNH:MANCH";
app.vidPath = "custom/" + app.vid.toString().replace(":", "-");

/** No Results Page **/
// https://github.com/SarahZum/primo-explore-custom-no-results/blob/master/js/no-results.js
// app.controller("NoSearchResultAfterController", [function () {}]);

// app.component("prmNoSearchResultAfter", {
//   bindings: {
//     parentCtrl: "<",
//   },
//   require: {
//     prmNoSearchResultAfter: "^prmNoSearchResultAfter",
//   },
//   controller: "NoSearchResultAfterController",
//   templateUrl: `${app.vidPath}/html/angular/prmNoSearchResultAfter.html`,
// });

// app.controller("PrimoExploreCustomNoResultsController", [
//   "$location",
//   function ($location) {
//     const vm = this;
//     vm.getQuery = $location
//       .search()
//       .query.toString()
//       .replace("AND,", "AND&query=")
//       .replace("OR,", "OR&query=")
//       .replace("NOT,", "NOT&query=");
//     vm.getMode = $location.search().mode;
//     vm.getSearchTerm = getSearchTerm;
//     vm.pciSetting =
//       vm.parentCtrl.searchStateService.searchObject.pcAvailability || "";

//     function getSearchTerm() {
//       return vm.parentCtrl.term;
//     }
//   },
// ]);

// Enhance No Results tile
// app.controller("PrmNoSearchResultAfterController", [
//   function () {
//     const vm = this;
//     vm.getSearchTerm = getSearchTerm;
//     vm.pciSetting =
//       vm.parentCtrl.searchStateService.searchObject.pcAvailability || "";

//     function getSearchTerm() {
//       return vm.parentCtrl.term;
//     }
//   },
// ]);

// app.component("primoExploreCustomNoResults", {
//   bindings: {
//     parentCtrl: "<",
//   },
//   require: {
//     primoExploreCustomNoResults: "^primoExploreCustomNoResults",
//   },
//   controller: "PrimoExploreCustomNoResultsController",
//   templateUrl: app.vidPath + "/html/help/noResults.html",
// });
/** No Results Page **/

// app.controller("LibChatController", [
//   "$scope",
//   ($scope) => {
//     $scope.lcWidget = document.createElement("script");
//     $scope.lcWidget.src =
//       "https://libraryanswers.unh.edu/load_chat.php?hash=0d21037d8bcc69a651486fdbdb25b045";
//     document
//       .getElementById("libchat_0d21037d8bcc69a651486fdbdb25b045")
//       .parentNode.append($scope.lcWidget);
//   },
// ])
/** Insert LibGuides AZ List **/
// app
//   .constant(
//     "libGuidesWidgetBaseUrl",
//     "https://lgapi-us.libapps.com/widgets.php"
//   )
//   .config([
//     "$sceDelegateProvider",
//     "libGuidesWidgetBaseUrl",
//     ($sceDelegateProvider, libGuidesWidgetBaseUrl) => {
//       const urlWhitelist = $sceDelegateProvider.resourceUrlWhitelist();
//       urlWhitelist.push(libGuidesWidgetBaseUrl + "**");
//       $sceDelegateProvider.resourceUrlWhitelist(urlWhitelist);
//     },
//   ])
//   .component("prmLibGuidesAz", {
//     bindings: {
//       parentCtrl: "<",
//     },
//     controller: "PrmLibGuidesAzController", //,
//     //templateUrl: '//lgapi-us.libapps.com/widgets.php?site_id=1710&widget_type=2&search_terms=&search_match=2&subject_ids=&sort_by=name&list_format=2&drop_text=Select+a+Database...&output_format=1&load_type=2&enable_description=0&widget_embed_type=2&num_results=0&enable_more_results=0&window_target=2&config_id=1587652524664'
//   })
//   .component("prmLibChat", {
//     bindings: {
//       parentCtrl: "<",
//     },
//     controller: "LibChatController",
//   });

// app.controller("PrmLibGuidesAzController", [
//   "$scope",
//   ($scope) => {
//     $scope.springStatsCfg = document.createElement("script");
//     $scope.springStatsCfg.innerHTML =
//       'const springStats = springStats || {}; springStats.saConfig = springStats.saConfig || {site_id: 1950, tracking_parameters: {"_st_site_id":1950}, tracking_server_host: "libguides-proc.springyaws.com"};';
//     document
//       .getElementById("s-lg-widget-1652280173965")
//       .parentNode.append($scope.springStatsCfg);

//     $scope.lgWidgetCfg = document.createElement("script");
//     $scope.lgWidgetCfg.innerHTML =
//       "springshare_widget_config_1652280173965 = { path: 'assets' };";
//     document
//       .getElementById("s-lg-widget-1652280173965")
//       .parentNode.append($scope.lgWidgetCfg);

//     $scope.lgScript = document.createElement("script");
//     $scope.lgScript.src = "//lgapi-us.libapps.com//web/js/sa.min.js?3116";
//     $scope.lgScript.async = true;
//     document
//       .getElementById("s-lg-widget-1652280173965")
//       .parentNode.append($scope.lgScript);

//     $scope.ssCommonScript = document.createElement("script");
//     $scope.ssCommonScript.src =
//       "//lgapi-us.libapps.com/web/js2.0.5/springshare.common.min.js";
//     $scope.ssCommonScript.async = true;
//     document
//       .getElementById("s-lg-widget-1652280173965")
//       .parentNode.append($scope.ssCommonScript);

//     $scope.lgWidget = document.createElement("script");
//     $scope.lgWidget.src =
//       "//lgapi-us.libapps.com/widgets.php?site_id=1950&widget_type=2&search_terms=&search_match=2&subject_ids=&sort_by=name&list_format=2&drop_text=Select+a+Database...&output_format=1&load_type=2&enable_description=0&widget_title=A-Z+Database+List&widget_height=250&widget_width=100%25&widget_link_color=2954d1&widget_embed_type=1&num_results=0&enable_more_results=0&window_target=2&config_id=1652280173965";
//     document
//       .getElementById("s-lg-widget-1652280173965")
//       .parentNode.append($scope.lgWidget);
//   },
// ]);
/** Insert LibGuides AZ List **/
