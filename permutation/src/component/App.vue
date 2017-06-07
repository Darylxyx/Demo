<template>
	<div class='container'>
		<div class='input-control overflow'>
			<input class='l input-target border-box' v-model='inputValue' placeholder='A+B+[C1,C2,C3]+D' />
			<div @click='count' class='count l text-center'>生成</div>
		</div>
		<div class='section overflow' v-show='secArr.length'>
			<div class='section-title border-box'>二元素组合</div>
			<div class='section-con'>
				<div v-for='item in secArr' class='section-list border-box'>{{item}}</div>
			</div>
		</div>
		<div class='section overflow' v-show='trdArr.length' style="margin-bottom: 50px;">
			<div class='section-title border-box'>三元素组合</div>
			<div class='section-con'>
				<div v-for='item in trdArr' class='section-list border-box'>{{item}}</div>
			</div>
		</div>
	</div>
</template>

<script>
module.exports = {
	data() {
		return {
			inputValue: '',
			secArr: [],
			trdArr: []
		}
	},
	methods: {
		count() {
			let valArr = this.inputValue.split('+'),
				resultArr = [];
			console.log(valArr);

			valArr.forEach((item, index) => {
				if (item.indexOf('[') < 0) {
					resultArr.push({
						con: item,
						index: index
					});
				} else {
					((i) => {
						this.parseArr(item).forEach((item0, index0) => {
							resultArr.push({
								con: item0,
								index: i
							});
						});
					})(index)
				}
			});

			console.log(resultArr);

			this.countSecond(resultArr);
			this.countThird(resultArr);
		},
		countSecond(valArr) {
			let arr = [];
			valArr.forEach((item, index) => {
				valArr.forEach((item0, index0) => {
					if (item.index == item0.index) return;
					arr.push('' + item.con + item0.con);
				});
			});
			this.secArr = arr;
		},
		countThird(valArr) {
			let arr = [];
			valArr.forEach((item, index) => {
				valArr.forEach((item0, index0) => {
					if (item.index == item0.index) return;
					valArr.forEach((item1, index1) => {
						if (item.index == item1.index || item0.index == item1.index) return;
						arr.push('' + item.con + item0.con + item1.con);
					});
				});
			});
			this.trdArr = arr;
		},
		parseArr(arrStr) {
			return arrStr.split('[')[1].split(']')[0].split(',');
		}
	}
}
</script>

<style>

.input-control {
	/*width: 90%;*/
	height: 40px;
	margin: 50px 15px 15px 15px;
	/*background-color: red;*/
}

.input-target {
	width: 70%;
	height: 100%;
	border: 1px solid #c1c1c1;
	outline: none;
	border-radius: 4px 0 0 4px;
	font-size: 14px;
	padding: 0 10px;
}

.count {
	width: 30%;
	height: 100%;
	font-size: 16px;
	color: #fff;
	line-height: 40px;
	background-color: #2e90e6;
	border-radius: 0 4px 4px 0;
}

.section {
	margin: 30px 15px 0 15px;
	background-color: #fff;
	border-radius: 6px;
	box-shadow: 0 1px 7px rgba(211,211,211,0.5);
}

.section-title {
	font-size: 17px;
	color: #fff;
	width: 100%;
	height: 50px;
	background-color: #2e90e6;
	line-height: 51px;
	padding-left: 20px;
}

.section-list {
	font-size: 16px;
	width: 100%;
	height: 40px;
	line-height: 40px;
	padding-left: 20px;
	background-color: #fff;
}

.section-list:nth-of-type(even) {
	background-color: #f7f7f7;
}

</style>