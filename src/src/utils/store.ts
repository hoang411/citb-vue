import { defineStore } from 'pinia'

let store: StoreDefinition<"store", {}, {}, {}>;
store = defineStore('store', {
    // store logic
});

export default store