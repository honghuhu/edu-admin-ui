<template>
  <div class="app-container">
    <el-form :inline="true" :model="listQuery" class="demo-form-inline">
      <el-form-item label="课程标题">
        <el-input v-model="listQuery.title" placeholder="课程标题"></el-input>
      </el-form-item>
      <el-form-item label="课程状态">
        <el-select v-model="listQuery.status" placeholder="课程状态">
          <el-option
            v-for="(item, index) in statusOptions"
            :label="item.label"
            :key="index"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="listQuery = {}; date=[]; fetchData()">清空</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="data.records"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column prop="id" label="课程主键" width="120" align="center" />
      <el-table-column prop="title" label="课程标题" width="120" align="center" />
      <el-table-column label="课程状态" width="150" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status | statusFilter(statusOptions)"
          >{{ scope.row.status | statusFilter(statusOptions)}}</el-tag>
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
            <!-- 调整课程编辑页面 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="$router.push({ path: `/course/info/${scope.row.id}` })"
          >编 辑</el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteById(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        align="center"
        layout="total, prev, pager, next"
        :current-page="data.current"
        :page-size="data.size"
        :total="data.total"
        @current-change="fetchData"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import course from "@/api/edu/course";

export default {
  filters: {
    statusFilter(value, statusOptions) {
      let option = statusOptions.find(function(item, index) {
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
      statusOptions: [
         {
          value: '',
          label: '全部'
        },
        {
          value: 'Draft',
          label: '未发布'
        },
        {
          value: 'Normal',
          label: '已发布'
        }
      ],
      date: ""
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData(page = 1) {
      this.listLoading = true;
      this.listQuery.current = page;
      this.listQuery.limit = 7;
      course.page(this.listQuery).then(response => {
        this.data = response.data;
        this.listLoading = false;
      });
    },
    deleteById(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          course.delete(id).then(response => {
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
    }
  }
};
</script>