<template>
  <LayoutFooter class="footer">
    <nav class="footer__navigation">
      <li class="navigation__item">Terms&Conditions</li>
      <li class="navigation__item">Privacy policy</li>
    </nav>
  </LayoutFooter>
</template>

<script setup>
  import { LayoutFooter } from 'ant-design-vue';
</script>

<style lang="scss">
  .footer {
    display: flex;
    flex-direction: column;
    justify-content: center;

    &__navigation {
      list-style-type: none;

      .navigation__item {
        cursor: pointer;
        color: #005B96;
        display: inline-block;
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 16px;
        padding: 0 4px;

        &:not(:last-child) {
          border-right: 1px solid #005B96;
        }
      }
    }
  }
</style>
