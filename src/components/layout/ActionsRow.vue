<template>
  <div class="actions-row">
      <div class="actions-row__left">
        <slot name="left" />
      </div>

      <div class="actions-row__right">
        <slot name="right" />
      </div>
    </div>
</template>

<style lang="scss">
  .actions-row {
    display: flex;
    flex-direction: row;

    &__left {
      display: inline-flex;
      flex-direction: row;
      flex: 1;
    }

    &__right {
      display: inline-flex;
      flex-direction: row;
      flex: 1;
      gap: 22px;
    }
  }
</style>
