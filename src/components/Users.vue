<template>
  <div id="wrapper" v-loading="loading">
    <div class="user-block">
      <user class="user" v-for="(user, index) in users" :key="index" :user="user" @click.native="handleUserSelect(user)"></user>
      <div class="dummy-user" v-for="n in 5" :key="n"></div>
    </div>
  </div>
</template>

<script>
import User from '@/components/user.vue'
export default {
  name: 'Home',
  components: {
    User
  },
  data () {
    return {
      loading: false,
      users: []
    }
  },
  created () {
    this.initView()
  },
  methods: {
    initView () {
      this.loading = true
      this.$http.get('http://jsonplaceholder.typicode.com/users')
        .then((res) => {
          this.users = res.body
          this.loading = false
        })
        .catch((res) => {
          this.loading = false
        })
    },
    handleUserSelect (user) {
      this.$router.push({
        name: 'Posts',
        params: {
        },
        query: {
          user_id: user.id,
          user_name: user.username
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-block {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.user {
  border: 1px solid RGBA(218, 226, 234, 1.00);
  box-shadow: 10px 10px 10px RGBA(131, 145, 165, 0.1);
  cursor: pointer;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  transition: all .3s;
}
.user:hover {
  box-shadow: 0px 5px 10px RGBA(131, 145, 165, 0.1);
  transform: scale(0.99);
}
.dummy-user {
  width: 342px;
  height: 0;
  margin: 10px;
}
</style>
