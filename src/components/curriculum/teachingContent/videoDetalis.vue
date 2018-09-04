<template>
		<el-main style="padding: 0;">
			<div class="certs">
				<el-row :gutter="24">
					<el-col :span="10" style="height: 40px;line-height: 40px;">
						<router-link to="/chapterContent/video">
							<span style="color: #000000;margin-right: 2%;">视频</span>
						</router-link>
						|
						<span style="color: #FF9800;margin-left: 2%;">学生观看详情</span>
					</el-col>
					<el-col :span="14" style="text-align: right;">
						<el-button type="primary" style="float: right;">搜索</el-button>							
						<el-col :span="12" style="float: right;padding-right: 0;">
							<el-input placeholder="学号/姓名" prefix-icon="el-icon-search" v-model="course_Name"></el-input>
						</el-col>
					</el-col>
				</el-row>
				<div class="line"></div>
				<el-row :gutter="24" style="margin-top: 2%;">
					<el-col :span="12" style="line-height: 40px;">
						<p style="font-size: 14px;">视频：{{videoTitle}}
							<span class="videoTimes">时长：{{videoTime}}</span>
						</p>
					</el-col>
					<el-col :span="12" style="text-align: right;line-height: 40px;">
						<el-col :span="10" style="float: right;">
							<el-select v-model="videoValue" palceholder="请选择">
								<el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id"></el-option>
							</el-select>
						</el-col>
						<span style="color: #FF9800;font-size: 12px;">学生人数：{{videoNum}}</span>
					</el-col>
				</el-row>
				
				<div class="table">
					<el-table border stripe :data="tableData">
						<el-table-column prop="data" label="学生" align="center"></el-table-column>
						<el-table-column prop="time" label="班组" align="center"></el-table-column>
						<el-table-column prop="percentage" label="视频观看进度" align="center">
							<template slot-scope="scope">
								<el-progress :percentage="scope.row.percentage"></el-progress>
							</template>
						</el-table-column>
						<el-table-column label="观看时长" prop="scopeitem" align="center"></el-table-column>
					</el-table>
				</div>

			</div>

		</el-main>

</template>
<script>


	export default {
		data() {
			return {
				course_Name:'',
				videoTitle:'开学第一课.mp4',
				videoTime:'2时20分54秒',
				tableData:[
					{data:'张宁宁',time:'默认分组',percentage:20,scopeitem:'01：20：17'}
				],
				options:[
					{id:1,label:'全部班组'},
					{id:2,label:'全部组'},
					{id:3,label:'全班组'}
				],
				videoValue:'',
				videoNum:'1'
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
	.line{
		margin-top: 2%;
		width: 100%;
		height: 1px;
		background: #E0E0DD;	
	}
	.videoTimes{
		margin-left: 2%;
		padding: 2%;
		border: 1px solid #FF9800;
		color: #FF9800;
		font-size: 12px;
	}
	.table {
		margin-top: 2%;
		padding: 0;
	}
</style>