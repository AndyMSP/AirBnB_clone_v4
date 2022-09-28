let search_dict = {};
let amenity_dict = {};

// Check API status 
$.get('http://0.0.0.0:5001/api/v1/status/', checkApiStatus);

$(document).ready(function () {
  $(".amenities li input").click(checkBoxStatus);
  $("button").click(placePostRequest);
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

function checkApiStatus(data, status) {
  if (status = 'success') {
    $('#api_status').addClass("available");
  }
  else {
    console.log('fail');
  }
}

function placePostRequest() {
  const search_url = 'http://0.0.0.0:5001/api/v1/places_search';
  search_dict["amenities"] = Object.keys(amenity_dict);
  const data = JSON.stringify(search_dict);
  $.ajax({
    type: "POST",
    url: search_url,
    data: data,
    headers: {
      "Content-Type": "application/json"
    },
    success: placeUpdate,
  });
}

function placeUpdate(data, status) {
  $(".places").html("")
  for (place of data) {
    $(".places").append(
      `<article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">\$${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${place.max_guest} Guests</div>
            <div class="number_rooms">${place.number_rooms} Bedrooms</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
          </div>
          <div class="description">
          ${place.description}
        </div>
      </article>`
    )
  }
  console.log(amenity_dict);
}

