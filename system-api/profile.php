<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

require "connection.php";

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        $email = $_GET['email'] ?? null;

        // Check if the email parameter is provided
        if ($email !== null) {
            if (isset($email)) {
                $email = $_GET['email'];

                // Select data from the profile table based on id and email
                $sql = "SELECT * FROM user WHERE email = '$email'";
                $result = Database::search($sql); // Assuming Database::search executes the SQL query

                // Fetch data and format as an associative array
                $profile = [];
                $row = $result->fetch_assoc();
                if ($row) {
                    $profile = [
                        'first_name' => $row['firstname'],
                        'last_name' => $row['lastname'],
                        'contact' => $row['mobile'],
                        'image' => $row['user_image']
                    ];
                }

                // Send the JSON response
                if ($profile) {
                    $response = ['status' => 1, 'message' => 'Record found successfully.', 'profile' => $profile];
                } else {
                    $response = ['status' => 0, 'message' => 'No profile found.'];
                }
            } else {
                $response = ['status' => 0, 'message' => 'Invalid email provided.'];
            }
        } else {
            $response = ['status' => 0, 'message' => 'Please login first!'];
        }
        echo json_encode($response);

        break;

    case "PUT":

        $email = $_GET['email'] ?? null;

        if ($email !== null) {
            $data = json_decode(file_get_contents('php://input'));

            $first_name = $data->first_name;
            $last_name = $data->last_name;
            $contact = $data->contact;
            $base64Image = $data->image ?? null;

            $sql_select = "SELECT user_image FROM user WHERE email='$email'";
            $result = Database::search($sql_select);

            $row = $result->fetch_assoc();
            if ($row) {
                $currentImagePath = $row['user_image'];
                $uploadedImagePath = $currentImagePath;

                if (!empty($base64Image) && preg_match('/^data:image\/(jpeg|png|gif);base64,/', $base64Image)) {
                    $uploadedImagePath = saveBase64Image($base64Image, '../assets/images/', $first_name); // uncomment after upload
                    // $uploadedImagePath = saveBase64Image($base64Image, 'assets/images/', $first_name);

                    if ($uploadedImagePath && $currentImagePath && file_exists($currentImagePath)) {
                        unlink($currentImagePath);
                    }
                }

                $sql_update = "UPDATE user SET firstname='$first_name', lastname='$last_name', mobile='$contact', user_image='$uploadedImagePath' WHERE email='$email'";
                $status_update = Database::iud($sql_update);

                $response = $status_update ? 
                    ['status' => 1, 'message' => 'Record updated successfully.'] : 
                    ['status' => 0, 'message' => 'Failed to update record.'];
            } else {
                $response = ['status' => 0, 'message' => 'User not found.'];
            }
        } else {
            $response = ['status' => 0, 'message' => 'Please login first!'];
        }

        echo json_encode($response);
        break;
}

function generateUniqueId($length = 3)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $uniqueId = '';
    for ($i = 0; $i < $length; $i++) {
        $uniqueId .= $characters[rand(0, $charactersLength - 1)];
    }
    return $uniqueId;
}

function saveBase64Image($base64Image, $path, $prefix)
{
    list($type, $data) = explode(';', $base64Image);
    list(, $data) = explode(',', $data);

    $extension = '';
    if (strpos($type, 'jpeg') !== false) {
        $extension = 'jpg';
    } elseif (strpos($type, 'png') !== false) {
        $extension = 'png';
    } elseif (strpos($type, 'gif') !== false) {
        $extension = 'gif';
    } else {
        return false;
    }

    $data = base64_decode($data);
    $fileName = $prefix . '_' . generateUniqueId() . '.' . $extension;
    $filePath = $path . $fileName;
    
    return file_put_contents($filePath, $data) ? $filePath : false;
}

?>