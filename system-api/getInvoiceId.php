<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

require "connection.php";

$email = $_GET['email'] ?? null;

// Check if the email parameter is provided
if ($email !== null) {
    if (isset($email)) {
        $invoice_rs = Database::search("SELECT MAX(invoice.invoice_id) as last_id FROM invoice INNER JOIN customer ON invoice.customer_id = customer.id WHERE customer.user_email = '$email'");
        $invoice_row = $invoice_rs->fetch_assoc();

        // Check if there are any invoices for this user
        if ($invoice_row['last_id'] !== null) {
            $next_invoice_id = intval($invoice_row['last_id']) + 1;
        } else {
            $next_invoice_id = 1; // If no invoices exist for this user, start with ID 1
        }

        $response = [
            'status' => 1,
            'message' => 'invoice ID retrieved.',
            'invoice_id' => $next_invoice_id.''
        ];
    } else {
        $response = ['status' => 0, 'message' => 'Invalid email provided.'];
    }
} else {
    $response = ['status' => 0, 'message' => 'Please login first!'];
}

echo json_encode($response);
?>