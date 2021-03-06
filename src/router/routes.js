
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/idea/:id', name: 'viewer', component: () => import('pages/IdeaViewer.vue') },
      { path: '/folder/:id', name: 'folderViewer', component: () => import('pages/FolderViewer.vue') },
      { path: '/folders', name: 'foldersIndex', component: () => import('pages/FolderIndex.vue') },
      { path: '/my-folders', name: 'myFoldersIndex', component: () => import('pages/MyFolderIndex.vue') },
      { path: '/my-ideas', name: 'myIdeasPage', component: () => import('pages/MyIdeasPage.vue') },
      { path: '/guild/:id', name: 'guildPage', component: () => import('pages/GuildPage.vue') },
      { path: '/found-guild', name: 'foundGuild', component: () => import('pages/FoundGuild.vue') },
      { path: '/creator/:id', name: 'creatorViewer', component: () => import('pages/CreatorViewer.vue') },
      { path: '/reports', name: 'reportsPage', component: () => import('pages/ReportsPage.vue') },
      { path: '/feedbacks', name: 'feedbacksPage', component: () => import('pages/FeedbacksPage.vue') },
      { path: '/favorites', name: 'favoritesPage', component: () => import('pages/FavoritesPage.vue') }
    ]
  },

  {
    path: '/registration',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/RegisterUser.vue') }
    ]
  },

  {
    path: '/not-found',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Error404.vue') }
    ]
  },
  // , leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
