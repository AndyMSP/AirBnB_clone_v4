let amenity_dict = {};

// Check API status 
$.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
  if (status = 'success') {
    $('#api_status').addClass("available");
  }
  else {
    console.log('fail');
  }
})

$(document).ready(function () {
  $(".amenities li input").click(checkBoxStatus)
});

function checkBoxStatus() {
  if ($(this).prop("checked") == true) {
    // console.log($(this).attr('data-name') + ' is checked');
    amenity_dict[$(this).attr('data-id')] = $(this).attr('data-name');
  }
  if ($(this).prop("checked") == false) {
    // console.log($(this).attr('data-name') + ' is not checked');
    delete amenity_dict[$(this).attr('data-id')];
  }
  console.log(Object.values(amenity_dict));

  $(".amenities h4").text(Object.values(amenity_dict).join(', '));
}