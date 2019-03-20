<!--* 
* @description: select组件封装
* @author: wp 
* @update: wp (2017-05-27 10:55) 
*-->
<template>
	<div class="colorpicker">
		<div class="color_div" :style="{background:defaultColor}" @click="colorShow"></div>
		<mt-popup v-model="selectColorVisible" position="bottom" class="mint-popup-4">
			<div id="colorBg"></div>
			<div id="examples">
				<div id="js-example-change-value">
					<mt-range v-model="rangeValueTop" :min="0" :max="218"></mt-range>
					<canvas id="myCanvas" width="240" height="10"></canvas>
				</div>
				<div id="js-example-change-value1" class="mt5">
					<mt-range v-model="rangeValueBottom" :min="0" :max="218"></mt-range>
					<canvas id="myCanvas1" width="240" height="10"></canvas>
				</div>
			</div>
		</mt-popup>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';
	export default {
		props:["defaultColor"],
		data() {
			return {
				rangeValueTop:109,
		        rangeValueBottom:109,
		        selectColorVisible:false,
			}
		},
		//监听属性
		watch:{
			rangeValueTop(curVal,oldVal){
				this.myCanvas();
			},
			rangeValueBottom(curVal,oldVal){
				this.myCanvas();
			}
		},
		methods: {
			colorShow(){
				this.selectColorVisible = true;
				this.myCanvas();
			},
			myCanvas(){
				var l = this.rangeValueTop;
				var c=document.getElementById("myCanvas");
				var ctx=c.getContext("2d");
				var grd=ctx.createLinearGradient(0,0,240,0);
				grd.addColorStop(0,"#ff0000");
				grd.addColorStop(0.2,"#ffff00");
				grd.addColorStop(0.4,"#00ff00");
				grd.addColorStop(0.6,"#00ffff");
				grd.addColorStop(0.8,"#ff00ff");
				grd.addColorStop(1,"#ff0000");
				ctx.fillStyle=grd;
				ctx.fillRect(0,0,240,5);
				var imgData=ctx.getImageData(l,0,5,5),
				red=imgData.data[0],
				green=imgData.data[1],
				blue=imgData.data[2],
				alpha=imgData.data[3];
				this.myCanvas1(red,green,blue,alpha);
			},
			myCanvas1(red,green,blue,alpha){
				var l1=this.rangeValueBottom;
				var c1=document.getElementById("myCanvas1");
				var ctx1=c1.getContext("2d");
				var grd1=ctx1.createLinearGradient(0,0,240,0);
				grd1.addColorStop(0,('rgb(0,0,0)'));
				grd1.addColorStop(1,('rgb('+red+','+green+','+blue+')'));
				ctx1.fillStyle=grd1;
				ctx1.fillRect(0,0,240,5);

				var imgData1=ctx1.getImageData(l1,0,5,5),
				red1=imgData1.data[0],
				green1=imgData1.data[1],
				blue1=imgData1.data[2],
				alpha1=imgData1.data[3],
				backgroundBG=red1 + "," + green1 + "," + blue1;
				$('#colorBg,.color_div').css('background','rgb('+backgroundBG+')')
			},
		},
	}
</script>