<template>
	<aside>
    
		<!--<el-col :span="12" style="width: 100%;height: 100%;">-->
			<el-menu style="height: 100%;" router :default-active="$route.path" :default-openeds="['1','2', '3']" >
				<el-submenu index="1" style="width: 100%;">
					<template slot="title" style="color: #B5C0FF;">
						<i class="el-icon-location" style="color: #B5C0FF;"></i>
						<span style="color: #B5C0FF;">课程模板管理</span>
					</template>
					<el-menu-item-group style="width: 100%;overflow: hidden;">
						<el-menu-item index="/curriculumCenter">课程模板列表</el-menu-item>
					</el-menu-item-group>
				</el-submenu>

				<el-submenu index="2" style="width: 100%;">
					<template slot="title">
						<i class="el-icon-setting" style="color: #B5C0FF;"></i>
						<span slot="title" style="color: #B5C0FF;">课程管理</span>
					</template>
					<el-menu-item-group style="width: 100%;overflow: hidden;">
						<el-menu-item index="/shiftManagement/shiftsManagement">课程列表</el-menu-item>
						<el-menu-item index="/shiftManagement/courseEvaluation">课程评价</el-menu-item>
						<el-menu-item index="/shiftManagement/shiftCourseSorts">课程分类</el-menu-item>
					</el-menu-item-group>
				</el-submenu>

				<el-submenu index="3" style="width: 100%;">
					<template slot="title">
						<i class="el-icon-menu" style="color: #B5C0FF;"></i>
						<span slot="title" style="color: #B5C0FF;">课程模板分类</span>
					</template>
					<el-menu-item-group style="width: 100%;overflow: hidden;">
						<el-menu-item index="/courseSorts">课程模板分类</el-menu-item>
					</el-menu-item-group>
				</el-submenu>

			</el-menu>
		<!--</el-col>-->
	</aside>
</template>

<script>
	export default {
		name:'courseCenter',
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