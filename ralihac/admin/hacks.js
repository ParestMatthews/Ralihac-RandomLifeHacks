$(document).ready(function (e) { // Ajax call for Image
  $("#uploadimage").on('submit',(function(e) {
    e.preventDefault();
    $("#message").empty();


    var hackTitle = $('#hack');
    var hackCategory = $('#categories');
    var hackDescription = $('#description');
    var noName = $('#noName');
    var noNameTwo = $('#noNameTwo');
    var noNameThree = $('#noNameThree');

    if(isNotEmpty(hackTitle, noName) && isNotEmpty(hackCategory, noNameTwo) && isNotEmpty(hackDescription, noNameThree)){
      $.ajax({
        url: "ajax_php_file.php", // Url to which the request is send
        type: "POST",             // Type of request to be send, called as method
        data: new FormData(this),
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false,        // To send DOMDocument or non processed data file it is set to false
        success: function(data)   // A function to be called if request succeeds
          {
            $("#message").html(data);hackCategory
          }
      });
    }
  }));

  function isNotEmpty(call, name){
    if (call.val() == ''){
      call.css('border', '1px solid red');
      name.css('color', 'red')
      name.html('Enter Value');
      return false;
    }else{
      call.css('border', '');
      name.html('');
      return true;
    }
  }

  // Function to preview image after validation (Validation Only)
  $(function() {
    $("#file").change(function() {
      $("#message").empty(); // To remove the previous error message
      var file = this.files[0];
      var imagefile = file.type;
      var match = ["image/jpeg","image/jpg"];
      if(!((imagefile==match[0]) || (imagefile==match[1])))
        {
          $('#previewing').attr('src','../images/siteimages/no_image.png'); //changes
          $("#message").html("<p id='error'>Please Select A valid Image File</p>"+"<h4>Note</h4>"+"<span id='error_message'>Only jpeg and jpg images type allowed</span>");
          return false;
        }
      else
        {
          var reader = new FileReader();
          reader.onload = imageIsLoaded;
          reader.readAsDataURL(this.files[0]);
        }
    });
  });

  function imageIsLoaded(e) {
    $("#file").css("color","green");
    $('#image_preview').css("display", "block");
    $('#previewing').attr('src', e.target.result);
    $('#previewing').attr('width', '250px');
    $('#previewing').attr('height', '230px');
  };
});
