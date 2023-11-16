<template>
  <div class="main-content">
    <h1>VGG人脸表情识别</h1>
    <div style="width: 300px; height: 300px;">
      <img :src="imgsrc" alt="暂无图片" style="width: 100%; height: 100%;">
    </div>
    <vi-upload class="my-vi-upload" @addphoto="handleGetFile" accept=".jpg">
      <vi-upload-choose>
        <vi-button color="purple">点击上传文件</vi-button>
      </vi-upload-choose>
    </vi-upload>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

axios.defaults.url = '127.0.0.1:8888'

const imgsrc = ref('')

function handleGetFile (file: File) {
  console.log(file)
  readImg(file).then((img: string) => {
    console.log(img)
    imgsrc.value = img
  }).catch(err => console.error(err))
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
  gap: 10px;
}
</style>
