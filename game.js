window.onload = function() { //141,14,11
    var i, j,
        facePxs = 409,
        setWidth = 234,
        setHeight = 117,
        iSets = 5,
        numRows = 5,
        numCols = 4,
        iHeight = 512,
        iWidth  = 323,
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
        },
        create: function() {
            this.showCards();
        },
        showSets: function () {
            var back = game.add.image(0,0,'background');
            back.width = iWidth;
            back.height = iHeight;
            for (i = 0; i < iSets; i++) {
                var set = game.add.button();    
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
        },
        toggleFace: function(target) {
            if (target.alpha == 1) {
                target.alpha = 0.5;
            } else target.alpha = 1;
        }
    };
    game.state.add("PlayGame", playGame);
    game.state.start("PlayGame");
};