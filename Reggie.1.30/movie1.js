        function intro(){
            $('.screen').html('');
            $('.screen').append('<div class="levelHeader">Intro</div>');
            $('.screen').append('<div class="backToTitle" onclick="showLevels()">&lt;&lt;back</div>');
            openProjector(function(){intro1();});
        }
        function intro1(){
            $('.projectorScreen').append('<div class="info">This is Reggie.</div>');
            $('.projectorScreen').append('<img src="reggie.png" class="reggieRegSize"/>');
             $('.reggieRegSize').ranimate({left:'45px'},intro2);
        }
        function intro2(){
            $('.info').html('He fixes bad code...');
            $('.projectorScreen').append('<img src="bug.png" class="introBug"/>');
            $('.introBug').ranimate({left:'155px'},intro3);
        }
        function intro3(){
            $('.info').html('...by zapping bugs and turning them into bytes.');
            $('.projectorScreen').append('<div class="laser"/>');
            $('.laser').ranimate({width:'85px'},intro4);
        }
        function intro4(){
            $('.introBug').css('-webkit-filter','grayscale(1)');
            $('.introBug').ranimate({transform:'rotate(90deg)'},intro5);
        }
        function intro5(){
            $('.projectorScreen').append('<img class="introBit" src="bit.png"/>');
            
            $('.laser').css('display','none').css('width','0px');
            $('.introBug').css('display','none');
            $('.introBit').css('transition','all .5s');
            $('.introBit').ranimate({bottom:'20px'},intro51);
        }
        function intro51(){
            $('.introBit').ranimate({bottom:'10px'},intro6);
        }
        function intro6(){
            setTimeout(function(){intro61();},1000);
        }
        function intro61(){
            $('.info').html('Reggie will take any pattern that you give him...');
            $('.introBit').css('display','none');
            $('.laser').css('display','block');
            $('.projectorScreen').append('<div class="introBugContainer"></div>');
            $('.introBugContainer').append('<img src="bug.png" class="introBugSmall"/>');
            $('.introBugContainer').append('<img src="bug.png" class="introBugSmall"/>');
            $('.introBugContainer').append('<img src="bug.png" class="introBugSmall"/>');
            $('.introBugContainer').ranimate({left:'155px'},intro7);
        }
        function intro7(){
            $('.laser').ranimate({width:'85px'},intro8);
        }
        function intro8(){
            $('.info').html('...and replace it with exactly one byte.');
            $('.introBugSmall').css('-webkit-filter','grayscale(1)');
            $('.introBugSmall').ranimate({transform:'rotate(90deg)'},intro9);
        }
        function intro9(){
            $('.laser').css('display','none');
            $('.introBugContainer').css('display','none');
            $('.introBit').css('display','block');
            setTimeout(function(){intro10();},1500);
        }
        function intro10(){
            $('.info').html("Let's give it a try!");
            $('.projectorTop,.projectorScreen').ranimate({opacity:'0'},function(){advance(0,0);});
        }

