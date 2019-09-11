import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // 
<<<<<<< HEAD
        domain: 'https://coo.msxiaodai.com',
=======
        domain: 'http://dev.coo.msxiaodai.com',
>>>>>>> a0915cb6c4065bedf027923e5fe0395dc92954f9
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