<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

require "connection.php";

// Assuming 'email' is sent via Axios
$email = $_GET['email'] ?? null;

// Check if the email parameter is provided
if ($email !== null) {
    if (isset($email)) {
        $product_rs = Database::search("SELECT id, name, description,buying_price, selling_price FROM product WHERE user_email = '$email'");
        $product_num = $product_rs->num_rows;

        if ($product_num > 0) {
            $product_data = array();
            while ($row = $product_rs->fetch_assoc()) {
                // Convert id to integer
                $row['id'] = intval($row['id']);
                $product_data[] = $row;
            }

            $response = ['status' => 1, 'message' => 'Record found successfully.', 'product' => $product_data];

        } else {
            $response = ['status' => 0, 'message' => 'Can\'t Find Any Products!'];
        }
    } else {
        $response = ['status' => 0, 'message' => 'Invalid email provided.'];
    }
} else {
    $response = ['status' => 0, 'message' => 'Please login first!'];
}

echo json_encode($response);
?>