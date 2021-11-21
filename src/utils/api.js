//输出通用axios实例
import axios from 'axios';
axios.defaults.withCredentials = false

const instance = axios.create({
  timeout: 10000,
   headers: {
    'Content-Type': "multipart/form-data;charset=utf-8",
  }
});
 
export default {
  //GqvbYer04485869e6b5acbed4ed10dfd79468f6d84577b1

  //  diseaseList (data) {
  //    return instance.get("https://api.apishop.net/common/disease/queryDiseaseList?apiKey=GqvbYer04485869e6b5acbed4ed10dfd79468f6d84577b1&page=1&pageSize=12", data);
  //  },
  //  diseaseInfo(data){
  //   return instance.get("https://api.apishop.net/common/disease/queryDiseaseInfo?apiKey=GqvbYer04485869e6b5acbed4ed10dfd79468f6d84577b1&diseaseID="+data);
  //  }
  

//   allUser () {
//     return instance.post('/api/user');
//   },
//   allProduct () {
//    return instance.post('/api/product')
//   },
//   upload (data) {
//     return instance.post('/api/upload',data)
//   },
//   regist (data){
//   	return instance.post('/api/createOrUpdateUser',data)
//   }
};