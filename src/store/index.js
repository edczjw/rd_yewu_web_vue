import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // 
        domain: 'https://test.coo.msxiaodai.com',
        nameler: 'null', //设置路由查看权限
        isLeftHiden: false,
        auditor_id: "",
        roleId: "",
        roleName: "",
    },
    mutations: {
        getroleId(state) {
            state.roleId = window.localStorage.getItem("roleId");
        },
        getroleName(state) {
            state.roleName = window.localStorage.getItem("roleName");
        }
    }
})