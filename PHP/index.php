<?php 
    $lista = [10, 20, 30 , 40];
    print_r($lista); //o echo não funcionaria.
    $lista[] = 50; // da um push no final da lista
    array_push($lista, 60);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>teste php</title>
</head>

<body>
    <h1><?php echo 'testando o echo'; ?></h1>
</body>

</html>