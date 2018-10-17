var game = new Phaser.Game(800, 600, Phaser.AUTO, 'breakout_game', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('background_image', '/static/abstract_universe.jpg');
    // load the bricks
    game.load.image('brick0', '/static/assets/games/breakout/brick0.png');
    game.load.image('brick1', '/static/assets/games/breakout/brick1.png');
    game.load.image('brick2', '/static/assets/games/breakout/brick2.png');
    game.load.image('brick3', '/static/assets/games/breakout/brick3.png');
    game.load.image('brick4', '/static/assets/games/breakout/brick4.png');
    game.load.image('brick5', '/static/assets/games/breakout/brick5.png');

    game.load.image('paddle', '/static/assets/games/breakout/paddle.png');
    game.load.image('ball', '/static/assets/games/breakout/ball.png');

    game.load.image('bullet', '/static/assets/sprites/bullet.png');

    game.load.audio(
        'boden', ['/static/assets/audio/bodenstaendig_2000_in_rock_4bit.mp3',
        '/static/assets/audio/bodenstaendig_2000_in_rock_4bit.ogg']
    );
    game.load.audio('weaponAudio', ['/static/assets/audio/SoundEffects/blaster.mp3',]);
    game.load.audio('brickAudio', ['/static/assets/audio/SoundEffects/squit.ogg', '/static/assets/audio/SoundEffects/squit.mp3']);


}

var ball;
var paddle;
var bricks;
var weapon;

var ballOnPaddle = true;
var weaponTriggerFlag = false;

var lives = 3;
var score = 0;

var scoreText;
var livesText;
var introText;

var s;

var music;

function create() {

    music = game.add.audio('boden');
    music.volume = .01;
    weaponAudio = game.add.audio('weaponAudio');
    brickAudio = game.add.audio('brickAudio');
    weaponAudio.volume = .07;
    brickAudio.volume = .07;

    music.play();

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  We check bounds collisions against all walls other than the bottom one
    game.physics.arcade.checkCollision.down = false;

    s = game.add.tileSprite(0, 0, 800, 600, 'background_image');

    bricks = game.add.group();
    bricks.enableBody = true;
    bricks.physicsBodyType = Phaser.Physics.ARCADE;

    var brick;

    for (var y = 0; y < 6; y++)
    {
        for (var x = 0; x < 15; x++)
        {
            brick = bricks.create(120 + (x * 36), 100 + (y * 52), 'brick' + y);
            brick.body.bounce.set(1);
            brick.body.immovable = true;
        }
    }

    paddle = game.add.sprite(game.world.centerX, 500, 'paddle');
    paddle.anchor.setTo(.5, .5); // centers the paddle.

    game.physics.enable(paddle, Phaser.Physics.ARCADE);

    paddle.body.collideWorldBounds = true;
    paddle.body.bounce.set(1);
    paddle.body.immovable = true;

    ball = game.add.sprite(game.world.centerX, paddle.y - 10, 'ball');
    ball.anchor.set(0.5);
    ball.checkWorldBounds = true;
    ball.scale.setTo(1.4);

    game.physics.enable(ball, Phaser.Physics.ARCADE);

    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);

    // ball.animations.add('spin', [ 'ball_1.png', 'ball_2.png', 'ball_3.png', 'ball_4.png', 'ball_5.png' ], 50, true, false);

    ball.events.onOutOfBounds.add(ballLost, this);

    scoreText = game.add.text(32, 550, 'score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
    livesText = game.add.text(680, 550, 'lives: 3', { font: "20px Arial", fill: "#ffffff", align: "left" });
    introText = game.add.text(game.world.centerX, 400, '- click to start -', { font: "40px Arial", fill: "#ffffff", align: "center" });
    introText.anchor.setTo(0.5, 0.5);

    game.input.onDown.add(releaseBall, this);

    //  Creates 30 bullets, using the 'bullet' graphic
    weapon = game.add.weapon(1, 'bullet');
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletAngleOffset = 90;
    weapon.bulletSpeed = 400;
    weapon.fireRate = 40;
    game.physics.enable(weapon, Phaser.Physics.ARCADE);
    weapon.bulletAngleVariance = 1.5;
    weapon.trackSprite(paddle, paddle.width/2 - 5, 0);

    weapon2 = game.add.weapon(1, 'bullet');
    weapon2.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon2.bulletAngleOffset = 90;
    weapon2.bulletSpeed = 400;
    weapon2.fireRate = 40;
    game.physics.enable(weapon2, Phaser.Physics.ARCADE);
    weapon2.bulletAngleVariance = 1.5;

    weapon2.trackSprite(paddle, -(paddle.width/2) , 0);

    cursors = this.input.keyboard.createCursorKeys();

    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

}

