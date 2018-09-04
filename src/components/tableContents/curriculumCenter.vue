<template>
	<aside>
		<el-menu style="height: 100%;" router :default-active="$route.path" :default-openeds="['1','2', '3','4']">
			<el-submenu index="1"style="width: 100%;">
				<template slot="title" style="color: #B5C0FF;">
					<i class="el-icon-location" style="color: #B5C0FF;"></i>
					<span style="color: #B5C0FF;">教学内容</span>
				</template>
				<el-menu-item-group style="width: 100%;overflow: hidden;">
					<el-menu-item index="/chapterContent">章节内容</el-menu-item>
					<el-menu-item index="/chapterContent/courseResources">课程资源</el-menu-item>
					<el-menu-item index="/chapterContent/video">视频</el-menu-item>
					<el-menu-item index="/chapterContent/test">测验</el-menu-item>
					<el-menu-item index="/chapterContent/operation">作业</el-menu-item>
					<el-menu-item index="/chapterContent/discuss">讨论</el-menu-item>
					<el-menu-item index="/chapterContent/examination">考试</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="2" style="width: 100%;">
				<template slot="title">
					<i class="el-icon-menu" style="color: #B5C0FF;"></i>
					<span slot="title" style="color: #B5C0FF;">班次成员</span>					
				</template>
				<el-menu-item-group style="width: 100%;overflow: hidden;">
					<el-menu-item index="/classMembers">班级成员</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			
			<el-submenu index="3" style="width: 100%;">
				<template slot="title">
					<i class="el-icon-setting" style="color: #B5C0FF;"></i>
					<span slot="title" style="color: #B5C0FF;">教学管理</span>					
				</template>
				<el-menu-item-group style="width: 100%;overflow: hidden;">
					<el-menu-item index="/teachingFootprint/teachannouncement">公告</el-menu-item>
					<el-menu-item index="3-3">活动</el-menu-item>
					<el-menu-item index="/teachingFootprint/vote">投票</el-menu-item>
					<el-menu-item index="/teachingFootprint/questionnaire">问卷</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			
			<el-submenu index="4" style="width: 100%;">
				<template slot="title">
					<i class="el-icon-setting" style="color: #B5C0FF;"></i>
					<span slot="title" style="color: #B5C0FF;">成绩管理</span>					
				</template>
				<el-menu-item-group style="width: 100%;overflow: hidden;">
					<el-menu-item index="/gradeManagement">成绩管理</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
		</el-menu>
		
	</aside>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
      		  loading: false,
			}
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		},
		watch: {
			'$route': function(to, from) { // 路由改变时执行
				//console.info("to.path:" + to.path);
			}
		}
	}
</script>

<style>
	/*.el-menu-item-group {
		margin: 0;
	}
	
	.el-submenu .el-menu-item {
		margin: 0;
	}*/
</style>