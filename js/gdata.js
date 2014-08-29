;(function(exports) {
    "use strict";

    exports.$gdata = {
        parseSpreadsheet: function(json) {
            var entries = json.feed.entry || [];
            return _.map(entries, function(entry) {
                // e.g. "tier: 1, bug: 1002880, reason: AMO #8, amourl: https://addons.mozilla.org/en-US/firefox/addon/wot-safe-browsing-tool"
                var title = (entry.title.type === "html") ? entry.title.$t : encodeURIComponent(entry.title.$t);
                var row = {title:title};
                var content = entry.content.$t.split(", ");

                _.forEach(content, function(column) {
                    var [key, value] = column.split(": ");
                    row[key] = value;
                });

                return row;
            });
        }
    };
})(this);
