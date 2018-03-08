var canvas = document.getElementById("canvas");
var processing = new Processing(canvas, function(processing) {
    processing.size(400, 400);
    processing.background(0xFFF);

    var mouseIsPressed = false;
    processing.mousePressed = function () { mouseIsPressed = true; };
    processing.mouseReleased = function () { mouseIsPressed = false; };

    var keyIsPressed = false;
    processing.keyPressed = function () { keyIsPressed = true; };
    processing.keyReleased = function () { keyIsPressed = false; };

    function getImage(s) {
        var url = "https://www.kasandbox.org/programming-images/" + s + ".png";
        processing.externals.sketch.imageCache.add(url);
        return processing.loadImage(url);
    }

    function getLocalImage(url) {
        processing.externals.sketch.imageCache.add(url);
        return processing.loadImage(url);
    }

    // use degrees rather than radians in rotate function
    var rotateFn = processing.rotate;
    processing.rotate = function (angle) {
        rotateFn(processing.radians(angle));
    };

    with (processing) {
      
var Block = function(xPos, yPos, Width, Height, Color)
{
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = Width;
    this.height = Height;
    this.color = Color;
    
    this.draw = function() 
    {
        fill(this.color);
        rect(this.xPos, this.yPos, this.width, this.height);
    };
};
var Player = function(xPos, yPos, Width, Height, Color)
{
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = Width;
    this.height = Height;
    this.color = Color;
    
    this.speed = 5;
    this.direction = "";
    
    this.draw = function() 
    {
        fill(this.color);
        rect(this.xPos, this.yPos, this.width, this.height);
    };
    
    this.update = function()
    {
        switch(keyCode)
        {
            case LEFT : 
                this.xPos -= this.speed;
                this.direction = "LEFT";
                break;
                
            case RIGHT : 
                this.xPos += this.speed;
                this.direction = "RIGHT";
                break;
                
            case UP : 
                this.yPos -= this.speed;
                this.direction = "UP";
                break;
                
            case DOWN : 
                this.yPos += this.speed;
                this.direction = "DOWN";
                break;
                
            default : 
                    this.direction = "?";
                break;
        }
        
        this.xPos = constrain(this.xPos, 0, width - this.width);
        this.yPos = constrain(this.yPos, 0, height - this.height);
    };
};

var block = new Block(130, 150, 60, 75, color(0, 0, 255));
var player = new Player(230, 250, 30, 30, color(173, 40, 40));

var Observer = {
    colliding : function(obj1, obj2)
    {
        var colliding = false;
        
        //Check xPosition and width
        if(obj1.xPos + obj1.width > obj2.xPos &&
           obj1.xPos < obj2.xPos + obj2.width)
        {
            //Check yPosition and width
            if(obj1.yPos + obj1.height > obj2.yPos &&
               obj1.yPos < obj2.yPos + obj2.height)
            {
                colliding = true;
            }
        }
        return colliding;
    },
    collideWith : function(mobileObj, fixedObj)
    {
        switch(mobileObj.direction)
        {
            case "LEFT" :
                    mobileObj.xVel = 0;
                    mobileObj.xPos = fixedObj.xPos + fixedObj.width;
                break;
                
            case "RIGHT" :
                    mobileObj.xVel = 0;
                    mobileObj.xPos = fixedObj.xPos - mobileObj.width;
                break;
            
            case "UP" :
                    mobileObj.yVel = 0;
                    mobileObj.yPos = fixedObj.yPos + fixedObj.height;
                break;
                
            case "DOWN" :
                    mobileObj.yVel = 0;
                    mobileObj.yPos = fixedObj.yPos - mobileObj.height;
                break;
        }
    },
};

draw = function() 
{
    background(76, 176, 67);
    block.draw();
    player.draw();
    player.update(block);
    
    if(Observer.colliding(player, block))
    {
        Observer.collideWith(player, block);
    }
};

keyReleased = function()
{
    keyCode = null;  
};



    }
    if (typeof draw !== 'undefined') processing.draw = draw;
});