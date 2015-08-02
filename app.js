(function($) {
   SpeechRec.config({
      'SkyWayKey':'353b9d18-9888-4578-988a-91fdac7f631f',
      'OpusWorkerUrl':'./js/libopus.worker.js',
      'SbmMode':2,
      'Recg:Nbest' : 1
    });
     if (SpeechRec.availability()) {
        console.log('Your browser supports SkyWay Speech Recognition.');
    } else {
        console.error('Your browser does not support SkyWay Speech Recognition.');
        $("#start_speech").attr('disabled', true);
        $("#start_speech").text('お使いのブラウザでは音声認識機能はご利用になれません');
    }
    
    $("#start_speech").click(function(){
        console.log("音声認識を開始します");
        SpeechRec.start();
        $("#talk").text("");
        $("#start_speech").attr('disabled', true);
    });
    SpeechRec.on_result(function(result){
        console.log(result);
        $("#talk").text(result.candidates[0].speech);
        $("#start_speech").attr('disabled', false);
    });
    
    SpeechRec.on_proc(function(info){
            var volume = info.volume;
            $(".mic").text(volume);
    });
    
    
    
    
})(jQuery);