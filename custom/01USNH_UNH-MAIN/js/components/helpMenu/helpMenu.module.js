import {
  sample_list_of_elements,
  sample_list_of_updates,
} from "./helpMenuContent";
import {
  helpMenuContentDisplayTemplate,
  helpMenuDialogTemplate,
} from "./helpMenuTemplates";

// Handle optional configuration variables
const optionalConfigName = "helpMenuConfig";
const optionalStudioName = "primoExploreHelpMenuStudioConfig";

// Notification variables
const cssVariableName = "--notification-indicator-display";
const localStorageVariableName = "help-menu-notification-indicator-dismissed";
const DEFAULT_STORAGE_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7 * 2; // 2 weeks

// Helper functions
const logEventToGoogleAnalytics = function (category, action, label) {
  if (window.ga) {
    window.ga("send", "event", category, action, label);
  }
};

// Configurable logging, event-handling, and interaction with help content
const helpMenuHelper = {
  logToConsole: false,
  publishEvents: false,

  enableNotificationIndicator: false,
  notificationIndicatorExpiration: DEFAULT_STORAGE_EXPIRATION_TIME,

  updatesLabel: "Search Updates",
  entriesLabel: "Help Entries",
  list_of_elements: sample_list_of_elements,

  helpMenuWidth: 500,
  logMessage(message) {
    if (this.logToConsole) {
      console.log(`bulib-help-menu) ${message}`);
    }
  },
  logEventToAnalytics(category, action, label) {
    logEventToGoogleAnalytics(category, action, label);
  },
  logHelpEvent(action, label = window.location.pathname) {
    // Prepare (and logMessage regarding) the event sent to the `logEventToAnalytics`
    const category = "help-menu";
    this.logMessage(
      `logging '${category}' event with action: '${action}', label:'${label}'. [publish: ${this.publishEvents}]`
    );

    if (this.publishEvents) {
      this.logEventToAnalytics(category, action, label);
    }
  },
  isNotificationDismissed() {
    try {
      // Return true iff there's a value for 'help-menu-notification-*' key in localStorage that has not expired
      const notificationDismissedValue = window.localStorage.getItem(
        localStorageVariableName
      );

      // Return false if there's no value stored at all
      if (notificationDismissedValue === null) {
        return false;
      }
      // If it's present, check for expiration. if it's expired, remove the value and return false.
      const timeSinceUpdated = Date.now() - notificationDismissedValue;
      if (timeSinceUpdated >= helpMenuHelper.notificationIndicatorExpiration) {
        this.logMessage(
          `'${localStorageVariableName}' value is present, but has expired. removing it returning 'not dismissed'`
        );
        localStorage.removeItem(localStorageVariableName);
        return false;
      }

      // If there's an unexpired value there, it's been rightfully/recently dismissed

      return true;
    } catch (err) {
      // If there's an error or localStorage is disabled, default to dismissed
      this.logMessage(err);
      return true;
    }
  },
  showNotificationIndicatorIfNotDismissed() {
    if (this.enableNotificationIndicator && !this.isNotificationDismissed()) {
      this.logMessage(
        "'enableNotificationIndicator' is true, local storage is enabled, and it's not dismissed, so we'll show the indicator"
      );
      document
        .querySelector("help-menu-topbar")
        .style.setProperty(cssVariableName, "inline-block");
    }
  },
  dismissNotificationIndicator() {
    try {
      // Add dismissed value to localStorage and hide the indicator with the css variable
      if (this.enableNotificationIndicator) {
        window.localStorage.setItem(localStorageVariableName, Date.now());
        document
          .querySelector("help-menu-topbar")
          .style.setProperty(cssVariableName, "none");
        this.logMessage("notification-indicator dismissed");
      }
    } catch (err) {
      this.logMessage(err);
    }
  },
  get_entry_by_id(id) {
    // Return a specified entry from 'list_of_elements' for the specified id (or {})
    for (let i = 0; i < this.list_of_elements.length; i++) {
      if (this.list_of_elements[i].id === id) {
        return this.list_of_elements[i];
      }
    }
    for (let i = 0; i < this.list_of_updates.length; i++) {
      if (this.list_of_updates[i].id === id) {
        return this.list_of_updates[i];
      }
    }
    return {};
  },
  override_with_config(config) {
    // If a custom configuration is found, update current settings to what's specified
    if (!config || !Object.keys(config)) {
      return;
    }
    if (Object.keys(config).includes("logToConsole")) {
      this.logToConsole = config.logToConsole;
    }
    if (Object.keys(config).includes("publishEvents")) {
      this.publishEvents = config.publishEvents;
    }
    if (Object.keys(config).includes("enableNotificationIndicator")) {
      this.enableNotificationIndicator = config.enableNotificationIndicator;
    }
    if (Object.keys(config).includes("notificationIndicatorExpiration")) {
      this.notificationIndicatorExpiration =
        config.notificationIndicatorExpiration;
    }
    if (Object.keys(config).includes("helpMenuWidth")) {
      this.helpMenuWidth = config.helpMenuWidth;
    }
    if (Object.keys(config).includes("helpMenuTitle")) {
      this.helpMenuTitle = config.helpMenuTitle;
    }
    if (Object.keys(config).includes("logEventToAnalytics")) {
      this.logEventToAnalytics = config.logEventToAnalytics;
    }
    if (Object.keys(config).includes("entriesLabel")) {
      this.entriesLabel = config.entriesLabel;
    }
    if (Object.keys(config).includes("list_of_elements")) {
      this.list_of_elements = config.list_of_elements;
    }
    if (Object.keys(config).includes("updatesLabel")) {
      this.updatesLabel = config.updatesLabel;
    }
    if (Object.keys(config).includes("list_of_updates")) {
      this.list_of_updates = config.list_of_updates;
    }
  },
};

