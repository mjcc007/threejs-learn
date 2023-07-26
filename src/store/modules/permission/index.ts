import { defineStore } from "pinia";
import { basicRoutes } from "@/router/routes";

export const usePermissionStore = defineStore("permission", {
  state() {
    return {
      accessRoutes: [] as any[],
    };
  },
  getters: {
    routes(): any[] {
      return basicRoutes.concat(this.accessRoutes);
    },
    menus(): any[] {
      return this.routes.filter((route: any) => route.name && !route.isHidden);
    },
  },
  actions: {},
});
