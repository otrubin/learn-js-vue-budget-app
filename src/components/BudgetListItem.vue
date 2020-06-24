<template>
    <div class="list-item">
        <i :class="getIconClass"></i>
        <span class="budget-comment">{{ itemData.comment }}</span>
        <span :class="getBudgetValueClasses">{{ itemData.value }}</span>
        <el-button type="danger" size="mini" @click="deleteItem(itemData.id)">Delete</el-button>
    </div>
</template>

<script>
export default {
    name: 'BudgetListItem',
    props: {
        itemData: {
            type: Object,
            default: () => ({}),
        }
    },
    computed: {
        getIconClass(){
            return this.itemData.value > 0 ? "el-icon-top" : "el-icon-bottom";
        },
        getBudgetValueClasses(){
            const result = ["budget-value"];
            if(this.itemData.value > 0){
                result.push("budget-income")
            }else{
                result.push("budget-outcome")
            }
            return result;
        },
    },
    methods: {
        deleteItem(id){
            this.$emit("deleteItem", id);
        }
    }
}
</script>

<style scoped>
    .list-item{
        display: flex;
        align-items: center;
        padding: 10px 15px;
    }
    .budget-value{
        font-weight: bold;
        margin-left: auto;
        margin-right: 20px;
    }
    .el-icon-top, .el-icon-bottom{
        margin-right: 5px;
        font-weight: bold;
    }
    .budget-income{
        color: #67C23A;
    }
    .budget-outcome{
        color: #F56C6C;
    }
</style>