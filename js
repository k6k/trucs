    <audio src="media/generique.mp3" loop preload="auto" id="generique" >
      <span class="ko">&lt;audio&gt; non supportée !</span>
    </audio>
    <script>
    var isPlay = false;
    function PlayOrPause(){
      if(isPlay){
        pauseMusic();
        isPlay = false;
      }else{
        playMusic();
        isPlay = true;
      }
    }
    function playMusic(){
      document.getElementById('generique').play();
      return true;
    }
    function pauseMusic(){
      document.getElementById('generique').pause();
      return true;
    }
    </script>
