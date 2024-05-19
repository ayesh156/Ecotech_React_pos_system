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
        $customer_rs = Database::search("SELECT id, name, email, mobile, balance  FROM customer WHERE user_email = '$email'");
        $customer_num = $customer_rs->num_rows;

        if ($customer_num > 0) {
            $customer_data = array();
            while ($row = $customer_rs->fetch_assoc()) {
                // Convert id to integer
                $row['id'] = intval($row['id']);
                $customer_data[] = $row;
            }

            $response = ['status' => 1, 'message' => 'Record found successfully.', 'customer' => $customer_data];

        } else {
            $response = ['status' => 0, 'message' => 'Can\'t Find Any Customers!'];
        }
    } else {
        $response = ['status' => 0, 'message' => 'Invalid email provided.'];
    }
} else {
    $response = ['status' => 0, 'message' => 'Please login first!'];
}

echo json_encode($response);
?>