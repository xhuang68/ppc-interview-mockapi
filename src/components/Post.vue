<template lang="html">
  <div id="wrapper">
    <div class="title">
      {{ post.title }}
      <div class="op">
        <i class="el-icon-setting" @click="$emit('handleEdit')"></i>
        <i class="el-icon-document" @click="loadComment"></i>
        <i class="el-icon-delete2" @click="$emit('handleDelete')"></i>
      </div>
    </div>
    <div class="body">
      {{ post.body }}
    </div>
    <div class="comment" v-loading="loading" v-if="showComment">
      <div class="title">评论 <el-button size="mini"><i class="el-icon-plus"></i></el-button></div>
      <div class="content" v-for="(comment, index) in comments" :key="index">
        <div class="name" style="padding:0 10px;">
          {{ comment.name }}
        </div>
        <div class="body">
          {{ comment.body }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'post',
  props: {
    post: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      showComment: false,
      loading: false,
      comments: []
    }
  },
  methods: {
    loadComment () {
      this.showComment = true
      this.loading = true
      this.$http.get('http://jsonplaceholder.typicode.com/posts/' + this.post.id + '/comments')
        .then((res) => {
          this.comments = res.body
          this.loading = false
        })
        .catch((res) => {
          this.$message({
            showClose: true,
            type: 'error',
            message: '加载评论出错，请重试'
          })
          this.loading = false
        })
    }
  }
}
</script>

<style lang="css" scoped>
#wrapper {
  cursor: pointer;
  border: 1px solid RGBA(218, 226, 234, 1.00);
  box-shadow: 10px 10px 10px RGBA(131, 145, 165, 0.1);
  border-radius: 5px;
  transition: all .3s;
}
#wrapper:hover {
  box-shadow: 0px 5px 10px RGBA(131, 145, 165, 0.1);
  transform: scale(0.99);
}
.title {
  font-size: 20px;
  color: RGBA(66, 133, 244, 1.00);
  font-weight: 300;
  padding: 10px;
}
.title .op {
  float: right;
}
.title .op i {
  cursor: pointer;
  opacity: .5;
  transition: all .3s
}
.title .op i:hover {
  opacity: 1;
}
.comment,
.body {
  border-top: 1px solid RGBA(218, 226, 234, 1.00);
  padding: 5px 10px;
}
.comment > .title {
  font-size: 12px;
  color: RGBA(131, 145, 165, 1.00);
}
.comment > .content {
  font-size: 12px;
  border: 1px solid RGBA(131, 145, 165, 1.00);
  border-radius: 10px;
  padding: 5px 10px;
  margin-bottom: 5px;
}
.comment > .content:hover {
  background-color: RGBA(70, 136, 241, .1);
}
</style>
