<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>

    <el-tree
      :data="chapterVideo"
      :props="{label: 'title', value: 'id'}"
      default-expand-all
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button type="text" size="mini" @click="() => modify(node,data)">modify</el-button>
          <el-button type="text" size="mini" @click="() => remove(node,data)">delete</el-button>
          <!-- 只有在第一级才会展示添加下级标签 -->
          <el-button
            v-if="node.level === 1"
            type="text"
            size="mini"
            @click="() => append(node,data)"
          >append</el-button>
        </span>
      </span>
    </el-tree>

    <!-- 添加和修改章节 -->
    <el-button type="text" @click="dialogChapter = true, chapterDisabledBtn = false">添加章节</el-button>
    <el-dialog :title="dialogChapterTitle" :visible.sync="dialogChapter" width="30%">
      <el-form ref="chapter" label-width="100px">
        <el-form-item label="章节名称">
          <el-input v-model="chapter.title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="chapterDisabledBtn" type="primary" @click="saveOrUpdateChapter">提 交</el-button>
          <el-button @click="dialogChapter = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogVideo" :title="dialogVideoTitle">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title" />
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number v-model="video.sort" :min="0" controls-position="right" />
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.isFree">
            <el-radio :label="0">免费</el-radio>
            <el-radio :label="1">收费</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <!-- TODO -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideo = false">取 消</el-button>
        <el-button :disabled="videoDisabledBtn" type="primary" @click="saveOrUpdateVideo">确 定</el-button>
      </div>
    </el-dialog>

    <el-form label-width="120px">
      <el-form-item>
        <el-button @click="previous">上一步</el-button>
        <el-button type="primary" @click="next">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import chapter from "@/api/edu/chapter";
import video from "@/api/edu/video";
export default {
  data() {
    return {
      dialogChapter: false,
      dialogVideo: false,
      dialogChapterTitle: "添加章节",
      dialogVideoTitle: "添加小结",
      chapterDisabledBtn: false,
      videoDisabledBtn: false,
      chapter: {},
      video: {},
      chapterVideo: []
    };
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.treeChapterVideo(this.$route.params.id);
    }
  },
  methods: {
    previous() {
      this.$router.push({ path: `/course/info/${this.$route.params.id}` });
    },
    next() {
      //跳转到第二步
      this.$router.push({ path: `/course/publish/${this.$route.params.id}` });
    },
    treeChapterVideo(courseId) {
      chapter.chapterVideo(courseId).then(response => {
        this.chapterVideo = response.data;
      });
    },
    saveOrUpdateChapter() {
      this.chapterDisabledBtn = true;
      this.chapter.courseId = this.$route.params.id;
      chapter.saveOrUpdate(this.chapter).then(response => {
        // 获取章节小结tree
        this.treeChapterVideo(this.chapter.courseId);
        this.chapter.title = "";
        this.$message({
          type: "success",
          message: "添加或修改章节成功!"
        });
        // 关闭章节弹框
        this.dialogChapter = false;
      });
    },
    removeChapter(id) {
      chapter.remove(id).then(response => {
        // 获取章节小结tree
        this.treeChapterVideo(this.$route.params.id);
        this.$message({
          type: "success",
          message: "删除章节成功!"
        });
      });
    },
    saveOrUpdateVideo() {
      this.videoDisabledBtn = true;
      this.dialogVideoTitle = "添加小结";
      video.saveOrUpdate(this.video).then(response => {
        // 获取章节小结tree
        this.treeChapterVideo(this.$route.params.id);
        this.video = {};
        this.$message({
          type: "success",
          message: "添加或修改小节成功!"
        });
        // 关闭章节弹框
        this.dialogVideo = false;
      });
    },
    videoInfo(id) {
      this.videoDisabledBtn = false;
      this.dialogVideoTitle = "修改小结";
      video.info(id).then(response => {
        this.video = response.data;
      });
      this.dialogVideo = true;
    },
    removeVideo(id) {
      video.remove(id).then(response => {
        // 获取章节小结tree
        this.treeChapterVideo(this.$route.params.id);
        this.$message({
          type: "success",
          message: "删除小结成功!"
        });
      });
    },
    remove(node, data) {
      if (node.level === 1) {
        this.removeChapter(data.id);
      } else {
        this.removeVideo(data.id);
      }
    },
    append(node, data) {
      this.dialogChapterTitle = "添加小结";
      this.video.courseId = this.$route.params.id;
      this.video.chapterId = data.id;
      this.videoDisabledBtn = false;
      this.dialogVideo = true;
    },
    modify(node, data) {
      if (node.level === 1) {
        this.dialogChapterTitle = "修改章节";
        this.chapter.id = data.id;
        this.chapter.title = data.title;
        this.dialogChapter = true;
      } else {
        this.videoInfo(data.id);
      }
    }
  }
};
</script>
<style>
.custom-tree-node {
  flex: 1;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>