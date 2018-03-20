<template>
  <div class="pagination">
    <a
      @click="onChange(current - 1)"
      :class="['btn', 'flat-btn', 'previous', current <= 1 ? 'disabled' : 'hoverable']">
      <i class="icon glyphicon glyphicon-menu-left"></i>
      上一页
    </a>
    <a v-for="item in items"
      @click="onChange(item.index)"
      :key="item.index"
      :class="[item.current ? 'current' : '', 'page', item.suspension ? 'disabled' : 'hoverable']">
      <i v-show="item.suspension" class="icon glyphicon glyphicon-option-horizontal"></i>
      <span v-show="!item.suspension">{{  item.index }}</span>
    </a>
    <a
      @click="onChange(current + 1)"
      :class="['btn flat-btn next', current >= totalPage ? 'disabled' : 'hoverable' ]">
      下一页
      <i class="icon glyphicon glyphicon-menu-right"></i>
    </a>
  </div>
</template>

<script lang="ts">
import range from 'lodash/range';

// 按钮的数量
const ITEM_COUNT: number = 7;

export default {
  name: 'Pagination',
  props: ['current', 'total', 'pageSize'],
  computed: {
    totalPage(): number {
      return Math.max(Math.ceil(this.total / this.pageSize), 1);
    },
    indexRange(): {start: number, end: number} {
      const startstop = (this.current - Math.floor(ITEM_COUNT / 2.0)) < 1;
      const endstop = (this.current + Math.ceil(ITEM_COUNT / 2.0)) > this.totalPage;

      let start = 0;
      let end = 0;

      if (startstop) {
        start = 1;
        end = Math.min(1 + ITEM_COUNT, this.totalPage);
      } else if (endstop) {
        end = this.totalPage;
        start = Math.max(this.totalPage - ITEM_COUNT, 1);
      } else {
        start = this.current - Math.floor(ITEM_COUNT / 2.0);
        end = start + ITEM_COUNT;
      }
      return {
        start,
        end
      };
    },
    items(): any[] {
      const hasEndSuspension = this.indexRange.end < this.totalPage;
      const hasBeginSuspension = this.indexRange.start > 1;
      const items = range(this.indexRange.start, this.indexRange.end + 1).map(i => ({
        index: i,
        current: i === this.current,
        suspension: false
      }));

      if (hasEndSuspension) {
        items[items.length - 2].suspension = true;
        items[items.length - 1].index = this.totalPage;
      }

      if (hasBeginSuspension) {
        items[0].index = 1;
        items[1].suspension = true;
      }

      return items;
    }

  },
  methods: {
    onChange(itm: any) {
      this.$emit('change', itm);
    }
  }
 
}
</script>

<style scoped>
  .pagination {
    display: inline-block;
    font-size: 0;
    user-select: none;
  }

  .page,
  .btn {
    box-sizing: border-box;
    font-size: 12px;
    cursor: pointer;
    border: 1px solid #e6e6e6;
  }

  .page {
    display: inline-block;
    min-width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    
  }
  .page.current {
    color: #fff;
    background: #30a1f2;
    border: 1px solid #30a1f2;
      
  }
  .page.current:hover {
    color: #fff;
  }
  .page + .page {
    border-left: 1px solid transparent;
  }

  .btn {
    box-sizing: border-box;
    display: inline-block;

    height: 30px;
    padding: 0 10px;
    line-height: 30px;
  }
  .icon {
    color: #d2d2d2;
  }

  .flat-btn {
    border: 1px solid #e6e6e6;
  }
  .hoverable:hover {
    color: #30a1f2;
    border: 1px solid #30a1f2;
  }
  .hoverable:hover .icon {
    color: #30a1f2;
  }
  .previous,
  .next {
    margin: 0 5px;
  }
  .disabled {
    color: #bbb;
    pointer-events: none;
    cursor: auto;
  }
</style>
