var url = "https://spreadsheets.google.com/feeds/list/13ywxG0Jq-eX-07mffPsPpfz1ZP8WQZu4qZ8YuVX0ecM/1/public/values?alt=json";

$(function() {
  /******************************
    Gets data from spreadsheet
  ******************************/
  $.getJSON(url, function(data) {

    var entry = data.feed.entry;
    console.log("entry = ", entry);

    entry.map(function(row){
      row.gsx$datum.$t = new Date(row.gsx$datum.$t);
    });
    entry = entry.sort(function(a, b){
      if (a.gsx$datum.$t > b.gsx$datum.$t){
        return 1;
      } else if (a.gsx$datum.$t < b.gsx$datum.$t){
        return -1;
      } else {
        return 0;
      }
    });

    /******************************
      Attaches data to the page
    ******************************/
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

  /******************************
    Navigates between sections
  ******************************/
  $('.jumpTo').click(function(evt){
    var destination = evt.target.getAttribute('data-destination');
    $(document).scrollTop( $("#" + destination + "Header").offset().top );
  });

});
