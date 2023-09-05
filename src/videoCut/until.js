// Description: until.js
function getVideoFrame(file, currentTime) { // 获取视频某一帧
  const fileReader = new FileReader()
  fileReader.readAsDataURL(file)
  fileReader.onload = function (el) {
    console.log('########## fileReader onload ##########')
    console.log(el.target.result)
    const video = document.createElement('video')
    video.setAttribute('crossOrigin', 'anonymous') // 处理跨域
    video.setAttribute('src', el.target.result)
    video.setAttribute('width', '400')
    video.setAttribute('height', '600')
    video.setAttribute('preload', 'auto')
    video.currentTime = currentTime
    video.addEventListener('loadeddata', function () {
      console.log('########## video loadeddata ##########')
      videoCoverImg(video)
    })
  }
}

function videoCoverImg(video) { // 获取视频封面
  const canvas = document.createElement('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  const ctx = canvas.getContext('2d')
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
  const img = document.createElement('img')
  img.src = canvas.toDataURL('image/png')
  img.width = 600
  img.height = 400
  document.body.appendChild(img)
}

document.querySelector('#file').addEventListener('change', function (el) {
  console.log('########## getVideoFile ##########')
  console.log(el.target.files.length)
  for (let i = 0; i < el.target.files.length; i++) {
    const file = el.target.files[i]
    if (file.type.indexOf('video') === -1) {
      alert('请选择视频文件')
      return
    }
    getVideoFrame(file, 1)
  }
})