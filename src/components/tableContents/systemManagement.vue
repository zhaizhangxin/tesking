<template>
	<aside>
		<el-menu style="height: 100%;" :default-active="$route.path" :default-openeds="['1','2', '3','4','5','6']" router>
			<el-submenu index="1" style="width: 100%;">
				<template slot="title">
					<i class="el-icon-message" style="color: #B5C0FF;"></i>
					<span class="manage" style="color: #B5C0FF;">用户管理</span>
				</template>
				<el-menu-item-group style="width: 100%;overflow: hidden;">
					<el-menu-item index="/schoolcertifiedStudents">学生管理</el-menu-item>
					<el-menu-item index="/schoolcertifiedStudents/schoolteacher">教师管理</el-menu-item>
					<el-menu-item index="/schoolcertifiedStudents/schoolshift">班次管理</el-menu-item>
					<el-menu-item index="/schoolcertifiedStudents/schooldomanage">文档管理</el-menu-item>
					<el-menu-item index="/schoolcertifiedStudents/schoollabel">标签管理</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="2" style="width: 100%;">
				<template slot="title">
					<i class="el-icon-menu" style="color: #B5C0FF;"></i>
					<span class="manage" style="color: #B5C0FF;">权限管理</span>
				</template>
				<el-menu-item-group style="width: 100%;overflow: hidden;">
					<el-menu-item index="/schoolmenu">菜单管理</el-menu-item>
					<el-menu-item index="/schoolmenu/schoolrole">角色管理</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="3" style="width: 100%;">
				<template slot="title">
					<i class="el-icon-setting" style="color: #B5C0FF;"></i>
					<span class="manage" style="color: #B5C0FF;">门户页面管理</span>
				</template>
				<el-menu-item-group style="width: 100%;overflow: hidden;">
					<el-menu-item index="/schoolConfig">系统配置</el-menu-item>
					<el-menu-item index="/schoolConfig/schoolannoun">系统公告</el-menu-item>
					<el-menu-item index="/schoolConfig/schoolnews">新闻</el-menu-item>
					<el-menu-item index="/schoolConfig/schoolcourseSorts">课程分类</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="4" style="width: 100%;">
				<template slot="title" class="temp">
					<i class="el-icon-menu" style="color: #B5C0FF;"></i>
					<span class="manage" style="color: #B5C0FF;">问题管理</span>
				</template>
				<el-menu-item-group style="width: 100%;overflow: hidden;">
					<el-menu-item index="4-1">帮助中心</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="5" style="width: 100%;">
				<template slot="title" class="temp">
					<i class="el-icon-menu" style="color: #B5C0FF;"></i>
					<span class="manage" style="color: #B5C0FF;">学校管理</span>
				</template>
				<el-menu-item-group style="width: 100%;overflow: hidden;">
					<el-menu-item index="/schoolManager">学校管理</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="6" style="width: 100%;">
				<template slot="title" class="temp">
					<i class="el-icon-menu" style="color: #B5C0FF;"></i>
					<span class="manage" style="color: #B5C0FF;">系统管理</span>
				</template>
				<el-menu-item-group style="width: 100%;overflow: hidden;">
					<el-menu-item index="/systemSettings">系统设置</el-menu-item>
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