<template>
  <div id="app">
    <Form />
    <TotalBallans />
    <BudgetList />
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
  }
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
