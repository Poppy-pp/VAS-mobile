<!--* 
* @description: select组件封装
* @author: wp 
* @update: wp (2017-05-27 10:55) 
*-->
<template>
	<div class="cust-select">
		<div class="wx-select" @click="clickSelectInput">
			<input autocomplete="off" placeholder="请选择" v-model="model" onfocus='this.blur();' type="text" class="wx-input">
			<span class="wx-input__suffix">
				<span class="wx-input__suffix-inner">
					<i class="iconfont icon-xia wx-select__caret"></i>
				</span>
			</span>
		</div>

		<mt-popup v-model="selectVisible" position="bottom" class="mint-popup-4">
			<mt-picker v-if="selectVisible" ref="mtpickerAdres" :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
	    </mt-popup>
	</div>
	</template>

	<script>
		import Vue from 'vue';
		import { Indicator } from 'mint-ui';
		import myaddress from '../../assets/js/province';
		//自定义清除事件
		Vue.directive('iclick', function(el, binding, vnode) {
		    let oInput = el.querySelector('i.mintui');
		    oInput.onclick = function() {
		    	binding.value(-1);
		    };
		});
		export default {
			props:[""],
			data() {
				return {
					selectVisible:false,
					model:'',
					myAddressSlots: [
			          {
			            flex: 1,
			            defaultIndex: 1,    
			            values: Object.keys(myaddress[0]),  //省份数组
			            className: 'slot1',
			            textAlign: 'center'
			          }, {
			            divider: true,
			            content: '-',
			            className: 'slot2'
			          }, {
			            flex: 1,
			            values: Object.keys(myaddress[0]['四川省']),
			            className: 'slot3',
			            textAlign: 'center'
			          },
			          {
			            divider: true,
			            content: '-',
			            className: 'slot4'
			          },
			          {
			            flex: 1,
			            values: myaddress[0]['四川省']['成都市'],
			            className: 'slot5',
			            textAlign: 'center'
			          }
			        ],
			        myAddressProvince:'四川省',
			        myAddressCity:'成都市',
			        myAddresscounty:'锦江区',
			        myaddress:myaddress
				}
			},
			//监听属性
			watch:{
				selectVisible(curVal,oldVal){
					if(!curVal){
						$("i.wx-select__caret").removeClass("is-reverse");
						this.searchkey = "";
						this.$emit("close");
						Indicator.close();
					}else{
						this.myAddressSlots[0].defaultIndex = 22;
					}
　　　　　　　　}
　　　　　　},
			methods: {
				//点击select查询数据
				clickSelectInput(e){
					this.model = "";
					this.selectVisible = true;
					$(e.target).next().find("i.wx-select__caret").addClass("is-reverse");
					this.$emit("changeCop",this.searchkey,(values)=>{
						this.copNameSlots[0].values = values;
					});
				},
				onMyAddressChange(picker, values) {
			        let myaddress = this.myaddress[0];
			        this.model = "";
			        if(myaddress[values[0]]){
			          picker.setSlotValues(1,Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组 市
			          picker.setSlotValues(2,myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
			          this.myAddressProvince = values[0];
			          this.myAddressCity = values[1]?values[1]:'';
			          this.myAddresscounty = values[2]?values[2]:'';
			          this.model += this.myAddressProvince;
			          if(this.myAddressCity) this.model += "/"+this.myAddressCity;
			          if(this.myAddresscounty) this.model += "/"+this.myAddresscounty;
			          this.$emit("change",this.model);

			        }

		      },
			},
		//初始化数据
		created() {
		},
		mounted(){
	    }
	}
</script>