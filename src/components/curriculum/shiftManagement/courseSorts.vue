<template>
		<div class="el-curriculum">
			<p style="text-align: left;">课程分类</p>

			<div class="line"></div>

			<div class="classCon">
				<div class="classTree">
					<el-row :gutter="24" style="height: 50px;line-height: 36px;padding: 1%;margin: 0;">
						<el-col :span="12" style="text-align: left;">
							<p class="grid-content" style="font-size: 14px;color: #001380;">分类管理</p>
						</el-col>
						<el-col :span="12" style="text-align: right;">
							<router-link to="/createaCategoryList">
								<el-button type="text" size="small" style="color: #3DC1FF;">＋ 添加一级分类</el-button>
							</router-link>
						</el-col>
					</el-row>

					<el-tree :data="data" node-key="id" default-expand-all :expand-on-click-node="false">
						<span class="custom-tree-node" slot-scope="{node,data}">
								<span style="width: 60%;text-align: left;" @click="view(node.id,node)">{{node.label}}</span>
								<span class="hover">
									<el-button type="text" size="small" @click="edit(node)">编辑</el-button>
									<el-button type="text" size="small" @click="deletes(node)">删除</el-button>
									<el-button type="text" size="small" v-if="node.data.isFirstLabel" @click="adds(node)">添加二级分类</el-button>
								</span>

						<el-dialog title="编辑班次名称" :visible.sync="editClass" center>
							<el-row :gutter="24">
								<el-col :span="8">
									<p style="text-align: right;line-height: 40px;">班次名称</p>
								</el-col>
								<el-col :span="8">
									<el-input v-model="className"></el-input>
								</el-col>
							</el-row>
							<el-row :gutter="24">
								<el-col :span="8">
									<p style="text-align: right;line-height: 40px;">是否显示</p>
								</el-col>
								<el-col :span="8" style="height: 40px;line-height: 40px;text-align: left;">
									<el-switch v-model="switchValue" @change="switchChange($event)"></el-switch>
								</el-col>
							</el-row>
							<span slot="footer" class="dialog-footer">
								<el-button type="primary" @click="confirm">确定</el-button>
								<el-button @click="editClass = false" type="text" style="color: #B5C0FF;">取消</el-button>
							</span>
						</el-dialog>

						<el-dialog title="删除" :visible.sync="deleteClass" center>
							<span>确认删除“{{labels}}”吗？其中的课程将失去该分类</span>

							<span slot="footer" class="dialog-footer">
								<el-button type="primary" @click="conDelete">确定</el-button>
								<el-button @click="deleteClass = false" type="text" style="color: #B5C0FF;">取消</el-button>
							</span>
						</el-dialog>

						<el-dialog title="添加二级分类" :visible.sync="addClass" center>
							<el-row :gutter="24">
								<el-col :span="8">
									<p style="text-align: right;line-height: 40px;">分类名称</p>
								</el-col>
								<el-col :span="8">
									<el-input v-model="addsClass" maxlength="16"></el-input>
									<p style="font-size: 12px;margin-top: 1%;text-align: left;">字数请限制在16个汉字以内</p>
								</el-col>
							</el-row>
							<span slot="footer" class="dialog-footer">
								<el-button type="primary" @click="conAdds">确定</el-button>
								<el-button @click="addClass = false" type="text" style="color: #B5C0FF;">取消</el-button>
							</span>
						</el-dialog>

						</span>
					</el-tree>

				</div>

				<div class="classTable" v-if="classTable">
					<el-row :gutter="24" style="height: 50px;line-height: 36px;padding: 1%;margin: 0;">
						<el-col :span="8" style="text-align: left;">
							<p class="grid-content" style="font-size: 14px;">{{label}}</p>
						</el-col>
						<el-col :span="16" style="text-align: right;">
							<el-button type="primary" style="float: right;">搜索</el-button>
							<el-col :span="12" style="float: right;padding-right: 0;">
								<el-input placeholder="学号/姓名" prefix-icon="el-icon-search"></el-input>	
							</el-col>
						</el-col>
					</el-row>

					<el-table :data="tableData" border border-color="#b5c0ff">
						<el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
						<el-table-column prop="id" label="课程ID" align="center"></el-table-column>
						<el-table-column prop="openName" label="课程名称" align="center"></el-table-column>
					</el-table>

					<div class="block" style="margin-top: 4%;">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" background layout="prev, pager, next, total, jumper" :total="total">
						</el-pagination>
					</div>

				</div>

			</div>
		</div>
