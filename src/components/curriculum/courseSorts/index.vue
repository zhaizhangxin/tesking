<template>
	<div class="el-curriculum">
		<p style="text-align: left;">课程模板分类</p>
		<div class="line"></div>
		<el-row :span='24' style="text-align: right;margin-top: 2%;">
			<el-col :span="24">
				<el-button type="text" class="buttonText" @click="deleteKey" v-if="decide == false">删除</el-button>
				<el-button type="text" @click="delete_s" v-if="decide == true">删除</el-button>
				<el-button type="text" class="buttonText" @click="cancel" v-show="cancels">取消</el-button>
				<router-link to="/createACategoryList">
					<el-button type="primary">新增</el-button>					
				</router-link>
			</el-col>
		</el-row>

		<el-table style="margin-top: 2%;" @expand-change="expandChange" :data="tableData" stripe border @selection-change="handleSelectionChange">
			<el-table-column type="expand" style="padding: 0;">
				<template slot-scope="props">
					<el-table :show-header="head" :data="childrenDate" @selection-change="handleSelectionChange" label-position="left" inline class="demo-table-expand" style="padding: 0;">
						<el-table-column width="48"  align="center"></el-table-column>
						<el-table-column type="selection" width="55" align="center" v-if="selections"></el-table-column>
						<el-table-column width="80" prop="id" align="center"></el-table-column>
						<el-table-column prop="label" align="center"></el-table-column>
						<el-table-column width="80" align="center">
							<template slot-scope="scope">
								<span v-if="scope.row.parentId != 0">二级</span>
							</template>
						</el-table-column>
						<el-table-column prop="courseCount" align="center" width="140"></el-table-column>
						<el-table-column align="center" width="100">
							<template slot-scope="scope">
								<el-switch v-model="scope.row.isShow" @change="switchChange($event,scope.row.id)"></el-switch>
							</template>
						</el-table-column>
						<el-table-column width="80" prop="displayOrder" align="center"></el-table-column>
						<el-table-column align="center" width="200"></el-table-column>
						<el-table-column align="center">
							<template slot-scope="scope">
								<el-button type="text" class="buttonText" @click="scopeDelete(scope)">删除</el-button>
								<el-button type="text" class="buttonText" @click="scopeEdit(scope)">编辑</el-button>
							</template>
						</el-table-column>
					</el-table>
				</template>
			</el-table-column>
			<el-table-column type="selection" width="55" align="center" v-if="selections"></el-table-column>
			<el-table-column label="编号" width="80" prop="id" align="center"></el-table-column>
			<el-table-column label="分类名称" prop="label" align="center"></el-table-column>
			<el-table-column label="级别" width="80" align="center">
				<template slot-scope="scope">
					<span v-if="scope.row.parentId == 0">一级</span>
				</template>
			</el-table-column>
			<el-table-column label="课程模板数量" prop="courseCount" align="center" width="140"></el-table-column>
			<el-table-column label="是否显示" align="center" width="100">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.isShow" @change="switchChange($event,scope.row.id)"></el-switch>
				</template>
			</el-table-column>
			<el-table-column label="排序" width="80" prop="displayOrder" align="center"></el-table-column>
			<el-table-column label="设置" align="center" width="200">
				<template slot-scope="scope">
					<el-button type="text" class="buttonText" @click="scopeAdds(scope)">新增下级</el-button>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="text" class="buttonText" @click="scopeDelete(scope)">删除</el-button>
					<el-button type="text" class="buttonText" @click="scopeEdit(scope)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<el-dialog title="新增下级" :visible.sync="adds" width="50%" center>
			<el-row :gutter="24">
	 			<el-col :span="24" style="padding: 0 10%;">
	 				<el-input v-model="ruleForm.label" maxlength="16"></el-input>	
	 				<p>字数请限制是16个汉字以内</p>
	 			</el-col>
	 		</el-row>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="confirmAdds">确定</el-button>
				<el-button @click="adds = false" type="text" style="color: #B5C0FF;">取消</el-button>
			</span>
		</el-dialog>
		
		<el-dialog title="删除" :visible.sync="deletes" width="50%" center>
			<span>确定删除{{title}}吗？其中的班课将失去该分类</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="confirmDelete">确定</el-button>
				<el-button @click="deletes = false" type="text" style="color: #B5C0FF;">取消</el-button>
			</span>
		</el-dialog>
		
		<el-dialog title="编辑分类名称" :visible.sync="editName" width="50%" center>
			<el-row :gutter="24">
	 			<el-col :span="24" style="padding: 0 10%;">
	 				<el-input v-model="rule.label" maxlength="16"></el-input>
	 			</el-col>
	 		</el-row>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="confirmEdit">确定</el-button>
				<el-button @click="editName = false" type="text" style="color: #B5C0FF;">取消</el-button>
			</span>
		</el-dialog>
		
		<div class="block" style="margin-top: 4%;">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" background layout="prev, pager, next, total, jumper" :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				head:false,
				currentPage: 1,
				total: 0,
				selections: false,
				tableData: [],
				childrenDate: [],
				deletes:false,
				adds:false,
				editName:false,
				decide:false,
				cancels:false,
				title:'',
				id:'',
				ruleForm:{
					label:''
				},
				rule:{
					label:''
				},
				multipleSelection:[]
				
			}
		},
		created() {
			this.courseCategorys();
		},
		methods: {
			//多选框选中的值
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			//		   	点击删除出现多选框
			deleteKey(){
				this.cancels = true;//取消选择
				this.selections = true;	//多选框的隐藏与显示
				this.decide = true;//删除选择
			},
			//			选择完之后点击删除隐藏多选框
			delete_s(){
				let multiple = this.multipleSelection;
				let id = [];
				multiple.forEach(function(item,index){
					let multId = item.id;
					id.push(multId)
				})
				
				this.$api.CourseApi.deletesCourse(id, result => {
					if(result.success == true){
						this.selections = false;	//多选框的隐藏与显示
					    this.decide = false;//停用选择
						this.cancels = false;//取消选择
					    this.courseCategorys();
					}else{
						console.log(result.errors)
					}
				})
			},
			//			取消删除或停用,复选框隐藏
			cancel(){
				this.cancels = false;//取消选择
				this.selections = false;	//多选框的隐藏与显示
				this.decide = false;//删除选择
			},
			//		   是否显示
			switchChange($event, switchId) {
				let form = {
					isShow:$event
				};
				this.$api.CourseApi.isShowCourse(switchId, form, result => {
					if(result.success == true){
					    this.courseCategorys();
					}else{
						console.log(result.errors)
					}
				})
				
			},
			//			查询一级分类
			courseCategorys() {
				this.$api.CourseApi.courseCategorys(this.currentPage, 10, result => {
					console.log(result)
					this.total = result.data.pager.total
					this.tableData = result.data.pager.list;
				})
			},
//			查询二级分类
			expandChange(row,expandedRows){
//				console.log(expandedRows);
				let id ;
				expandedRows.forEach(function(item,index){
					id = item.id
				})
				if(id != undefined){
					this.$api.CourseApi.courseCategory(id, result => {
//						console.log(result)
						this.childrenDate = result.data.courseCategoryDtoList;
					})
				}
			},
//			新增下级
			scopeAdds(scope){
				this.adds = true;
				this.id = scope.row.id;
			},
//			确定新增
			confirmAdds(){
				this.adds = false;
				console.log(this.ruleForm)
				this.$api.CourseApi.secondCourse(this.id,this.ruleForm, result => {
					console.log(result)
					this.courseCategorys();
				})
			},
//			删除
			scopeDelete(scope){
				this.deletes = true;
				console.log(scope.row);
				this.title = scope.row.label;
				this.id = scope.row.id;
			},
//			确认删除
			confirmDelete(){
				this.deletes = false;
				this.$api.CourseApi.delete_Course(this.id, result => {
					console.log(result)
					this.courseCategorys();
				})
			},
//			编辑
			scopeEdit(scope){
				this.editName = true;
				this.rule.label = scope.row.label;
				this.id = scope.row.id;
			},
//			确认编辑
			confirmEdit(){
				this.editName = false;
				this.$api.CourseApi.edit_Course(this.id,this.rule, result => {
					console.log(result)
					this.courseCategorys();
				})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.courseCategorys();
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
	.el-table__expanded-cell[class*=cell]{
		padding: 0;
	}
</style>