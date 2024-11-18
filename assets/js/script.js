var key = "d12447f70e875413282a48b9cbe48257";
var secret = "74f692977dd47736";
var link = "https://api.flickr.com/services/rest?";

function searchImages() {
  $("#img_list").html("");
  $("#load").attr("style", "");
  var api = link;
  var name = $("#name").val();
  api +=
    "api_key=" +
    key +
    "&extras=url_h&format=json&method=flickr.photos.search&nojsoncallback=1&page=1&tags=" +
    name;
  $("#load").attr("style", "display:none");
  $.ajax({
    url: api,
    success: function (response) {
      layoutImages(response);
    },
    error: function () {
      console.log("Information could not be obtained");
    },
  });
  $("#load").attr("style", "display:none");
}

function layoutImages(films) {
  $.each(films.photos.photo, function (indice, item) {
    var img_url = imgUrl(item);
    var img_item = `
            <div class="col-md-3">
                <div class="boxShadowClass">
                    <div class="img-block">
                        <img src="${img_url}" alt="" class="zoom">
                        <a class="cursor-pointer" data-id="${item.id}" data-href="${img_url}" onclick='forcedownload(this)'>
                            <span class="mdi mdi-arrow-down-bold-circle-outline" id="mdi"></span>
                        </a>
                    </div>
                </div>
            </div>
        `;
    $("#img_list").append(img_item);
  });
}

function imgUrl(photo) {
  return (
    "https://farm" +
    photo.farm +
    ".staticflickr.com/" +
    photo.server +
    "/" +
    photo.id +
    "_" +
    photo.secret +
    "_q.jpg"
  );
}

function forcedownload(link) {
  var url = link.getAttribute("data-href");
  var id = link.getAttribute("data-id");
  var fileName = "image.jpg";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob";
  xhr.onload = function () {
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(this.response);
    var tag = document.createElement("a");
    tag.href = imageUrl;
    tag.download = link.id;
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
    window.URL.revokeObjectURL(imageUrl);
  };
  xhr.send();
}
