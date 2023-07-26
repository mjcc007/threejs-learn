<template>
  <n-layout has-sider wh-full>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="220"
      :native-scrollbar="false"
    >
      <SideBar />
    </n-layout-sider>
    <article flex-col flex-1 overflow-hidden>
      <AppMain />
    </article>
  </n-layout>
</template>

<script setup lang="ts">
// import AppHeader from "./components/header/index.vue";
import SideBar from "./components/sidebar/index.vue";
import AppMain from "./components/AppMain.vue";
// import AppTags from "./components/tags/index.vue";
// import { useAppStore } from "@/store";
// import { header, tags } from "~/settings";

// const appStore = useAppStore();
</script>
