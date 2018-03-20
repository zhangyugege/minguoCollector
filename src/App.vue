<template>
  <div id="app">
    <div class='header-wrap'>
      <input type="search" placeholder="Please enter key words" class="search-itm" v-model="searchItm" @keyup.enter="etchExpression()">
      <input type="button" class="submit-btn" value="SEARCH" @click="etchExpression()">
    </div>
      <div class="pics-wrap">
          <div class="itm" v-for="(itm, index) in pics" :key="index">
            <img :src="itm.picUrl" width="180px" height="180px">
          </div>
      </div>
    <Pagination :current="currentPage" :total="total" :pageSize="20" @change="changePage"></Pagination>
  </div>
</template>

<script lang="ts">
import { sogou } from './service/queryEngine'
import ScrollComponent from './components/ScrollComponent'
import Pagination from './components/Pagination'

export default {
  name: 'app',
  components: {
    ScrollComponent,
    Pagination
  },
  data () {
    return {
      searchItm : '',
      params: {
        query: '',
        page: 1,
        size: 20
      },
      pics: [],
      total: 0
    }
  },
  computed: {
    currentPage() {
      return this.params.page;
    }
  },
  methods: {
    etchExpression () {
      const params = this.params;
      if (this.searchItm) {
        this.params.query = this.searchItm;
      }
      sogou({
        ...params,
        callback: (data) => {
          this.pics = data.items;
          this.total = data.totalNum;
        }
      });
    },
    changePage(page) {
      const params = this.params;
      params.page = page;
      return new Promise(() => {
        sogou({
          ...params,
          callback: (data) => {
            this.pics = data.items;
            this.total = data.totalNum;
            
          }
        });
      });
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.header-wrap {
  width: 100%;
  padding: 10px;
  height: 100px;
  margin: 0 auto;
}
.header-wrap .search-itm {
    display: inline-block;
    position: relative;
    padding: 4px 7px;
    width: 300px;
    height: 50px;
    cursor: text;
    font-size: 12px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.65);
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    transition: all .3s;

}
.submit-btn {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 500;
    text-align: center;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    line-height: 1.5;
    padding: 0 15px;
    font-size: 12px;
    border-radius: 4px;
    height: 28px;
    user-select: none;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    position: relative;
    color: rgba(0, 0, 0, 0.65);
    background-color: #fff;
    border-color: #d9d9d9;
}
.pics-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.pics-wrap::after {
  content: '';
  display: block;
  overflow: hidden;
  height: 0;
  clear: both;
}
.itm {
  float: left;
  width: 200px;
  height: 200px;
  padding: 10px;
  margin: 10px;
  border: solid 1px #eee;
}
#app .scroll-wrap {
  top: 160px;
}
</style>
