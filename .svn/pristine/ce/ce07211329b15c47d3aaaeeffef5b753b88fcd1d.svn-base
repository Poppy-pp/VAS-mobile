<!--* 
* @description: select组件封装
* @author: wp 
* @update: wp (2017-05-27 10:55) 
*-->
<template>
	<div class="left-delete" @click="fileClick($event)">
		<div class="z_file">
            <input @change="fileChange" name="mediaFile" type="file" :accept="accept" :multiple="multiple"/>
            <img v-if="defaultImgSrc" @click="fileClickImg($event)" :src="defaultImgSrc">
        </div>
    </div>
</template>

<script>
    import ImageResizer from 'static/js/tools';
    import axios from 'axios';
	export default {
        props:{
            name: {
                type: String,
                default: 'file'
            },
            imgSrc: String,
            httpUpload: {
                type:Boolean,
                default:false
            },
            src: String,
            isImageResizer:{
                type:Boolean,
                default:true
            },
            index:Number,
            pindex:Number
        },
		data() {
            return {
                defaultImgSrc:'',
                accept:'image/*',
                multiple:false,
                imgList: [],
                config:{
                    headers: {'Content-Type': 'multipart/form-data'}
                },
                size: 0
            }
        },
        watch:{
            imgSrc(cval,oval){
                if(!cval) this.defaultImgSrc = '';
            }
        },
        methods: {
            fileClickImg(e){
                $(e.target).prev("input").click();
            },
            fileClick(e) {
                $(e.target).find("input").click();
          },
          fileChange(el) { 
              if (!el.target.files[0].size) return;
              this.fileList(el.target);
              el.target.value = ''
          },
          fileList(fileList) {
              let files = fileList.files;
              for (let i = 0; i < files.length; i++) {
                  //判断是否为文件夹
                  if (files[i].type != '') {
                      this.fileAdd(files[i]);
                  } else {
                      //文件夹处理
                      this.folders(fileList.items[i]);
                  }
              }
          },
            //文件夹处理
            folders(files) {
              let _this = this;
                  //判断是否为原生file
                  if (files.kind) {
                      files = files.webkitGetAsEntry();
                  }
                  files.createReader().readEntries(function (file) {
                      for (let i = 0; i < file.length; i++) {
                          if (file[i].isFile) {
                              _this.foldersAdd(file[i]);
                          } else {
                              _this.folders(file[i]);
                          }
                      }
                  })
              },
              foldersAdd(entry) {
                  let _this = this;
                  entry.file(function (file) {
                      _this.fileAdd(file)
                  })
              },
              fileAdd(file) {
              //总大小
              this.size = this.size + file.size;
              //判断是否为图片文件
              if (file.type.indexOf('image') == -1) {
                  file.src = 'wenjian.png';
                  this.imgList.push({
                      file
                  });
              } else {
                  let reader = new FileReader();
                  reader.vue = this;
                  reader.readAsDataURL(file);
                  reader.onload = function () {
                      file.src = this.result;
                      this.vue.imgList.push({
                          file
                      });
                      if(this.vue.httpUpload){
                        let param = new FormData();  // 创建form对象
                        param.append(this.vue.name, file , file.name);  // 通过append向form对象添加数据
                        this.vue.$emit("success",param,this.vue.imgList);
                      }else{
                        this.vue.axiosUpload(file);
                      }
                  }
              }
          },
          //图片压缩
          uploadImageResizer(base64Img,callback){
            //--执行resize。  
            ImageResizer({  
                resizeMode:"auto"  
                ,dataSource:base64Img  
                ,dataSourceType:"base64"  
                ,maxWidth:800 //允许的最大宽度  
                ,maxHeight:600 //允许的最大高度。  
                ,onTmpImgGenerate(img){  
                }  
                ,success(resizeImgBase64,canvas){
                    callback(resizeImgBase64,canvas);
                }  
                ,debug:true  
            });  
          },
          //上传图片到服务器
          axiosUpload(file){
            if(this.isImageResizer){
                this.defaultImgSrc = file.src;
                this.uploadImageResizer(file.src,(resizeImgBase64,canvas)=>{
                    let param = new FormData();  // 创建form对象
                    file.src = resizeImgBase64;
                    param.append(this.name, file , file.name);  // 通过append向form对象添加数据
                    // 添加请求头
                    axios.post(this.src, param, this.config)
                    .then(response => {
                        this.$emit('uploadSuccess',file,response,this.index,this.pindex);
                    });
                });
            }else{
                let param = new FormData();  // 创建form对象
                param.append(this.name, file , file.name);  // 通过append向form对象添加数据
                // 添加请求头
                axios.post(this.src, param, this.config)
                .then(response => {
                    this.$emit('uploadSuccess',file,response,this.index,this.pindex);
                });
            }
          },
          fileDel(index) {
              this.size = this.size - this.imgList[index].file.size;//总大小
              this.imgList.splice(index, 1);
          },
          bytesToSize(bytes) {
              if (bytes === 0) return '0 B';
              let k = 1000, // or 1024
              sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
              i = Math.floor(Math.log(bytes) / Math.log(k));
              return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
          },
      }
  }
</script>
<style>
    .z_file {
        width: 2rem;
        height: 2rem;
        background: url(/static/images/z_add.png) no-repeat;
        background-size: 100% 100%;
        float: left;
        overflow: hidden;
    }
    .z_file img{
        width: 2rem;
    }
    .z_file input {
        display: block;
        width: auto;
        border: 0;
        display: none;
        vertical-align: middle;
    }
</style>