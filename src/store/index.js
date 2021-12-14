import Vue from 'vue'
import Vuex from 'vuex'
// import {getCartFun, clearCartFun, addCartFun} from '@/service/userService'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        productList: [],
        cartStatus: true,
        identity: '',
        userId: '',
        loading: false,
        inquiry: {
            patientId: '',
            doctorId: '',
            patientName: '',
            doctorName: '',
            preId: '',
            diseaseDecided: '',
            includeDisabled: true,
            chatroomId: -1,
        }
    },
    mutations: {
        setLoadingStatus(state, status) {
            state.loading = status
        },
        increment(state, id) {
            for (let i of state.productList) {
                if (i.pro_id === id) {
                    i.pro_num++;
                    break;
                }
            }
        },
        subtract(state, id) {
            for (let i of state.productList) {
                if (i.pro_id === id) {
                    i.pro_num--;
                    break;
                }
            }
        },

        editPatientId(state, id) {
            state.userId = id;
            state.identity = 'patient';
            state.inquiry.patientId = id;
            console.log(state.userId)
        },
        editDoctorId(state, id) {
            console.log(id)
            state.userId = id;
            state.identity = 'doctor';
            state.inquiry.doctorId = id;
        },
        editAdminId(state, id) {
            state.userId = id
            state.identity = 'admin'
        },

        editDiseaseDecided(state, disease) {
            state.inquiry.diseaseDecided = disease
        },
        editInquiryPreId(state, preId) {
            state.inquiry.preId = preId;
        },
        editInquiryPatientName(state, name) {
            state.inquiry.patientName = name;
        },
        editInquiryDocName(state, name) {
            state.inquiry.doctorName = name;
        },
        editInquiryIncludeDisabled(state, disabled) {
            state.inquiry.includeDisabled = disabled;
        },
        editChatRoomId(state, id) {
            state.inquiry.chatroomId = id;
        },
        editInquiryDocId(state, id) {
            state.inquiry.doctorId = id;
        },
        editInquiryPatiId(state, id) {
            state.inquiry.patientId = id;
        }
    },
    getters: {
        totalPrice(state) {
            let price = 0;
            for (let i of state.productList) {
                if (i.select === true)
                    price += i.pro_num * i.pro_price;
            }
            return price.toFixed(2);
        }
    },
})