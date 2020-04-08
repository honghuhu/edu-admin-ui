<template>
  <div class="dashboard-container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item prop="avatar">
        <el-upload
          class="avatar-uploader"
          action="https://imgkr.com/api/files/upload"
          :on-success="handleAvatarSuccess"
          :show-file-list="false"
        >
          <img v-if="ruleForm.avatar" :src="ruleForm.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="讲师名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="讲师资历" prop="career">
        <el-input type="textarea" v-model="ruleForm.career"></el-input>
      </el-form-item>
      <el-form-item label="讲师简介" prop="intro">
        <el-input type="textarea" v-model="ruleForm.intro"></el-input>
      </el-form-item>
      <el-form-item label="讲师等级">
        <el-select v-model="ruleForm.level" placeholder="请选择讲师级别">
          <el-option
            v-for="(item, index) in levelOptions"
            :label="item.label"
            :key="index"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #15df8b;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>

<script>
import teacher from "@/api/edu/teacher";

export default {
  data() {
    return {
      ruleForm: {
        name: "",
        career: "",
        intro: "",
        level: 2
      },
      saveBtnDisabled: false,
      levelOptions: [
        {
          value: 1,
          label: "高级讲师"
        },
        {
          value: 2,
          label: "首席讲师"
        },
        {
          value: 3,
          label: "专家讲师"
        }
      ],
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        level: [
          {
            required: true,
            message: "请选择等级",
            trigger: "change"
          }
        ],
        career: [{ required: true, message: "请填写资历", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveBtnDisabled = true;
          teacher
            .save(this.ruleForm)
            .then(response => {
              this.$message({
                type: "success",
                message: response.msg
              });
              // 路由跳转
              this.$router.push({ path: "/teacher/list" });
            })
            .catch(error => {
              this.saveBtnDisabled = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
      this.ruleForm.avatar = file.response.data;
    }
  }
};
</script>