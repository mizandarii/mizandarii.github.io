$(function() {

    $(document).keydown(function(event) {

        var key = $('.key[data-key="' + event.which + '"]');
        var audio = $('audio[data-key="' + event.which + '"]')[0]; 
        if (!audio) return; 
        
        audio.currentTime = 0;
        audio.play();
        

        key.addClass('playing');
    });
    

    $(document).keyup(function(event) {
        var key = $('.key[data-key="' + event.which + '"]');
        
        key.removeClass('playing');
    });
});
