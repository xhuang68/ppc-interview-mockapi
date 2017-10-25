<template lang="html">
  <div id="wrapper">

    <div class="navbar">

      <div class="icon" @click="$router.go(-1)" v-show="$route.name!=='Users'">
        <i class="el-icon-arrow-left"></i>
      </div>

      <div class="title">
        {{ title }}
      </div>

    </div>

    <div id="content">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
export default {
  name: 'frame',
  data () {
    return {
      title: '所有用户'
    }
  },
  watch: {
    '$route' (to, from) {
      this.generateTitle()
      console.log(to)
    }
  },
  methods: {
    generateTitle () {
      switch (this.$route.name) {
        case 'Users':
          this.title = '所有用户'
          break
        case 'Posts':
          this.title = '@' + (this.$route.query.user_name || '用户') + '的帖子'
          break
        default:
          this.title = '所有用户'
      }
    }
  },
  computed: {
  },
  created () {
    this.generateTitle()
  }
}
</script>

<style lang="css">
body {
  margin: 0;
  font-family: "PingFang SC","Helvetica Neue",Helvetica,"Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.navbar {
  width: 100%;
  height: 60px;
  background-color: RGBA(66, 133, 244, 1.00);
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
  z-index: 999;
}
.navbar .icon {
  cursor: pointer;
  position: absolute;
  left: 20px;
  top: 0;
  line-height: 60px;
}
.navbar .title {
  line-height: 60px;
  font-size: 20px;
  font-weight: 300;
}
#content {
  margin-top: 70px;
}
</style>
