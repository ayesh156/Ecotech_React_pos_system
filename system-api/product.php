<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

require "connection.php";

function validatePrice($price)
{
    return is_numeric($price) ? doubleval($price) : 0.0;
}

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "POST":

        $user = json_decode(file_get_contents('php://input'));

        $name = $user->name;
        $description = $user->description;
        $buying_price = validatePrice($user->buying_price);
        $selling_price = validatePrice($user->selling_price);
        $user_email = $user->user_email;

        $sql = "INSERT INTO product (name, description, buying_price, selling_price, user_email) VALUES ('$name', '$description', '$buying_price', '$selling_price', '$user_email')";
        $status = Database::iud($sql);

        if ($status) {
            $response = ['status' => 1, 'message' => 'Product created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create Product.'];
        }

        echo json_encode($response);

        break;

    case 'GET':
        $email = $_GET['email'] ?? null;

        // Check if the email parameter is provided
        if ($email !== null) {
            if (isset($_GET['id']) && isset($email)) {
                $id = $_GET['id'];
                $email = $_GET['email'];

                // Select data from the product table based on id and email
                $sql = "SELECT * FROM product WHERE id = '$id' AND user_email = '$email'";
                $result = Database::search($sql); // Assuming Database::search executes the SQL query

                // Fetch data and format as an associative array
                $product = [];
                $row = $result->fetch_assoc();
                if ($row) {
                    $product = [
                        'name' => $row['name'],
                        'description' => $row['description'],
                        'buying_price' => $row['buying_price'],
                        'selling_price' => $row['selling_price']
                    ];
                }

                // Send the JSON response
                if ($product) {
                    $response = ['status' => 1, 'message' => 'Product found successfully.', 'product' => $product];
                } else {
                    $response = ['status' => 0, 'message' => 'No product found.'];
                }
            } else {
                $response = ['status' => 0, 'message' => 'Invalid id or email provided.'];
            }
        } else {
            $response = ['status' => 0, 'message' => 'Please login first!'];
        }
        echo json_encode($response);

        break;

    case "PUT":

        $email = $_GET['email'] ?? null;

        // Check if the email parameter is provided
        if ($email !== null) {
            // Handle PUT request for updating data
            $data = json_decode(file_get_contents('php://input'));

            if (isset($_GET['id']) && isset($email)) {
                $id = $_GET['id'];
                $email = $_GET['email'];

                $name = $data->name;
                $description = $data->description;
                $buying_price = validatePrice($data->buying_price);
                $selling_price = validatePrice($data->selling_price);

                $sql_update = "UPDATE product SET name='$name', description='$description', buying_price='$buying_price', selling_price='$selling_price' WHERE id='$id' AND user_email='$email'";
                $status_update = Database::iud($sql_update);

                if ($status_update) {
                    $response = ['status' => 1, 'message' => 'Product updated successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to update Product.'];
                }

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