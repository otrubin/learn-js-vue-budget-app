<template>
    <div class="budget-list-wrap">
        <el-card :header="header">
            <template v-if="!isEmpty" >
                <BudgetFilter />
                <template v-for="(item, index) in filterItemsAsArray" >
                    <BudgetListItem :itemData="item" @deleteItem="onDeleteItem" :key="index"/>
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
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
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
        ...mapGetters("items", ["filterItemsAsArray", "isEmpty", "getItemFromId"]),
    },
    methods: {
        ...mapActions("items", ["deleteBudgetItem"]),
        onDeleteItem(id){
            this.deletionId = id;
            this.makeConfirmDeletionText(id);
            this.confirmDeletionDialogVisible = true;
        },
        onConfirmDeletionDialogClose(isDelete){
            this.confirmDeletionDialogVisible = false;
            if (isDelete){
                this.deleteBudgetItem(this.deletionId);
            }
        },
        makeConfirmDeletionText(id){
            this.confirmDeletionText = `Confirm the removal of the budget line: ${this.getItemFromId(id).comment}`;
        },
    },
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