<?php
// Basic PHP contact handler with validation and spam honeypot.
// Writes leads to /api/leads.json (append) and optionally sends mail (commented).
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok'=>false, 'msg'=>'Method not allowed']);
  exit;
}

// Honeypot
if (!empty($_POST['website'])) {
  echo json_encode(['ok'=>true, 'msg'=>'Thank you!']);
  exit;
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $subject === '' || $message === '') {
  http_response_code(400);
  echo json_encode(['ok'=>false, 'msg'=>'All fields are required.']);
  exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['ok'=>false, 'msg'=>'Invalid email address.']);
  exit;
}

// Basic rate limit by IP (per 60s window)
$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$rateFile = __DIR__ . '/rate_' . preg_replace('/[^0-9a-f:.]/i','',$ip) . '.txt';
$now = time();
$last = file_exists($rateFile) ? (int)file_get_contents($rateFile) : 0;
if ($now - $last < 60) {
  http_response_code(429);
  echo json_encode(['ok'=>false, 'msg'=>'Please wait before sending again.']);
  exit;
}
file_put_contents($rateFile, (string)$now);

$lead = [
  'name'=>$name, 'email'=>$email, 'subject'=>$subject, 'message'=>$message,
  'ip'=>$ip, 'time'=>date(DATE_ATOM)
];

$leadsFile = __DIR__ . '/leads.json';
$existing = file_exists($leadsFile) ? json_decode(file_get_contents($leadsFile), true) : [];
$existing[] = $lead;
file_put_contents($leadsFile, json_encode($existing, JSON_PRETTY_PRINT));

// Optional: send email (configure then uncomment)
// mail('you@example.com', 'New Lead: ' . $subject, $message . "\n\nFrom: $name <$email>");

echo json_encode(['ok'=>true, 'msg'=>'Thanks! We will get back to you shortly.']);
