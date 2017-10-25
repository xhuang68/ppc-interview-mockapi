<template lang="html">
  <div id="wrapper" v-loading="loading">

    <div class="buttons">
      <el-button size="small" @click="handleCreate"><i class="el-icon-plus el-icon--left"></i>发布帖子</el-button>
      <el-button size="small" @click="handleSort"><i :class="[sortDown ? 'el-icon-arrow-down' : 'el-icon-arrow-up', 'el-icon--left']"></i>排序帖子</el-button>
    </div>

    <div class="post" v-for="(post, index) in posts" :key="index">
      <post :post="post" @handleEdit="handleEdit(post, index)" @handleDelete="handleDelete(post, index)"></post>
    </div>

    <!-- Form -->
    <el-dialog :title="toCreate ? '新建帖子' : '编辑帖子'" :visible.sync="dialogFormVisible">
      <el-form :model="editPost">
        <el-form-item label="名称" label-width="120">
          <el-input v-model="editPost.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" label-width="120">
          <el-input type="textarea" v-model="editPost.body" placeholder="请填写内容">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmPost">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Post from '@/components/Post.vue'
import clone from 'lodash/clone'
export default {
  name: 'posts',
  components: {
    Post
  },
  data () {
    return {
      loading: false,
      posts: [],
      toCreate: true,
      selectIndex: 0,
      selectPost: {},
      editPost: {},
      dialogFormVisible: false,
      sortDown: false
    }
  },
  created () {
    this.initView()
  },
  methods: {
    initView () {
      this.loading = true
      var getUrl = 'http://jsonplaceholder.typicode.com/posts?userId=' + this.$route.query.user_id
      this.$http.get(getUrl)
        .then((res) => {
          this.posts = res.body
          this.loading = false
        })
        .catch((res) => {
          this.$message({
            showClose: true,
            type: 'error',
            message: '载入出错'
          })
          this.loading = false
        })
    },
    handleSort () {
      this.posts.sort((postA, postB) => {
        return this.sortDown ? (postA.title[0] >= postB.title[0]) : (postA.title[0] <= postB.title[0])
      })
      this.sortDown = !this.sortDown
    },
    handleCreate () {
      this.toCreate = true
      this.editPost = {}
      this.dialogFormVisible = true
    },
    handleEdit (post, index) {
      this.selectPost = clone(post)
      this.selectIndex = index
      this.toCreate = false
      this.editPost = clone(post)
      this.dialogFormVisible = true
    },
    handleDelete (post, index) {
      this.$confirm('确定删除该帖子?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.$http.delete('http://jsonplaceholder.typicode.com/posts/' + post.id)
          .then((res) => {
            this.loading = false
            this.posts.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
          .catch(() => {
            this.loading = false
            this.$message({
              type: 'error',
              showClose: true,
              message: '删除失败，请重试'
            })
          })
      }).catch(() => {
      })
    },
    handleConfirmPost () {
      this.loading = true
      if (this.toCreate) {
        var postUrl = 'http://jsonplaceholder.typicode.com/posts'
        var postBody = {
          title: this.editPost.title,
          body: this.editPost.body,
          userId: this.$route.query.user_id
        }
        this.$http.post(postUrl, postBody)
          .then((res) => {
            this.$message({
              type: 'success',
              showClose: true,
              message: '发布成功!'
            })
            this.posts.unshift(postBody)
            this.loading = false
            this.dialogFormVisible = false
          })
          .catch((res) => {
            this.$message({
              type: 'error',
              showClose: true,
              message: '发布失败，请重试'
            })
            this.loading = false
          })
      } else {
        var putUrl = 'http://jsonplaceholder.typicode.com/posts/' + this.selectPost.id
        var putBody = {
          id: this.selectPost.id,
          title: this.editPost.title,
          body: this.editPost.body,
          userId: this.selectPost.userId
        }
        this.$http.put(putUrl, putBody)
          .then((res) => {
            this.$message({
              type: 'success',
              showClose: true,
              message: '修改成功!'
            })
            this.posts.splice(this.selectIndex, 1, putBody)
            this.dialogFormVisible = false
            this.loading = false
          })
          .catch((res) => {
            this.$message({
              type: 'error',
              showClose: true,
              message: '修改失败，请重试'
            })
            this.loading = false
          })
      }
    }
  }
}
</script>

<style lang="css" scoped>
.buttons {
  width: 80%;
  margin: 10px auto;
  /*text-align: center;*/
}
.post {
  width: 80%;
  margin: 10px auto;
}
</style>
