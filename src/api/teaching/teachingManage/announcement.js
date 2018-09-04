import http from '@/http'
export default{
//	公告列表
	announcement(openId,success){
		http.get('/announces/'+openId,{},success)
	},
//	添加公告
	announce(openId,data,success){
		http.postBody('/announce/'+openId,data,success)
	},
//	删除公告
	deleteAnnounce(id,success){
		http.delete('/announce/'+id,'','',success)
	}
}
