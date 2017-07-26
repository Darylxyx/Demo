window.onload = function() {

    function SubType() {
    	var doc = document;
    	this.cvs = doc.querySelector('#myCanvas');
    	this.ctx = this.cvs.getContext('2d');
    	this.imgList = doc.querySelectorAll('.img');
    	this.imgIndex = 0;
    	this.isAnimating = false;
        this.autoPlayObj = null;

    	this.imgW = 1920; //图片原始宽/高
    	this.imgH = 1080;

    	this.conW = 800; //画布宽/高
    	this.conH = 450;

    	this.dw = 25; //画面单元宽/高
    	this.dh = 25;

    	this.I = this.conH / this.dh; //单元行/列数
    	this.J = this.conW / this.dw;

    	this.DW = this.imgW / this.J; //原图单元宽/高
    	this.DH = this.imgH / this.I;

        this.randomPoint = [{
            x: 0,
            y: 0
        }, {
            x: this.I - 1,
            y: 0
        }, {
            x: 0,
            y: this.J - 1
        }, {
            x: this.I - 1,
            y: this.J - 1
        }, {
            x: 0,
            y: Math.ceil(this.J / 2)
        }, {
            x: this.I - 1,
            y: Math.ceil(this.J / 2)
        }, {
            x: Math.ceil(this.I / 2),
            y: 0
        }, {
            x: Math.ceil(this.I / 2),
            y: this.J - 1
        }]
    }

    SubType.prototype = {
    	init() {

    		this.ctx.beginPath();

    		for (var i = 0; i < this.I; i ++) {
    			for (var j = 0; j < this.J; j ++) {
    				this.ctx.drawImage(this.imgList[this.imgIndex], this.DW*j, this.DH*i, this.DW, this.DH, this.dw*j, this.dh*i, this.dw, this.dh);
    			}
    		}

    		this.ctx.closePath();
    		this.ctx.stroke();

            this.autoPlay();
    	},

    	start(i, j, callback) {

            if (this.isAnimating) return;

            this.isAnimating = true;

    		this.imgIndex ++;

    		if (this.imgIndex > (this.imgList.length - 1)) this.imgIndex = 0;

    		var _this = this,
    			dst = 0,
    			intervalObj = setInterval(function() {
	    			var resArr = _this.countAround(i, j, dst);

	    			resArr.forEach(function(item, index) {
	    				_this.handleDraw(app.imgList[_this.imgIndex], item.x, item.y);
	    			});
	    			
	    			if (!resArr.length) {
	    				clearInterval(intervalObj);
                        _this.isAnimating = false;
	    				return  callback && callback();
	    			}
	    			dst ++;
	    		}, 20);
    	},

    	handleClick(e) {

    		var offsetX = e.offsetX,
    			offsetY = e.offsetY,
    			j = Math.floor(offsetX / this.dw),
    			i = Math.floor(offsetY / this.dh),
    			_this = this;

            clearInterval(this.autoPlayObj);

    		this.start(i, j, function() {
                _this.autoPlay();
            });
    	},

        autoPlay() {
            var _this = this;
            this.autoPlayObj = setInterval(function() {
                // console.log(Math.floor(Math.random()*_this.imgList.length));
                var randomIndex = Math.floor(Math.random()*_this.randomPoint.length),
                    point = _this.randomPoint[randomIndex];
                // console.log(point);
                _this.start(point.x, point.y);
            }, 3000);
        },

    	handleDraw(nextImg, i, j) { //负责绘制，nextImg: 下张图片；i: 单元行号；j: 单元列号
    		var _this = this,
    			actH = this.dh,
    			turnFlag = false;

    			this.ctx.clearRect(this.dw*j, this.dh*i, this.dw, this.dh);

    			this.ctx.drawImage(this.imgList[this.imgIndex], this.DW*j, this.DH*i, this.DW, this.DH, this.dw*j, this.dh*i, this.dw, actH);
    	},

    	countAround(i, j, dst) {
    		// console.log(i, j);
    		var resArr = [];
    		for (var m = (i-dst); m <= (i+dst); m++) {
    			for (var n = (j-dst); n <= (j+dst); n++) {
    				if ((Math.abs(m-i) + Math.abs(n-j) == dst) && (m >=0 && n >= 0) && (m <= (this.I-1) && n <= (this.J-1))) {
    					resArr.push({x: m, y: n});
    				}
    			}
    		}
    		// console.log(resArr);
    		return resArr;
    	}
    };

    var app = new SubType();

    app.init();

    app.cvs.onclick = function(e) {
    	app.handleClick(e);
    }
};