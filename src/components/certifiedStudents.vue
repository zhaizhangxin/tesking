<template>
		
		<el-main style="margin-top: 2%;">
			
			<el-header class="cert" style="border-bottom: 1px solid #D7D7D7;height: 70px;">
				<el-row :gutter="20">
					<el-col :span="6" style="text-align: left;">
						<p class="grid-content">用户管理</p>
					</el-col>
					<el-col :span="18" style="text-align: right;">
						<span class="grid-content grid" style="color: #3dc1ff;font-weight: 700;">导出所有用户</span>
						<span class="grid-content grid" style="color: #3dc1ff;margin-left: 20px;margin-right: 20px;font-weight: 700;">＋导入用户</span>
						<div class="active">
							<el-input placeholder="学号/姓名" prefix-icon="el-icon-search"></el-input><el-button type="primary">搜索</el-button>
						</div>
					</el-col>
				</el-row>
			</el-header>
			<el-main class="cert">
				<el-row :gutter="20">
					<el-col :span="18" style="text-align: left;">
						<p style="color: #3DC1FF;font-size: 12px;display: inline-block;">全部{{allnum}}人</p>
						<el-select v-model="value" placeholder="按状态筛选" style="width: 20%;margin-left: 20px;">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<el-select v-model="val" placeholder="按标签筛选" style="width: 26%;margin-left: 10px;">
							<el-option v-for="label in labels" :key="label.val" :label="label.label" :value="label.val"></el-option>
						</el-select>
						<el-select v-model="values" placeholder="按角色筛选" style="width: 20%;margin-left: 10px;">
							<el-option v-for="haracter in haracters" :key="haracter.values" :label="haracter.label" :value="haracter.values"></el-option>
						</el-select>
					</el-col>
					<el-col :span="6" style="text-align: right;">
						<el-button type="text" class="resert">重置</el-button>
						<el-button type="text" class="resert">删除</el-button>
						<router-link to="/editSInformation">
							<el-button type="primary" style="margin-left: 10px;">创建用户</el-button>							
						</router-link>
					</el-col>
				</el-row>
				
				<div class="contioner">
					<el-table :data="tableData" stripe border style="width: 100%;margin-top: 20px;">
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
						<el-table-column label="所选课程" align="center">
							<template slot-scope="scope"> 
								<el-popover trigger="hover"><!--placement="top"-->
									<p>姓名:{{scope.row.username}}</p>
									<p>学号:{{scope.row.scholar}}</p>
									<div slot="reference" class="name-wrapper username">
										<el-tag size="medium">{{scope.row.course}}</el-tag>
									</div>
								</el-popover>						
							</template>
						</el-table-column>
						<el-table-column prop="type" label="类型" align="center"> </el-table-column>
						<el-table-column prop="file" label="文件大小" align="center"> </el-table-column>
						<el-table-column prop="time" label="倒入时间" align="center"> </el-table-column>
						<el-table-column prop="status" label="状态" align="center"> </el-table-column>
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								 <el-button type="text" size="small" class="resert" @click="authorization = true">授权</el-button>
								 
								 <el-dialog title="授权" :visible.sync="authorization">
								 	<el-transfer v-model="value2" :data="data2" style="margin-left: 16%;text-align: left;"></el-transfer>
								 </el-dialog>
								 
								<router-link to="/editSInformation">
									<el-button type="text" size="small" class="resert">编辑</el-button>									
								</router-link>
							</template>
						</el-table-column>
					</el-table>
					<!--<div class="block">
					    <el-pagination background="true" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 50, 100]" pager-count="10" :page-size="10" layout="prev,pager,next,total, jumper" :total="100">
					    
					    </el-pagination>
					</div>-->
				</div>
			</el-main>
			
		</el-main>

</template>
<script>

export default {
	'/certifiedStudents': 'certifiedStudents',
	data() {
		const generateData2 = _ => {
			const data = [];
			const cities = ['教师', '导学老师', '建课老师', '主任教师'];
			cities.forEach((city, index) => {
				data.push({
					label: city,
					key: index
				});
			});
			return data;
		};
		return {
			data2: generateData2(),
			value2: [],
			allnum: '421',
			activeName: 'first',
			value: '',
			val: '',
			values: '',
			authorization: false,
			tableData: [{
					username: '张宁宁',
					scholar: '18610105535',
					phone: '18615929080',
					course: '12',
					type: '视频',
					file: '562.6M',
					time: '2018.05.06',
					status: '已认证'
				},
				{
					username: '张宁宁',
					scholar: '18610105535',
					phone: '18615929080',
					course: '12',
					type: '视频',
					file: '562.6M',
					time: '2018.05.06',
					status: '已认证'
				},
				{
					username: '张宁宁',
					scholar: '18610105535',
					phone: '18615929080',
					course: '12',
					type: '视频',
					file: '562.6M',
					time: '2018.05.06',
					status: '未认证'
				},
				{
					username: '张宁宁',
					scholar: '18610105535',
					phone: '18615929080',
					course: '12',
					type: '视频',
					file: '562.6M',
					time: '2018.05.06',
					status: '已认证'
				},
				{
					username: '张宁宁',
					scholar: '18610105535',
					phone: '18615929080',
					course: '12',
					type: '视频',
					file: '562.6M',
					time: '2018.05.06',
					status: '已认证'
				},
				{
					username: '张宁宁',
					scholar: '18610105535',
					phone: '18615929080',
					course: '12',
					type: '视频',
					file: '562.6M',
					time: '2018.05.06',
					status: '已认证'
				},
				{
					username: '张宁宁',
					scholar: '18610105535',
					phone: '18615929080',
					course: '12',
					type: '视频',
					file: '562.6M',
					time: '2018.05.06',
					status: '已认证'
				},
				{
					username: '张宁宁',
					scholar: '18610105535',
					phone: '18615929080',
					course: '12',
					type: '视频',
					file: '562.6M',
					time: '2018.05.06',
					status: '已认证'
				}
			],
			options: [{
					value: '选项1',
					label: '已认证'
				},
				{
					value: '选项2',
					label: '未认证'
				}
			],
			labels: [{
					val: '选项1',
					label: '活泼'
				},
				{
					val: '选项2',
					label: '乐观'
				},
				{
					val: '选项3',
					label: '稳重'
				},
				{
					val: '选项4',
					label: '成熟'
				},
			],
			haracters: [{
					values: '选项1',
					label: '学生'
				},
				{
					values: '选项2',
					label: '老师'
				}
			],
		}
	},
	methods: {
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		}
	},
	components: {
		
	}
}</script>

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
	.el-select-dropdown__item{
		display: block;
	}
	.grid-content {
		line-height: 30px;
	}
	.cert{
		margin: auto;
		width: 80%;
		background: transparent;
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
		padding-top: 50px;
		padding-bottom: 40px;
	}
	.contioner{
		background: #FFFFFF;
	}
	.resert{
		color: #FF9800;
	}
	.el-transfer__button{
		border-radius: 50%;
	}
</style>