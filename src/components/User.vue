<template lang="html">
  <div id="outer__wrapper">

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

    <div class="options">
      <div class="option" @click="$emit('albumSelected')">album</div>
      <div class="option" @click="$emit('postSelected')">posts</div>
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
#outer__wrapper {
}
.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid RGBA(218, 226, 234, 1.00);
  color: RGBA(31, 45, 61, 1.00);
}
.option {
  text-align: center;
  width: 50%;
  border-right: 1px solid RGBA(218, 226, 234, 1.00);
  padding: 10px 0;
  transition: all .3s;
  border-bottom-left-radius: 10px;
}
.option:hover {
  background-color: RGBA(70, 136, 241, 1.00);
  color: white;
}
.option:last-child {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 10px;
  border: 0;
}
#wrapper {
  padding: 10px;
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
