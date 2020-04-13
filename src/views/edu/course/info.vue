<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写" />
      </el-form-item>

      <!-- 所属分类 -->
      <el-form-item label="课程分类">
        <div class="block">
          <el-cascader placeholder="试试搜索：JS" v-model="subject" :options="subjectTree" :props="{label: 'title', value: 'id'}" @change="changeSubject" filterable></el-cascader>
        </div>
      </el-form-item>

      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option v-for="teacher in teacherList" :key="teacher.id" :label="teacher.name" :value="teacher.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数" />
      </el-form-item>

      <!-- 课程简介-->
      <el-form-item label="课程简介">
        <tinymce images_upload_url="https://imgkr.com/api/files/upload" :height="300" v-model="courseInfo.description" />
      </el-form-item>

      <!-- 课程封面 TODO -->
      <!-- 课程封面-->
      <el-form-item label="课程封面">
        <el-upload :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" action="https://imgkr.com/api/files/upload"
          class="avatar-uploader">
          <img :src="courseInfo.cover" />
        </el-upload>
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元" />元
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import course from "@/api/edu/course";
import subject from "@/api/edu/subject";
import teacher from "@/api/edu/teacher";
import Tinymce from "@/components/Tinymce";
export default {
  data() {
    return {
      saveBtnDisabled: false,
      courseInfo: {
        title: "",
        subjectId: "1245147886065307650", // 二级分类id
        subjectParentId: "1245147886040141826", // 一级分类id
        teacherId: "",
        lessonNum: 0,
        description: "",
        cover: "01.jpg",
        price: 0
      },
      subject: ["1245147886040141826", "1245147886065307650"], // 默认选中级联框
      BASE_API: process.env.BASE_API, // 接口API地址
      teacherList: [], // 封装所有的讲师
      subjectTree: [] // 课程分类
    };
  },
  created() {
    // 初始化所有讲师
    this.allTeacher();
    // 初始化课程分类
    this.treeSubject();
    // 判断路径中是否有数据
    if (this.$route.params && this.$route.params.id) {
      // 初始化课程信息
      course.findById(this.$route.params.id).then(response => {
        this.courseInfo = response.data;
        this.subject[0] = this.courseInfo.subjectParentId;
        this.subject[1] = this.courseInfo.subjectId;
      });
    }
  },
  methods: {
    // 上传封面成功调用的方法
    handleAvatarSuccess(res, file) {
      this.courseInfo.cover = file.response.data;
    },
    changeSubject(params) {
      this.courseInfo.subjectParentId = params[0];
      this.courseInfo.subjectId = params[1];
    },
    // 查询所有分类
    treeSubject() {
      subject.tree().then(response => {
        this.subjectTree = response.data;
      });
    },
    // 查询所有的讲师
    allTeacher() {
      teacher.all().then(response => {
        this.teacherList = response.data;
      });
    },
    saveOrUpdate() {
      this.saveBtnDisabled = true;
      if (this.$route.params && this.$route.params.id) {
        this.courseInfo.id = this.$route.params.id;
        course.update(this.courseInfo).then(response => {
          // 提示
          this.$message({
            type: "success",
            message: "更新课程信息成功!"
          });
          // 跳转到第二步
          this.$router.push({ path: "/course/chapter/" + this.courseInfo.id });
        });
      } else {
        course.save(this.courseInfo).then(response => {
          // 提示
          this.$message({
            type: "success",
            message: "添加课程信息成功!"
          });
          // 跳转到第二步
          this.$router.push({ path: "/course/chapter/" + response.data.id });
        });
      }
    },
    // 上传之前调用的方法
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  // 声明富文本编辑器组件
  components: { Tinymce }
};
</script>
// scoped 代表只在当前页面有效
<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>