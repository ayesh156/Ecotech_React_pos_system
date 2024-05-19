<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

require "connection.php";

$province_rs = Database::search("SELECT * FROM province");
$province_num = $province_rs->num_rows;

if ($province_num > 0) {
    $province_data = array();
    while ($row = $province_rs->fetch_assoc()) {
        $province_data[] = $row;
    }

    $response = ['status' => 1, 'message' => 'Record found successfully.', 'province' => $province_data];

} else {
    $response = ['status' => 0, 'message' => 'Can\'t Find Any Province!'];
}



echo json_encode($response);
?>