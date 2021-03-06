<?php
function login($admin_id){ // admin login
  $_SESSION['SBAdmin'] = $admin_id;
  global $db;
  $date = date("Y-m-d H:i:s");
  $query = ("UPDATE admin SET admin_date = ? WHERE admin_id = ? ");
  $stmt = $db->prepare($query);
  $stmt->bind_param('ss', $date, $admin_id);
  $stmt->execute();
  header('Location: index.php');
}

function user_login($user_id){ // User login redirect with AJAX
  $_SESSION['SBuser'] = $user_id;
  global $db;
  $date = date("Y-m-d H:i:s");
  $query = ("UPDATE user_db SET user_lastlogin = ? WHERE user_id = ? ");
  $stmt = $db->prepare($query);
  $stmt->bind_param('ss', $date, $user_id);
  $stmt->execute();
}

function sanitize($wrong){
  return htmlentities($wrong, ENT_QUOTES, "UTF-8");
}

function is_logged_in(){
  if(isset($_SESSION['SBAdmin']) && $_SESSION['SBAdmin'] > 0){
    return true;
  }
  return false;
}

function is_logged_in_user(){
  if(isset($_SESSION['SBuser']) && $_SESSION['SBuser'] > 0){
    return true;
  }
  return false;
}

function login_redirect($url = 'login.php'){
  header('Location: '.$url);
}

function trim_image_string($string){
  $output = substr($string, 3);
  return $output;
}

function timeAgo($time_ago)
{
    $time_ago = strtotime($time_ago);
    $cur_time   = time();
    $time_elapsed  = $cur_time - $time_ago;
    $seconds    = $time_elapsed ;
    $minutes    = round($time_elapsed / 60 );
    $hours      = round($time_elapsed / 3600);
    $days       = round($time_elapsed / 86400 );
    $weeks      = round($time_elapsed / 604800);
    $months     = round($time_elapsed / 2600640 );
    $years      = round($time_elapsed / 31207680 );
    // Seconds
    if($seconds <= 60){
        return "Just now";
    }
    //Minutes
    else if($minutes <=60){
        if($minutes==1){
            return "1 minute ago";
        }
        else{
            return "$minutes minutes ago";
        }
    }
    //Hours
    else if($hours <=24){
        if($hours==1){
            return "1 hour ago";
        }else{
            return "$hours hours ago";
        }
    }
    //Days
    else if($days <= 7){
        if($days==1){
            return "1 day ago";
        }else{
            return "$days days ago";
        }
    }
    //Weeks
    else if($weeks <= 4.3){
        if($weeks==1){
            return "1 week ago";
        }else{
            return "$weeks weeks ago";
        }
    }
    //Months
    else if($months <=12){
        if($months==1){
            return "1 month ago";
        }else{
            return "$months months ago";
        }
    }
    //Years
    else{
        if($years==1){
            return "1 year ago";
        }else{
            return "$years years ago";
        }
    }
}
