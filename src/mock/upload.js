// mock/upload.js
export default [
  {
    url: '/api/mock/file/upload',  // 换成你 uploadfile 实际请求的路径
    method: 'post',
    response: () => {
      return {
        success: true,
        data: {
          url: '/mock/images/test.jpg'
        },
        msg: '上传成功'
      }
    }
  }
]