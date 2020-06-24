<template>
  <div id="app">
    <Form @addBudgetItem="onAddBudgetItem" />
    <TotalBallans :total="totalBallance" />
    <BudgetList :list="list" @deleteItem="onDeleteItem" />
  </div>
</template>

<script>
import BudgetList from '@/components/BudgetList';
import TotalBallans from '@/components/TotalBallans';
import Form from '@/components/Form';


export default {
  name: 'App',
  components: {
    BudgetList,
    TotalBallans,
    Form
  },
  data: () => ({
    list: {
      1: {
        type: 'INCOME',
        value: 100,
        comment: 'Some comment',
        id: 1,
      },
      2: {
        type: 'OUTCOME',
        value: -50,
        comment: 'Some outcome comment',
        id: 2,
      }
    },
  }),
  computed: {
    totalBallance(){
      return Object.values(this.list).reduce((acc, item) => acc + item.value, 0);
    },
  },
  methods: {
      onDeleteItem(id) {
        this.$delete(this.list, id);
      },
      onAddBudgetItem(data) {
        const newItem = {
          ...data,
          id: String(Math.random()),
        }
        newItem.value = newItem.type === 'INCOME' ? Math.abs(newItem.value) : Math.abs(newItem.value) * -1;
        this.$set(this.list, newItem.id, newItem);
      },
  },
  // created(){
  //   this.displayList = this.list;
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