function update () {

    //  Fun, but a little sea-sick inducing :) Uncomment if you like!
    // s.tilePosition.x += (game.input.speed.x / 2);

    paddle.x = game.input.x;
    // if (cursors.left.isDown)
    // {
    //     paddle.x = paddle.x-6;
    // }
    // else if (cursors.right.isDown)
    // {
    //     paddle.x += 6;
    // }


    if (paddle.x < 24)
    {
        paddle.x = 24;
    }
    else if (paddle.x > game.width - 24)
    {
        paddle.x = game.width - 24;
    }

    if (ballOnPaddle)
    {
        ball.body.x = paddle.x-5;
    }
    else
    {
        game.physics.arcade.collide(ball, paddle, ballHitPaddle, null, this);
        game.physics.arcade.collide(ball, bricks, ballHitBrick, null, this);
    }
    if (fireButton.isDown && ballOnPaddle === false) {
        weaponTriggerFlag = true;

    } else if (weaponTriggerFlag === true) {
        weaponTriggerFlag = false;
        // fire the weapons and play sound
        weaponAudio.play();
        weapon.fire();
        weapon2.fire();
    }

    game.physics.arcade.collide(weapon.bullets, bricks, weaponHitBrick, null, this);
    game.physics.arcade.collide(weapon2.bullets, bricks, weaponHitBrick, null, this);

}

function releaseBall () {
    // console.log("this", this);

    if (ballOnPaddle)
    {
        ballOnPaddle = false;
        ball.body.velocity.y = -300;
        ball.body.velocity.x = Math.floor(Math.random() * 200) - 100; // Random number between -100, +100
        ball.animations.play('spin');
        introText.visible = false;
    }

}

function ballLost () {

    lives--;
    livesText.text = 'lives: ' + lives;

    if (lives === 0)
    {
        gameOver();
    }
    else
    {
        ballOnPaddle = true;

        ball.reset(paddle.body.x + 16, paddle.y - 16);
        
        ball.animations.stop();
    }

}

function gameOver () {

    ball.body.velocity.setTo(0, 0);
    
    introText.text = 'Game Over!';
    introText.visible = true;

}

function ballHitBrick (_ball, _brick) {

    brickAudio.play();
    _brick.kill();

    score += 10;

    scoreText.text = 'score: ' + score;

    //  Are they any bricks left?
    if (bricks.countLiving() === 0)
    {
        //  New level starts
        score += 1000;
        scoreText.text = 'score: ' + score;
        introText.text = '- Next Level -';

        //  Let's move the ball back to the paddle
        ballOnPaddle = true;
        ball.body.velocity.set(0);
        ball.x = paddle.x + 16;
        ball.y = paddle.y - 16;
        ball.animations.stop();

        //  And bring the bricks back from the dead :)
        bricks.callAll('revive');
    }

}

function weaponHitBrick (_weapon, _brick) {
    // console.log("weapon hit brick~~~~~~~~~~~~~~~~~~~~~");
    brickAudio.play();
    _brick.kill();
    _weapon.kill();
    score += 10;
    scoreText.text = 'score: ' + score;

    //  Are they any bricks left?
    if (bricks.countLiving() === 0)
    {
        //  New level starts
        score += 1000;
        scoreText.text = 'score: ' + score;
        introText.text = '- Next Level -';

        //  Let's move the ball back to the paddle
        ballOnPaddle = true;
        ball.body.velocity.set(0);
        ball.x = paddle.x + 16;
        ball.y = paddle.y - 16;
        ball.animations.stop();

        //  And bring the bricks back from the dead :)
        bricks.callAll('revive');
    }

}

function ballHitPaddle (_ball, _paddle) {
    // console.log("this", this);
    // console.log("_ball", _ball);
    // console.log("_paddle", _paddle);
    var diff = 0;

    if (_ball.x < _paddle.x)
    {
        //  Ball is on the left-hand side of the paddle
        diff = _paddle.x - _ball.x;
        _ball.body.velocity.x = (-7 * diff);
    }
    else if (_ball.x > _paddle.x)
    {
        //  Ball is on the right-hand side of the paddle
        diff = _ball.x -_paddle.x;
        _ball.body.velocity.x = (7 * diff);
    }
    else
    {
        //  Ball is perfectly in the middle
        //  Add a little random X to stop it bouncing straight up!
        _ball.body.velocity.x = 2 + Math.random() * 8;
    }

}