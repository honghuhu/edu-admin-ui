<template>
  <div class="app-container">
    <el-form :inline="true" :model="listQuery" class="demo-form-inline">
      <el-form-item label="讲师名称">
        <el-input v-model="listQuery.name" placeholder="讲师名称"></el-input>
      </el-form-item>
      <el-form-item label="讲师级别">
        <el-select v-model="listQuery.level" placeholder="讲师级别">
          <el-option v-for="(item, index) in levelOptions" :label="item.label" :key="index" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建日期">
        <div class="block">
          <el-date-picker v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd hh:mm:ss"
            @change="changeDate"></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="listQuery = {}; date=[]; fetchData()">清空</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" :data="data.records" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column prop="id" label="讲师主键" width="120" align="center" />
      <!-- <el-table-column prop="avatar" label="讲师头像" width="120" align="center">
        <template slot-scope="scope">
          <img v-if="scope.row.avatar" :src="scope.row.avatar" class="avatar" />
        </template>
      </el-table-column>-->
      <el-table-column prop="name" label="讲师名称" width="120" align="center" />
      <el-table-column prop="career" label="讲师资历" width="200" align="center" />
      <el-table-column prop="intro" label="讲师简介" width="500" align="center" />
      <el-table-column label="讲师等级" width="150" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.level | levelFilter(levelOptions)">{{ scope.row.level | levelFilter(levelOptions)}}</el-tag>
          <!-- <el-tag>{{ scope.row.level === 1 ? "高级讲师" : "首席讲师"}}</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column align="center" prop="gmtCreate" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.gmtCreate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="updateDialogVisible = true, updateBtnDisabled = false, ruleForm = { ...scope.row }">编 辑</el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteById(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination align="right" layout="total, prev, pager, next" :current-page="data.current" :page-size="data.size" :total="data.total" @current-change="fetchData">
      </el-pagination>
    </div>

    <!-- 更新框 -->
    <el-dialog title="修改讲师" :visible.sync="updateDialogVisible" width="30%" center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
            <el-option v-for="(item, index) in levelOptions" :label="item.label" :key="index" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="updateBtnDisabled" type="primary" @click="update('ruleForm')">提 交</el-button>
          <el-button @click="updateDialogVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import teacher from "@/api/edu/teacher";

export default {
  filters: {
    levelFilter(value, levelOptions) {
      let option = levelOptions.find(function(item, index) {
        return value === item.value;
      });
      return option === undefined ? "---" : option.label;
    }
  },
  data() {
    return {
      data: {},
      listLoading: true,
      listQuery: {},
      options: {
        "1": "高级讲师",
        "2": "首席讲师",
        "3": "专家讲师"
      },
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
      date: "",
      updateDialogVisible: false,
      updateBtnDisabled: false,
      ruleForm: {},
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
  created() {
    this.fetchData();
  },
  methods: {
    fetchData(page = 1) {
      this.listLoading = true;
      this.listQuery.current = page;
      this.listQuery.limit = 10;
      teacher.page(this.listQuery).then(response => {
        this.data = response.data;
        this.listLoading = false;
      });
    },
    update(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updateBtnDisabled = true;
          teacher.update(this.ruleForm).then(response => {
            this.fetchData(this.data.current);
            this.updateDialogVisible = false;
            this.$message({
              type: "success",
              message: "更新成功!"
            });
          });
        }
      });
    },
    deleteById(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          teacher.delete(id).then(response => {
            if (response.code == 0) {
              this.fetchData();
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    changeDate() {
      this.listQuery.begin = this.date[0];
      this.listQuery.end = this.date[1];
    }
  }
};
</script>