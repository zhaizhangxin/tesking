<template>
	<div class="el-curriculum">
		
		<el-row :gutter="24">
			<el-col :span="14" style="text-align: left;">
				<p class="grid-content" style="line-height: 40px;">课程模板列表</p>
			</el-col>
			<el-col :span="10" style="text-align: right;">
				<el-button type="primary" style="float: right;" @click="search">搜索</el-button>						
				<el-col :span="14" style="float: right;padding-right: 0;">
					<el-input placeholder="请输入课程模板名称" prefix-icon="el-icon-search" v-model="course_Name"></el-input>
				</el-col>
			</el-col>
		</el-row>
		
		<div class="line"></div>

		<el-row style="margin-top: 2%;">
			<el-col :span="24" style="text-align: right;">
				<el-button type="text" class="buttonText" @click="deleteKey" v-if="decide == false">删除</el-button>
				<el-button type="text" @click="deletes" v-if="decide == true">删除</el-button>
				<el-button type="text" class="buttonText" @click="cancel" v-show="cancels">取消</el-button>
				<router-link to="/shiftEditing">
					<el-button type="primary" style="margin-left: 2%;">新增</el-button>
				</router-link>
			</el-col>
		</el-row>

		<el-table :data="tableData" stripe border style="margin-top: 2%;" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55" align="center" v-if="selections"></el-table-column>
			<el-table-column label="课程模板ID" prop="id" align="center" width="100"></el-table-column>
			<el-table-column label="模板封面" align="center">
				<template slot-scope="scope">
					<img :src="scope.row.courseCover" style="width: 100%;" />
				</template>
			</el-table-column>
			<el-table-column label="课程模板名称" prop="courseName" align="center"></el-table-column>
			<el-table-column label="授课老师" prop="teacherName" align="center"></el-table-column>
			<el-table-column label="建设状态" align="center" width="100">
				<template slot-scope="scope">
					<span v-if="scope.row.courseStatus == 10">未发布</span>
					<span v-if="scope.row.courseStatus == 20">已发布</span>
					<span v-if="scope.row.courseStatus == 30">已停用</span>
				</template>
			</el-table-column>
			<!--<el-table-column label="课程价格" align="center" width="100">
				<template slot-scope="scope">
					<span v-if="scope.row.courseFree == 1">免费</span>
				</template>
			</el-table-column>-->
			<el-table-column label="已开班次" align="center" width="100">
				<template slot-scope="scope">
					<el-button type="text" class="buttonText"  @click="details(scope.row.id)">{{scope.row.openNum}}</el-button>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center"> 
				<template slot-scope="scope" >
					
					<el-button type="text" class="buttonText" size="small" v-if="scope.row.courseStatus == 30" @click="disableKey(scope.$index,scope.row)">启用</el-button>
					<el-button type="text" class="buttonText" size="small" v-else="scope.row.courseStatus != 30" @click="disable(scope.$index,scope.row)">停用</el-button>
					
					
					<el-dialog title="提示" :visible.sync="release" center width="50%">
						<span>确定停用该课程吗？</span>
						<span slot="footer" class="dialog-footer">
							<el-button type="primary" @click="confirmRelease">确定</el-button>
							<el-button @click="release = false" type="text" style="color: #B5C0FF;">取消</el-button>
						</span>
					</el-dialog>
					
					<el-dialog title="提示" :visible.sync="enable" center width="50%">
						<span>确定启用该课程吗？</span>
						<span slot="footer" class="dialog-footer">
							<el-button type="primary" @click="confirmRelease">确定</el-button>
							<el-button @click="enable = false" type="text" style="color: #B5C0FF;">取消</el-button>
						</span>
					</el-dialog>
					
					<!--<el-button type="text" size="small" class="buttonText">二维码</el-button>-->
					<!--<router-link to="/openShift">
					</router-link>-->
					<el-button type="text" size="small" class="buttonText" @click="openShift(scope.row.id)">开班课</el-button>
					<!--<el-button type="text" size="small" class="buttonText" @click="details(scope.row.id)">详情</el-button>-->
					
					<el-button type="text" size="small" class="buttonText" @click="edits(scope.row.id)">编辑</el-button>
					
				</template>
			</el-table-column>
		</el-table>

		<div class="block" style="margin-top: 4%;">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" background layout="prev, pager, next, total, jumper" :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>

	export default {
		name:'curriculumCenter',
		data() {
			return {
				tableData: [],
				currentPage: 1,
				total: 0,
				selections:false,
				release:false,
				decide:false,
				cancels:false,
				whetherDisable:false,
				enable:false,
				releaseId:'',
				multipleSelection:[],
				course_Name:'',
				id:''
			}
		},
		created() {
			this.courseAlllist();
		},
		methods: {
			openShift(id){
				this.id = id;
				this.$router.push({
					path: '/openShift',
					name:'openShift',
					query:{
						name:'currname',
						id:id
					}
				})
				
			},
//			搜索课程模板名称
			search(){
				this.search_course();
			},
//			搜索
			search_course(){
				this.$api.CourseApi.reaching_course(this.currentPage,10, this.course_Name,result => {
					console.log(result)
					if(result.success == true){
						if(result.data.pager == null){
							this.tableData = [];
						}else{
							this.total = result.data.pager.total
							this.tableData = result.data.pager.list;							
						}
					}else{
						console.log(result.errors)
					}
				})
			},
//			编辑
			edits(id){
				this.$router.push({
					path: '/shiftEditing',
					name:'shiftEditing',
					query:{
						name:'name',
						id:id
					}
				})
			},
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
			deletes(){
				let multiple = this.multipleSelection;
				let id = [];
				multiple.forEach(function(item,index){
					let multId = item.id;
					id.push(multId)
				})
				this.$api.CourseApi.deletesCourses(id, result => {
					if(result.success == true){
						this.selections = false;	//多选框的隐藏与显示
					    this.decide = false;//停用选择
						this.cancels = false;//取消选择
					    
					    this.courseAlllist();
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
//			点击停用课程
			disableKey(index,row){
				this.enable = true;
				this.releaseId = row.id;
			},
//			点击启用课程
			disable(index,row){
				this.release = true;
				this.releaseId = row.id;
			},
//			确定停启用课程
			confirmRelease(){
				let id = this.releaseId;
				this.$api.CourseApi.WhetherDisable(id, result => {
					if(result.success == true){
						if(this.release == true){
							this.release = false;					
						}
						if(this.enable == true){
							this.enable = false;
						}
					    this.courseAlllist();
					}else{
						console.log(result.errors)
					}
				})
				
				
			},
			courseAlllist: function() {
				this.$api.CourseApi.courseAlllist(this.currentPage, 10, result => {
					console.log(result)
					this.total = result.data.pager.total
					this.tableData = result.data.pager.list;
				})
			},
			details: function(data) {
				console.log(data);
				this.$router.push({
					path: '/shiftManagement/shiftsManagement',
					query: {
						dataObj: data
					}

				})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				if(this.course_Name == ''){
					this.courseAlllist();					
				}else{
					this.search_course();
				}
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
		background: #FFFFFF;
		width: 80%;
	}
	
	.line {
		margin-top: 2%;
		width: 100%;
		height: 1px;
		background: #D5D5D5;
	}
</style>