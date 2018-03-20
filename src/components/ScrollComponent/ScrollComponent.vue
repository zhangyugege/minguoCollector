<template>
  <div class="scrollcomponent" @scroll="onScroll">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default {
  name: 'ScrollComponent',
  props:['threshold', 'fetchMore'],
  data() {
    return {
      scrollLock: false,
      lastScrollPosition: 0
    }
  },
  methods: {
    onScroll() {
      const el: HTMLElement = this.$el;

      // is scrolldown
      if (el.scrollTop > this.lastScrollPosition && !this.scrollLock) {
        if ((el.scrollTop + el.clientHeight) > el.scrollHeight * this.threshold) {
          this.scrollLock = true;

          this.fetchMore()
            .then(() => {
              this.scrollLock = false;
            })
            .catch(() => {
              this.scrollLock = false;
            });
        }
      }
      this.lastScrollPosition = el.scrollTop;
    }
  }
  
}
</script>

<style>
.scrollcomponent {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  overflow-y: auto;
}
</style>
