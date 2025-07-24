<?php
// Простейший обработчик формы
header('Content-Type: application/json');

// Подключение к базе
$db = new mysqli('localhost', 'root', '', 'natirasnt_feedback');

// Проверка подключения
if ($db->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Ошибка базы данных']);
    exit;
}

// Получаем данные
$name = $db->real_escape_string($_POST['name'] ?? '');
$email = $db->real_escape_string($_POST['email'] ?? '');
$phone = $db->real_escape_string($_POST['phone'] ?? '');
$message = $db->real_escape_string($_POST['message'] ?? '');

// Минимальная проверка
if (empty($name) || empty($email) || empty($phone)) {
    echo json_encode(['success' => false, 'message' => 'Заполните обязательные поля']);
    exit;
}

// Сохраняем в базу
$sql = "INSERT INTO feedback (name, email, phone, message) 
        VALUES ('$name', '$email', '$phone', '$message')";

if ($db->query($sql)) {
    echo json_encode(['success' => true, 'message' => 'Спасибо! Ваше сообщение отправлено']);
} else {
    echo json_encode(['success' => false, 'message' => 'Ошибка сохранения']);
}

$db->close();
?>