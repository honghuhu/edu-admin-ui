<template>
  <div class="app-container">
    <el-form lable-width="120px">
      <el-form-item label="选择Excel"></el-form-item>
      <el-upload
        ref="upload"
        name="multipartFile"
        :action="BASE_API+'/subject/import'"
        :auto-upload="false"
        :on-success="fileUploadSuccess"
        :on-error="fileUploadError"
        :disabled="importBtnDisable"
        accept="application/vnd.ms-excel"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button
          :loading="loading"
          style="margin-left: 10px;"
          size="small"
          type="success"
          @click="submitUpload"
        >上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      BASE_API: process.env.BASE_API,
      importBtnDisable: false,
      loading: false
    };
  },
  methods: {
    submitUpload() {
      this.importBtnDisable = true;
      this.loading = true;
      this.$refs.upload.submit();
    },
    fileUploadSuccess(response) {
      this.importBtnDisable = false;
      this.loading = false;
      this.$message({
        type: "success",
        message: response.msg
      });
      this.$router.push({"path":"/subject/list"})
    },
    fileUploadError() {
      this.importBtnDisable = false;
      this.loading = false;
      this.$message({
        type: "error",
        message: "上传失败"
      });
    }
  }
};
</script>