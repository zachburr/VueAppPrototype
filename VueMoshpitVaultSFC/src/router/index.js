import { createRouter, createWebHistory } from 'vue-router'
import ConcertView from "@/views/ConcertView.vue";
import HomeView from "@/views/HomeView.vue";
import ArtistView from "@/views/ArtistView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/concerts',
      name: 'concerts',
      component: ConcertView
    },
    {
      path: '/artists',
      name: 'Artists',
      component: ArtistView
    },
  ],
})

export default router
