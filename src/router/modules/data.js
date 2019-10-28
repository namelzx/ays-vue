/** When your routing table is too long, you can split it into small modules**/


const dataRouter = {
    path: '/data',
    redirect: '/data',
    meta: {title: '数据', icon: 'dashboard'},
    children: [
      {
        path: 'index',
        component: () => import('@/views/data/index'),
        name: 'order',
        meta: {title: '数据', icon: 'dashboard'}
      },
    ]
  }
export default dataRouter
