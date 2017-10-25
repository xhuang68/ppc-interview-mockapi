import Vue from 'vue'
import Router from 'vue-router'
import Frame from '@/components/Frame'
import Users from '@/components/Users'
import Posts from '@/components/Posts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Frame,
      redirect: '/users',
      children: [
        {
          path: '/users',
          name: 'Users',
          component: Users
        },
        {
          path: '/posts',
          name: 'Posts',
          component: Posts
        }
      ]
    }
  ]
})
