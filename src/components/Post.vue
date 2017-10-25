<template lang="html">
  <div id="wrapper">
    <div class="title">
      {{ post.title }}
      <div class="op">
        <i class="el-icon-setting" @click="$emit('handleEdit')"></i>
        <i class="el-icon-delete2" @click="$emit('handleDelete')"></i>
      </div>
    </div>
    <div class="body">
      {{ post.body }}
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
.body {
  border-top: 1px solid RGBA(218, 226, 234, 1.00);
  padding: 5px 10px;
}
</style>
