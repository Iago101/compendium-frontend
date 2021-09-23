
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/idea/:id', name: 'viewer', component: () => import('pages/IdeaViewer.vue') },
      { path: '/folder/:id', name: 'folderViewer', component: () => import('pages/FolderViewer.vue') },
      { path: '/folders', name: 'foldersIndex', component: () => import('pages/FolderIndex.vue') },
      { path: '/guild/:id', name: 'guildPage', component: () => import('pages/GuildPage.vue') },
      { path: '/found-guild', name: 'foundGuild', component: () => import('pages/FoundGuild.vue') },
      { path: '/user/:id', name: 'userViewer', component: () => import('pages/UserViewer.vue') }
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
