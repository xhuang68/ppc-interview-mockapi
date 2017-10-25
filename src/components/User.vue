<template lang="html">
  <div id="wrapper">
    <div class="avatar">
      <img src="/static/default_avatar.svg" alt="">
    </div>
    <div class="info">
      <div class="realname">{{ user.name || '姓名' }}</div>
      <div class="username">@{{ user.username || '用户名' }}</div>
      <div class="phone">{{ user.phone || '电话' }}</div>
      <div class="email">{{ user.email || '邮件' }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user',
  props: {
    user: {
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
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar {
  width: 100px;
}
.avatar img {
  width: 100%;
  border-radius: 50%;
}
.info {
  margin-left: 20px;
  width: 200px;
}
.info .realname,
.info .username,
.info .phone,
.info .email {
  margin: 2px auto;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.info .realname {
  font-size: 12px;
}
.info .username {
  font-weight: 300;
}
.info .phone {
}
.info .email {
}
</style>
