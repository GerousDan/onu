window.onload = function() { //141,14,11
    var i, j, hSet, wSet, topSet, gapSet, lftSet, startBtn, iSels = 0, iSetSels = 0, iMore = 5, gLogo, 
        selArr = [],
        facePxs = 409,
        setWidth = 234,
        setHeight = 117,
        iSets = 5,
        numRows = 5,
        numCols = 4,
        iHeight = 2048,
        iWidth = 1293,
        gapRatio = 12,
        sqrPxs = iWidth * gapRatio / (numCols * (gapRatio + 1) + 1),
        gapPxs = sqrPxs / gapRatio,
        lftPxs = (iWidth - numCols * sqrPxs - (numCols - 1) * gapPxs) / 2,
        topPxs = (iHeight - numRows * sqrPxs - (numRows - 1) * gapPxs) / 2,        
        game = new Phaser.Game(iWidth, iHeight),
        playGame = function(game) {};
    playGame.prototype = {
        preload: function() {
            game.load.image('splash','assets/Splash-568h_en.png');
            game.load.image('background','assets/background.png');
//            iWidth = game.cache.getImage('background').width;
//            iHeight = game.cache.getImage('background').height;
//            game.width = iWidth;
//            game.height = iHeight;
            game.load.spritesheet('sets', 'assets/sets.png', setWidth, setHeight);
            game.load.image('logo','assets/logo_ver_en.png');
            game.load.spritesheet('faces', 'assets/cards.png', facePxs, facePxs);
            game.load.image('btn','assets/button.png');
        },
        create: function() {
            //game.scale.pageAlignHorizontally = true;
            //game.scale.pageAlignVertically = true;
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.stage.disableVisibilityChange = true;
            var style = {
                font: "48px Monospace",
                fill: "#00ff00",
                align: "center"
            };
            this.showSets();
        },
        showSets: function () {
            var back = game.add.image(0,0,'background');
            back.width = iWidth;
            back.height = iHeight;
            if (((iSets + (iSets + 1) / gapRatio) * setWidth) / (setHeight + 2 * setWidth / gapRatio) > iWidth / topPxs) {
                wSet = iWidth / (iSets + (iSets + 1) / gapRatio);
                hSet = wSet * setHeight / setWidth; 
            } else {
                hSet = topPxs * setHeight / (setHeight + 2 * setWidth / gapRatio);
                wSet = hSet * setWidth / setHeight;
            }
            topSet = (topPxs - hSet) / 2;
            gapSet = wSet / gapRatio;
            lftSet = (iWidth - iSets * wSet - (iSets - 1) * gapSet) / 2;
            for (i = 0; i < iSets; i++) {
                var set = game.add.button(lftSet + i * (wSet + gapSet), topSet, 'sets', this.toggleSet, this);    
                set.alpha = 0.5;
                set.width = wSet;
                set.height = hSet;
                set.frame = i;            
            }
            this.showLogo();
        },
        showLogo: function() {
            var wLogo = iWidth - 2 * gapPxs;
            var hLogo = wLogo * game.cache.getImage('logo').height / game.cache.getImage('logo').width;
            var yLogo = (iHeight - hLogo) / 2 ;
            gLogo = game.add.image(gapPxs, yLogo, 'logo');
            gLogo.width = wLogo;
            gLogo.height = hLogo;
        },
        toggleSet: function(target) {
            if (target.alpha == 1) {
                //target.alpha = 0.5;
                //iSetSels--;
            } else if (target.frame < 2) {
                target.alpha = 1;
                iSetSels++;
            }
            if (iSetSels == 0) {
                gLogo.alpha = 1;
            } else {
                gLogo.alpha = 0;
                if (iSetSels == 1) this.showCards();            
            }
        },
        showCards: function() {
            for (i = 0; i < numCols; i++) {
                for (j = 0; j < numRows; j++) {
                    var face = game.add.button(lftPxs + i * (sqrPxs + gapPxs), topPxs + j * (sqrPxs + gapPxs), 'faces', this.toggleFace, this);
                    face.alpha = 0.5;
                    face.width = sqrPxs;
                    face.height = sqrPxs;
                    face.frame = j * numCols + i;                  
                }
            }
            var y = topPxs + numRows * (sqrPxs + gapPxs) + gapPxs,
                h = iHeight - y - gapPxs,
                w = h * game.cache.getImage('btn').width / game.cache.getImage('btn').height;
            startBtn = game.add.button((iWidth - w) / 2, y , 'btn', this.startPlay, this);
            startBtn.width = w;
            startBtn.height = h;
            startBtn.alpha = 0.5;

        },
        toggleFace: function(target) {
            if (target.alpha == 1) {
                target.alpha = 0.5;
                iSels--;
            } else {
                target.alpha = 1;
                iSels++;
            }
            if (iSels > iMore) {
                startBtn.alpha = 1;
            } else {
                startBtn.alpha = 0.5;
            }
        },
        startPlay: function() {

        }
    };
    game.state.add("PlayGame", playGame);
    game.state.start("PlayGame");
}; 
