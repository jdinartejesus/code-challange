<template>
  <LayoutHeader class="header">
    <img class="header__logo" src="/images/logo.svg" />
    <Button type="text" class="header__menu-btn" @click="onClickMenuBtn">
      <img class="menu-btn__icon" src="/images/menu.svg" />
    </Button>

    <div class="header__spacer" />

    <div class="header__account">
      <Avatar class="account__avatar" shape="square">JD</Avatar>
      <h4 class="account__nickname">John Doe</h4>
    </div>
  </LayoutHeader>
</template>

<script setup>
  import { LayoutHeader, Button, Avatar } from "ant-design-vue";

  const emit = defineEmits("update:collapse");

  const props = defineProps({
    collapse: {
      type: Boolean,
      required: true,
    },
  });

  function onClickMenuBtn() {
    return emit("update:collapse", !props.collapse);
  }

  defineExpose({ onClickMenuBtn });
</script>

<style lang="scss">
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff !important;
  border-bottom: 1px solid #f3f6f9;
  padding: 0 35px !important;

  .header__menu-btn {
    margin: 0 38px !important;
    padding: 0 !important;
  }

  .header__spacer { flex: 1; }

  .header__account {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: 11px;

    .account__avatar {
      background-color: #F6CA65;
      vertical-align: 'middle';
      border-radius: 5px;
    }

    .account__nickname {
      color: #005B96;
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 16px;
      margin: 0;
      padding: 0;
    }
  }
}
</style>