// The shared controller containing the logic for selecting, closing, and loading the help-menu
const mainHelpMenuController = function (
  helpMenuHelper,
  $injector,
  $scope,
  $timeout,
  $mdDialog
) {
  // Look for the optional 'helpMenuConfig' if present
  let config = {};
  if ($injector.has(optionalConfigName)) {
    config = $injector.get(optionalConfigName);
  }
  if ($injector.has(optionalStudioName)) {
    config = $injector.get(optionalStudioName);
  }
  helpMenuHelper.override_with_config(config);

  // Gather items in list from helpMenuHelper
  $scope.helpMenuTitle = helpMenuHelper.helpMenuTitle;
  $scope.entriesLabel = helpMenuHelper.entriesLabel;
  $scope.helpContentList = helpMenuHelper.list_of_elements;
  $scope.updatesLabel = helpMenuHelper.updatesLabel;
  $scope.helpContentUpdates = helpMenuHelper.list_of_updates;

  // Modal navigation
  $scope.hide = function () {
    $mdDialog.hide();
  };
  $scope.back = function () {
    $scope.entry = null;
    window.top.location.hash = "";
  };
  $scope.openItem = function (id, count_as_click = true) {
    $scope.entry = helpMenuHelper.get_entry_by_id(id);
    if (count_as_click) {
      helpMenuHelper.logHelpEvent("select-item", id);
    }
  };

  // Set the currently selected item from the hash in the url
  $scope.setEntryIdFromHash = function (count_as_click = true) {
    const helpOptionId = window.location.hash.substring(1);
    if (helpOptionId) {
      $scope.openItem(helpOptionId, count_as_click);
    }
  };

  // Trigger the help-menu to open in a new window and return focus to main page
  $scope.openHelpInNewWindow = function (item_id = "") {
    let help_event_label = window.location.pathname;
    let help_page_url = `/discovery/static-file/help${window.location.search}`;

    // If present, send and log the 'help-option' instead of the url
    if (item_id) {
      help_page_url += `#${item_id}`;
      help_event_label = item_id;
    }

    // Open the help-menu in a new-window
    const popup_title = helpMenuHelper.helpMenuTitle || "Search Help Menu";
    const params = `width=${helpMenuHelper.helpMenuWidth},height=800,resizable=0,location=0,menubar=0,scrollbars=yes`;
    helpMenuHelper.logHelpEvent("open-window", help_event_label);
    const help_popup = open(help_page_url, popup_title, params);
    help_popup.onload = function () {
      this.document.title = popup_title;
    };

    // Prepare new window to handle 'select-option' via the '#', and close the dialog
    help_popup.addEventListener("hashchange", $scope.setEntryIdFromHash, true);
    $scope.hide();
  };

  // After the page finishes loading, trigger a check to see which entry to open
  $timeout($scope.setEntryIdFromHash(false), 10);

  // Keep listening for changes in the page's 'hash' to see which entry to show (e.g. '/path/to#hash')
  window.addEventListener("hashchange", $scope.setEntryIdFromHash, true);

  // Listen for any 'openHelpMenuEvent' to open menu in a new window
  window.addEventListener("openHelpMenuEvent", (ev) => {
    const entry_id = ev.detail || "";
    helpMenuHelper.logMessage(
      `opening helpMenu from 'openHelpMenuEvent' with 'item_id': '${entry_id}'`
    );
    $scope.openHelpInNewWindow(entry_id);
  });
};

