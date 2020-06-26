import Vue from 'vue';

const itemsStore = {
  namespaced: true,
  state: {
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
    filterType: 0 // 0 - все элементы, 1 - только приход, -1 - только расход
  },
  getters: {
    itemsAsArray: ({ list }) => Object.values(list),
    filterItemsAsArray: ({ list, filterType }) => {
      function checkItemType(type, filterValue){
        let result = true;
        switch(filterValue){
            case 1: // только приход
                result = type === 'INCOME';
                break;
            case -1: // только расход
                result = type === 'OUTCOME';
                break;
        }
        return result;
      }
      return Object.values(list).reduce((acc, item) => {
        if (checkItemType(item.type, filterType)){
          acc.push(item);
        }
        return acc;
      }, []);
    },
    isEmpty: ({ list }) => !Object.keys(list).length,
    getItemFromId: ({ list }) => id => list[id],
    total: ({ list }) => {
      return Object.values(list).reduce((acc, item) => {
        return acc + item.value;
      }, 0);
    }
  },
  mutations: {
    ADD_ITEM(state, item) {
      // state.list[item.id] = item; // нельзя так, поскольку Vue не отследит изменения
      Vue.set(state.list, item.id, item);
    },
    DELETE_ITEM(state, id) {
      Vue.delete(state.list, id);
    },
    SET_FILTER(state, filterValue) {
      state.filterType = filterValue;
    },
  },
  actions: {
    addNewBudgetItem(context, item) {
      const newItem = { ...item, id: String(Math.random()) };
      //приход всегда положительный, расход всегда отрицательный
      newItem.value = newItem.type === 'INCOME' ? Math.abs(newItem.value) : Math.abs(newItem.value) * -1;
      context.commit("ADD_ITEM", newItem);
    },
    deleteBudgetItem(context, id) {
      // console.log(JSON.stringify(context.state.list));
      context.commit("DELETE_ITEM", id);
    },
    setFilter({ commit }, filterValue) {
      console.log(this.storeKey);
      commit("SET_FILTER", filterValue);
    },
  },
};

export default itemsStore;