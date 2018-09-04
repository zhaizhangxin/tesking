<template>
		<el-main style="padding: 0;">
			
			<div class="certs">
				<p class="demo">课程模板资源</p>
				<div class="line"></div>
				<div class="table">
					<el-tabs>
						<el-tab-pane label="视频库">
							<el-row :gutter="20">
								<el-col :span="18" style="text-align: left;">
									<p class="grid-content lists">此列表显示的是本班次相关视频，若要查看课程的资源请进入课程查看</p>
								</el-col>
								<el-col :span="6" style="text-align: right;">
									<el-button type="text" class="buttonText">删除</el-button>
									<el-button type="primary">创建目录</el-button>
								</el-col>
							</el-row>
							
							<div class="custom-tree-container">
								<el-tree :data="data" node-key="id" :expand-on-click-node="false">
									<span class="custom-tree-node" slot-scope="{node,data}">
											<span style="width: 60%;text-align: left;" @click="view(node.id,node)">{{node.label}}</span>
											<span class="hover">
												<el-button type="text" size="small" @click="edit(node)">上传视频</el-button>
												<el-button type="text" size="small" @click="deletes(node)">重命名</el-button>
												<el-button type="text" size="small" v-if="node.data.add" @click="adds(node)">创建子目录</el-button>
											</span>
											<span style="font-size: 12px;">2018-06-04 08:00</span>
									</span>
								</el-tree>
							</div>
						</el-tab-pane>
						
						<el-tab-pane label="文档库">
							<el-row>
								<el-col :span="24" style="text-align: right;">
									<el-button type="text" class="buttonText">删除</el-button>
									<el-button type="primary">创建目录</el-button>
								</el-col>
							</el-row>
							<div class="custom-tree-container">
								<el-tree :data="data" node-key="id" :expand-on-click-node="false">
									<span class="custom-tree-node" slot-scope="{node,data}">
											<span style="width: 60%;text-align: left;" @click="view(node.id,node)">{{node.label}}</span>
											<span class="hover">
												<el-button type="text" size="small" @click="edit(node)">上传文档</el-button>
												<el-button type="text" size="small" @click="deletes(node)">重命名</el-button>
												<el-button type="text" size="small" v-if="node.data.add" @click="adds(node)">创建子目录</el-button>
											</span>
											<span style="font-size: 12px;">2018-06-04 08:00</span>
									</span>
								</el-tree>
							</div>
						</el-tab-pane>
						
						<el-tab-pane label="习题库">
							<el-row :gutter="20">
								<el-col :span="18" style="text-align: left;">
									<p class="grid-content lists">此列表显示的是本班次相关视频，若要查看课程的资源请进入课程查看</p>
								</el-col>
								<el-col :span="6" style="text-align: right;">
									<el-button type="primary" class="excel">上传Excel表单</el-button>
								</el-col>
							</el-row>
							<el-row :gutter="20" style="margin-top: 10px;">
								<el-col :span="16" style="text-align: left;">
									<p class="grid-content" style="font-size: 12px;">筛选：&nbsp;&nbsp;全选&nbsp;单选&nbsp;多选&nbsp;判断</p>
								</el-col>
								<el-col :span="8" style="text-align: right;">
									<!--<el-button type="text" class="buttonText">移动</el-button>-->
									<el-button type="text" class="buttonText">删除</el-button>
									<el-button type="primary">新建目录</el-button>
								</el-col>
							</el-row>
							<div class="custom-tree-container">
								<el-tree :data="data" node-key="id" :expand-on-click-node="false">
									<span class="custom-tree-node" slot-scope="{node,data}">
											<span style="width: 60%;text-align: left;" @click="view(node.id,node)">{{node.label}}</span>
											<span class="hover">
												<el-button type="text" size="small" @click="edit(node)">上传视频</el-button>
												<el-button type="text" size="small" @click="deletes(node)">重命名</el-button>
												<el-button type="text" size="small" v-if="node.data.add" @click="adds(node)">创建子目录</el-button>
											</span>
											<span style="font-size: 12px;">2018-06-04 08:00</span>
									</span>
								</el-tree>
							</div>
						</el-tab-pane>
						
						
					</el-tabs>

				</div>

			</div>

		</el-main>
</template>
<script>


	export default {
		'/courseResources': 'courseResources',
		data() {
			return {
				course: '计算机网络',
				radio: '1',
				value:'',
				data: [{
					id: 1,
					label: '默认目录',
					time:'2018-06-01 08:00',
					add:true,
					children: [{
						id: 4,
						label: '二级 1-1',
						time:'2018-06-01 08:00',		
						add:false,
					}]
				}, {
					id: 2,
					label: '默认目录',
					time:'2018-06-01 08:00',
					add:true,
					
					children: [{
						id: 5,
						label: '二级 2-1',
						time:'2018-06-01 08:00',
					add:false,
						
					}, {
						id: 6,
						label: '二级 2-2',
						time:'2018-06-01 08:00',
					add:false,
						
					}]
				}, {
					id: 3,
					label: '一级 3',
					time:'2018-06-01 08:00',
					add:true,
					
					children: [{
						id: 7,
						label: '二级 3-1',
						time:'2018-06-01 08:00',
					add:false,
						
					}, {
						id: 8,
						label: '二级 3-2',
						time:'2018-06-01 08:00',
					add:false,
						
					}]
				}],
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
				defaultProps: {
					children: 'children',
					label: 'label',
					time:'time'
				}
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
	
	.table {
		padding: 0 4%;
	}
	.lists {
		color: #3DC1FF;
		font-size: 12px;
	}
	.excel{
		background-color: #3DC1FF;
		border: #3DC1FF;
	}
	.excel:hover{
		background-color: #3DC1FF;
		border: #3DC1FF;
	}
	.excel:focus{
		background-color: #3DC1FF;
		border: #3DC1FF;
	}
	.el-tree-node__content{
		height: 50px;
	}
	.el-tree-node__content{
		border:0;
	}
	
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
	
	.custom-tree-node .hover {
		display: none;
	}
	
	.custom-tree-node:hover .hover {
		display: block;
	}
</style>