<template>
    <el-card class="form-card">
        <el-form :model="formData" ref="addBudgetItemForm" :rules="rules" label-position="left">
            <el-form-item label="Type:" prop="type">
                <el-select class="type-select" v-model="formData.type" placeholder="Choise type...">
                    <el-option value="INCOME">Income</el-option>
                    <el-option value="OUTCOME">Outcome</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Comment:" prop="comment">
                <el-input v-model="formData.comment"></el-input>
            </el-form-item>
            <el-form-item label="Sum:" prop="value">
                <el-input v-model.number="formData.value"></el-input>
            </el-form-item>
            <el-button type="primary" @click="onSubmit" >Submit</el-button>
        </el-form>
    </el-card>
</template>

<script>
export default {
    name: 'Form',
    data: () => ({
        formData: {
            type: 'INCOME',
            comment: '',
            value: 0,
        },
        rules: {
            type: [
                {required: true, message: "Please select type", trigger: "blur"}
            ],
            comment: [
                {required: true, message: "Please input comment", trigger: "blur"}
            ],
             value: [
                {
                    validator: (rule, value, callback) => {
                        if (value === 0){
                            callback(new Error('The value must be different from zero.'));
                        }else{
                            callback();
                        }
                    },
                    trigger: "change"
                },
                {required: true, message: "Please input sum", trigger: "change"},
                {type: 'number', message: "Sum must be a number", trigger: "change"},

            ],
        },
    }),
    methods: {
        onSubmit() {
            // console.log(this.$refs.addBudgetItemForm);
            this.$refs.addBudgetItemForm.validate((value) => {
                if (value){
                    this.$emit('addBudgetItem', { ...this.formData });
                    this.$refs.addBudgetItemForm.resetFields();
                }
            })

        },
    }
}
</script>

<style scoped>
    .form-card {
        max-width: 600px;
        margin: auto;
    }
    .type-select {
        width: 100%;
    }
</style>