import Vue from 'vue'
import Router from 'vue-router'

// Progress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

const router = new Router({
  // Control scroll behavior
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition && to.meta.keepAlive) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  },

  routes: [
    {
      path: '/',
      name: '',
      component: () => import('./../Login.vue')
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('./../Login.vue')
    },

    {
      path: '/layout',
      name: 'layout',
      component: () => import(`./../components/layout/${kindo.config.theme.defaultTheme}/Layout.vue`),
      children: [
        {
          path: 'deshboard/workplace',
          name: 'deshboard/workplace',
          component: () => import(`./../view/deshboard/Workplace.vue`)
        },
        {
          path: 'deshboard/analysis',
          name: 'deshboard/analysis',
          component: () => import(`./../view/deshboard/Analysis.vue`)
        },
        {
          path: 'deshboard/monitor',
          name: 'deshboard/monitor',
          component: () => import(`./../view/deshboard/Monitor.vue`)
        }
      ]
    },

    {
      path: '/noAuth',
      name: 'noAuth',
      component: () => import(`./../components/NoAuthority.vue`)
    },

    {
      path: '*',
      name: 'notFound',
      component: () => import(`./../components/NotFound.vue`)
    }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start()

  // Validate user status
  if (to.meta.auth) {
    next()
  } else {
    next()
  }
})

router.afterEach(() => {
  // Wait transition
  setTimeout(() => {
    NProgress.done()
  }, 200)
})

export default router
