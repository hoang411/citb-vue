<template>
  <div class="product-images">
    <el-upload
        v-model:file-list="fileList"
        :action="uploadAction"
        :auto-upload="false"
        :limit="limit"
        :on-change="handleChange"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :before-upload="beforeUpload"
        list-type="picture-card"
        accept="image/*"
        multiple
    >
      <el-icon><Plus /></el-icon>
      <template #tip>
        <div class="upload-tip">
          Chấp nhận JPG/PNG, tối đa {{ limit }} ảnh
        </div>
      </template>
    </el-upload>

    <!-- Preview các ảnh hiện tại -->
    <div v-if="imageUrls.length" class="current-images">
      <div v-for="(url, index) in imageUrls" :key="url" class="image-item">
        <el-image
            :src="url"
            fit="cover"
            :preview-src-list="imageUrls"
            class="preview-image"
        />
        <div class="image-actions">
          <el-button
              type="danger"
              size="small"
              circle
              @click="removeExistingImage(index)"
          >
            <el-icon><Delete /></el-icon>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { UploadFile, UploadFiles } from 'element-plus'

const props = defineProps<{
  images?: File[]
  imageUrls?: string[]
  limit?: number
}>()

const emit = defineEmits<{
  (e: 'update:images', files: File[]): void
  (e: 'update:imageUrls', urls: string[]): void
}>()

const fileList = ref<UploadFiles>([])
const uploadAction = '#' // Không sử dụng upload tự động

// Kiểm tra file trước khi upload
const beforeUpload = (file: File) => {
  const isImage = file.type.startsWith('image/')
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isImage) {
    ElMessage.error('Chỉ chấp nhận file ảnh!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('Kích thước ảnh không được vượt quá 2MB!')
    return false
  }
  return true
}

// Xử lý khi thêm file mới
const handleChange = (uploadFile: UploadFile) => {
  const files = fileList.value
      .filter(file => file.raw)
      .map(file => file.raw as File)
  emit('update:images', files)
}

// Xử lý khi xóa file
const handleRemove = (uploadFile: UploadFile) => {
  const files = fileList.value
      .filter(file => file.raw)
      .map(file => file.raw as File)
  emit('update:images', files)
}

// Xử lý khi vượt quá số lượng cho phép
const handleExceed = () => {
  ElMessage.warning(`Chỉ được phép tải lên tối đa ${props.limit} ảnh!`)
}

// Xóa ảnh hiện tại
const removeExistingImage = (index: number) => {
  const newUrls = [...(props.imageUrls || [])]
  newUrls.splice(index, 1)
  emit('update:imageUrls', newUrls)
}

// Watch props để cập nhật fileList
watch(() => props.images, (newFiles) => {
  if (newFiles) {
    fileList.value = newFiles.map(file => ({
      name: file.name,
      raw: file
    }))
  }
}, { deep: true })
</script>

<style scoped>
.product-images {
  width: 100%;
}

.upload-tip {
  color: #909399;
  font-size: 12px;
  margin-top: 8px;
}

.current-images {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.image-item {
  position: relative;
  width: 148px;
  height: 148px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-actions {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 4px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  padding: 4px;
}

:deep(.el-upload--picture-card) {
  width: 148px;
  height: 148px;
  line-height: 148px;
}

:deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 148px;
  height: 148px;
}
</style>