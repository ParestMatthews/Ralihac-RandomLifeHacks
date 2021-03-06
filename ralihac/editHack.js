var hackName = document.forms["editForm"]["hackName"];
var hackCategory = document.forms["editForm"]["hackCategory"];
var hackDescrption = document.forms["editForm"]["hackDescrption"];

var hackNameError = document.getElementById("hackNameError");
var hackCategoryError = document.getElementById("hackCategoryError");
var hackDescrptionError = document.getElementById("hackDescrptionError");


function hackNameVerify(){
  if (hackName.value != ""){
    hackName.style.border = "";
    hackNameError.innerHTML = "";
    return true;
  }
}
function hackCategoryVerify(){
  if (hackCategory.value != ""){
    hackCategory.style.border = "";
    hackCategoryError.innerHTML = "";
    return true;
  }
}
function hackDescrptionVerify(){
  if (hackDescrption.value != ""){
    hackDescrption.style.border = "";
    hackDescrptionError.innerHTML = "";
    return true;
  }
}

hackName.addEventListener("blur", hackNameVerify, true);
hackCategory.addEventListener("blur", hackCategoryVerify, true);
hackDescrption.addEventListener("blur", hackDescrptionVerify, true);


function editHack(hackId){ //reusable
   event.preventDefault();
  if (hackName.value == "" || hackCategory.value == "" || hackDescrption.value == "" ){
    var variables = [hackName, hackCategory, hackDescrption];
    var errors = [hackNameError, hackCategoryError, hackDescrptionError];
    var countErrors = [];

    for(i = 0; i < variables.length; i++){
      if (variables[i].value == ""){
        variables[i].style.border = "1.3px solid red";
          switch (i){
            case 0:
                errors[i].textContent = "Enter Life Hack Name";
                break;
            case 1:
                errors[i].textContent = "Select Category";
                break;
            case 2:
                errors[i].textContent = "Enter Life Hack Desciption";
                break;
          }
        variables[i].focus();
        countErrors.push(i);
      }
    }
    if(countErrors.length > 0){
        return false;
    }
      }
// put photo ajax here before upload
      var form = document.getElementById('submitForm');
      var formData = new FormData(form);
      formData.append('hackId', hackId);
        $('#loading').css('display', 'block');
      $.ajax({
        url: './ajax_files/ajax_php_edit_hacks.php',
        type: 'POST',
        data: formData,
        datatype: 'JSON',
        contentType: false,
        processData: false,
        cache: false,
        success: function(response){
          var parseJSON = JSON.parse(response);

          if (response == 'explicit'){
            // explcit content found
              $('#loading').css('display', 'none');
              $('#explicitModal').modal('show');

          }else if (Object.keys(parseJSON).length > 1){
            // success modal

              $('#loading').css('display', 'none');
              $('#editModal').modal('toggle');


            if(Object.keys(parseJSON).length == 3){

              $('#hackNameModify').html('<b>'+parseJSON.name+'</b>');
              $('#hackCategoryModify').html(parseJSON.category);
              $('#hackDescriptionModify').html(parseJSON.description);
              $(".textbox-custom ").each(function(){
                  var preview = emojione.toImage(jQuery(this).html());
                  jQuery(this).html(preview);
              });

            }else if (Object.keys(parseJSON).length == 4) {

              $('#hackNameModify').html('<b>'+parseJSON.name+'</b>');
              $('#hackCategoryModify').html(parseJSON.category);
              $('#hackDescriptionModify').html(parseJSON.description);
              $('#image').attr('src',parseJSON.image);
              $(".textbox-custom ").each(function(){
                  var preview = emojione.toImage(jQuery(this).html());
                  jQuery(this).html(preview);
              });

            }

              $('#updatedHackModal').modal('show');

          }else{
            // buffers all errors from ajax call
                $('#loading').css('display', 'none');
                $("#message").html(response);

            }

        }
      });
  }

  $(".custom-file-input").on("change", function() {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
  });

  $(function() {
    $("#file").change(function() {
      $("#message").empty();
      var file = this.files[0];
      var imagefile = file.type;
      var match = ["image/jpeg","image/jpg"];
      if(!((imagefile==match[0]) || (imagefile==match[1])))
        {
          $('#editImage').attr('src','./images/siteimages/no_image.png');
          $("#message").html("<small id='error' class='text-danger'>Please Select A valid Image File</small>"+"<br><small id='error_message' class='text-danger'>Only jpeg and jpg images type allowed</small>");
          $('#editImage').css('border', '1.3px solid red');
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
    $('#editImage').attr('src', e.target.result);
    $('#editImage').css('border', 'none');
  };

  $(document).ready(function() {
      $('textarea').emojioneArea({
        pickerPosition: 'bottom'
      });

  });
  $(".textbox-custom ").each(function(){
      var preview = emojione.toImage(jQuery(this).html());
      jQuery(this).html(preview);
  });
