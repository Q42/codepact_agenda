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
      var $card = $('<div class="card reduced"></div>');


      var $thumbnail = $('<img src="'+ this.gsx$afbeeldingurl.$t +'">');

      var $whereAndWhen = $('<div></div');
      var $date = '<div class="date">'+ this.gsx$datumvisueel.$t +'</div>';
      var $location = '<div class="date">'+ this.gsx$plaats.$t +'</div>';
      var $company = ('<div class="companyName">'+ this.gsx$partner.$t +'</div>');
      $whereAndWhen.append($date, $location, $company);

      var $companyHeader = $('<div class="flex"></div').append($thumbnail, $whereAndWhen);


      var $name;
      if (this.gsx$link.$t){
        $name = $('<a href="'+ this.gsx$link.$t +'"><div class="eventName">'+ this.gsx$naamevenement.$t +'</div></a>');
      } else {
        $name = ('<div class="eventName">'+ this.gsx$naamevenement.$t +'</div>');
      }


      var $description = $('<div class="description">'+ this.gsx$beschrijving.$t +'</div>');

      
      $card.append($companyHeader, $name, $description);


      var doelgroep = this.gsx$doelgroep.$t;
      $('#voor' + doelgroep).append($card);
    });

    /******************************
      Expand and reduce cards
    ******************************/
    $('.card').on('click', function(evt){
      $card = $(evt.target).closest('.card');
      if ($card.hasClass('reduced')){
        $card.removeClass('reduced');
        $card.addClass('expanded');
      } else {
        $card.removeClass('expanded');
        $card.addClass('reduced');
      }
    });

  });

  /******************************
    Navigates between sections
  ******************************/
  $('.jumpTo').click(function(evt){
    var id = "#" + evt.target.getAttribute('data-destination') + "Header";
    var destination = $(id).offset().top - 75;
    $("html, body").animate({scrollTop: destination}, 1500);
  });

});
