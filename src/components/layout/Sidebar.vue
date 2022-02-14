<template>
  <LayoutSider class="sidebar" collapsed-width="96" width="auto" :collapsed="props.collapse">
    <Menu class="sidebar__menu" :selectedKeys="state.active" @select="onChangeMenu">
      <MenuItem class="menu__item" key="/dashboard" title="Dashboard">
        <img class="item__icon" src="/images/icon-dashboard.svg" >
      </MenuItem>

      <MenuItem class="menu__item" key="/groups" title="Groups">
        <img class="item__icon" src="/images/icon-groups.svg" >
      </MenuItem>

      <MenuItem class="menu__item" key="/desktop" title="Desktop">
        <img class="item__icon" src="/images/icon-desktop.svg" >
      </MenuItem>

      <MenuItem class="menu__item" key="/reports" title="Reports">
        <img class="item__icon" src="/images/icon-reports.svg" >
      </MenuItem>

      <MenuItem class="menu__item" key="/logout" title="Logout">
        <img class="item__icon" src="/images/icon-logout.svg" >
      </MenuItem>
    </Menu>
  </LayoutSider>
</template>

<script setup>
  import { reactive, toRefs, computed } from "vue";
  import { useRouter, useRoute } from 'vue-router'

  import { Menu, MenuItem, LayoutSider } from 'ant-design-vue';

  const props = defineProps({
    collapse: {
      type: Boolean,
      required: true,
    },
  });

  const router = useRouter();
  const route = useRoute();
  const { path } = toRefs(route);

  const state = reactive({
    active: computed(() => [path?.value]),
  });

  function onChangeMenu({ key }) {
    return router.push(key);
  }

  defineExpose({ state, onChangeMenu });
</script>

<style lang="scss">
  .sidebar {
    background-color: white !important;
    min-width: 96px !important;
    width: auto !important;

    .ant-layout-sider-children {
      width: 100%;
    }

    .sidebar__menu {
      width: 100%;
      background: transparent;
      border-right: none !important;
    }
  }
</style>
