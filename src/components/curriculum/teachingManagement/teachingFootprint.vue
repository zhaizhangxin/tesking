<template>

		<el-main style="margin-top: 2%;">
			<div class="cert">
				<el-row>
					<el-col :span="24">
						<router-link to="/curriculumCenter">
							<el-button type="text" class="grid-content return">返回课程列表</el-button>|						
						</router-link>
						<span class="grid-content course">{{course}}</span>|
						<span class="grid-content conten">教学内容&nbsp;{{teachingContent}}</span>
					</el-col>
				</el-row>
				
				<div class="line"></div>
				
				<div class="demo-input-suffix demo">
					{{teachingContent}}
				</div>
				
				<div class="line"></div>
				
				
				<el-row style="margin-top: 2%;">
					<el-col :span="30" style="margin-left: 0;margin-top: 2%;" v-for="(project,index) in allprojects" :key="index" :offset="index > 0 ? 2 : 0">
						 <el-card :body-style="{ padding: '0px' }" class="cord">
							<div class="image">
								<img src="../../../assets/binder.jpg"/>
							</div>
							<div class="wind">
								<b style="font-size: 18px;" class="protitle">{{project.title}}</b>
								<p class="protime">课程时间：{{project.time}}</p>
							</div>
						</el-card>
					</el-col>
				</el-row>
					
			</div>

		</el-main>

</template>
<script>


	export default {
		'/TeachingFootprint': 'TeachingFootprint',
		data() {
			return {
				course: '计算机网络',
				teachingContent:'教学足迹',
				allprojects:[
					{title:'计算机网络',currId:'55862',number:'10',time:'2018-06-08~2018-06-19',school:'在线学习',user:'选课名单成员',release:'已发布'},
					{title:'计算机网络',currId:'55862',number:'10',time:'2018-06-08~2018-06-19',school:'在线学习',user:'选课名单成员',release:'已发布'},
				],
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
	
	.cert {
		margin: auto;
		padding: 2%;
		width: 80%;
		background-color: #fff;
		text-align: left;
	}
	
	.return {
		margin-right: 1%;
		color: #3DC1FF;
	}
	
	.course {
		margin: 0 1%;
	}
	
	.conten {
		margin-left: 1%;
	}
	
	.line {
		margin: 1% 0;
		width: 100%;
		height: 1px;
		background-color: #E9E9E9;
	}
	
	.demo {
		height: 50px;
		line-height: 50px;
	}
	
	.cord{
		padding: 2%;
		border: 1px solid #d7d7d7;
	}
	
	.wind{
		margin-left: 2%;
		display: inline-block;
		width: 76%;
		text-align: left;
	}
	
	.protitle{
		margin-top: 4%;
		margin-bottom: 2%;
		display: block;
	}
	
	.protime{
		margin-bottom: 2%;
		color: rgba(0,0,0,0.54);
		font-size: 14px;
	}
	
	.image{
		width: 24%;
	}
	
	.image img{
		width: 100%;
		height: 100%;
	}
	
	
	
</style>