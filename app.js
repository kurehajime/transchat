(function ($) {
    SpeechRec.config({
        'SkyWayKey': '-------Your API KEY---------',
        'OpusWorkerUrl': './libopus.worker.js',
        'SbmMode': 2,
        'Recg:Nbest': 1
    });

    //初期化確認
    if (SpeechRec.availability()) {
        //準備ができた時の処理
    } else {
        //非対応ブラウザなどの理由により準備ができなかった時の処理
    }

    //音声認識開始
    $("#音声認識開始ボタン").click(function () {
        SpeechRec.start();
        //
    });

    //音声認識成功時イベント
    SpeechRec.on_result(function (result) {
        var result_text = result.candidates[0].speech;
        //
    });
    //音声認識中イベント
    SpeechRec.on_proc(function (info) {
        var vol = info.volume; //ボリューム(-100~0)
        //
    });
    //音声終端イベント
    SpeechRec.on_voice_end(function () {
        //
    });
    //エラー処理イベント
    SpeechRec.on_error(function (e) {
        //
    });
    //終端が検出出来なかった時のイベント
    SpeechRec.on_voice_too_long(function () {
        //
    });
    //認識できなかった時のイベント
    SpeechRec.on_no_result(function () {
        //
    });

})(jQuery);