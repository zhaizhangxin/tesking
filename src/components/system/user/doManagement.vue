<template>
		
		<el-main style="margin-top: 2%;">
			<el-header class="cert" style="border-bottom: 1px solid #E0E0DD;">
				<el-row :gutter="20">
					<el-col :span="6" style="text-align: left;">
						<p class="grid-content">学生文档管理
							<span style="color: #999999;font-size: 12px;margin-left: 10px;">有{{num}}个文档</span>
						</p>
					</el-col>
					<el-col :span="18" style="text-align: right;">
						<!--<div class="active">
							<el-input placeholder="学号/手机号/姓名" prefix-icon="el-icon-search"></el-input><el-button type="primary">搜索</el-button>
						</div>-->
					</el-col>
				</el-row>
			</el-header>
	
			<el-main class="cert">
				<el-button type="text" class="delete" style="width: 100%;text-align: right;">删除</el-button>
				
				<div style="background: #FFFFFF;">
					<el-table :data="tableData" stripe border style="width: 100%;margin-top: 10px;">
						<!--<el-table-column type="index" label="序号" align="center"> </el-table-column>-->
						<el-table-column prop="title" label="文档标题" align="center"> </el-table-column>
						<el-table-column prop="courses" label="所属课程" align="center"> </el-table-column>
						<el-table-column prop="fileSize" label="文件大小" align="center"> </el-table-column>
						<el-table-column prop="types" label="类型" align="center"> </el-table-column>
						<el-table-column prop="uploader" label="上传人" align="center"> </el-table-column>
						<el-table-column prop="saveTime" label="保存时间" align="center"> </el-table-column>
						<el-table-column prop="status" label="状态" align="center"> </el-table-column>
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<el-button type="text" size="small" class="delete" @click="dialogVisible = true">预览</el-button>
								
								<el-dialog :visible.sync="dialogVisible">
									<p slot="title">{{title}}</p>
									<p style="text-align: left;">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna wirl aliqua. Up exlaborum incididunt quis nostrud exercitatn.</p>
									<p style="text-align: left;">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna wirl aliqua. Up exlaborum incididunt quis nostrud exercitatn.</p>
									<p style="text-align: left;">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna wirl aliqua. Up exlaborum incididunt quis nostrud exercitatn.</p>
									
									<span slot="footer" class="dialog-footer">
										<el-button icon="el-icon-close" circle @click="dialogVisible = false"></el-button>
									</span>
								
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
		'/doManagement': 'doManagement',
		data() {
			return {
				page:'1',
				num: '421',
				activeName: 'first',
				tableData: [
					{title:'致程序员的一封信',courses:'计算机网络',fileSize:'1.05M',types:'word',uploader:'王晓晓',saveTime:'2018-06-01',status:'已发布'},
					{title:'致程序员的一封信',courses:'计算机网络',fileSize:'1.05M',types:'word',uploader:'王晓晓',saveTime:'2018-06-01',status:'已发布'},
					{title:'致程序员的一封信',courses:'计算机网络',fileSize:'1.05M',types:'word',uploader:'王晓晓',saveTime:'2018-06-01',status:'已发布'},
					{title:'致程序员的一封信',courses:'计算机网络',fileSize:'1.05M',types:'word',uploader:'王晓晓',saveTime:'2018-06-01',status:'已发布'},
					{title:'致程序员的一封信',courses:'计算机网络',fileSize:'1.05M',types:'word',uploader:'王晓晓',saveTime:'2018-06-01',status:'已发布'},
					{title:'致程序员的一封信',courses:'计算机网络',fileSize:'1.05M',types:'word',uploader:'王晓晓',saveTime:'2018-06-01',status:'已发布'}
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
		      openEdit(){
		      	this.$prompt('班次名称','编辑文档标题',{
		      		cancelButtonText:'取消',
		      		confirmButtonText:'确定',
		      		center:true
		      	}).then(({value})=>{
		      		this.$message({
		      			type:'success',
		      			message:'你的标题是:'+value
		      		});
		      	}).catch(()=>{
		      		this.$message({
		      			type:'info',
		      			message:'取消输入'
		      		})
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
	}
	.el-message-box__message{
		display: inline-block;
	}
	.el-message-box__input{
		margin-left: 10px;
		display: inline-block;
	}
	.delete{
		color: #FF9800;
	}
</style>