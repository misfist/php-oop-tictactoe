$( document ).ready(function() {

    $( '#tic-tac-toe' ).on('click', 'input', function( event ) {

        $( '#tic-tac-toe input' ).parent( '.btn' ).removeClass( 'active' );
        $( this ).parent( '.btn' ).addClass( 'active' );
        $( this ).parent( '.disabled' ).removeClass( 'active' );

    });
    
});