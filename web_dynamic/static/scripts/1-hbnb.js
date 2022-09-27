let amenity_dict = {};

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