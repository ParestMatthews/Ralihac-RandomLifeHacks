<?php
require_once '../system/initialize.php';
  $conn = $db->query(
    "SELECT * FROM like_db
      LEFT JOIN hack_db
      ON like_db.hack_id = hack_db.hack_id
      WHERE like_db.user_id = $user_id AND hack_db.hack_archive = 0
      ORDER BY like_db.like_date
      DESC"
    );
  $output = '';
 while ($row = mysqli_fetch_assoc($conn)){
  $hack_id = $row['hack_id'];
  $likeQuery = $db->query("SELECT * FROM like_db WHERE hack_id = $hack_id");
  $saveQuery = $db->query("SELECT * FROM save_db WHERE hack_id = $hack_id");
    $output .= "
    <div class='col-6 col-md-4'>
      <div class='card widget card-spacing' id='card-hack'>
      <div class='card card-holder'>
        <img src='".trim_image_string($row['hack_image'])."' onclick='hackModal($hack_id)'/>
        </div>
        <div class='card-body card-body-css p-3' >
          <div class='mb-2'>
              <h5><b>".$row['hack_name']."</b></h5>
          </div>
          <div class='card-text my-auto text-muted'>
                ".nl2br($row['hack_description'])."

          </div>
        </div>
        <div class='card-footer'>
          <button onclick='likeButton(".$row['hack_id'].")' class='fas fa-ban
          ";
          $store = false;
          while ($rowLikes = mysqli_fetch_assoc($likeQuery)) {
            if($rowLikes['user_id'] == $user_id){
              $store = true;
            }
          }
        $output .= ($store == true) ? ' text-danger ' : ' text-secondary ';
        $output.=
          "like-button float-right' id='likeButton".$row['hack_id']."'> <span id='likeCount".$row['hack_id']."'>Remove</span></button>
          <button onclick='saveButton(".$row['hack_id'].")' class='fas fa-bookmark
          ";
          $storeSaved = false;
          while ($rowLikes = mysqli_fetch_assoc($saveQuery)) {
            if($rowLikes['user_id'] == $user_id){
              $storeSaved = true;
            }
          }
        $output .= ($storeSaved == true) ? ' text-success ' : ' text-secondary ';
        $output .=
          "like-button float-left' id='saveButton".$row['hack_id']."'><span id='saveStatus".$row['hack_id']."'>";
        $output .= ($storeSaved == true) ? ' Saved' : ' Save ';
        $output .="</span></button>
        </div>
      </div>
    </div>";
}
if ($output == ''){
  echo $output .= "<span class='no-item text-danger text-justify d-block col-md-12'><i class='fas fa-exclamation-circle'></i> You haven't Liked any hacks yet</span>";
}else{
  echo $output;
}
?>
