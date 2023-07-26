const Layout = () => import("@/layout/index.vue");
export const basicRoutes = [
  {
    name: "Threejs Learn",
    path: "/",
    component: Layout,
    redirect: "/PanelShader",
    children: [
      {
        name: "PanelShader",
        path: "PanelShader",
        component: () => import("@/views/PanelShader/index.vue"),
        meta: {
          title: "PanelShader",
          icon: "mdi:home",
          order: 0,
        },
      },
      {
        name: "CreateScene",
        path: "CreateScene",
        component: () => import("@/views/CreateScene/index.vue"),
        meta: {
          title: "CreateScene",
          icon: "mdi:home",
          order: 0,
        },
      },
    ],
  },
];