// The simplest-case display for the help-menu when rendered directly into the page (`discovery/static-file/help`)
angular
  .module("helpMenuContentDisplay", [])
  .constant("helpMenuHelper", helpMenuHelper)
  .controller("helpMenuPopupController", [
    "helpMenuHelper",
    "$injector",
    "$scope",
    "$timeout",
    "$mdDialog",
    mainHelpMenuController,
  ])
  .component("prmExploreFooterAfter", {
    template: `
      <help-menu-content-display>
        <div ng-if="${window.location.pathname.includes(
          "/static-file/help"
        )}">${helpMenuContentDisplayTemplate}</div>
      </help-menu-content-display>`,
    controller: "helpMenuPopupController",
  });

// The topbar button and the dialog content it triggers
angular
  .module("helpMenuTopbar", ["ngMaterial"])

  // Add the helper used by both modules (shared)
  .constant("helpMenuHelper", helpMenuHelper)

  // Add the controller for the dialog once its open (shared)
  .controller("helpMenuDialogController", [
    "helpMenuHelper",
    "$injector",
    "$scope",
    "$timeout",
    "$mdDialog",
    mainHelpMenuController,
  ])

  // Add a controller for the icon in the top right
  .controller("helpMenuTopbarController", [
    "helpMenuHelper",
    "$injector",
    "$mdDialog",
    function (helpMenuHelper, $injector, $mdDialog) {
      // Look for the optional 'helpMenuConfig' if present
      let config = {};
      if ($injector.has(optionalConfigName)) {
        config = $injector.get(optionalConfigName);
      }
      if ($injector.has(optionalStudioName)) {
        config = $injector.get(optionalStudioName);
      }
      helpMenuHelper.override_with_config(config);
      helpMenuHelper.showNotificationIndicatorIfNotDismissed();

      // Open the dialog when the button in the top right is pressed
      this.openHelpMenu = function (ev) {
        helpMenuHelper.logHelpEvent("open-dialog", window.location.pathname);
        helpMenuHelper.dismissNotificationIndicator();
        $mdDialog.show({
          controller: "helpMenuDialogController",
          template: helpMenuDialogTemplate(helpMenuHelper.helpMenuWidth),
          hasBackdrop: true,
          multiple: false,
          clickOutsideToClose: true,
          fullscreen: false,
          focusOnOpen: true,
        });
      };
    },
  ])

  // Add the actual icon in the top right and hook the controller to it
  .component("prmSearchBookmarkFilterAfter", {
    template: `
      <help-menu-topbar>
        <div class="layout-align-center layout-row">
          <a class="md-icon-button button-over-dark md-button md-primoExplore-theme md-ink-ripple"
                    aria-label="Open Search Help Menu" ng-click="$ctrl.openHelpMenu($event)"
                    href="#" title="open help menu">
            <prm-icon icon-type="svg" svg-icon-set="action" icon-definition="ic_help_24px"></prm-icon>
          </a>
        </div>
        <span class="notification-indicator"></span>
      </help-menu-topbar>`,
    controller: "helpMenuTopbarController",
  });
