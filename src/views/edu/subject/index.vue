<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />
    <el-tree ref="tree" :data="data" :props="defaultProps" :filter-node-method="filterNode" class="filter-tree" default-expand-all />
  </div>
</template>

<script>
import subject from "@/api/edu/subject";

export default {
  data() {
    return {
      filterText: "",
      data: [],
      defaultProps: {
        children: "children",
        label: "title"
      }
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    this.treeSubject();
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    },
    treeSubject() {
      subject.tree().then(response => {
        this.data = response.data;
      });
    }
  }
};
</script>

