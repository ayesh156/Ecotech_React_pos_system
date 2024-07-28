<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

require "connection.php";

$email = $_GET['email'] ?? null;

// Check if the email parameter is provided
if ($email !== null) {
    if (isset($email)) {
        $estimate_rs = Database::search("SELECT MAX(estimate.estimate_id) as last_id FROM estimate INNER JOIN customer ON estimate.customer_id = customer.id WHERE customer.user_email = '$email'");
        $estimate_row = $estimate_rs->fetch_assoc();

        // Check if there are any estimates for this user
        if ($estimate_row['last_id'] !== null) {
            $next_estimate_id = intval($estimate_row['last_id']) + 1;
        } else {
            $next_estimate_id = 1; // If no estimates exist for this user, start with ID 1
        }

        $response = [
            'status' => 1,
            'message' => 'estimate ID retrieved.',
            'estimate_id' => $next_estimate_id.''
        ];
    } else {
        $response = ['status' => 0, 'message' => 'Invalid email provided.'];
    }
} else {
    $response = ['status' => 0, 'message' => 'Please login first!'];
}

echo json_encode($response);
?>