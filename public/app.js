// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append(
      "<div class='card'><div class='card-header'><h5>" + data[i].title + 
      "</h5></div><div class='card-body'><div class='row'><div class='col'><img src='" + data[i].image + "'></div><div class='col'>" 
      + "<p data-id='" + data[i]._id + "'>" + data[i].excerpt + "<br /><div class='align-text-bottom'><a href='" 
      + data[i].link + "' class='btn btn-dark' target='_blank'>View Article</a></div></div></p></div></div></div></div> ")
  }
});
  

  // Whenever someone clicks a p tags
  $(document).on("click", "p", function() {
    // Empty the notes from the note section
    $("#comments").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        $("#comments").append("<div class='card comment-card'><div class='card-header'><p class='font-weight-bold'>"
        + data.title + "</p><input id='titleinput' name='title' class='form-control' placeholder='Note Title'></div><div class='card-body'>"
        + "<textarea class='form-control' rows='5' id='bodyinput' name='body' placeholder='Comments...'></textarea><button data-id='"
        + data._id + "' id='savecomment' class='btn btn-dark'>Save</button></div></div>");
  
        // If there's a note in the article
        if (data.comment) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.comment.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.comment.body);
        }
      });
  });
  
  // When you click the savenote button
  $(document).on("click", "#savecomment", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#comments").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  