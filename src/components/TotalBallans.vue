<template>
    <div :class="getClasses">
        Ballance: {{ total }}
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: 'TotalBallans',
    computed: {
        ...mapGetters("items", ["total"]),
        getClasses(){
            const result = ["total-value"];
            if(this.total > 0){
                result.push("total-positive")
            }
            if(this.total < 0){
                result.push("total-negative")
            }
            return result;
        },
    },
}
</script>

<style scoped>
    .total-value{
        font-size: 26px;
        text-transform: uppercase;
        padding: 30px 0 20px;
        text-align: center;
    }
    .total-positive{
        color: #67C23A;
    }
    .total-negative{
        color: #F56C6C;
    }
</style>