<template>
    <div class="amap-page-container">
	    <el-amap vid="vuemap3" :center="center" :zoom="zoom" :events="events" style="width:100%;height:200px;">
	    </el-amap>
    </div>
  </template>
<style type="text/css">
	div.amap-geolocation-con{
		z-index: 100 !important;
	}
</style>
  <script>
    export default{
      data() {
      	let self = this;
        return {
          zoom: 0,
          center: [121.59996, 31.197646],
          vueMap:null,
          events: {
            init(map) {
                self.vueMap = map;
            }
          }
    	}
      },
      methods: {
		//逆地理编码
		getAddress(lnglatXY,proname,callback){
			var geocoder = new AMap.Geocoder({
		        radius: 1000 //范围，默认：500
		    });
			geocoder.getAddress(lnglatXY, (status, result) => {
			    if (status === 'complete' && result.info === 'OK') {
			       //获得了有效的地址信息:
			       callback(result.regeocode.formattedAddress,2);
			       this.addMarkerAddressTT(lnglatXY,result.regeocode.formattedAddress,proname);
			    }else{
			       //获取地址失败
			    }
			});  	
		},
		clearMap(){
			this.vueMap.clearMap();
		},
		//根据用户选取地址 标注点
		addMarkerAddressTT(d,formattedAddress,proname){
		    let marker = new AMap.Marker({
		    	title:proname,
		    	draggable:true,
		    	bubble:true,
		    	animation:"AMAP_ANIMATION_DROP",
	            position: [d[0],d[1]]
	        });
	        marker.setMap(this.vueMap);
	        this.vueMap.setFitView();
		    this.infoWindow(marker,proname)
		},
		// 信息提示窗体
		infoWindow(marker,content){
			var infoWindow = new AMap.InfoWindow({
		        content: '当前设备编号:<p>'+content+'</p>',
		        offset: {
		            x: 0,
		            y: -30
		        }
		    });
		    marker.on("click", (e)=>{
		        infoWindow.open(this.vueMap, marker.getPosition());
		    });
		},
      }
    };

</script>