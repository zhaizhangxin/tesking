<template>
		
		<el-main style="margin-top: 2%;">
			<el-header style="border-bottom: 1px solid #E0E0DD;" class="cert">
				<el-row :gutter="20">
					<el-col :span="6" style="text-align: left;">
						<p class="grid-content">角色管理
							<span class="grid">有{{num}}个角色</span>
						</p>
					</el-col>
					<el-col :span="18" style="text-align: right;">
						<el-button type="text" class="delete">删除</el-button>
					</el-col>
				</el-row>
			</el-header>
	
			<el-main style="margin-top: 20px;" class="cert">
				<div style="background: #FFFFFF;">
					<el-table :data="tableData" stripe border style="width: 100%;margin-top: 20px;">
						<el-table-column prop="name" label="菜单名" align="center"> </el-table-column>
						<el-table-column prop="founder" label="创建人" align="center"> </el-table-column>
						<el-table-column prop="creationTime" label="创建时间" align="center"> </el-table-column>
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<el-button type="text" size="small" class="delete" @click="authorization = true">设置权限</el-button>
								
								<el-dialog title="权限" :visible.sync="authorization">
									<el-transfer v-model="value2" :data="data2" :titles="['未选', '已选']" style="margin-left: 16%;text-align: left;"></el-transfer>
									<div style="margin-top: 20px;">
										<el-button type="primary">确定</el-button>
										<el-button type="text" class="delete" @click="authorization = false">取消</el-button>
										<el-button type="text" class="delete" @click="open">添加</el-button>
										
									</div>
								</el-dialog>
								
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
		'/roleManagement': 'roleManagement',
		
		data() {
			const generateData2 = _ => {
				const data = [];
				const cities = ['课程提醒', '账号设置', '接收课程公告', '账号设置'];
				cities.forEach((city, index) => {
					data.push({
						label: city,
						key: index
					});
				});
				return data;
			};
			return {
				num:'2',
				data2: generateData2(),
				value2: [],
				authorization:false,
				tableData:[
					{name:'学生',founder:'潇潇',creationTime:'2018.06.04 23:59:20'},
					{name:'教师',founder:'扬子',creationTime:'2018.06.04 23:59:20'},
					{name:'学生',founder:'潇潇',creationTime:'2018.06.04 23:59:20'}
				]
			}
		},
		methods:{
			 open() {
		        this.$prompt('权限名称', '添加权限', {
		          confirmButtonText: '保存',
		          cancelButtonText: '返回',
		          center:true,
		        }).then(({ value }) => {
//		          this.$message({
//		            type: 'success',
//		            message: '你的邮箱是: ' + value
//		          });
		        }).catch(() => {
//		          this.$message({
//		            type: 'info',
//		            message: '取消输入'
//		          });       
		        });
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
		margin: 0 10px;
	}
	
	a {
		color: #42b983;
	}
	.cert{
		margin: auto;
		width: 80%;
	}
	.cont{
		margin: auto;
		width: 80%;
	}
	.grid{
		margin-left: 10px;
		color: #999;
		font-size: 12px;
	}
	.el-checkbox{
		margin: 20px 0;
		display: block;
		text-align: left;
		border-bottom: 1px solid #f7f9ff;
	}
	.delete{
		color: #FF9800;
	}
</style>