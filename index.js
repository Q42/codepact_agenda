// original spreadsheet
var codepactSpreadsheetID = "13ywxG0Jq-eX-07mffPsPpfz1ZP8WQZu4qZ8YuVX0ecM";
// copy, which has been published to the web
var codepactSpreadsheetCopyID = "17DYs_snLxkW2mCYotkJe4IpRvI4i9A0kBbkhNKvi3nc";

var url = "https://spreadsheets.google.com/feeds/list/" + codepactSpreadsheetCopyID + "/1/public/values?alt=json";

$(function() {
  $.getJSON(url, function(data) {
    var entry = data.feed.entry;
    console.log("entry = ", entry);

    $header = $('<tr></tr>');
    for (var key in entry[0]){
      if (key.indexOf('gsx$') > -1){
        var header = key.slice(4);
        $header.append($('<th>' + header + '</th>'));
      }
    }
    $('#agenda').append($header);
  });
});
