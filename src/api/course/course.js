import http from '@/http'

export default {

  /**
   * 课程列表
   */
  courseAlllist(pageNo, pageSize, success) {
    http.get('/courses', {
      pageNo: pageNo,
      pageSize: pageSize
    }, success);
  },
//课程详情
  courseDetailsList(pageNo, pageSize, courseId, success) {
    http.get('/course/' + courseId + '/opens', {
      pageNo: pageNo,
      pageSize: pageSize,
      courseId: courseId,
    }, success)
  },

//班次管理
  courseDetailsAllList(pageNo, pageSize, success) {
    http.get('/opens', {
      pageNo: pageNo,
      pageSize: pageSize,
    }, success)
  },

//删除班次
  shiftDelete(shiftID, success) {
    http.delete('/open/' + shiftID,'','', success)
  },

//停用课程
  disableCourse(ids, success) {
    http.put('/courses/multi_update_status', {ids: ids}, {}, success)
  },
  
//删除课程
	deletesCourses(ids,success){
		http.delete('/courses/multi_delete',{ids:ids},{},success);
	},
	
//	是否发布
	whetherPublish(id,success){
    http.put('/open/' + id + '/status','','', success)
	},
	
//	停启用课程
	WhetherDisable(id,success){
    http.put('/course/' + id + '/status','','', success)
	},
//	复制班课
	copyCourse(id,data,success){
		http.postBody('/copy/open/'+id,data,success)
	},
	//删除课程评价
	deleteEvaluates(ids,success){
		http.delete('/course_evaluates/multi_delete',{ids:ids},{},success)
	},
//	课程评价
  courseEvaluation(pageNo,pageSize,success){
  	http.get('/open_evaluates', {
      pageNo: pageNo,
      pageSize: pageSize,
    }, success)
  },
//删除课程评价
	deleteCourseEvaluation(ids,success){
		http.delete('/open_evaluates/multi_delete',{ids:ids},{},success);
	},
//	班课分类列表
	categoryList(success){
		http.get('/categories',success)
	},
//	添加二级分类
	addSecondaryClassification(id,label,success){
		http.postBody('/add_category_name/'+id,{
			label:label
		},success)
	},
	
//	删除分类
	deleteClassification(id,success){
		http.delete('/category/'+id,{},{},success)
	},
	
//	创建一级分类
	category(data,success){
		http.postBody('/category',data,success)
	},
	
//	编辑课程分类名称
	editCourse(id,data,success){
		http.putBody('/edit_course_category/'+id,data,success)
	},
	
//	分类下的班次
	classCategory(pageNo, pageSize, id, success) {
    http.get('/category/' + id + '/opens', {
      pageNo: pageNo,
      pageSize: pageSize,
      id: id,
    }, success)
  },
  
//评价是否显示
	courseEvaluate(id,data,success){
		http.putBody('/open_evaluate/'+id,data,success);
	},
//	添加授课老师
	courseTeacher(data,success){
		http.postBody('/course_teacher',data,success);
	},
//	查询所有授课老师
	courseTeacherName(success){
		http.get('/course_teachers_name',{},success);
	},
//	查询所有导学老师
	openRoleUser(success){
		http.get('/role_user',{},success);
	},
	
//	添加一级分类(搜索全部课程分类)
	firstCategories(success){
		http.get('/first_categories',{},success);
	},
//	添加二级分类
	secondCategories(id,success){
		http.get('/second_categories/'+id,{},success);
	},
//	添加课程(第一步)
	firstCourse(data,success){
		http.postBody('/course',data,success);
	},
//	编辑课程
	firstEditCourse(data,success){
		http.putBody('/course',data,success);
	},

//	批量创建章节目录
	chapterSections(id,data,success){
		http.postBody('/course/'+id+'/chapter_sections',data,success);
	},
//	权限查询
	roleUser(success){
		http.get('/role_user',{},success);
	},
//	编辑前查询接口
	editsCourse(id,success){
		http.get('/course/'+id,{},success);
	},
	
//	课程分类(一级分类)
	courseCategorys(pageNo, pageSize,success){
		http.get('/course_categorys',{
			pageNo: pageNo,
      pageSize: pageSize
		},success)
	},
//	课程分类(二级分类)
	 courseCategory(id,success){
	 	http.get('/course_category/'+id,{},success)
	 },
//	 删除课程分类
	delete_Course(id,success){
    http.delete('/course_category/' + id,'','', success)
	},
//	新增二级分类
	secondCourse(id,data,success){
		http.postBody('/second_course_category/'+id,data,success);
	},
//	编辑课程模板分类
	edit_Course(id,data,success){
		http.putBody('/course_category/'+id,data,success);
	},
//	批量删除班课分类
	deletesCourse(ids,success){
		http.delete('/course_category/multi_delete',{ids:ids},{},success);
	},
//	是否显示班课分类
	isShowCourse(id,data,success){
		http.putBody('/course_category/is_show/'+id,data,success);
	},
//	编辑课程模板一级分类
	firstCourseCategories(success){
		http.get('/first_course_categories',{},success);
	},
//	编辑课程模板二级分类
	secondCourseCategories(id,success){
		http.get('/second_course_categories/'+id,{},success)
	},
//	新增课程模板一级分类
	course_category(data,success){
		http.postBody('/course_category',data,success);
	},
//	课程列表(创建授课老师)
	open_teacher(data,success){
		http.postBody('/open_teacher',data,success);
	},
//	课程列表(查询全部授课老师)
	open_teachers(success){
		http.get('/open_teachers',{},success)
	},
//	课程列表(查询全部教学老师)
	open_role_user(success){
		http.get('/open_role_user',{},success);
	},
//	课程列表(编辑前查询)
	edit_open(id,success){
		http.get('/edit_open/'+id,{},success);
	},
//	课程列表(搜索)
	reaching_opens(pageNo, pageSize,openName,success){
		http.get('/reaching_opens',{
			pageNo:pageNo,
			pageSize:pageSize,
			openName:openName
		},success)
	},
//	搜索课程评价
	openEvaluates(pageNo, pageSize,categoryId,teacherId,success){
		http.get('/searching_open_evaluates',{
			pageNo:pageNo,
			pageSize:pageSize,
			categoryId:categoryId,
			teacherId:teacherId
		},success);
	},
//	搜索课程模板名称
	reaching_course(pageNo, pageSize,courseName,success){
		http.get('/reaching_courses',{
			pageNo:pageNo,
			pageSize:pageSize,
			courseName:courseName
		},success);
	},
//	创建课程模板(第二步,新建章节)
	course_chapter(courseId,data,success){
		http.postBody('/course_chapter/'+courseId,data,success)
	},
//	创建课程模板(第二步,显示所有章节)
	course_chapters(courseId,success){
		http.get('/course_chapters/'+courseId,{},success);
	},
//	创建课程模板(第二步,编辑一级章节)
	courseChapter(id,data,success){
		http.putBody('/course_chapter/'+id,data,success)
	},
	//	创建课程模板(第二步,编辑二级章节)
	course_section(id,data,success){
		http.putBody('/course_section/'+id,data,success)
	},
	//	创建课程模板(第二步,添加节)
	courseSection(chapterId,data,success){
		http.postBody('/course_section/'+chapterId,data,success)
	},
	//	创建课程模板(第二步,删除章)
	course_Chapter(id,success){
		http.delete('/course_chapter/'+id,'','',success)
	},
		//	创建课程模板(第二步,删除节)
	course_Section(id,success){
		http.delete('/course_section/'+id,'','',success)
	},
		//	创建课程模板(第二步,上传资料)
	courseSections(sectionId,data,success){
		http.postBody('/course_section/'+sectionId+'/items',data,success)
	},
		//	创建课程模板(第二步,编辑时查询资料)
	course_items(sectionId,success){
		http.get('/course_items/'+sectionId,{},success);
	},
	//	创建课程模板(第二步,编辑上传资料的名称)
	course_item(id,courseItemDto,success){
		http.putBody('/course_item/'+id,courseItemDto,success);
	},
	//	创建课程模板(第二步,删除上传资料的名称)
	courseItem(id,success){
		http.delete('/course_item/'+id,'','',success);
	},
//	开班课前查询课程信息
	open_course(id,success){
		http.get('/open_course/'+id,success);
	},
//	课程里面开班课
	add_open_course(courseId,data,success){
		http.postBody('/add_open_course/'+courseId,data,success)
	}
	
	
}

