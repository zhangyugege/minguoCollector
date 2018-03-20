## Pagination

## 示例

```html
<Page v-model="currentPage" :total="totle" :perCount="10" @change="change"></Page>
```

```javascript
export default {
  data(){
    return {
      currentPage: 4,
      totle: 40
    }
  },
  methods: {
    change(page){
      alert(page);
    }
  },
  created() {
    
  }
}
```


### Props

* current: number 当前的页数
* total: number 总条目数
* pageSize: number 每页多少数量

### Events

* change(page: number) 点击后的页数