</template>

<script>
	export default {
		data() {
			return {
				label: '',
				currentPage: 1,
				total: 0,
				className: '',
				switchValue: '',
				editClass: false,
				deleteClass: false,
				addClass: false,
				classId: '',
				labels: '',
				deleteID: '',
				addsClass: '',
				courseId:'',
				data: [],
				tableData: [],
				classTable:false
			}
		},
		created(){
			this.categoryList();
		},
		methods: {
			categoryList(){
				this.$api.CourseApi.categoryList(result => {
					console.log(result)
					this.data = result.data.pager;
				})
			},
			
			//点击获取当前分类
			view(viewID, row) {
				console.log(row.key);
				console.log(row);
				this.label = row.label;
				this.$api.CourseApi.classCategory(this.currentPage,10,row.key,result => {
					console.log(result)
					this.classTable = true;
					this.tableData = result.data.pager.list;
					this.total = result.data.pager.total
				})
			},
			//点击编辑当前分类
			edit(node) {
				console.log(node)
				this.editClass = true;
				this.classId = node.key;
				this.className = node.label; //当前分类名称
				this.switchValue = node.data.isShow;
				console.log(node.data.isShow)
			},
			//			是否显示
			switchChange($event) {
				let switchId = this.classId;
				this.switchValue = $event;
				console.log($event);
				console.log(switchId);
			},
			//			确认编辑班次名称
			confirm() {
				let switchValue = this.switchValue;
				let className = this.className;
				let switchId = this.classId;
				
				let form = {
					label:className,
					isShow:switchValue
				};
				console.log(form);
				this.$api.CourseApi.editCourse(switchId,form,result => {
					console.log(result);
					if(result.success == true){
						this.editClass = false;
						this.categoryList();						
					}else{
						console.log(result.errors)
					}
				})
				
			},
			//			删除
			deletes(node) {
				console.log(node)
				this.labels = node.label;
				this.deleteID = node.key;
				this.deleteClass = true;
			},
			//			确认删除
			conDelete() {
				let deleteID = this.deleteID;
				console.log(deleteID)
				this.deleteClass = false;
				
				this.$api.CourseApi.deleteClassification(deleteID,result => {
					console.log(result);
					this.deleteClass = false;
					this.categoryList();
				})
			},
			//			添加二级分类
			adds(node) {
				this.addClass = true;
				this.addsID = node.key;
				console.log(node.key);
				console.log(node)
			},
			//			确认添加二级分类
			conAdds() {
				let addsID = this.addsID;
				let addsClass = this.addsClass;
				console.log(addsID);
				console.log(addsClass);
				
				this.$api.CourseApi.addSecondaryClassification(addsID, addsClass,result => {
					console.log(result);
					this.addClass = false;
					this.categoryList();
				})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.view();
				console.log(`当前页: ${val}`);
			}
		},
		components: {

		}
	}
</script>

<style>
	.el-curriculum {
		margin: auto;
		margin-top: 2%;
		padding: 2%;
		background: transparent;
		width: 80%;
	}
	
	.line {
		margin-top: 2%;
		width: 100%;
		height: 1px;
		background: #D5D5D5;
	}
	
	.classCon {
		margin-top: 4%;
		display: flex;
		height: 665px;
		border: 1px solid #B5C0FF;
	}
	
	.classTree {
		border: 1px solid #B5C0FF;
		width: 50%;
		background-color: #EDEFFB;
		overflow: auto;
	}
	
	.el-tree-node__content {
		border-top: 1px solid #B5C0FF;
		height: 50px;
		font-size: 14px;
	}
	/*.el-tree-node__children{
		border-top: 1px solid #B5C0FF;
	}*/
	
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
	
	.classTable {
		width: 50%;
		border: 1px solid #B5C0FF;
		border-left-color: transparent;
	}
	.block {
		margin: 4% 0;
	}
</style>