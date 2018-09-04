<template>

	<el-row :gutter="20" class="head container">
		<el-col :span="6" style="margin-top: 8px;">
			<div class="grid-content">
				<img src="../../assets/binder.jpg" class="logo" />
			</div>
		</el-col>
		<el-col :span="14">
			<el-menu :default-active="defaultActiveIndex" router class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#101010" text-color="#d7d7d7" active-text-color="#fff">
				<el-menu-item index="/">课程中心</el-menu-item>
				<el-menu-item index="2">数据中心</el-menu-item>
				<el-menu-item index="/certifiedStudents">校管中心</el-menu-item>
				<el-menu-item index="/schoolcertifiedStudents">系统设置</el-menu-item>
			</el-menu>
		</el-col>
		<el-col :span="4">
			<div class="grid-content" style="margin-top: 12px;">
				<img src="../../assets/addr.png" class="headPic" />
				<el-dropdown trigger="click" placement="bottom">
					<span class="el-dropdown-link">
							{{username}}<i class="el-icon-arrow-down el-icon--right"></i>
      					</span>
					<el-dropdown-menu slot="dropdown" align="center">
						<el-dropdown-item>个人设置</el-dropdown-item>
						<el-dropdown-item>退出</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</el-col>
	</el-row>
</template>

<script>
	import 'element-ui/lib/theme-chalk/display.css';

	export default {
		name:'topNav',
		data() {
			return {
        		loading: false,
				username: '钱多多',
				defaultActiveIndex:'/'
			};
		},
		//  created: function () {
		//    this.$api.CourseApi.courseAlllist(1,10,result => {
		//      console.log(result);
		//    })
		//  },
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			}
		},
		watch: {
			'$route': function(to, from) { // 路由改变时执行
				console.info("to.path:" + to.path);
			}
		}
	}
</script>

<style>

</style>