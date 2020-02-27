/*Character counter function that takes a text area length and decreases
while typing, if the user goes beyond the character count the it will turn 
red*/

$(document).ready(function() {
  let textArea = $("textarea");
  let maxLength = 140;
  $(".counter").text(maxLength);
  textArea.on("keyup", e => {
    countChars = maxLength - textArea.val().length;
    if (countChars < 0) {
      $(".counter")
        .text(countChars)
        .css("color", "red");
    } else if (countChars === 140) {
      $(".counter").text(maxLength);
    } else if (countChars < 140) {
      $(".counter")
        .text(countChars)
        .css("color", "#545149");
    }
  });
});
