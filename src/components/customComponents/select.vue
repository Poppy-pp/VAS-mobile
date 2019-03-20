<!--* 
* @description: select组件封装
* @author: wp 
* @update: wp (2017-05-27 10:55) 
*-->
<template>
	<div class="cust-select">
		<div class="wx-select" @click="clickSelectInput">
			<template v-if="!isbutton">
				<input autocomplete="off" placeholder="请选择" onfocus='this.blur();' v-model="model" type="text" class="wx-input">
				<span class="wx-input__suffix">
					<span class="wx-input__suffix-inner">
						<i class="iconfont icon-xia wx-select__caret"></i>
					</span>
				</span>
			</template>
			<template v-else>
				<mt-button size="large" class="mt5">{{ butText }}</mt-button>
			</template>
		</div>
		<mt-popup v-model="selectVisible" position="bottom" class="mint-popup-4">
			<div class="page-part" v-if="!hiddenSearch || selectVisible">
				<mt-field label="搜索" placeholder="请输入查询关键字" v-iclick="searchData"  v-model="searchkey"></mt-field>
			</div>
			<mt-picker v-if="selectVisible" :slots="copNameSlots" :value-key="valuekey" @change="onCopNameChange" :visible-item-count="3"></mt-picker>
	    </mt-popup>
	</div>
	</template>

	<script>
		import Vue from 'vue';
		import { Indicator } from 'mint-ui';
		//自定义清除事件
		Vue.directive('iclick', function(el, binding, vnode) {
		    let oInput = el.querySelector('i.mintui');
		    oInput.onclick = function() {
		    	binding.value(-1);
		    };
		});
		export default {
			/**
			*valuekey:当 values 为对象数组时，作为文本显示在 Picker 中的对应字段的字段名
			*isYcSearch:是否是远程搜索 默认false不是远程搜索
			*hiddenSearch：是否隐藏搜索关键字输入框
			*index：如果是循环队列下拉  对应每个的index 便于点击赋值
			*defaultValue:默认设置下拉选中项
			*disabled:是否禁止下拉
			*defaultDataArray:默认对象数组
			*isbutton：是否默认显示button
			*butText:如果是button显示文本
			*pindex:父类下标
			*/
			props:["valuekey","isYcSearch","hiddenSearch","index","pindex","defaultValue","disabled","defaultDataArray","isbutton","butText"],
			data() {
				return {
					searchkey:'',
					selectVisible:false,
					model:'',
					tempCopname:[],
					copNameSlots:[{
			          flex: 1,
			          values: [],
			          className: 'slot1'
			        }]
				}
			},
			//监听属性
			watch:{
				//默认值
				defaultValue(curVal,oldVal){
					this.model = curVal;
				},
				//默认对象数组
				defaultDataArray(curVal,oldVal){
					this.copNameSlots[0].values = curVal;
				},
				//下拉是否显示
				selectVisible(curVal,oldVal){
					if(!curVal){
						$("i.wx-select__caret").removeClass("is-reverse");
						this.searchkey = "";
						this.$emit("close");
						Indicator.close();
					}else{
						this.$emit("show");
					}
　　　　　　　　},
				//查询
				searchkey(curVal,oldVal){
					if(!curVal) this.$emit("clearData");
					this.searchData();
　　　　　　　　}
　　　　　　},
			methods: {
				//清空数据
				clearData(){
					this.model = "";
				},
				//button点击
				clickBut(){
					this.$emit("click");
				},
				//模糊搜索关键字
				searchData(r){
					let temp = [];
					if(this.isYcSearch){
						if(r == -1) this.searchkey = "";
						this.$emit("changeCop",this.searchkey,(values)=>{
							this.copNameSlots[0].values = values;
						});
					}else{
						if(r == -1){
							this.copNameSlots[0].values = this.tempCopname;
							return;
						}
						if(this.tempCopname.length > 0){
							this.copNameSlots[0].values = this.tempCopname;
						}else{
							this.tempCopname = this.copNameSlots[0].values;
						}
						this.copNameSlots[0].values.forEach((item,index)=>{
							if(item[this.valuekey].indexOf(this.searchkey) != -1){
								temp.push(item);
							}
						});
						this.copNameSlots[0].values = temp;
					}
				},
				//点击select查询数据
				clickSelectInput(e){
					this.$emit("clickBefore");
					if(this.disabled) return;
					this.selectVisible = true;
					$(e.target).next().find("i.wx-select__caret").addClass("is-reverse");
					this.$emit("changeCop",this.searchkey,(values)=>{
						this.copNameSlots[0].values = values;
					});
				},
				//select 发生改变的时候出发函数 change
				onCopNameChange(picker, values){
					if(values[0]){
						if(this.valuekey){
							this.model = values[0][this.valuekey];
						}else{
							this.model = values[0];
						}
						this.$emit("changeSelect",values[0],this.index,this.pindex);
					}else{
						this.model = '';
					}
				}
			},
		//初始化数据
		created() {
			if(this.defaultValue) this.model = this.defaultValue;
			if(this.defaultDataArray) this.copNameSlots[0].values = this.defaultDataArray;
		}
	}
</script>