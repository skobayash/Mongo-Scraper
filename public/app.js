// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append(
      "<div class='card'><div class='card-header'><h5>" + data[i].title + "</h5></div><div class='card-body'><p data-id=' " + data[i]._id + "'>" + data[i].excerpt + "<br /><div class='text-center'><a href='" + data[i].link + "' class='btn btn-dark'>View Article</a></div></p></div></div> ")
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
        // The title of the article
        $("#comments").append("<p class='font-weight-bold'>" + data.title + "</p>");
        // An input to enter a new title
        $("#comments").append("<input id='titleinput' name='title' placeholder='Note Title'>");
        // A textarea to add a new note body
        $("#comments").append("<textarea id='bodyinput' name='body' placeholder='Comments...'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#comments").append("<button data-id='" + data._id + "' id='savecomment' class='btn btn-dark'>Save</button>");
  
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
  