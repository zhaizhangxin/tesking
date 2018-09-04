import http from '@/http'
export default{
//	作业列表
	assignment(openId,success){
		http.get('/query_open_assignment/'+openId,{},success)
	}
}
