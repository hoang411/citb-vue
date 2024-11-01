// src/components/comment/CommentForm.vue
<template>
  <el-form :model="form" @submit.prevent="submitComment">
    <el-form-item label="Đánh giá">
      <el-rate v-model="form.rating" />
    </el-form-item>
    <el-form-item label="Nội dung">
      <el-input
          v-model="form.content"
          type="textarea"
          :rows="3"
          placeholder="Nhập đánh giá của bạn"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">Gửi đánh giá</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCommentStore } from '@/stores/comment'

const props = defineProps<{
  productId: number
}>()

const commentStore = useCommentStore()

const form = ref({
  rating: 0,
  content: ''
})

async function submitComment() {
  try {
    await commentStore.addComment(props.productId, form.value)
    form.value = { rating: 0, content: '' }
  } catch (error) {
    console.error('Failed to submit comment:', error)
  }
}
</script>