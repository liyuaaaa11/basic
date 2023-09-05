<template>
  <div>
    <h1>截取视频第一帧做封面图</h1>
    <a-button>上传</a-button>
    <input class="file" type="file" accept=".mp4" name="" id="" @change="handleChange">
    <img :src="imgurl" alt="" srcset="">
    <Upload class="upload" :multiple="true" @uploadData="uploadData"></Upload>
    
  </div>
</template>

<script>
import Upload from '@/components/upload/index.vue'

export default {
  name: 'Test',
  components: {
    Upload
  },
  data() {
    return {
      imgurl: '',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    handleChange(e) {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(e.target.files[0])
      const that = this
      fileReader.onload = function(e) {
        console.log(e.target)
        const video = document.createElement('video')
        video.setAttribute('crossOrigin', 'anonymous') // 处理跨域
        video.setAttribute('src', e.target.result)
        video.setAttribute('width', '400')
        video.setAttribute('height', '600')
        video.setAttribute('preload', 'auto')
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        video.currentTime = 1
        // 事件在媒体当前播放位置的视频帧（通常是第一帧）加载完成后触发
        video.addEventListener('loadeddata', function() {
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
          // const img = document.createElement('img')
          that.imgurl = canvas.toDataURL('image/png')
          // document.body.appendChild(img)
        })
      }
    },
    uploadData(data) {
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
.ant-btn{
  margin: 100px 200px;
}
.file{
  top: 158px;
  left: 200px;
  opacity: 0;
  position: absolute;
}
img{
  width: 400px;
  height: 300px;
  margin: 100px 200px;
  position: absolute;
}
.upload{
    margin: 100px 200px;
    width: 100px;
    height: 60px;
}
</style>
