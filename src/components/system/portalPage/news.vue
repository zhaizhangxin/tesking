<template>
		
		<el-main style="margin-top: 2%;">
			<el-header class="cert" style="border-bottom: 1px solid #E0E0DD;">
				<el-row :gutter="20">
					<el-col :span="10" style="text-align: left;">
						<span class="grid-content" style="font-size: 16px;">新闻</span>
						<span class="grid-content show">共{{num}}项公告，列表前3项将显示于门户首页</span>
					</el-col>
					<el-col :span="14" style="text-align: right;">
						<el-button type="text" size="small" class="delect">置顶</el-button>
						<el-button type="text" size="small" class="delect">删除</el-button>
						<el-button type="primary" @click="tableEdits = true">新增</el-button>
						
						<el-dialog title="" :visible.sync="tableEdits" style="text-align: center;">
							<el-form :model="forms">
								<el-form-item label="公告标题">
									<el-input v-model="forms.title"></el-input>
								</el-form-item>
								<el-form-item label="公告详情">
									<div class='tinymce'>
									   <editor class="editor" style="width: 80%;display: inline-block;" :value="contents"  :setting="editorSetting" @input="(content)=> content = content"></editor>
									</div>
								</el-form-item>
							</el-form>
							<div>
								<el-button type="primary">保存</el-button>
							    <el-button @click="tableEdits = false" type="text" style="color: #B5C0FF;">取 消</el-button>
							</div>
						</el-dialog>
						
					</el-col>
				</el-row>
			</el-header>
	
			<el-main style="background-color: #FFFFFF;margin-top: 30px;" class="cert">
				
				<el-table :data="tableData" border style="width: 100%">
					<el-table-column type="index" label="序号" align="center"> </el-table-column>
					<el-table-column prop="title" label="新闻标题" align="center"> </el-table-column>
					<el-table-column prop="time" label="发布时间" align="center"> </el-table-column>
					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<el-button type="text" size="small" style="color: #001380;" @click="tableEdit = true">编辑</el-button>
							
							<el-dialog title="" :visible.sync="tableEdit">
								<el-form :model="form">
									<el-form-item label="公告标题">
										<el-input v-model="form.title"></el-input>
									</el-form-item>
									<el-form-item label="公告详情">
										<div class='tinymce'>
										   <editor class="editor" style="width: 80%;display: inline-block;" :value="content"  :setting="editorSetting" @input="(content)=> content = content"></editor>
										</div>
									</el-form-item>
								</el-form>
								<div>
									<el-button type="primary">保存</el-button>
								    <el-button @click="tableEdit = false" type="text" style="color: #B5C0FF;">取 消</el-button>
								</div>
							</el-dialog>
							
						</template>
					</el-table-column>
				</el-table>
				<!--<div class="block">
				    <el-pagination background="true" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 50, 100]" pager-count="10" :page-size="10" layout="prev,pager,next,total, jumper" :total="100">
				    
				    </el-pagination>
				</div>-->
						
			</el-main>
			
		</el-main>

</template>

<script>

	
    import editor from '@/components/ue'
	
	export default {
		'/news': 'news',
		data() {
			return {
				num:'2',
				tableEdits:false,
				tableEdit:false,
				contents:'',
				content:'',
				forms:{
					title:''
				},
				form:{
					title:''
				},
				tableData: [
					{title:'欢迎关注"第一军事理论课堂"',time:'2018.06.08  08:20'},
					{title:'欢迎关注"第一军事理论课堂"',time:'2018.06.08  08:20'}
				],
				classList: [
			        "el-icon-message",
			        "el-icon-menu",
			        "el-icon-setting",
			        "el-icon-setting"
			    ],
			    editorSetting:{
                    height:200,
                },
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

			
			'editor':editor
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
	.show{
		margin-left: 30px;
		color: #aaa;
		font-size: 12px;
	}
	.delect{
		color: #FF9800;
	}
</style>