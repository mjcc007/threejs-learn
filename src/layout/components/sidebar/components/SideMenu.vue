<template>
  <n-menu
    ref="menu"
    class="side-menu"
    accordion
    :indent="18"
    :collapsed-icon-size="22"
    :collapsed-width="64"
    :options="(menuOptions as any)"
    :value="(activeKey as any)"
    @update:value="handleMenuSelect"
  />
</template>

<script setup lang="ts">
import { usePermissionStore } from "@/store";
import { renderCustomIcon, renderIcon, isExternal } from "@/utils";
import { computed, nextTick, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const curRoute = useRoute();
const permissionStore = usePermissionStore();

const activeKey = computed(() => curRoute.meta?.activeMenu || curRoute.name);

const menuOptions = computed(() => {
  return permissionStore.menus
    .map((item) => getMenuItem(item))
    .sort((a, b) => a.order - b.order);
});

const menu = ref(null);
watch(curRoute, async () => {
  await nextTick();
  // @ts-ignore
  menu.value?.showOption();
});

function resolvePath(basePath: string, path: string) {
  if (isExternal(path)) return path;
  return (
    "/" +
    [basePath, path]
      .filter((path) => !!path && path !== "/")
      .map((path) => path.replace(/(^\/)|(\/$)/g, ""))
      .join("/")
  );
}

function getMenuItem(route: any, basePath = "") {
  let menuItem = {
    label: (route.meta && route.meta.title) || route.name,
    key: route.name,
    path: resolvePath(basePath, route.path),
    icon: getIcon(route.meta),
    order: route.meta?.order || 0,
  };

  const visibleChildren = route.children
    ? route.children.filter((item: any) => item.name && !item.isHidden)
    : [];

  if (!visibleChildren.length) return menuItem;

  if (visibleChildren.length === 1) {
    // 单个子路由处理
    const singleRoute = visibleChildren[0];
    menuItem = {
      ...menuItem,
      label: singleRoute.meta?.title || singleRoute.name,
      key: singleRoute.name,
      path: resolvePath(menuItem.path, singleRoute.path),
      icon: getIcon(singleRoute.meta),
    };
    const visibleItems = singleRoute.children
      ? singleRoute.children.filter((item: any) => item.name && !item.isHidden)
      : [];

    if (visibleItems.length === 1) {
      menuItem = getMenuItem(visibleItems[0], menuItem.path);
    } else if (visibleItems.length > 1) {
      // @ts-ignore
      menuItem.children = visibleItems
        .map((item: any) => getMenuItem(item, menuItem.path))
        .sort((a: any, b: any) => a.order - b.order);
    }
  } else {
    // @ts-ignore
    menuItem.children = visibleChildren
      .map((item: any) => getMenuItem(item, menuItem.path))
      .sort((a: any, b: any) => a.order - b.order);
  }
  return menuItem;
}

function getIcon(meta: any) {
  if (meta?.customIcon) return renderCustomIcon(meta.customIcon, { size: 18 });
  if (meta?.icon) return renderIcon(meta.icon, { size: 18 });
  return null;
}

function handleMenuSelect(key: any, item: any) {
  console.log("🚀 ~ file: SideMenu.vue:104 ~ handleMenuSelect ~ key:", key);
  if (isExternal(item.path)) {
    window.open(item.path);
  } else {
    router.push(item.path);
  }
}
</script>

<style lang="scss">
.side-menu:not(.n-menu--collapsed) {
  .n-menu-item-content {
    &::before {
      left: 5px;
      right: 5px;
    }
    &.n-menu-item-content--selected,
    &:hover {
      &::before {
        border-left: 4px solid var(--primary-color);
      }
    }
  }
}
</style>
