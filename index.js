// original spreadsheet, not published to the web
var codepactSpreadsheetID = "13ywxG0Jq-eX-07mffPsPpfz1ZP8WQZu4qZ8YuVX0ecM";
// copy, which has been published to the web
var codepactSpreadsheetCopyID = "17DYs_snLxkW2mCYotkJe4IpRvI4i9A0kBbkhNKvi3nc";

var url = "https://spreadsheets.google.com/feeds/list/" + codepactSpreadsheetCopyID + "/1/public/values?alt=json";

var columns = [
  "datum",
  "tijd",
  "datumvisueel",
  "naamevenement",
  "partner",
  "plaats",
  "link",
  "beschrijving"
];

$(function() {
  $.getJSON(url, function(data) {

    var entry = data.feed.entry;
    console.log("entry = ", entry);

    $(entry).each(function(){
      $card = $('<div class="card"></div>');


      $companyHeader = $('<div class="flex"></div');

      $thumbnail = $('<img src="'+ this.gsx$afbeeldingurl.$t +'">');

      $dateAndLocation = $('<div></div');
      $date = '<div class="date">'+ this.gsx$datumvisueel.$t +'</div>';
      $location = '<div class="date">'+ this.gsx$plaats.$t +'</div>';
      $dateAndLocation.append($date, $location);

      $companyHeader.append($thumbnail, $dateAndLocation);


      $nameAndCompany = $('<div></div>');
      $name = ('<div class="eventName">'+ this.gsx$naamevenement.$t +'</div>');
      $company = ('<div class="companyName">'+ this.gsx$partner.$t +'</div>');
      $nameAndCompany.append($name, $company);


      $card.append($companyHeader, $nameAndCompany);


      if (this.gsx$link.$t){
        $website = $('<a href="'+ this.gsx$link.$t +'"><div class="website">website</div></a>');
        $card.append($website);
      }


      $description = $('<div class="description">'+ this.gsx$beschrijving.$t +'</div>');
      $card.append($description);


      var doelgroep = this.gsx$doelgroep.$t;
      $('#voor' + doelgroep).append($card);
    });

  });
});
