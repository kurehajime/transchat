skyway音声認識検索を作ろう

# やりたいこと

パソコンに向かって話す  
↓  
音声認識する  
↓  
認識された文字列で検索をかける  

# どうやって実現するの？

音声認識を自力で実装するのはとてもとても大変なので、音声認識のWebAPIを利用します。

ブラウザでの音声情報のやり取りにはWebRTCを利用します。
これはブラウザでP2P通信して映像や音声やデータをやりとりする仕組みで、ChromeやFirefoxで利用することができます。

今回は音声認識APIに、NTT Comが提供する[skywayの音声認識API](http://www.ntt.com/release/monthNEWS/detail/20150728.html)を利用します。難しいことは全部APIがやってくれます。

### skyway

![pic1](https://raw.githubusercontent.com/kurehajime/voicesearch/gh-pages/pic1.png)


skyway自体は、NTT Comが提供するWebRTCを簡単に利用するプラットフォームです。

現状、WebRTCを利用するのはちょっと敷居が高いです。

* WebRTCはP2Pとは言え、仲介サーバーを立てる必要がある。
* ブラウザが提供するWebRTCのAPIは複雑で直接触るのは骨が折れる。

そういった問題を解決してくれるのがskywayです。

自前でサーバーを立てなくてもskywayのサーバーを無料で利用することができ、APIもライブラリがやさしくラップしてくれるのでだいぶ敷居が低くなります。

そして今回利用するskyway音声認識APIは、そのskywayを利用して音声を投げたら認識して文字を返してくれるAPIです。本当に至れり尽くせりです。

# 下準備

skywayのAPIを利用するには開発者登録を行い、ウェブサービスのURLを登録する必要があります。  
登録されていないURLでAPIを叩いてもAPIは機能してくれません。

ここから登録できます。
http://nttcom.github.io/skyway/


登録の際、skaywayを利用するドメインを聞かれるので今日はこの４つを登録してください。

![pic2](https://raw.githubusercontent.com/kurehajime/voicesearch/gh-pages/pic2.png)

ひとつのAPIキーに対し複数URLの登録を行うことが出来ます。  
localhostなども登録しておけばデバッグする時に捗ります。  
利用するドメインは後から修正できます。  

・・・


できましたでしょうか？  
~~実は同じドメインであれば他の人のAPIキーを使いまわせます~~  

# 作ってみよう


途中までつくったものがありますので、こちらからforkしてください。

[http://goo.gl/5gP3lK](http://goo.gl/5gP3lK)

とりあえず動くものもありますので、分からなくなったらここからコピペしてください。

[http://goo.gl/OxysXT](http://goo.gl/OxysXT)

Plunkerがうまくいかない人はここからローカルに落として下さい。

[テンプレ](https://github.com/kurehajime/voicesearch/archive/template.zip)

[とりあえず動くもの](https://github.com/kurehajime/voicesearch/archive/gh-pages.zip)

[デモ](http://kurehajime.github.io/voicesearch/)

[githubリポジトリ](https://github.com/kurehajime/voicesearch)

#### 最低限動かすための４ステップ

音声認識APIを利用するのは非常に簡単です。

#### ①ライブラリを読み込む


```
    <script src="lib/jquery-1.11.3.min.js"></script>
    <script src="lib/msgpack.codec.js"></script>
    <script src="lib/libspeexdsp.js"></script>
    <script src="lib/resampler.min.js"></script>
    <script src="lib/speechrec.min.js"></script>
```

#### ②オプションを指定する

```
SpeechRec.config({
    'SkyWayKey': '-------Your API KEY---------',
    'OpusWorkerUrl': './lib/libopus.worker.js',
    'SbmMode': 2,
    'Recg:Nbest': 1
});

```

#### ③音声認識をスタートする


```
SpeechRec.start();

```

#### ④結果を受け取る

```

SpeechRec.on_result(function (result) {
        result.candidates[0].speech
    });
    
```

これだけ!  
加えてエラー処理なども実装したほうがいいですが、これで最低限動きます。


では作ってみましょう。

node.jsを入れてる人は,

```
npm install http-server -g
```

で簡易サーバーをインストールして

```
http-server -o -a 127.0.0.1
```

でローカルで試すこともできます。

API について詳しく調べたい場合はこちら
https://github.com/nttcom/SkyWay-SpeechRec/

# プラスαを加えてみよう

特定のURLにパラメータを渡してジャンプすれば簡単に検索画面に飛ぶことが出来ます。  
音声認識に成功したら検索機能を付加してみましょう。

### 検索してみる

https://www.google.co.jp/#q=■■■■■  
https://ja.wikipedia.org/w/index.php?search=■■■■■  
https://twitter.com/search?q=■■■■■  

### ツイート画面を開く

ツイート画面もパラメータで開くことが出来ます。せっかくなので追加しましょう。

https://twitter.com/intent/tweet?text=■■■■■
