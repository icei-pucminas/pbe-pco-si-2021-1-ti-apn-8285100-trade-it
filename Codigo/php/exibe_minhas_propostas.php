<?php
include("conexao.php");
session_start();

if (isset($_SESSION['admin'])) {

    $i = 0;
    $query = "select id from propostas";
    $result = mysqli_query($conexao, $query);
    if (($result) and ($result->num_rows != 0)) {
        for ($i; $row = mysqli_fetch_assoc($result); $i++) {
            $propostas[$i] =  $row['id'];
        }
    }
} else {
    $email = $_SESSION['email'];
    $query = "select cpf from usuarios where email = '$email'";
    $result = mysqli_query($conexao, $query);
    $valor = mysqli_fetch_assoc($result);
    $cpf = $valor['cpf'];

    $i = 0;
    $query = "select proposta_id from criar_proposta where usuario_cpf = '$cpf'";
    $result = mysqli_query($conexao, $query);
    if (($result) and ($result->num_rows != 0)) {
        for ($i; $row = mysqli_fetch_assoc($result); $i++) {
            $propostas[$i] =  $row['proposta_id'];
        }
    }

    $query = "select id from propostas where usuario_cpf = '$cpf'";
    $result = mysqli_query($conexao, $query);
    if (($result) and ($result->num_rows != 0)) {
        for ($i; $row = mysqli_fetch_assoc($result); $i++) {
            $propostas[$i] =  $row['id'];
        }
    }
}

if ($propostas[0] == "") {
    echo "";
    exit();
}

$tudo = "";
$lenght = count($propostas);

for ($i = 0; $i < $lenght; $i++) {
    $id = $propostas[$i];

    $query = "select propostas.produto, anuncios.titulo, propostas.imagens, propostas.status from propostas 
    join anuncios 
    on propostas.anuncio_id = anuncios.id
    and propostas.id = '$id'";
    $result = mysqli_query($conexao, $query);
    $valor = mysqli_fetch_assoc($result);
    $anuncio = $valor['titulo'];
    $proposta = $valor['produto'];
    $imagem = $valor['imagens'];
    $status = $valor['status'];
    $statusNome = "";

    if ($status == "1")
        $statusNome = "Em negociação";
    else if ($status == "2")
        $statusNome = "Finalizada";
    else
        $statusNome = "Cancelada";

    $tudo = $tudo . $anuncio . "|" . $proposta . "|" . $imagem . "|" . $statusNome . "|";
}

echo $tudo;
