<template>
	<el-container>

		<el-aside width="200px" class="left">
			<p-curricu></p-curricu>
		</el-aside>

		<el-main style="margin-top: 2%;">
			<div class="cert">
				<div class="list">
					<router-link to="/curriculumCenter">
						<el-button type="text" class="grid-content return">返回课程列表</el-button>|						
					</router-link>
					<span class="grid-content course">{{course}}</span>|
					<span class="grid-content conten">教学内容&nbsp;教学监督</span>
				</div>
				<div class="line_s"></div>
				<div class="demo-input-suffix demo">
					<el-row :gutter="20">
						<el-col :span="12" style="text-align: left;">
							教学监督
						</el-col>
						<el-col :span="12" style="text-align: right;">
							<el-button type="primary" class="tables">发送督学消息</el-button>
						</el-col>
					</el-row>
					
				</div>
				<div class="line_s"></div>
				<div class="table" style="width: 96%;">
					<el-row :gutter="20" style="margin-top: 20px;">
						<el-col :span="12" style="text-align: left;">
							<span>总成绩:</span>
							<div style="display: inline-block;width: 60%;">
								<el-input v-model="input" class="inputmodel"></el-input>
								<span class="li_ne">~</span>
								<el-input v-model="input" class="inputmodel"></el-input>
							</div>
							<el-button type="primary" class="tables">确定</el-button>
						</el-col>
						<el-col :span="12" style="text-align: right;">
							<span>学习进度:</span>
							<div style="display: inline-block;width: 60%;text-align: left;">
								<el-input v-model="input" class="inputmodel"></el-input>
								<span class="li_ne">~</span>
								<el-input v-model="input" class="inputmodel"></el-input>
							</div>
							<el-button type="primary" class="tables">确定</el-button>
						</el-col>
					</el-row>
					
					<el-row :gutter="20" style="margin-top: 20px;">
						<el-col :span="12" style="text-align: left;" class="gutter">
							<el-select style="width: 40%;" v-model="value" placeholder="全部班组">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
							<el-select style="width: 40%;" v-model="values" placeholder="全部学员状态">
								<el-option v-for="item in option" :key="item.values" :label="item.label" :value="item.values"></el-option>
							</el-select>				
						</el-col>
						<el-col :span="12" style="text-align: right;">
							<div class="active">
								<el-input style="width: 70%;" placeholder="姓名/手机/邮箱/学号" prefix-icon="el-icon-search"></el-input><el-button type="primary" class="tables">搜索</el-button>
							</div>
						</el-col>
					</el-row>

				</div>
				
				<el-table :data="tableDta" border stripe style="margin-top: 30px;">
					<el-table-column prop="student" label="学生" align='center'></el-table-column>
					<el-table-column prop="progress" label="学习进度" sortable align='center'></el-table-column>
					<el-table-column prop="learning" label="视频学习" sortable align='center'></el-table-column>
					<el-table-column prop="completion" label="作业完成" sortable align='center'></el-table-column>
					<el-table-column prop="completed" label="讨论完成" sortable align='center'></el-table-column>
					<el-table-column prop="programming" label="编程完成" sortable align='center'></el-table-column>
					<el-table-column prop="shift" label="班次" align='center'></el-table-column>
					<el-table-column prop="certification" label="认证状态" align='center'></el-table-column>
				</el-table>

			</div>

		</el-main>

	</el-container>

</template>
<script>
	import curriculumCenter from '@/components/tableContents/curriculumCenter'

	export default {
		'/teachingSupervision': 'teachingSupervision',
		data() {
			return {
				course: '计算机网络',
				value:'',
				values:'',
				input:'',
				tableDta:[
//					{student:'22',progress:'20%',learning:'5',completion:'265',completed:'524',programming:'252',shift:'55',certification:'已认证'},
//					{student:'452',progress:'260%',learning:'52',completion:'2465',completed:'234',programming:'5',shift:'552',certification:'已证'},
//					{student:'222',progress:'70%',learning:'58',completion:'245',completed:'534',programming:'25',shift:'52',certification:'认证'}
				],
				 options: [{
		          value: '选项1',
		          label: '黄金糕'
		        }, {
		          value: '选项2',
		          label: '双皮奶'
		        }, {
		          value: '选项3',
		          label: '蚵仔煎'
		        }, {
		          value: '选项4',
		          label: '龙须面'
		        }, {
		          value: '选项5',
		          label: '北京烤鸭'
		        }],
		        option:[
		        	{
		          values: '选项1',
		          label: '黄金糕'
		        }, {
		          values: '选项2',
		          label: '双皮奶'
		        }, {
		          values: '选项3',
		          label: '蚵仔煎'
		        }, {
		          values: '选项4',
		          label: '龙须面'
		        }, {
		          values: '选项5',
		          label: '北京烤鸭'
		        }
		        ]
			}
		},
		methods: {
			

		},
		components: {
			'p-curricu': curriculumCenter
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
		margin: 0 10px;
	}
	
	a {
		color: #42b983;
	}
	
	.grid-content {
		line-height: 30px;
	}
	
	.cert {
		margin: auto;
		padding: 20px;
		width: 80%;
		background-color: #fff;
		text-align: left;
	}
	
	.list {
		text-align: left;
	}
	
	.return {
		margin-right: 10px;
		color: #3DC1FF;
	}
	
	.course {
		margin: 0 10px;
	}
	
	.conten {
		margin-left: 10px;
	}
	
	.line_s {
		margin: 8px 0;
		width: 100%;
		height: 1px;
		background-color: #E9E9E9;
	}
	
	.model {
		padding: 0 50px;
		/*text-align: left;*/
		display: flex;
		justify-content: space-around;
		line-height: 40px;
	}
	
	.suff {
		line-height: 40px;
	}
	
	.models {
		/*margin-right: 30px;*/
		color: #001380;
		text-align: left;
	}
	
	.suffprim {
		padding: 20px 50px;
	}
	
	.demo {
		height: 50px;
		line-height: 50px;
	}
	
	.prim {
		margin-right: 30px;
		background-color: rgba(255, 152, 0, 0.2);
		border-color: #ffa622;
		color: #ff9800;
	}
	
	.first {
		height: 70px;
		line-height: 70px;
	}
	
	.hapter {
		margin: auto;
		margin-top: 30px;
		margin-bottom: 20px;
		display: block;
		width: 70%;
		background-color: rgba(255, 152, 0, 0.2);
		border-color: #ffa622;
		color: #ff9800;
	}
	
	.table {
		padding: 0 30px;
	}
	
	.lists {
		color: #3DC1FF;
		font-size: 12px;
	}
	
	.tables {
		background-color: #FF9800;
		border: #FF9800;
	}
	.custom-tree-node{
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.el-tree-node{
		margin-top: 10px;
	}
	.el-tree-node__content{
		height: 40px;
	}
	.excel{
		background-color: #3DC1FF;
		border: #3DC1FF;
		height: 30px;
		line-height: 10px;
	}
	.table_s{
		background-color: #FF9800;
		border: #FF9800;
		height: 30px;
		line-height: 8px;
	}
	.el-select-dropdown__item{
		display: block;
	}
	.inputmodel{
		width: 34%;
	}
	.li_ne{
		color: #101010;
		font-size: 20px;
		font-weight: 700;
	}
	.gutter{
		display: flex;
		justify-content: space-between;
	}
	.el-input__inner{
		/*border: #001380;*/
	}
</style>