<?php
header('Content-Type: application/json');
// Randomize a tiny bit to feel "live"
$base = 5;
$delta = rand(-1, 2);
echo json_encode([ 'in_progress' => max(1, $base + $delta) ]);
