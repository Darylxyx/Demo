import './main.css';
import $ from 'jquery';

function SubType() {
	this.$sharePop = $('.pop-share');

	this.$pageArr = $('.page');
	this.$rootPage = $('.page-root');
	this.$startBtn = $('.start');

	this.$choosePage = $('.page-choose');
	this.$photoArea = $('.photo-area');
	this.$cancelBtn = $('.choose-cancel');
	this.$submitBtn = $('.choose-submit');

	this.$resultPage = $('.page-result');
	this.$openShareBtn = $('.open-share');

	this.$sharePage = $('.page-share');
	this.$tryBtn = $('.start-btn');
	this.$rankType = $('.rank-type');
}

SubType.prototype = {

	init() {
		this.params = this.getQuery() || {};
		this.wxInit();
		if (this.params.url) {
			this.turnPage(3);
			return;
		}
		this.turnPage(0);
	},

	startGame() {
		this.wxChooseImage();
	},

	chooseCancel() {
		this.turnPage(0);
		this.$photoArea.html('');
	},

	chooseCompelete(localIds) {
		var img = new Image();
		img.src = localIds;
		this.$photoArea.append($(img));
	},

	submitPhoto() {
		this.turnPage(2);
	},

	changeType(target) {
		console.log(target);
		this.$rankType.removeClass('active');
		$(target).addClass('active');
	},

	turnPage(pageIndex) {
		this.$pageArr.hide();
		this.$pageArr.eq(pageIndex).show();
	},

	wxInit() {
		this.server({
			url: encodeURIComponent(window.location.href)
		}, 'https://h5.kankanapp.com.cn/wechatapi/', (res) => {
			const data = res.responseJSON;
			wx.config({
				appId: data.appId,
				timestamp: data.timestamp,
				nonceStr: data.nonceStr,
				signature: data.signature,
				debug: true,
				jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseImage', 'uploadImage']
			});
		}, 'get');
	},

	wxChooseImage() {
		wx.chooseImage({
			count: 1, // 默认9
		    sizeType: ['original', 'compressed'],
		    sourceType: ['album', 'camera'],
		    success: (res) => {
		        var localIds = res.localIds[0];
		        this.chooseCompelete(localIds);
		    }
		})
	},

	wxUploadImage(callback) {
		var _this = this;
		wx.uploadImage({
		    localId: _this.localIds,
		    isShowProgressTips: 1,
		    success: (res) => {
		        var serverId = res.serverId;
		        callback && callback(serverId);
		    }
		});
	},

	getQuery() {
		var search = location.search,
			theRequest = {};
		if (search.indexOf('?') < 0) {
			return;
		}
		search = search.substr(1);
		var paramArr = search.split('&'),
			max = paramArr.length;
		for (var i = 0; i < max; i ++) {
			theRequest[paramArr[i].split('=')[0]] = unescape(paramArr[i].split('=')[1]);
		}
		return theRequest;
	},

	server(data, url, callback, type) {
		$.ajax({
			type: type || 'GET',
			data: data || {},
			url: url,
			dataType: 'jsonp',
			complete(res, msg) {
				callback && callback(res);
			}
		});
	}
}

var a = new SubType();

a.init();

a.$startBtn.on('click', () => {
	a.startGame();
});

a.$cancelBtn.on('click', () => {
	a.chooseCancel();
});

a.$submitBtn.on('click', () => {
	a.submitPhoto();
});

a.$openShareBtn.on('click', () => {
	a.$sharePop.show();
});

a.$sharePop.on('click', () => {
	a.$sharePop.hide();
});

a.$tryBtn.on('click', () => {
	a.turnPage(0);
});

a.$rankType.on('click', (e) => {
	a.changeType(e.target);
});