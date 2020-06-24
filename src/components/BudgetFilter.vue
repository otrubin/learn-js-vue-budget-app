<template>
    <div class="budget-filter-wrap">
        <el-radio-group v-model="filterValue" size="mini">
            <el-radio :label="0">All items</el-radio>
            <el-radio :label="1">Income only</el-radio>
            <el-radio :label="-1">Outcome only</el-radio>
        </el-radio-group>
    </div>
</template>

<script>
export default {
    name: 'BudgetFilter',
    data: () => ({
        filterValue: 0,
    }),
    watch: {
        filterValue(){
            this.$emit('filterChange', this.filterValue);
        }
    }
}
</script>

<style scoped>
    .budget-filter-wrap{
        margin: 10px auto 10px;
        padding: 10px;
        border: 1px solid #eeeeee;
        border-radius: 10px;
    }
</style>