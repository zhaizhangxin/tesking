<template>

	<el-main style="padding: 0;">
		<div class="certs">
			<el-row :gutter="24">
				<el-col :span="10">
					<p style="height: 40px;line-height: 40px;">讨论</p>
				</el-col>
				<el-col :span="14" style="text-align: right;">
					<el-button type="primary">创建讨论</el-button>
				</el-col>
			</el-row>

			<div class="table">
				<el-table :data="tableData" border>

					<el-table-column label="讨论名称" prop="title" align="center"></el-table-column>
					<el-table-column label="提交截止时间" prop="time" align="center"></el-table-column>
					<el-table-column label="已提交" prop="submitted" align="center"></el-table-column>
					<el-table-column label="应提交" prop="shouldsubmitted" align="center"></el-table-column>
					<el-table-column label="未提交" prop="unsubmitted" align="center"></el-table-column>
					<!--<el-table-column label="操作" align="center">
								
						</el-table-column>-->
					<el-table-column type="expand">
						<template slot-scope="props">
							<el-form class="demo-table-expand">
								<el-form-item>
									<p style="color: #001380;">{{props.row.janms}}</p>
									<div style="display: flex;">
										<i class="el-icon-arrow-right" style="line-height: 40px;"></i>
										<p style="margin-left: 2%;">{{props.row.jans}}</p>
									</div>
									<div style="display: flex;">
										<i class="el-icon-arrow-right" style="line-height: 40px;"></i>
										<p style="margin-left: 2%;">{{props.row.jans}}</p>
									</div>
									<div style="display: flex;">
										<i class="el-icon-arrow-right" style="line-height: 40px;"></i>
										<p style="margin-left: 2%;">{{props.row.jans}}</p>
									</div>
									<div style="display: flex;">
										<i class="el-icon-arrow-right" style="line-height: 40px;"></i>
										<p style="margin-left: 2%;">{{props.row.jans}}</p>
									</div>
									<div style="display: flex;">
										<i class="el-icon-arrow-right" style="line-height: 40px;"></i>
										<p style="margin-left: 2%;">{{props.row.jans}}</p>
									</div>
									<div style="display: flex;">
										<i class="el-icon-arrow-right" style="line-height: 40px;"></i>
										<p style="margin-left: 2%;">{{props.row.jans}}</p>
									</div>
								</el-form-item>
							</el-form>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>

	</el-main>
</template>
<script>
	export default {
		'/discuss': 'discuss',
		data() {
			return {
				course: '计算机网络',
				teachingContent: '讨论',
				tableData: [{
					title: 'html文档声明',
					time: '2018-06-17 08:20',
					submitted: '120人',
					shouldsubmitted: '200人',
					unsubmitted: '80人',
					janms: '哥们，我正在问如何实现跨域呢，cors实现，请发一下你的代码参考一下如何？',
					jans: '完美解决步骤完美解决步骤完美解决步骤完美解决步骤完美解决步骤完美解决步骤完美解决步骤完美解决步骤完美解决步骤 '
				}]
			}
		},
		methods: {

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
	.demo-table-expand{
		height: 200px;
		overflow: auto;
		/*background: rgba(181,192,255,0.2);*/
	}
</style>