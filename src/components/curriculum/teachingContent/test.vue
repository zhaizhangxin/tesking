<template>
		<el-main style="padding: 0;">
			<div class="certs">
				<el-row :gutter="24">
					<el-col :span="10">
						<p>测验</p>
					</el-col>
					<el-col :span="14" style="text-align: right;">
						<el-button type="text" style="color: #3DC1FF;font-size: 12px;">导出到Excel</el-button>
					</el-col>
				</el-row>
				<div class="table">
					<el-table border stripe :data="tableData">
						<el-table-column prop="data" label="测验名称" align="center"></el-table-column>
						<el-table-column prop="time" label="状态" align="center"></el-table-column>
						<el-table-column prop="endTime" label="提交截止时间" align="center" width="150"></el-table-column>
						<el-table-column prop="origin" label="已提交" align="center"></el-table-column>
						<el-table-column prop="start" label="应提交" align="center"></el-table-column>
						<el-table-column prop="percentage" label="未提交" align="center"></el-table-column>
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<el-button type="text" class="buttonText" @click="videoDetalis">学生测验成绩</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>

			</div>

		</el-main>

</template>
<script>


	export default {
		data() {
			return {
				tableData:[
					{data:'今日测验',time:'已结束',endTime:'2018.02.12 05:20',origin:'120人',start:'200人',percentage:'120人'}
				]
			}
		},
		methods: {
			videoDetalis(){
				this.$router.push({
					path: '/chapterContent/testDetalis',
					name:'testDetalis',
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
	
	.table {
		margin-top: 2%;
		padding: 0;
	}
</style>