<template>
		
		<el-main style="margin-top: 2%;">
			
			<el-header class="cert" style="border-bottom: 1px solid #E0E0DD;">
				<el-row :gutter="20">
					<el-col :span="6" style="text-align: left;">
						<p class="grid-content">学生管理</p>
					</el-col>
					<el-col :span="18" style="text-align: right;">
						<div class="active">
							<el-input placeholder="学号/姓名" prefix-icon="el-icon-search" style="width: 74%;"></el-input><el-button type="primary">搜索</el-button>
						</div>
					</el-col>
				</el-row>
			</el-header>
	
			<el-main class="cert">
				<el-row :gutter="20">
					<el-col :span="18" style="text-align: left;">
						<el-select v-model="value" placeholder="按状态筛选" style="width: 20%;margin-left: 10px;">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<el-select v-model="val" placeholder="按标签筛选" style="width: 24%;margin-left: 10px;">
							<el-option v-for="label in labels" :key="label.val" :label="label.label" :value="label.val"></el-option>
						</el-select>
						<el-select v-model="shval" placeholder="按学校筛选" style="width: 24%;margin-left: 10px;">
							<el-option v-for="shools in shool" :key="shools.shval" :label="shools.label" :value="shools.shval"></el-option>
						</el-select>
						<el-select v-model="values" placeholder="按角色筛选" style="width: 20%;margin-left: 10px;">
							<el-option v-for="haracter in haracters" :key="haracter.values" :label="haracter.label" :value="haracter.values"></el-option>
						</el-select>
					</el-col>
					<el-col :span="6" style="text-align: right;">
						<el-button type="text" class="resert">重置</el-button>
						<el-button type="text" class="resert">删除</el-button>
						<router-link to="/editSInformation">
							<el-button type="primary" style="margin-left: 10px;">创建学生</el-button>							
						</router-link>
					</el-col>
				</el-row>
				
				<div style="background: #FFFFFF;margin-top: 20px;">
					<el-table :data="tableData" stripe border style="width: 100%">
						<el-table-column label="姓名" align="center">
							<template slot-scope="scope"> 
								<el-popover trigger="hover"><!--placement="top"-->
									<p>姓名:{{scope.row.username}}</p>
									<p>学号:{{scope.row.scholar}}</p>
									<div slot="reference" class="name-wrapper username">
										<el-tag size="medium">{{scope.row.username}}</el-tag>
									</div>
								</el-popover>						
							</template>
						</el-table-column>
						<el-table-column prop="scholar" label="学号" align="center"> </el-table-column>
						<el-table-column prop="phone" label="手机号" align="center"> </el-table-column>
						<el-table-column prop="course" label="所选课程" align="center"> </el-table-column>
						<el-table-column prop="type" label="类型" align="center"> </el-table-column>
						<el-table-column prop="file" label="文件大小" align="center"> </el-table-column>
						<el-table-column prop="time" label="倒入时间" align="center"> </el-table-column>
						<el-table-column prop="status" label="状态" align="center"> </el-table-column>
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<el-button type="text" size="small" class="resert">授权</el-button>
								<router-link to="/schooledit">
									<el-button type="text" size="small" class="resert">编辑</el-button>									
								</router-link>
							</template>
						</el-table-column>
					</el-table>
				</div>
				
						
			</el-main>
			
		</el-main>
		

</template>
<script>

	
	export default {
		'/certifiedStudents': 'certifiedStudents',
		data() {
			return {
				num: '421',
				value: '',
				val: '',
				shval:'',
				values: '',
				tableData: [
					{username: '张宁宁',scholar: '18610105535',phone: '18615929080',course: '12',type: '视频',file: '562.6M',time: '2018.05.06',status: '已认证'},
					{username: '张宁宁',scholar: '18610105535',phone: '18615929080',course: '12',type: '视频',file: '562.6M',time: '2018.05.06',status: '已认证'},
					{username: '张宁宁',scholar: '18610105535',phone: '18615929080',course: '12',type: '视频',file: '562.6M',time: '2018.05.06',status: '未认证'},
					{username: '张宁宁',scholar: '18610105535',phone: '18615929080',course: '12',type: '视频',file: '562.6M',time: '2018.05.06',status: '已认证'},
					{username: '张宁宁',scholar: '18610105535',phone: '18615929080',course: '12',type: '视频',file: '562.6M',time: '2018.05.06',status: '已认证'},
					{username: '张宁宁',scholar: '18610105535',phone: '18615929080',course: '12',type: '视频',file: '562.6M',time: '2018.05.06',status: '已认证'},
					{username: '张宁宁',scholar: '18610105535',phone: '18615929080',course: '12',type: '视频',file: '562.6M',time: '2018.05.06',status: '已认证'},
					{username: '张宁宁',scholar: '18610105535',phone: '18615929080',course: '12',type: '视频',file: '562.6M',time: '2018.05.06',status: '已认证'}
				],
				options: [
					{value: '选项1',label: '已认证'},
					{value: '选项2',label: '未认证'}
				],
				labels: [
					{val: '选项1',label: '活泼'},
					{val: '选项2',label: '乐观'},
					{val: '选项3',label: '稳重'},
					{val: '选项4',label: '成熟'},
				],
				haracters: [
					{values: '选项1',label: '学生'},
					{values: '选项2',label: '老师'}
				],
				shool:[
					{shval:'选项1',label:'燕山大学'},
					{shval:'选项2',label:'河北大学'},
					{shval:'选项3',label:'清华大学'},
					{shval:'选项4',label:'北京大学'}
				]
			}
		},
		methods:{
			 handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		      },
		      handleCurrentChange(val) {
		        console.log(`当前页: ${val}`);
		      }
		},
		components:{

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	h1,
	h2 {
		font-weight: normal;
	}
	
	ul {
		list-style-type: none;
		padding: 0;
	}
	
	li {
		display: inline-block;
		/*margin: 0 10px;*/
	}
	
	a {
		color: #42b983;
	}
	
	.grid-content {
		line-height: 30px;
	}
	.cert{
		margin: auto;
		width: 80%;
	}
	.el-container.is-vertical {
		margin-top: 4%;
		margin: auto;
		width: 80%;
	}
	.el-tag{
		background-color: transparent;
		border: none;
	}
	.el-input {
		width: 74%;
	}
	
	.username{
		color: #3dc1ff;
	}
	.active {
		display: inline-block;
		/*width: 30%;*/
	}
	
	.el-button--primary {
		background-color: #ff9800;
		border-color: #ff9800;
	}
	
	.has-gutter {
		text-align: center;
	}
	
	.el-table_1_column_1 {
		color: #3dc1ff;
	}
	.block{
		margin-top: 50px;
		padding-bottom: 30px;
	}
	.el-input{
		width: 100%;
	}
	.el-select-dropdown__item{
		display: block;
	}
	.resert{
		color: #FF9800;
	}
</style>