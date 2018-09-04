<template>
	<aside>
		<el-menu style="height: 100%;" :default-active="$route.path" :default-openeds="['1','2', '3','4']" router>
			<el-submenu index="1" style="width: 100%;">
				<template slot="title">
					<i class="el-icon-message" style="color: #B5C0FF;"></i>
					<span class="manage" style="color: #B5C0FF;">用户管理</span>
				</template>
				<el-menu-item-group style="width: 100%;overflow: hidden;">
					<el-menu-item index="/certifiedStudents">用户管理</el-menu-item>
					<el-menu-item index="/certifiedStudents/teacherManagement">教师管理</el-menu-item>
					<el-menu-item index="/certifiedStudents/shiftManagement">班次管理</el-menu-item>
					<el-menu-item index="/certifiedStudents/doManagement">文档管理</el-menu-item>
					<el-menu-item index="/certifiedStudents/labelManagement">标签管理</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="2" style="width: 100%;">
				<template slot="title">
					<i class="el-icon-menu" style="color: #B5C0FF;"></i>
					<span class="manage" style="color: #B5C0FF;">权限管理</span>
				</template>
				<el-menu-item-group style="width: 100%;overflow: hidden;">
					<el-menu-item index="/menuManagement">菜单管理</el-menu-item>
					<el-menu-item index="/menuManagement/roleManagement">角色管理</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="3" style="width: 100%;">
				<template slot="title">
					<i class="el-icon-setting" style="color: #B5C0FF;"></i>
					<span class="manage" style="color: #B5C0FF;">门户页面管理</span>
				</template>
				<el-menu-item-group style="width: 100%;overflow: hidden;">
					<el-menu-item index="/schoolConfiguration">学校配置</el-menu-item>
					<el-menu-item index="/schoolConfiguration/announcement">系统公告</el-menu-item>
					<el-menu-item index="/schoolConfiguration/news">新闻</el-menu-item>
					<el-menu-item index="/schoolConfiguration">课程分类</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="4" style="width: 100%;">
				<template slot="title" class="temp">
					<i class="el-icon-menu" style="color: #B5C0FF;"></i>
					<span class="manage" style="color: #B5C0FF;">问题管理</span>
				</template>
				<el-menu-item-group style="width: 100%;overflow: hidden;">
					<el-menu-item index="/helps">帮助中心</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
		</el-menu>
		
	</aside>
</template>

<script>
	export default {
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

</style>