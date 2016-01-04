<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);
/***
* File: index.php
* Author: Pea
* Created: 01.02.2016
* License: Public GNU
* Description: PHP 2 Player Tic Tac Toe
***/
require_once('inc/class.game.php');
require_once('inc/class.tictactoe.php');

//this will store their information as they refresh the page
session_start();

//if they haven't started a game yet let's load one
if ( !isset( $_SESSION['game']['tictactoe'] ) )
	$_SESSION['game']['tictactoe'] = new TicTacToe();

?>
<html>
	<head>
		<title>Tic Tac Toe</title>
		<link rel="stylesheet" type="text/css" href="assets/styles/style.css" />
	</head>
	<body>
		<div id="content" class="container">
			<div class="content" role="main">
				<header><h2>Tic Tac Toe!</h2></header>
				<form name="tic-tac-toe" id="tic-tac-toe" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
				<?php $_SESSION['game']['tictactoe']->play_game( $_POST ); ?>
				</form>
			</div>
		</div>
	</body>
</html>