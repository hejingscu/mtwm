<template>
    <div>
        <div v-if="mode == 'single'">
          <!-- img:{{img}}-src:{{src}} -->
          <div style="border: 1px solid #eee;display: inline-block;float: right;margin-bottom: 10px;" v-if="src.length > 0 || img">
            <!-- <img v-if="src !== ''" :src="src" alt="" width="150" height="150"> -->
            <img :src="src[0]" v-if="src.length > 0" alt="" :width="width" :height="height">
            <img :src="img" v-else alt="" :width="width" :height="height">
          </div>
          <div id="container" style="position: relative;float: left;">
            <a class="btn btn-default" :id="btnid" href="javascript:;" style="position: relative; z-index: 1;">
                <i class="glyphicon glyphicon-plus" style="position: relative;top: 3px;"></i>
                <span style="font-size: 14px;">上传图片</span>
            </a>
            <div id="html5_1bk65h2si15cevak1ups1h5f1q5t3_container" class="moxie-shim moxie-shim-html5" style="position: absolute; top: 0px; left: 0px; width: 0px; height: 0px; overflow: hidden; z-index: 0;"><input id="html5_1bk65h2si15cevak1ups1h5f1q5t3" type="file" style="font-size: 999px; opacity: 0; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;" multiple="" accept=""></div>
          </div>
        </div>
        <div v-if="mode == 'multi'">
          <div v-if="mode == 'multi'" style="overflow: hidden">
            <div v-for="item in src" style="float: left; margin: 0 30px 30px 0;border: 1px solid #ccc;">
              <img :src="item" alt="" :width="width" :height="height">
            </div>
          </div>
          <div id="container" style="position: relative;">
            <a class="btn btn-default" :id="btnid" href="javascript:;" style="position: relative; z-index: 1;">
                <i class="glyphicon glyphicon-plus" style="position: relative;top: 3px;"></i>
                <span style="font-size: 14px;">添加图片</span>
            </a>
            <div id="html5_1bk65h2si15cevak1ups1h5f1q5t3_container" class="moxie-shim moxie-shim-html5" style="position: absolute; top: 0px; left: 0px; width: 0px; height: 0px; overflow: hidden; z-index: 0;"><input id="html5_1bk65h2si15cevak1ups1h5f1q5t3" type="file" style="font-size: 999px; opacity: 0; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;" multiple="" accept=""></div>
          </div>
        </div>

    </div>
</template>

<style>
  .btn-default{
    padding: 10px;
  }
</style>

<script>
require('plupload/js/plupload.dev.js')
require('qiniu-js/dist/qiniu.js')
import { getQiniuToken } from '@/service/getData'
  export default {
    props: {
      mode: {
        type: String,
        default: 'single'
      },
      keyname: {
        type: String,
        default: ''
      },
      img: {
        type: [String, Array],
        default: ''
      },
      width: {
        type: [Number, String],
        default: 150
      },
      height: {
        type: Number,
        default: 150
      },
      btnid: {
        type: String,
        default: '' || 'btnid'
      }
    },
    data() {
      return {
        token: '',
        src: []//临时存储,
      };
    },
    methods: {
      clearimg(){
        this.src = []
      },
      //寻找父级组件上的变量值并改变
      getRootNode(obj){

        // let keyArray = ['modalData','icon'],
        //     ob = {modalData:{icon: '99'}}
        // console.log(ob[keyArray[0]][keyArray[1]])
        let that = this,keyArray = that.keyname.split('.'), realKey

        if(obj[keyArray[0]]){
          if(keyArray.length > 1){
            if(that.mode == 'single'){
              obj[keyArray[0]][keyArray[1]] = that.src[0]
            }else{
              obj[keyArray[0]][keyArray[1]] = that.src
            }
          }else{
            if(that.mode == 'single'){
              obj[keyArray[0]] = that.src[0]
            }else{
              obj[keyArray[0]] = that.src
            }
          }
        }else{
          that.getRootNode(obj.$parent)
        }
      },
      init(){
        let that = this
        let uploader = Qiniu.uploader({
          runtimes: 'html5,flash,html4',      // 上传模式，依次退化
          browse_button: that.btnid,         // 上传选择的点选按钮，必需
          uptoken : that.token, // uptoken是上传凭证，由其他程序生成
          domain: 'http://7xjivo.com2.z0.glb.qiniucdn.com/',     // bucket域名，下载资源时用到，必需
          max_file_size: '100mb',             // 最大文件体积限制
          flash_swf_url: 'plupload/js/Moxie.swf',  //引入flash，相对路径
          chunk_size: '4mb',                  // 分块上传时，每块的体积
          auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
          save_key: true,
          dragdrop: true,
          init: {
              'FilesAdded': function(up, files) {
                  plupload.each(files, function(file) {
                      // 文件添加进队列后，处理相关的事情
                  });
              },
              'BeforeUpload': function(up, file) {
                     // 每个文件上传前，处理相关的事情
              },
              'UploadProgress': function(up, file) {
                     // 每个文件上传时，处理相关的事情
              },
              'FileUploaded': function(up, file, info) {
                     let domain = up.getOption('domain');
                     let res = JSON.parse(info);
                     that.src.push(domain +"/"+ res.key) //获取上传成功后的文件的Url
                     that.getRootNode(that.$parent)
                     //that.$parent.$parent.modalData.imageUrl = domain +"/"+ res.key
              },
              'Error': function(up, err, errTip) {
                    if (err.status == 400) {
                        that.$Notice.error({'title': '请求报文格式错误，报文构造不正确或者没有完整发送。'})
                    } else if (err.status == 401) {
                        that.$Notice.error({'title': '上传凭证无效。'})
                    } else if (err.status == 413) {
                        that.$Notice.error({'title': '上传内容长度大于 fsizeLimit 中指定的长度限制。。'})
                    } else if (err.status == 579) {
                        that.$Notice.error({'title': '回调业务服务器失败。'})
                    } else if (err.status == 599) {
                        that.$Notice.error({'title': '七牛服务端操作失败。'})
                    }
                    else if (err.status == 614) {
                        that.$Notice.error({'title': '目标资源已存在。'})
                    }
              },
              'UploadComplete': function() {
                     //队列文件处理完毕后，处理相关的事情
              },
              'Key': function(up, file) {
                  // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                  // 该配置必须要在unique_names: false，save_key: false时才生效

                  var key = "";
                  // do something with key here
                  return key
              }
          }
      });

      // domain为七牛空间对应的域名，选择某个空间后，可通过 空间设置->基本设置->域名设置 查看获取

      // uploader为一个plupload对象，继承了所有plupload的方法
      }
    },
    created: function(){
      if(!this.token){
        getQiniuToken().then( res => {
          this.token = res.data.uptoken
          this.init()
        })
      }
    },
    watch:{

    }
  }
</script>
