<template>
  <div class="main-content">
    <h1>VGG人脸表情识别</h1>
    <div style="width: 300px; height: 300px;">
      <img :src="imgsrc" alt="暂无图片" style="width: 100%; height: 100%;">
    </div>
    <p v-if="waiting" style="display: flex; align-items: center; gap: 8px;" class="pp">
      <vi-loading type="round" style="--vi-loading-width: 2em;">
      </vi-loading>正在识别</p>
    <p v-else class="pp">识别到的表情为：{{ faceView }}</p>
    <vi-upload class="my-vi-upload" @addphoto="handleGetFile" accept=".jpg">
      <vi-upload-choose>
        <vi-button color="purple">点击上传文件</vi-button>
      </vi-upload-choose>
    </vi-upload>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8888'

const imgsrc = ref('')
const resLabel = ref('')
const waiting = ref(false)

const faceView = computed(() => {
  switch(resLabel.value) {
    case 'sad':
      return '伤心的'
    case 'disgust':
      return '生气的'
    case 'happy':
      return '开心的'
    case 'fear':
      return '害怕的'
    case 'surprise':
      return '惊讶的'
    case 'neutral':
      return '中性的'
    case 'angry':
      return '生气的'
    default:
      return ''
  }
})

async function handleGetFile (file: File) {
  console.log(file)
  const imsrc = await readImg(file)
  imgsrc.value = imsrc
  waiting.value = true
  const res = await axios({
    method: 'post',
    url: '',
    params: {
      name: file.name
    }
  })
  waiting.value = false
  resLabel.value = res.data.data
  console.log(res.data.data)
}

function readImg (file: File): Promise<any> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = function (e) {
      if (!e.target) return
      resolve(e.target.result)
		}
		reader.onerror = function (e) {
			reject(e)
		}
		reader.readAsDataURL(file)
	})
}

</script>

<style scoped>
.main-content {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;
}

.pp {
  display: flex;
  height: 2em;
}
</style>
