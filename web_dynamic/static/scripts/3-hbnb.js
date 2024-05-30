$(document).ready(function () {
    const amenities = {};

    // Function to handle checkbox changes
    $("li input[type=checkbox]").change(function () {
        if (this.checked) {
            amenities[this.dataset.name] = this.dataset.id;
        } else {
            delete amenities[this.dataset.name];
        }
        updateAmenities();
    });

    // Function to update the displayed amenities
    function updateAmenities() {
        $(".amenities h4").text(Object.keys(amenities).sort().join(", "));
    }

    // Function to check API status
    $.get("http://0.0.0.0:5001/api/v1/status/", function (response) {
        if (response.status === 'OK') {
            $('div#api_status').addClass('available');
        } else {
            $('div#api_status').removeClass('available');
        }
    });

    // Function to load places initially
    loadPlaces();

    // Function to load places initially
    function loadPlaces() {
        const url = "http://0.0.0.0:5001/api/v1/places_search/";
        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify({}),
            headers: {
                "Content-Type": "application/json",
            },
            dataType: "json",
            success: function (data) {
                updatePlaces(data);
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            }
        });
    }

    // Function to update the displayed places
    function updatePlaces(places) {
        $("section.places").empty();
        places.forEach(function (place) {
            $("section.places").append(
                `<article>
                    <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">$${place.price_by_night}</div>
                    </div>
                    <div class="information">
                        <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? "s" : ""}</div>
                        <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? "s" : ""}</div>
                        <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? "s" : ""}</div>
                    </div>
                    <div class="description">
                        ${place.description}
                    </div>
                </article>`
            );
        });
    }
});

