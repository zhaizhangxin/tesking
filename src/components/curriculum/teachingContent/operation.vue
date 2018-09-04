<template>

		<el-main style="padding: 0;">
			<div class="certs">
				<p class="demo">作业</p>
				<div class="table">
					<el-table border stripe :data="tableData">
						<el-table-column prop="title" label="作业名称" align="center"></el-table-column>
						<el-table-column prop="status" label="状态" align="center"></el-table-column>
						<el-table-column label="提交截止时间" align="center" width="150">
							<template slot-scope="scope">
								<span>{{scope.row.endTime|moment("YYYY-MM-DD HH:mm")}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="submitted" label="已提交" align="center"></el-table-column>
						<el-table-column prop="shouldmitted" label="应提交" align="center"></el-table-column>
						<el-table-column prop="unsubmitted" label="未提交" align="center"></el-table-column>
						<el-table-column prop="score" label="教师评分" align="center"></el-table-column>
						<el-table-column label="批改" align="center">
							<template slot-scope="scope">
								<el-button type="text" class="buttonText" size="small" @click="operation(scope.row.id)">批改</el-button>
							</template>
						</el-table-column>
					</el-table> 
				</div>

			</div>

		</el-main>

</template>
<script>


	export default {
		'/courseResources': 'courseResources',
		data() {
			return {
				course: '计算机网络',
				teachingContent:'作业',
				tableData:[]
			}
		},
		created() {
			this.assignment();
		},
		methods: {
			assignment(){
				this.$api.TeachingApi.assignment(1, result => {
					console.log(result)
					if(result.success == true){
						this.tableData = result.data.list
					}else{
						console.log(result.errors)
					}
				})
			},
//			作业批改跳转
			operation(id){
				this.$router.push({
					path: '/chapterContent/operationDetalis',
					name:'operationDetalis',
//					query:{
//						name:'name',
//						id:id
//					}
				})
			}
		},
		components: {

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
	.certs {
		padding: 2%;
		background-color: #fff;
		text-align: left;
	}
	.correction{
		display: flex;
		justify-content: space-between;
	}
	.table{
		margin-top: 2%;
		padding: 0;
	}
	
</style>