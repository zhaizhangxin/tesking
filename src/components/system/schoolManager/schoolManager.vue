<template>
		
		<el-main style="margin-top: 2%;">
			<el-header class="cert" style="border-bottom: 1px solid #E0E0DD;">
				<el-row :gutter="20">
					<el-col :span="6" style="text-align: left;">
						<p class="grid-content">学校管理
							<span style="color: #999999;font-size: 12px;margin-left: 10px;">全部{{allnum}}个学校</span>
						</p>
					</el-col>
					<el-col :span="18" style="text-align: right;">
						<div class="active">
							<el-input placeholder="学校名称" prefix-icon="el-icon-search"></el-input><el-button type="primary">搜索</el-button>
						</div>
					</el-col>
				</el-row>
			</el-header>
	
			<el-main class="cert">
				<div style="text-align: right;">
					<el-button type="text" class="resert">删除</el-button>
					<el-button type="primary" style="margin-left: 10px;">创建学校</el-button>	
				</div>
				<div style="background: #FFFFFF;margin-top: 20px;">
					<el-table :data="tableData" stripe border style="width: 100%">
						<el-table-column label="二级域名" align="center">
							<template slot-scope="scope"> 
								<div slot="reference" class="name-wrapper username">
									<el-tag size="medium" style="background: transparent;border: none;">{{scope.row.domain}}</el-tag>
								</div>			
							</template>
						</el-table-column>
						<el-table-column label="学校名称" align="center">
							<template slot-scope="scope"> 
								<div slot="reference" class="name-wrapper username">
									<el-tag size="medium" style="background: transparent;border: none;">{{scope.row.shoolname}}</el-tag>
								</div>			
							</template>
						</el-table-column>
						<el-table-column prop="studentnum" label="学生数" align="center"> </el-table-column>
						<el-table-column prop="teachnum" label="教师数" align="center"> </el-table-column>
						<el-table-column prop="cousenum" label="课程数" align="center"> </el-table-column>
						<el-table-column prop="time" label="授权截止时间" align="center"> </el-table-column>
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<router-link to="/editingSchool">
									<el-button type="text" size="small" class="resert">编辑</el-button>									
								</router-link>
								
								<el-button type="text" size="small" class="resert" @click="reselect = true">添加管理员</el-button>
								
								<el-dialog title="" :visible.sync="reselect">
									<el-row :gutter="20" style="line-height: 38px;">
										<el-col :span="8" style="text-align: left;">
											<p class="grid-content">添加管理员</p>
										</el-col>
										<el-col :span="16" style="text-align: right;">
											<div class="active">
												<el-input placeholder="请输入关键字" prefix-icon="el-icon-search" style="width: 68%;"></el-input><el-button type="primary">搜索</el-button>
											</div>
										</el-col>
									</el-row>
									
									<el-table :data="gridData" border stripe style="margin:auto;width: 80%;margin-top: 30px;">
										<el-table-column type="selection" align="center"></el-table-column>
										<!--<el-table-column label="选择" align="center">
											<template scope="scope">
												<el-radio :label="scope.$index" v-model="radio" @change.native="getTemplateRow(scope.$index)">&nbsp;</el-radio>
											</template>
										</el-table-column>-->
										<el-table-column prop="username" label="姓名" align="center"></el-table-column>
										<el-table-column prop="phone" label="手机号" align="center"></el-table-column>
										<el-table-column prop="school" label="所属学校" align="center"></el-table-column>
									</el-table>
									
									<div class="block">
									    <el-pagination background="true" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 50, 100]" pager-count="10" :page-size="10" layout="prev,pager,next,total, jumper" :total="100">
									    
									    </el-pagination>
									</div>
									
									<el-button @click="reselect = false" type="text" style="color: #FF9800;">取消</el-button>
									<el-button type="primary">确定</el-button>
								</el-dialog>
					
							</template>
						</el-table-column>
					</el-table>
				</div>
			</el-main>

		</el-main>

</template>

<script>

	
	export default {
		'/teacherManagement': 'teacherManagement',
		data() {
			return {
				allnum: '421',
				reselect:false,
				radio:'',
				tableData: [
					{domain:'http://whsfdx.zaixianxuexi.com',shoolname:'北京大学',studentnum:'231',teachnum:'12',cousenum:'56',time:'2018.05.12 12:25:30'},
					{domain:'http://whsfdx.zaixianxuexi.com',shoolname:'北京大学',studentnum:'231',teachnum:'12',cousenum:'56',time:'2018.05.12 12:25:30'},
					{domain:'http://whsfdx.zaixianxuexi.com',shoolname:'北京大学',studentnum:'231',teachnum:'12',cousenum:'56',time:'2018.05.12 12:25:30'},
					{domain:'http://whsfdx.zaixianxuexi.com',shoolname:'北京大学',studentnum:'231',teachnum:'12',cousenum:'56',time:'2018.05.12 12:25:30'},
					{domain:'http://whsfdx.zaixianxuexi.com',shoolname:'北京大学',studentnum:'231',teachnum:'12',cousenum:'56',time:'2018.05.12 12:25:30'}
				],
				gridData:[
					{username:'张晓晓',phone:'15110253632',school:'安阳理工大学'},
					{username:'张晓晓',phone:'15110253632',school:'安阳理工大学'},
					{username:'张晓晓',phone:'15110253632',school:'安阳理工大学'},
					{username:'张晓晓',phone:'15110253632',school:'安阳理工大学'}
				]
			}
		},
		methods:{
			 handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		      },
		      handleCurrentChange(val) {
		        console.log(`当前页: ${val}`);
		      },
		},
		components:{

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
	.cert{
		margin: auto;
		width: 80%;
	}
	.grid-content {
		line-height: 30px;
	}
	
	.el-container.is-vertical {
		margin-top: 4%;
		margin: auto;
		width: 80%;
	}
	
	.el-input {
		width: 74%;
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
	.el-select-dropdown__item{
		display: block;
	}
	.resert{
		color: #FF9800;
	}
</style> 