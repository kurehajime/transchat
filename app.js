(function ($) {
    SpeechRec.config({
        'SkyWayKey': '353b9d18-9888-4578-988a-91fdac7f631f',
        'OpusWorkerUrl': './lib/libopus.worker.js',
        'SbmMode': 2,
        'Recg:Nbest': 1
    });
    if (SpeechRec.availability()) {
        console.log('準備OKです');
    } else {
        $("#talk").text('【エラー】お使いのブラウザでは音声認識機能はご利用になれません');
        $("#start_speech").attr('disabled', true);
    }
    $("#start_speech,#balloon").click(function () {
        console.log("音声認識を開始します");
        SpeechRec.start();
        $("#talk").text("");
        $("#start_speech").attr('disabled', true);
    });
    //音声認識イベント------------------   
    SpeechRec.on_result(function (result) {
        console.log(result);
        $("#talk").text(result.candidates[0].speech);
        $("#start_speech").attr('disabled', false);
    });
    SpeechRec.on_proc(function (info) {
        var volte = ""
        for (var i = 0; i < (100 - Math.abs(info.volume | 0)); i += 10) {
            volte += "|"
        }
        $("#talk").text(volte);
    });
    SpeechRec.on_voice_end(function () {
        $("#talk").text('. . . !');
        $("#start_speech").attr('disabled', false);
    });
    //エラー処理イベント------------------   
    SpeechRec.on_error(function (e) {
        console.error(e);
        $("#start_speech").attr('disabled', false);
    });
    SpeechRec.on_voice_too_long(function () {
        $("#talk").text('【エラー】終端が検出できませんでした');
        $("#start_speech").attr('disabled', false);
    });
    SpeechRec.on_no_result(function () {
        $("#talk").text('【エラー】認識結果が得られませんでした');
        $("#start_speech").attr('disabled', false);
    });

    //検索イベント------------------
    $("#google").click(function () {
        var url = "https://www.google.co.jp/#q=";
        window.open(url + $("#talk").text());
    });
    $("#wikipedia").click(function () {
        var url = "https://ja.wikipedia.org/w/index.php?search=";
        window.open(url + $("#talk").text());
    });
    $("#twitter").click(function () {
        var url = "https://twitter.com/search?q=";
        window.open(url + $("#talk").text());
    });
})(jQuery);