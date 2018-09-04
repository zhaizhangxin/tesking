<template>
		
		<el-main style="margin-top: 2%;">
			<el-header class="cert" style="border-bottom: 1px solid #E0E0DD;">
				<el-row :gutter="20">
					<el-col :span="6" style="text-align: left;">
						<p class="grid-content">班次管理</p>
					</el-col>
					<el-col :span="18" style="text-align: right;">
						<div class="active">
							<el-input placeholder="班次名称/班次ID" prefix-icon="el-icon-search"></el-input><el-button type="primary">搜索</el-button>
						</div>
					</el-col>
				</el-row>
			</el-header>
	
			<el-main class="cert"> 
				<div style="text-align: left;">
					<span style="color: #999999;font-size: 12px;">有{{num}}个班次</span>
					<el-select v-model="value" placeholder="请选择学校" style="width: 20%;margin-left: 20px;">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</div>
				
				<div style="background: #FFFFFF;margin-top: 20px;">
					<el-table :data="tableData" stripe border style="width: 100%">
						<el-table-column label="班次ID" align="center">
							<template slot-scope="scope"> 
								<div slot="reference" class="name-wrapper username">
									<el-tag size="medium" style="background: transparent;border: none;">{{scope.row.shiftID}}</el-tag>
								</div>				
							</template>
						</el-table-column>
						<el-table-column prop="shiftName" label="班次名称" align="center"> </el-table-column>
						<el-table-column prop="shiftMode" label="所属学校" align="center"> </el-table-column>
						<el-table-column prop="shiftNum" label="班次人数" align="center"> </el-table-column>
						<el-table-column prop="shiftTime" label="开课时间" align="center"> </el-table-column>
						<el-table-column prop="classTime" label="结课时间" align="center"> </el-table-column>
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<router-link to="/shiftEditing">
									<el-button type="text" size="small" style="color: #FF9800;">管理</el-button>									
								</router-link>
							</template>
						</el-table-column>
					</el-table>
					
				</div>
						
			</el-main>

		</el-main>
		

</template>

<script>



	export default {
		'/shiftManagement': 'shiftManagement',
		data() {
			return {
				num: '421',
				activeName: 'first',
				value:'',
				tableData: [
					{shiftID:'27045',shiftName:'计算机网络',shiftMode:'河南理工大学',shiftNum:'12',shiftTime:'2018.04.06 08:00:00',classTime:'2018.05.06 23:30:00'},
					{shiftID:'27045',shiftName:'电脑艺术设计',shiftMode:'河南理工大学',shiftNum:'12',shiftTime:'2018.04.06 08:00:00',classTime:'2018.05.06 23:30:00'},
					{shiftID:'27045',shiftName:'计算机网络',shiftMode:'河南理工大学',shiftNum:'30',shiftTime:'2018.04.06 08:00:00',classTime:'2018.05.06 23:30:00'},
					{shiftID:'27045',shiftName:'计算机应用技术',shiftMode:'河南理工大学',shiftNum:'25',shiftTime:'2018.04.06 08:00:00',classTime:'2018.05.06 23:30:00'},
					{shiftID:'27045',shiftName:'计算机网络',shiftMode:'河南理工大学',shiftNum:'12',shiftTime:'2018.04.06 08:00:00',classTime:'2018.05.06 23:30:00'},
				],
				options:[
					{value:'选项1',label:'中央戏剧学院'},
					{value:'选项2',label:'北京电影学院'},
					{value:'选项3',label:'上海戏剧学院'}
				]
			}
		},
		methods:{
			 handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		      },
		      handleCurrentChange(val) {
		        console.log(`当前页: ${val}`);
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
	.el-select-dropdown__item{
		display: block;
	}
</style>