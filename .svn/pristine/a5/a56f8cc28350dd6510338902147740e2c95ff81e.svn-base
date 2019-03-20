<!--* 
* @description: select组件封装
* @author: wp 
* @update: wp (2017-05-27 10:55) 
*-->
<template>
	<div class="left-delete">
		<div class="move"
		 @touchstart="_touchStart"
		 @touchmove="_touchMove"
         @touchend="_touchEnd">
			<slot></slot>
		</div>
		<div class="deleteIcon" :style="txtStyle" @click.prevent="deleteItem(index)">删除</div>
	</div>
</template>

<script>
	export default {
		props: {
			index: Number,
			isShow:Boolean,//是否显示
            isOneReturn:Boolean//是否剩一个 true一个不剩
		},
		data() {
			return {
              startX: 0,       //触摸位置
              moveX: 0,      //滑动时的位置
              disX: 0,       //移动距离
              txtStyle: '',
              delWidth: 200,
              top: ''
          	}
          },
          methods: {
          	_touchStart(ev) {
          		ev = ev || event;
                if(!this.isOneReturn && this.index == 0) return;
          		if(!this.isShow) return;
          		if(ev.touches.length == 1){
                    // 手指按下的时候记录按下的位置
                    this.startX = ev.touches[0].clientX;
                }
            },
            _touchMove(ev) {
            	ev = ev || event;
            	if(ev.touches.length == 1) {
                    // 滑动过程中的实时位置
                    this.moveX = ev.touches[0].clientX
                    // 滑动过程中实时计算滑动距离
                    this.disX = this.startX - this.moveX;
                    // 如果是向右滑动或者只是点击，不改变滑动位置
                    if(this.disX < 0 || this.disX == 0) {
                        this.txtStyle = "marginLeft:-2rem";
                    }else if (this.disX > 0) {
					//如果是向左滑动，则实时给这个根元素一个向左的偏移-left，当偏移量到达固定值delWidth时，固定元素的偏移量为 delWidth
						this.txtStyle = "marginLeft:0rem";
					// if (this.disX >= this.delWidth/100) {
					// 	this.txtStyle = "maginRight:-" + this.delWidth/100 + "rem";
					// }
				}
			}
		},
		_touchEnd(ev) {
			if (event.changedTouches.length == 1) {
				this.startX = 0;
				this.zIndex = "z-index:" + -1 + "rem";
                // 手指移动结束后的水平位置
                let endX = event.changedTouches[0].clientX;
                // 触摸开始与结束,手指移动的距离
                this.disX = this.startX - endX;
                //如果距离小于删除按钮的1/2，不显示删除按钮
            }
        },
        deleteItem(index) {
        	this.$emit('deleteItem', index);
        }
    }
  }
</script>

<style>
	.left-delete{
		width:100%;
		height:100%;
		z-index:2;
		display: flex;
	}
	.move{
    	flex: 1;
	}
	.deleteIcon{
		transition: all .3s;
		width: 2rem;
	    flex: 0 0 2rem;
	    margin-left: -2rem;
	    font-size: 20px;
	    color: #fff;
	    background-color: red;
	    display: -ms-flexbox;
	    display: flex;
	    -ms-flex-align: center;
	    align-items: center;
	    -ms-flex-pack: center;
	    justify-content: center;
	}
</style>