import http from '@/http'
export default{
//	获取学习授权
	learningAuth(id,success){
		http.get('open_study_authorize/'+id,{},success)
	},
//	修改学习授权
	modifyAuth(id,data,success){
		http.putBody('/open_study_authorize/'+id,data,success)
	},
//	学生列表
	studentList(pageNo,pageSize,id,success){
		http.get('/open_users/'+id,{
			pageNo:pageNo,
			pageSize:pageSize
		},success)
	},
//	批量删除学生
	deleteStudent(openId,ids,success){
		http.delete('/open_users/multi_delete/'+openId,{ids:ids},{},success)
	},
  // 搜索学生
  searchUser(id,pageNo,pageSize,realName,studentNo,success){
	  http.get('/searching_open_users/'+id,{
      pageNo:pageNo,
      pageSize:pageSize,
      realName:realName,
      studentNo:studentNo
    },success)
  },
//	老师列表
	teacherList(pageNo,pageSize,id,success){
		http.get('/open_user_teachers/'+id,{
			pageNo:pageNo,
			pageSize:pageSize
		},success)
	},
//	批量删除老师
	deleteTeacher(openId,userTeacherIds,success){
		http.delete('/open_user_teachers/multi_delete/'+openId,{userTeacherIds:userTeacherIds},{},success)
	},
//	班组列表
	classList(pageNo,pageSize,openId,success){
		http.get('/open_groups/'+openId,{
			pageNo:pageNo,
			pageSize:pageSize
		},success)
	},
//	批量删除班组
	deleteClass(ids,success){
		http.delete('/open_groups/multi_delete',{ids:ids},{},success)
	}
	
}
