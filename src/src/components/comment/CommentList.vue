// src/components/comment/CommentList.vue
<template>
  <div class="comment-list">
    <h3>Đánh giá sản phẩm</h3>
    <div v-if="commentStore.loading">Đang tải...</div>
    <div v-else-if="commentStore.comments.length === 0">Chưa có đánh giá nào.</div>
    <el-card v-else v-for="comment in commentStore.comments" :key="comment.id" class="comment-item">
      <div class="comment-header">
        <span class="user-name">{{ comment.user_name }}</span>
        <el-rate v-model="comment.rating" disabled />
        <span class="comment-date">{{ formatDate(comment.created_at) }}</span>
      </div>
      <div class="comment-content">{{ comment.content }}</div>
      <div v-if="canModifyComment(comment)" class="comment-actions">
        <el-button size="small" @click="editComment(comment)">Sửa</el-button>
        <el-button size="small" type="danger" @click="deleteComment(comment.id)">Xóa</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCommentStore } from '@/stores/comment'
import { useAuthStore } from '@/stores/auth'
import { formatDate } from '@/utils/formatters'

const props = defineProps<{
  productId: number
}>()

const commentStore = useCommentStore()
const authStore = useAuthStore()

onMounted(() => {
  commentStore.fetchComments(props.productId)
})

function canModifyComment(comment) {
  return authStore.user && (authStore.user.id === comment.user_id || authStore.isAdmin)
}

function editComment(comment) {
  // Implement edit functionality
}

async function deleteComment(commentId: number) {
  try {
    await commentStore.deleteComment(commentId)
  } catch (error) {
    console.error('Failed to delete comment:', error)
  }
}
</script>