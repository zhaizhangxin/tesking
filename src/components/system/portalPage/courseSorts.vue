<template>
		
		<el-main style="margin-top: 2%;">
			<el-header class="cert" style="line-height: 60px;text-align: left;">
				<p class="grid-content">课程分类</p>
			</el-header>
			<div class="line"></div>
			<el-main style="" class="cert">
				<div class="course">
					<div class="conten" style="background-color: #FFFFFF;">
						<el-card class="box-card">
							<div slot="header" class="clearfix">
								<span style="color: #001380;">分类管理</span>
								<el-button type="text" style="float: right;padding: 3px 0;">＋ 添加一级分类</el-button>
							</div>
							<div class="text item" v-for="cards in cardList">
								<p class="cardlist">{{cards.list}}</p>
							</div>
						</el-card>
					</div>
					<div class="sorts" style="background: #fff;">
						<el-row :gutter="10" class="sort">
							<el-col :span="8" style="text-align: left;margin-left: 10px;">
								<p class="grid-content">计算机编程</p>
							</el-col>
							<el-col :span="14" style="text-align: right;">
								<el-input placeholder="学号/姓名" prefix-icon="el-icon-search"></el-input><el-button type="primary">搜索</el-button>
							</el-col>
						</el-row>
						<el-table :data="tableData" border>
							<el-table-column label="序号" prop="index" align="center"></el-table-column>
							<el-table-column label="班次ID" prop="classID" align="center"></el-table-column>
							<el-table-column label="班次名称" prop="classname" align="center"></el-table-column>
						</el-table>	
						
					</div>
					
				</div>
				
				
			</el-main>
			
		</el-main>
		

</template>

<script>

	
	
	export default {
		'/schoolcourseSorts': 'schoolcourseSorts',
		data() {
			return {
				page:'1',
				tableData:[
					{index:'1',classID:'42165',classname:'欢迎关注“第一军师理论课堂”'},
					{index:'2',classID:'42165',classname:'欢迎关注“第一军师理论课堂”'},
					{index:'1',classID:'42165',classname:'欢迎关注“第一军师理论课堂”'}
				],
				cardList:[
					{list:'职业素质课'},
					{list:'公共必修课'},
					{list:'自主创业'},
					{list:'专业课'}
				]
			}
		},
		methods:{
			
		},
		components:{

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
	.el-container.is-vertical {
		margin-top: 4%;
		margin: auto;
		width: 80%;
	}
	.line{
		margin: auto;
		background-color: #E4E4E7;
		width: 80%;
		height: 1px;
	}
	.sorts{
		width: 60%;
	}
	.sort{
		height: 50px;
		line-height: 50px ;
	}
	.el-input{
		width: 70%;
	}
	.block{
		margin-top: 50px;
	}
	.course{
		display: flex;
	}
	.conten{
		width: 40%;
	}
	.clearfix{
		display: flex;
		justify-content: space-between;
		
	}
	.el-card__header{
		background-color: #edeffb;
	}
	.el-card__body{
		display: block;
		padding: 0;
	}
	.text{
		border-bottom: 1px solid #B5C0FF;
		height: 40px;
		line-height: 40px;
		text-align: left;
	}
	.cardlist{
		padding-left: 20px;
		font-size: 12px;
	}
</style>
