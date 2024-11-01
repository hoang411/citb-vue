// src/utils/errorHandlers.ts
import { ElMessage } from 'element-plus'

export function handleApiError(error: any) {
    console.error('API Error:', error)

    let errorMessage = 'Đã xảy ra lỗi. Vui lòng thử lại sau.'

    if (error.response) {
        // Lỗi từ server
        const status = error.response.status
        const data = error.response.data

        switch (status) {
            case 400:
                errorMessage = data.message || 'Dữ liệu không hợp lệ.'
                break
            case 401:
                errorMessage = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'
                // Có thể thêm logic để đăng xuất người dùng ở đây
                break
            case 403:
                errorMessage = 'Bạn không có quyền thực hiện hành động này.'
                break
            case 404:
                errorMessage = 'Không tìm thấy dữ liệu yêu cầu.'
                break
            case 500:
                errorMessage = ' Đã xảy ra lỗi trên server. Vui lòng thử lại sau.'
                break
            default:
                break
        }
    } else {
        // Lỗi mạng hoặc lỗi khác
        errorMessage = 'Đã xảy ra lỗi. Vui lòng thử lại sau.'
    }

    ElMessage.error(errorMessage)
}