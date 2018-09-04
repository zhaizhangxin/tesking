<template>
		
		<el-main style="margin-top: 2%;">
			<el-header class="cert">
				<el-row :gutter="20">
					<el-col :span="6" style="text-align: left;">
						<p class="grid-content">帮助中心</p>
					</el-col>
					<el-col :span="18" style="text-align: right;">
						<!--<span class="grid-content grid" style="color: #001380;">导出所有学生</span>
						<span class="grid-content grid" style="color: #3dc1ff;margin-left: 20px;margin-right: 20px;">＋导入学生</span>-->
						<!--<div class="active">
							<el-input placeholder="班次名称/班次ID" prefix-icon="el-icon-search"></el-input><el-button type="primary">搜索</el-button>
						</div>-->
					</el-col>
				</el-row>
			</el-header>
	
			<el-main style="background-color: #FFFFFF;" class="cert">
				
			</el-main>
			
		</el-main>

</template>

<script>

	
	export default {
		'/helps': 'helps',
		data() {
			return {
				
			}
		},
		methods:{
			
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
</style>