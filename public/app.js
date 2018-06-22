// Get scrapedJSON articles & create card for each one
$.getJSON("/articles", function (data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append(
      "<div data-id='" + data[i]._id + "' class='card'><div class='card-header'><h5>" + data[i].title +
      "</h5></div><div class='card-body'><div class='row'><div class='col'><img src='" + data[i].image + "'></div><div class='col'>"
      + "<p>" + data[i].excerpt + "<br /><div class='align-text-bottom'><a href='"
      + data[i].link + "' class='btn btn-dark' target='_blank'>View Article</a></div></div></p></div></div></div></div> ")
  }
});


// On document load: clicking on a card pulls up its comment card
$(document).on("click", "div.card", function () {
  $("#comments").empty();

  var thisId = $(this).attr("data-id");   // comment card id is attached to the article it belongs to

  $.ajax({    // Get specific article
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(function (data) {  // Build comment card for this article
      console.log(data);
      $("#comments").append("<div class='card comment-card'><div class='card-header'><p class='font-weight-bold'>"
        + data.title + "</p><input id='titleinput' name='title' class='form-control' placeholder='Note Title'></div><div class='card-body'>"
        + "<textarea class='form-control' rows='5' id='bodyinput' name='body' placeholder='Comments...'></textarea><button data-id='"
        + data._id + "' id='savecomment' class='btn btn-dark'>Save</button></div></div>");

      if (data.comment) {   // Push existing data into card
        $("#titleinput").val(data.comment.title);
        $("#bodyinput").val(data.comment.body);
      }

    });
});

// Clicking "save comment"
$(document).on("click", "#savecomment", function () {

  var thisId = $(this).attr("data-id");

  $.ajax({    // Post comment content to the article it belongs to
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })
    .then(function (data) {
      console.log(data);
      $("#comments").empty(); // Empty comment card div
    });

  $("#titleinput").val("");   // Clear commment card content
  $("#bodyinput").val("");
});
