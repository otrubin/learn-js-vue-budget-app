<template>
    <div class="budget-list-wrap">
        <el-card :header="header">
            <template v-if="!isEmpty" >
                <BudgetFilter @filterChange="onFilterChange" />
                <template v-for="(item, id) in displayList" >
                    <BudgetListItem :itemData="item" @deleteItem="onDeleteItem" :key="id"/>
                </template>
            </template>
            <el-alert v-else type="info" :title="emptyTitle" />
        </el-card>
        <el-dialog
            :title="confirmDeletionTitle"
            :visible.sync="confirmDeletionDialogVisible"
            width="50%">
            <span>{{ confirmDeletionText }}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onConfirmDeletionDialogClose(false)">Cancel</el-button>
                <el-button type="primary" @click="onConfirmDeletionDialogClose(true)">Confirm</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import BudgetListItem from '@/components/BudgetListItem';
import BudgetFilter from '@/components/BudgetFilter';

export default {
    name: 'BudgetList',
    components: {
        BudgetListItem,
        BudgetFilter
    },
    props: {
        list: {
            type: Object,
            default: () => ({}),
        }
    },
    data: () => ({
        header: "Budget list",
        emptyTitle: "Empty list",
        confirmDeletionTitle: "Confirm Deletion",
        confirmDeletionText: "",
        confirmDeletionDialogVisible: false,
        deletionId: 0,
        filterValue: 0,
        displayList: {},
    }),
    computed: {
        isEmpty(){
            return !Object.keys(this.list).length;
        },
    },
    methods: {
        onDeleteItem(id){
            this.deletionId = id;
            this.makeConfirmDeletionText(id);
            this.confirmDeletionDialogVisible = true;
        },
        onConfirmDeletionDialogClose(isDelete){
            this.confirmDeletionDialogVisible = false;
            if (isDelete){
                this.$emit("deleteItem", this.deletionId);
            }
        },
        makeConfirmDeletionText(id){
            this.confirmDeletionText = `Confirm the removal of the budget line: ${this.list[id].comment}`;
        },
        makeDisplayList(){
            function checkItemType(type, filterValue){
                let result = true;
                switch(filterValue){
                    case 1:
                        result = type === 'INCOME';
                        break;
                    case -1:
                        result = type === 'OUTCOME';
                        break;
                }
                return result;
            }

            this.displayList = Object.values(this.list).reduce((acc, item) => {
                if (checkItemType(item.type, this.filterValue)){
                    acc[item.id] = item;
                }
                return acc;
            }, {});
        },
        onFilterChange(filterValue){
            this.filterValue = filterValue;
            this.makeDisplayList();
        }
    },
    created(){
        this.displayList = this.list;
    },
    watch: {
        list(){
            this.makeDisplayList();
        }
    }
}
</script>

<style scoped>
    .budget-list-wrap{
        max-width: 600px;
        margin: auto;
    }
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
</style>