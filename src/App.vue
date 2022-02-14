<template>
  <Layout class="app__layout">
    <Header class="layout__header" v-model:collapse="state.isCollapse" />

    <Layout class="layout__container">
      <Sidebar class="container__sidebar" v-model:collapse="state.isCollapse" />

      <Layout class="container__content">
        <Layout class="content__page">
          <RouterView />
        </Layout>

        <Footer class="content__footer" />
      </Layout>
    </Layout>
  </Layout>
</template>

<script setup>
  import { reactive } from "vue";

  import { Layout } from 'ant-design-vue';

  import Sidebar from "./components/layout/Sidebar.vue";
  import Header from "./components/layout/Header.vue";
  import Footer from "./components/layout/Footer.vue";

  const state = reactive({
    isCollapse: true,
  })

  defineExpose({ state });
</script>

<style lang="scss">
  @import "./assets/default.scss";

  .app__layout {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100vw;
    height: 100vh;

    .layout__header {
      display: flex;
      width: 100%;
      height: 80px;
    }

    .layout__container {
      display: flex;
      flex-grow: 2;
      flex-direction: row;
      width: 100%;

      .container__sidebar {
        display: inline-flex;
        flex-grow: 1;
        width: auto;
        min-height: 100%;
      }

      .container__content {
        display: inline-flex;
        flex-direction: column;
        flex-grow: 2;

        .content__page {
          background: white;
          flex-grow: 2;
          padding: 32px;
        }

        .content__footer {
          background: white;
          width: 100%;
          height: 50px;
        }
      }
    }
  }
</style>
