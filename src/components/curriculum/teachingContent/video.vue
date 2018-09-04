<template>
		<el-main style="padding: 0;">
			<div class="certs">
				<p class="demo">视频</p>
				<div class="table">
					<el-table border stripe :data="tableData">
						<el-table-column prop="data" label="视频名称" align="center"></el-table-column>
						<el-table-column prop="time" label="视频时长" align="center"></el-table-column>
						<el-table-column prop="percentage" label="平均观看进度" align="center">
							<template slot-scope="scope">
								<el-progress :percentage="scope.row.percentage"></el-progress>
							</template>
						</el-table-column>
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<el-button type="text" class="buttonText" @click="videoDetalis">学生观看详情</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>

			</div>

		</el-main>

</template>
<script>


	export default {
		'/video': 'video',
		data() {
			return {
				course: '计算机网络',
				teachingContent:'视频',
				tableData:[
					{data:'开学第一课.mp4',time:'50分30秒',percentage:20,scopeitem:'120人'}
				]
			}
		},
		methods: {
			videoDetalis(){
				this.$router.push({
					path: '/chapterContent/videoDetalis',
					name:'videoDetalis',
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
	.demo {
		height: 50px;
		line-height: 50px;
	}
	
	.table {
		margin-top: 2%;
		padding: 0;
	}
</style>