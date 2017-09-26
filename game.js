window.onload = function() { //141,14,11
    var i, j, hSet, wSet, topSet, gapSet, lftSet,
        facePxs = 409,
        setWidth = 234,
        setHeight = 117,
        iSets = 5,
        numRows = 5,
        numCols = 4,
        iHeight = 2048,
        iWidth  = 1293,
        gapRatio = 12,
        sqrPxs = iWidth * gapRatio / (numCols * (gapRatio + 1) + 1),
        gapPxs = sqrPxs / gapRatio,
        lftPxs = (iWidth - numCols * sqrPxs - (numCols - 1) * gapPxs) / 2,
        topPxs = (iHeight - numRows * sqrPxs - (numRows - 1) * gapPxs) / 2;
        game = new Phaser.Game(iWidth, iHeight),
        playGame = function(game) {};
    playGame.prototype = {
        preload: function() {
            game.load.image('background','assets/background.png');
            game.load.spritesheet('sets', 'assets/sets.png', setWidth, setHeight);
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
            this.showCards();
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
                var set = game.add.button(lftSet + i * (wSet + gapSet), topSet, 'sets', this.toggleFace, this);    
                set.alpha = 0.5;
                set.width = wSet;
                set.height = hSet;
                set.frame = i;            
            }
        },
        showCards: function() {
            this.showSets();
            for (i = 0; i < numCols; i++) {
                for (j = 0; j < numRows; j++) {
                    var face = game.add.button(lftPxs + i * (sqrPxs + gapPxs), topPxs + j * (sqrPxs + gapPxs), 'faces', this.toggleFace, this);
                    face.alpha = 0.5;
                    face.width = sqrPxs;
                    face.height = sqrPxs;
                    face.frame = j * numCols + i;
                }
            }
            var tBtn = topPxs + numRows * (sqrPxs + gapPxs) + gapPxs,
                hBtn = iHeight - tBtn - gapPxs,
                hBtnPng = 85,
                wBtn = 231,
                wBtn = wBtn * hBtn / hBtnPng;
            var startBtn = game.add.button((iWidth - wBtn) / 2, tBtn , 'btn', this.startPlay, this);
                startBtn.width = wBtn;
                startBtn.height = hBtn;
        },
        toggleFace: function(target) {
            if (target.alpha == 1) {
                target.alpha = 0.5;
            } else target.alpha = 1;
        },
        startPlay: function() {

        }
    };
    game.state.add("PlayGame", playGame);
    game.state.start("PlayGame");
}; 
