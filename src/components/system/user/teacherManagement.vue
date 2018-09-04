<template>
		<el-main style="margin-top: 2%;">
			<el-header class="cert" style="border-bottom: 1px solid #E0E0DD;">
				<el-row :gutter="20">
					<el-col :span="6" style="text-align: left;">
						<p class="grid-content">教师管理</p>
					</el-col>
					<el-col :span="18" style="text-align: right;">
						<div class="active">
							<el-input placeholder="手机号/姓名" prefix-icon="el-icon-search"></el-input><el-button type="primary">搜索</el-button>
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
					</el-col>
					<el-col :span="6" style="text-align: right;">
						<el-button type="text" class="resert">重置密码</el-button>
						<el-button type="text" class="resert">删除</el-button>
						<router-link to="/editSInformation">
							<el-button type="primary" style="margin-left: 10px;">创建教师</el-button>							
						</router-link>
					</el-col>
				</el-row>
				
				<div style="background: #FFFFFF;margin-top: 20px;">
					<el-table :data="tableData" stripe border style="width: 100%">
						<el-table-column label="姓名" align="center">
							<template slot-scope="scope"> 
								<el-popover trigger="hover"><!--placement="top"-->
									<p>姓名:{{scope.row.username}}</p>
									<p>手机号:{{scope.row.phone}}</p>
									<div slot="reference" class="name-wrapper username">
										<el-tag size="medium" style="background: transparent;border: none;">{{scope.row.username}}</el-tag>
									</div>
								</el-popover>						
							</template>
						</el-table-column>
						<el-table-column prop="phone" label="手机号" align="center"> </el-table-column>
						<el-table-column prop="scholar" label="创建课程" align="center"> </el-table-column>
						<el-table-column prop="number" label="开课数量" align="center"> </el-table-column>
						<el-table-column prop="time" label="倒入时间" align="center"> </el-table-column>
						<el-table-column prop="file" label="状态" align="center"> </el-table-column>
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<el-button type="text" size="small" class="resert">编辑</el-button>
								<el-button type="text" size="small" @click="opens" class="resert">审核通过</el-button>
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
				activeName: 'first',
				value:'',
				tableData: [
					{username:'张宁宁',phone:'18615929080',scholar:'12',number:'12',time:'2018.05.06',file:'已审核'},
					{username:'张宁宁',phone:'18615929080',scholar:'12',number:'12',time:'2018.05.06',file:'已审核'},
					{username:'张宁宁',phone:'18615929080',scholar:'12',number:'12',time:'2018.05.06',file:'未审核'},
					{username:'张宁宁',phone:'18615929080',scholar:'-',number:'-',time:'2018.05.06',file:'已审核'},
					{username:'张宁宁',phone:'18615929080',scholar:'12',number:'12',time:'2018.05.06',file:'未审核'},
					{username:'张宁宁',phone:'18615929080',scholar:'12',number:'12',time:'2018.05.06',file:'已审核'}
				],
				options: [
					{value: '选项1',label: '已认证'},
					{value: '选项2',label: '未认证'}
				],
			}
		},
		methods:{
			 handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		      },
		      handleCurrentChange(val) {
		        console.log(`当前页: ${val}`);
		      },
		      opens(){
		      	this.$confirm('确认"审核通过"',{
		      		confirmButtonText:'确定',
		      		cancelButtonTexe:'取消',
		      		center:true
		      	}).then(()=>{
//		      		this.$message({
//		      			type:'success',
//		      			message:'审核通过'
//		      		});
		      	}).catch(()=>{
//		      		this.$message({
//		      			type:'info',
//		      			message:'已取消'
//		      		})
		      	})
		      }
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