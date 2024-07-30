<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

require "connection.php";

require "SMTP.php";
require "PHPMailer.php";
require "Exception.php";

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {

    case 'GET':
        $email = $_GET['email'] ?? null;

        // Check if the email parameter is provided
        if ($email !== null) {
            if (isset($email)) {
                $email = $_GET['email'];

                // Select data from the defaultData table based on id and email
                $sql = "SELECT * FROM user WHERE email = '$email'";
                $result = Database::search($sql); // Assuming Database::search executes the SQL query

                // Fetch data and format as an associative array
                $defaultData = [];
                $row = $result->fetch_assoc();
                if ($row) {
                    $defaultData = [
                        'footerNotes' => $row['footer'],
                        'estimateNotes' => $row['estimate_notes'],
                        'invoiceNotes' => $row['invoice_notes'],
                        'paymentInstructions' => $row['instruction'],
                    ];
                }

                // Prepare the final response
                $response = ['status' => 1, 'message' => 'Data found successfully.', 'defaultData' => $defaultData];

            } else {
                $response = ['status' => 0, 'message' => 'Invalid id or email provided.'];
            }
        } else {
            $response = ['status' => 0, 'message' => 'Please login first!'];
        }
        echo json_encode($response);

        break;
}
?>