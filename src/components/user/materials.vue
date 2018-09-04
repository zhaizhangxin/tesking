<template>
	<div class="shift">
		<div class="list">
			<el-row>
				<el-col :span="24">
					<p class="grid">
						<!--<router-link to="/curriculumCenter">
							<span style="color: #3DC1FF;">返回课程列表</span>
						</router-link>
						&nbsp;&nbsp;|&nbsp;&nbsp;
						<span>我的课程&nbsp;&nbsp;&nbsp;2.上传课程资料</span>-->
						2.上传课程资料
					</p>
				</el-col>
			</el-row>
		</div>

		<div class="cont">

			<div style="width: 40%;margin-right: 1%;">
				<el-row :gutter="24" style="border-bottom: 1px solid #ECEFF1;line-height: 40px;">
					<el-col :span="8" style="text-align: left;">
						<p style="color: #001380;font-size: 14px;line-height: 40px;">课程章节目录</p>
					</el-col>
					<el-col :span="16" style="text-align: right;">
						<el-button type="text" @click="newChapter = true">＋ 新建章节</el-button>
						<el-button type="primary" style="height: 30px;line-height: 0;" @click="batchCreation = true">批量创建</el-button>
					</el-col>
				</el-row>

				<el-tree :data="data" node-key="id" default-expand-all :expand-on-click-node="false">
					<span class="custom-tree-node" slot-scope="{node,data}">
			 			<span style="width: 60%;text-align: left;" @click="labelShow(node)">{{node.label}}</span>
					<span class="hover">
			 				<el-button type="text" size="mini" @click="edit(node)">编辑</el-button>
			 				<el-button type="text" size="mini" @click="detele(node)">删除</el-button>
			 				<el-button type="text" size="mini" v-if="node.data.isFirstLabel" @click="adds(node)">添加</el-button>
			 			</span>

					<el-dialog title="编辑章节名称" :visible.sync="exitClass" width="50%" center>
						<el-row :gutter="24">
							<el-col :span="24" style="padding: 0 10%;">
								<el-input v-model="label"></el-input>
							</el-col>
						</el-row>
						<span slot="footer" class="dialog-footer">			 			
					 			<el-button type="primary" @click="confirmEdit">确 定</el-button>
							    <el-button @click="exitClass = false">取 消</el-button>
							</span>
					</el-dialog>

					<el-dialog title="删除" :visible.sync="deleteClass" width="50%" center>
						<span>确认删除“{{label}}”吗？其中的课程将失去该分类</span>
						<span slot="footer" class="dialog-footer">			 			
					 			<el-button type="primary" @click="confirmDelete">确 定</el-button>
							    <el-button @click="deleteClass = false">取 消</el-button>
							</span>
					</el-dialog>

					<el-dialog title="添加" :visible.sync="addClass" width="50%" center>
						<el-row :gutter="24">
							<el-col :span="24" style="padding: 0 10%;">
								<el-input v-model="addLabel"></el-input>
							</el-col>
						</el-row>
						<span slot="footer" class="dialog-footer">			 			
					 			<el-button type="primary" @click="confirmAdd">确 定</el-button>
							    <el-button @click="addClass = false">取 消</el-button>
							</span>
					</el-dialog>

					</span>
				</el-tree>

				<el-dialog title="新建章" :visible.sync="newChapter" width="50%" center>
					<el-row :gutter="24">
						<el-col :span="24" style="padding: 0 10%;">
							<el-input v-model="chapterName"></el-input>
						</el-col>
					</el-row>
					<span slot="footer" class="dialog-footer">			 			
			 			<el-button type="primary" @click="chapters">确 定</el-button>
					    <el-button @click="newChapter = false">取 消</el-button>
					</span>
				</el-dialog>

				<el-dialog title="批量创建章节目录" :visible.sync="batchCreation" width="50%" center>
					<el-row :gutter="24">
						<el-col :span="12" style="text-align: right;">
							<el-select v-model="value" placeholder="新增课程章节">
								<el-option v-for="item in chapter" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
							章
						</el-col>
						<el-col :span="12">
							<el-select v-model="values" placeholder="新增课程课时">
								<el-option v-for="item in chapClass" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
							节
						</el-col>
					</el-row>

					<span slot="footer" class="dialog-footer">			 			
			 			<el-button type="primary" @click="create">确 定</el-button>
					    <el-button @click="batchCreation = false">取 消</el-button>
					</span>
				</el-dialog>

			</div>

			<div v-if="isShow" style="width: 60%;border-left: 1px solid #D9EDF7;">
				<div>
					<el-row :gutter="24">
						<el-col :span="4">
							<p>选择课件</p>
						</el-col>
						<el-col :span="16" style="text-align: left;">
							<el-upload class="upload-demo" accept=".doc,.docx,.ppt,.pptx,.xls,.xlsx,.pdf" :show-file-list="showFile" :http-request="uploadCourseware" action="#" :before-upload="beforeAvatarUpload" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="5" :on-exceed="handleExceed" :file-list="fileList">
								<div class="upload">
									<el-button type="primary" class="materials">选择课件</el-button>
									<div slot="tip" class="el-upload__tip">
										<p>1.文件格式支持：doc，docx，ppt，pptx，xls，xlsx，pdf</p>
										<p>2.单个文件最大不超过50M</p>
										<p>3.课件最多支持上传5个</p>
									</div>
								</div>
							</el-upload>
						</el-col>
					</el-row>
					<div class="uploadImg" style="margin-bottom: 4%;">
						<el-row :gutter="24" v-for="(item,key) in fileList">
							<el-col :span="14" style="text-align: left;margin-left: 6%;">
								<p style="font-size: 12px;line-height: 28px;" v-if="item == []"></p>
								<p style="font-size: 12px;line-height: 28px;" v-else>{{item.name}}</p>
							</el-col>
							<el-col :span="8">
								<el-button type="text" size="mini" @click="deleteName(item)">删除</el-button>
								<el-button type="text" size="mini" @click="editName(item)">编辑</el-button>
							</el-col>
						</el-row>

						<el-dialog title="删除" :visible.sync="deletes" width="50%" center>
							<p>确定移除{{deletesName}}吗？</p>
							<span slot="footer" class="dialog-footer">
								<el-button type="primary" @click="finishedDelete">完成</el-button>
								<el-button @click="deletes = false" type="text" style="color: #B5C0FF;">取消</el-button>
							</span>
						</el-dialog>

						<el-dialog title="请输入新的文件名" :visible.sync="newName" width="50%" center>
							<el-row :gutter="24">
								<el-col :span="24" style="padding: 0 10%;">
									<el-input v-model="ruleForm.title"></el-input>
								</el-col>
							</el-row>
							<span slot="footer" class="dialog-footer">
								<el-button type="primary" @click="finishedEdit">完成</el-button>
								<el-button @click="newName = false" type="text" style="color: #B5C0FF;">取消</el-button>
							</span>
						</el-dialog>
					</div>
				</div>
				<div>
					<el-row :gutter="24">
						<el-col :span="4">
							<p>上传视频</p>
						</el-col>
						<el-col :span="16" style="text-align: left;">
							<el-upload class="upload-demo" accept=".flv,.f4v,.mp4,.m3u8" :show-file-list="showFile" :http-request="uploadVideo" action="#" :before-upload="beforeAvatarVideo" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemoveVideo" multiple :limit="1" :file-list="fileVideo">
								<div class="upload">
									<el-button type="primary" class="materials">选择视频</el-button>
									<div slot="tip" class="el-upload__tip">
										<p>1.视频文件格式支持：flv,f4v,mp4,m3u8</p>
										<p>2.同时视频编码格式是h.264编码</p>
										<p>3.最大不超过500M</p>
										<p>4.最多上传1个视频</p>
									</div>
								</div>
							</el-upload>
						</el-col>
					</el-row>
					<div class="uploadImg" style="margin-bottom: 4%;">
						<el-row :gutter="24" v-for="(item,key) in fileVideo">
							<el-col :span="14" style="text-align: left;margin-left: 6%;">
								<p style="font-size: 12px;line-height: 28px;">{{item.name}}</p>
							</el-col>
							<el-col :span="8">
								<el-button type="text" size="mini" @click="deleteName(item)">删除</el-button>
								<el-button type="text" size="mini" @click="editName(item)">编辑</el-button>
							</el-col>
						</el-row>

						<el-dialog title="删除" :visible.sync="deletes" width="50%" center>
							<p>确定移除{{deletesName}}吗？</p>
							<span slot="footer" class="dialog-footer">
								<el-button type="primary" @click="finishedDelete">完成</el-button>
								<el-button @click="deletes = false" type="text" style="color: #B5C0FF;">取消</el-button>
							</span>
						</el-dialog>

						<el-dialog title="请输入新的文件名" :visible.sync="newName" width="50%" center>
							<el-row :gutter="24">
								<el-col :span="24" style="padding: 0 10%;">
									<el-input v-model="ruleForm.title"></el-input>
								</el-col>
							</el-row>
							<span slot="footer" class="dialog-footer">
								<el-button type="primary" @click="finishedEdit">完成</el-button>
								<el-button @click="newName = false" type="text" style="color: #B5C0FF;">取消</el-button>
							</span>
						</el-dialog>
					</div>
				</div>
				<div>
					<el-row :gutter="24">
						<el-col :span="4">
							<p>上传音频</p>
						</el-col>
						<el-col :span="16" style="text-align: left;">
							<el-upload class="upload-demo" accept=".mp3,.wma,.ape,.wav,.midi" :show-file-list="showFile" :http-request="uploadAudio" action="#" :before-upload="beforeAvatarAudio" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemoveAudio" :on-exceed="handleExceedAudio" multiple :limit="3" :file-list="fileAudio">
								<div class="upload">
									<el-button type="primary" class="materials">选择音频</el-button>
									<div slot="tip" class="el-upload__tip">
										<p>1.音频文件格式支持：mp3,wma,ape,wav,midi</p>
										<p>2.最大不超过500M</p>
										<p>4.最多上传3个音频</p>
									</div>
								</div>
							</el-upload>
						</el-col>
					</el-row>
					<div class="uploadImg" style="margin-bottom: 4%;">
						<el-row :gutter="24" v-for="(item,key) in fileAudio">
							<el-col :span="14" style="text-align: left;margin-left: 6%;">
								<p style="font-size: 12px;line-height: 28px;">{{item.name}}</p>
							</el-col>
							<el-col :span="8">
								<el-button type="text" size="mini" @click="deleteName(item)">删除</el-button>
								<el-button type="text" size="mini" @click="editName(item)">编辑</el-button>
							</el-col>
						</el-row>

						<el-dialog title="删除" :visible.sync="deletes" width="50%" center>
							<p>确定移除{{deletesName}}吗？</p>
							<span slot="footer" class="dialog-footer">
								<el-button type="primary" @click="finishedDelete">完成</el-button>
								<el-button @click="deletes = false" type="text" style="color: #B5C0FF;">取消</el-button>
							</span>
						</el-dialog>

						<el-dialog title="请输入新的文件名" :visible.sync="newName" width="50%" center>
							<el-row :gutter="24">
								<el-col :span="24" style="padding: 0 10%;">
									<el-input v-model="ruleForm.title"></el-input>
								</el-col>
							</el-row>
							<span slot="footer" class="dialog-footer">
								<el-button type="primary" @click="finishedEdit">完成</el-button>
								<el-button @click="newName = false" type="text" style="color: #B5C0FF;">取消</el-button>
							</span>
						</el-dialog>
					</div>
				</div>
				<div>
					<el-row :gutter="24">
						<el-col :span="4">
							<p>上传图片</p>
						</el-col>
						<el-col :span="16" style="text-align: left;">
							<el-upload class="upload-demo" accept=".jpg,.png,.jpeg,.gif" :show-file-list="showFile" :http-request="uploadImage" action="#" :before-upload="beforeAvatarImage" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemoveImage" :on-exceed="handleExceedImage" multiple :limit="1" :file-list="fileImage">
								<div class="upload">
									<el-button type="primary" class="materials">选择图片</el-button>
									<div slot="tip" class="el-upload__tip">
										<p>1.图片格式支持：jpg,png,jpeg,gif</p>
										<p>2.最大不超过500M</p>
										<p>3.最多上传1个图片</p>
									</div>
								</div>
							</el-upload>
						</el-col>
					</el-row>
					<div class="uploadImg" style="margin-bottom: 4%;">
						<el-row :gutter="24" v-for="(item,key) in fileImage">
							<el-col :span="14" style="text-align: left;margin-left: 6%;">
								<p style="font-size: 12px;line-height: 28px;">{{item.name}}</p>
							</el-col>
							<el-col :span="8">
								<el-button type="text" size="mini" @click="deleteName(item)">删除</el-button>
								<el-button type="text" size="mini" @click="editName(item)">编辑</el-button>
							</el-col>
						</el-row>

						<el-dialog title="删除" :visible.sync="deletes" width="50%" center>
							<p>确定移除{{deletesName}}吗？</p>
							<span slot="footer" class="dialog-footer">
								<el-button type="primary" @click="finishedDelete">完成</el-button>
								<el-button @click="deletes = false" type="text" style="color: #B5C0FF;">取消</el-button>
							</span>
						</el-dialog>

						<el-dialog title="请输入新的文件名" :visible.sync="newName" width="50%" center>
							<el-row :gutter="24">
								<el-col :span="24" style="padding: 0 10%;">
									<el-input v-model="newsName"></el-input>
								</el-col>
							</el-row>
							<span slot="footer" class="dialog-footer">
								<el-button type="primary" @click="finishedEdit">完成</el-button>
								<el-button @click="newName = false" type="text" style="color: #B5C0FF;">取消</el-button>
							</span>
						</el-dialog>
					</div>
				</div>
				<div>
					<el-button type="primary" @click="submitForm">上一步，填写课程信息</el-button>
					<el-button type="primary" @click="submit('ruleForm')">上传课程 提交审核</el-button>
				</div>
			</div>
		</div>
		
		<el-dialog title="提示" :visible.sync="prompt" width="50%" center>
			<p>是否保存该课程内容？</p>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="finished">完成</el-button>
				<el-button @click="prompt = false" type="text" style="color: #B5C0FF;">取消</el-button>
			</span>
		</el-dialog>
		
	</div>
</template>

<script>
	let id = 1000;

	export default {
		data() {
			return {
				label: '',
				id: '',
				addLabel: '',
				newChapter: false, //新建章节
				chapterName: '', //新建章名称
				batchCreation: false, //批量创建
				exitClass: false, //编辑章节名称
				deleteClass: false, //删除章节名称
				addClass: false, //添加节
				newName: false, //取消编辑新的文件名
				deletes: false, //删除文件
				deletesName: '', //删除文件名称
				isShow: false,
				prompt:false,//提示是否保存
				value: '',
				chapter: [
					{value: 1,label: '1'},
					{value: 2,label: '2'},
					{value: 3,label: '3'},
					{value: 4,label: '4'},
					{value: 5,label: '5'},
					{value: 6,label: '6'},
					{value: 7,label: '7'},
					{value: 8,label: '8'},
					{value: 9,label: '9'},
					{value: 10,label: '10'}
				],
				values: '',
				chapClass: [
					{value: 1,label: '1'},
					{value: 2,label: '2'},
					{value: 3,label: '3'},
					{value: 4,label: '4'},
					{value: 5,label: '5'},
					{value: 6,label: '6'},
					{value: 7,label: '7'},
					{value: 8,label: '8'},
					{value: 9,label: '9'},
					{value: 10,label: '10'}
				],
				data: [],
				datas: [],
				nodes: {},
				showFile: false,
				fileList: [],
				fileVideo: [],
				fileAudio: [],
				fileImage: [],
				uid: '', //当前文件id
				ruleForm: {},
				formArr: [],
				res: [],
				deleteId:'',
				addId:'',
				newsName:'',
				rules: {
					//					name: [{
					//							required: true,
					//							message: '请选择课程分类',
					//							trigger: 'change'
					//						},
					//					],
				}
			}
		},
		created() {
			if(this.$route.query.id) {
				this.course_chapters()
			}
		},
		methods: {
			//			点击显示右侧
			labelShow(node) {
				this.nodes = node;
				this.id = node.key;
				this.label = node.label;
				if(node.data.isFirstLabel == true) {
					this.isShow = false;
				} else {
					this.fileList = [];
					this.fileVideo = [];
					this.fileAudio = [];
					this.fileImage = [];
					this.couseItem();
					this.isShow = true;
					console.log(this.formArr)
					if(this.formArr.length != 0){
						this.prompt = true;
					}
					
				}
			},
//			切换确认保存
			finished(){
				let that = this;
//				新增时上传
				this.formArr.forEach(function(item, index) {
					that.fileImage.forEach(function(items, index) {
						if(item.uid == items.uid) {
							item.title = items.name;
						}
					})
				})
				this.$api.CourseApi.courseSections(this.id,this.formArr,result => {
					console.log(result)
					if(result.success == true){
						this.prompt = false;
						this.couseItem();
						this.formArr = [];
					}else{
						return false
					}
				})
			},
			couseItem() {
				this.$api.CourseApi.course_items(this.id, result => {
					if(result.success == true) {
						console.log(result)
						this.res = result.data.courseItemDtoList;							
						let that = this;
						this.res.forEach(function(item, index) {
							console.log(item)
							if(item.type == 10) {
								let arr = [];
								arr.push(item);
								that.fileList = arr;
							} else if(item.type == 20) {
								let arr = [];
								arr.push(item);
								that.fileVideo = arr;
							} else if(item.type == 30) {
								let arr = [];
								arr.push(item);
								that.fileAudio = arr;
							} else {
								let arr = [];
								arr.push(item);
								that.fileImage = arr;
							}
						})
						
					}
				})
			},
			//			编辑新的文件名
			editName(item) {
				console.log(item)
				if(item.id){
					this.addId = item.id;
					this.newsName = item.name;
				}else{
					this.addId = '';
					this.uid = item.uid;
					this.newsName = item.name;
				}
				this.newName = true;
				
			},
			//			确认编辑
			finishedEdit() {
				console.log(this.addId)
				if(this.addId != ''){
					let courseItemDto = {
						name:this.newsName
					};
					this.$api.CourseApi.course_item(this.addId, courseItemDto, result => {
						if(result.success == true) {
							console.log(result);
							this.newName = false;
							this.couseItem();
						}
					})
				}else{
					let that = this;
					let fileList = this.fileList;
					let fileVideo = this.fileVideo;
					let fileAudio = this.fileAudio;
					let fileImage = this.fileImage;
					
					if(fileList.length != 0){
						fileList.forEach(function(item,index){
							if(item.uid == that.uid){
								item.name = that.newsName
							}
						})
					}else if(fileVideo.length != 0){
						fileVideo.forEach(function(item,index){
							if(item.uid == that.uid){
								item.name = that.newsName
							}
						})
					}else if(fileAudio.length != 0){
						fileAudio.forEach(function(item,index){
							if(item.uid == that.uid){
								item.name = that.newsName
							}
						})
					}else{
						fileImage.forEach(function(item,index){
							if(item.uid == that.uid){
								item.name = that.newsName
							}
						})
					}
					this.newName = false;
				}
			},
			//删除文件
			deleteName(item) {
				console.log(item);
				this.items = item;
				this.deletesName = item.name;
				this.deletes = true;
				if(item.id){
					this.deleteId = item.id;
				}else{
					this.deleteId = '';
					this.uid = item.uid;
				}
			},
			//			确认删除文件
			finishedDelete() {
				if(this.deleteId != ''){
					this.$api.CourseApi.courseItem(this.deleteId, result => {
						if(result.success == true) {
							this.fileList = [];
							this.fileVideo = [];
							this.fileAudio = [];
							this.fileImage = [];
							this.couseItem();
							this.deletes = false;
							
						}
					})			
				}else{
					let that = this;
					let fileList = this.fileList;
					let fileVideo = this.fileVideo;
					let fileAudio = this.fileAudio;
					let fileImage = this.fileImage;
					
					if(fileList.length != 0){
						fileList.forEach(function(item,index){
							if(item.uid == that.uid){
								let index = fileList.indexOf(that.items);
								fileList.splice(index);	
							}
						})
					}else if(fileVideo.length != 0){
						fileVideo.forEach(function(item,index){
							if(item.uid == that.uid){
								let index = fileVideo.indexOf(that.items);
								fileVideo.splice(index);	
							}
						})
					}else if(fileAudio.length != 0){
						fileAudio.forEach(function(item,index){
							if(item.uid == that.uid){
								let index = fileAudio.indexOf(that.items);
								fileAudio.splice(index);	
							}
						})
					}else{
						fileImage.forEach(function(item,index){
							if(item.uid == that.uid){
								let index = fileImage.indexOf(that.items);
								fileImage.splice(index);	
							}
						})
					}
					
					this.deletes = false;
					
				}
				
				
			},
			//			新建章节
			chapters() {
				let form = {
					chapterName: this.chapterName
				};
				this.$api.CourseApi.course_chapter(this.$route.query.id, form, result => {
					if(result.success == true) {
						this.newChapter = false;
						this.chapterName = '';
						this.course_chapters();
					}
				})
			},
			//			显示所有章节
			course_chapters() {
				this.$api.CourseApi.course_chapters(this.$route.query.id, result => {
					console.log(result)
					if(result.success == true) {
						this.data = result.data.chapterSectionDtoList
					}
				})
			},
			//			批量创建
			create() {
				this.batchCreation = false;
				for(let i = 1; i <= this.value; i++) {
					var newChild1 = {};
					newChild1.label = `课程章节${i}`;
					newChild1.children = [];
					newChild1.isFirstLabel = true;
					for(let y = 1; y <= this.values; y++) {
						var newChild2 = {};
						newChild2.label = `课时${y}`;
						newChild2.isFirstLabel = false;
						newChild1.children.push(newChild2);
					}
					this.datas.push(newChild1);
				}
				this.$api.CourseApi.chapterSections(this.$route.query.id, this.datas, result => {
					console.log(result)
					//					this.data = result.data.courseChapterSectionDtos
					this.course_chapters();
				})
			},
			//			编辑章节名称
			edit(node) {
				this.nodes = node;
				this.id = node.key;
				this.label = node.label;
				this.exitClass = true;
			},
			//			确认编辑章节名称
			confirmEdit() {
				if(this.nodes.data.isFirstLabel == true) {
					let form = {
						chapterName: this.label
					};
					this.$api.CourseApi.courseChapter(this.id, form, result => {
						if(result.success == true) {
							this.exitClass = false;
							this.course_chapters();
						}
					})
				} else {
					let form = {
						title: this.label
					};
					this.$api.CourseApi.course_section(this.id, form, result => {
						if(result.success == true) {
							this.exitClass = false;
							this.course_chapters();
						}
					})
				}
			},
			//			删除章节名称
			detele(node) {
				this.nodes = node;
				this.id = node.key;
				this.label = node.label;
				this.deleteClass = true;
			},
			//			确定删除章节名称
			confirmDelete(node) {
				if(this.nodes.data.isFirstLabel == true) {
					this.$api.CourseApi.course_Chapter(this.id, result => {
						if(result.success == true) {
							this.deleteClass = false;
							this.course_chapters();
						}
					})
				} else {
					this.$api.CourseApi.course_Section(this.id, result => {
						if(result.success == true) {
							this.deleteClass = false;
							this.course_chapters();
						}
					})
				}

			},
			//			添加节
			adds(node) {
				this.id = node.key;
				this.label = node.label;
				this.addClass = true;
			},
			//			确认添加节
			confirmAdd() {
				let form = {
					title: this.addLabel,
					courseId: this.$route.query.id
				};
				this.$api.CourseApi.courseSection(this.id, form, result => {
					if(result.success == true) {
						this.addClass = false;
						this.course_chapters();
						this.addLabel = '';
					}
				})
			},
			//			获取新创建的id(上一个页面)
			getParams() {
				let routerParams = this.$route.query.id
				console.log(routerParams)
			},
			upload(file) {
				const uuidv1 = require('uuid/v1');
				let filename = file.file.type + "/" + uuidv1(); // ⇨ '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e'

				let OSS = require('ali-oss');
				let client = new OSS({
					region: 'oss-cn-beijing',
					accessKeyId: 'LTAIZsHOKiz23lz7',
					accessKeySecret: 'f3T9brhGBYiZuXBrG8giojj6ixesbg',
					bucket: 'tskedu-course'
				});

				async function multipartUpload() {
					try {
						let result = await client.multipartUpload(filename, file.file, {
							progress: async function(p) {
								//					      console.log('Progress: ' + p);
							},
							meta: {
								year: 2018,
								people: 'test'
							},
							mime: file.file.type
						});
						let head = await client.head(filename);
						return head;

					} catch(e) {
						// 捕获超时异常
						if(e.code === 'ConnectionTimeoutError') {
							console.log("Woops,超时啦!");
							// do ConnectionTimeoutError operation
						}
						//				    console.log(e);
					}
				}

				const progress = async function progress(p, checkpoint) {
					console.log(p)
				};

				let type = file.file.type;
				let types = type.split('/');
				if(types[0] == 'image') {
					this.fileImage.push({
						name: file.file.name,
						uid: file.file.uid
					})
					this.ruleForm.title = file.file.name;
					this.ruleForm.suffixName = types[1];
				} else if(types[0] == 'video') {
					this.fileVideo.push({
						name: file.file.name,
						uid: file.file.uid
					})
					this.ruleForm.title = file.file.name;

				} else if(types[0] == 'audio') {
					this.fileAudio.push({
						name: file.file.name,
						uid: file.file.uid
					})
					this.ruleForm.title = file.file.name;

				} else {
					this.fileList.push({
						name: file.file.name,
						uid: file.file.uid
					})
					this.ruleForm.title = file.file.name;

				}

				multipartUpload().then(result => {
					let form = {};
					console.log(file)
					let type = file.file.type;
					let types = type.split('/');
					if(types[0] == 'image') {
						form.nodeType = 40;
						form.suffixName = types[1];
						this.fileImage.forEach(function(item, index) {
							form.title = item.name;
							form.uid = item.uid;
						})
					} else if(types[0] == 'video') {
						form.nodeType = 20;
						form.suffixName = types[1];
						this.fileVideo.forEach(function(item, index) {
							form.title = item.name;
							form.uid = item.uid;
						})
					} else if(types[0] == 'audio') {
						form.nodeType = 30;
						form.suffixName = types[1];
						this.fileAudio.forEach(function(item, index) {
							form.title = item.name;
							form.uid = item.uid;
						})
					} else {
						form.nodeType = 10;

						let suff = file.file.name;
						let suffIndex = suff.lastIndexOf(".");
						let suffindex1 = suff.length;
						let suffixName = suff.substring(suffIndex + 1, suffindex1)
						form.suffixName = suffixName;
						this.fileList.forEach(function(item, index) {
							form.title = item.name;
							form.uid = item.uid;
						})
					}
					let headPic = result.res.requestUrls;
					headPic.forEach(function(item, index) {
						form.filePath = item;
					})
					this.formArr.push(form)
				});
			},
			//			上传课件
			uploadCourseware(file) {
				this.upload(file);
			},
			//			上传视频
			uploadVideo(file) {
				this.upload(file);
			},
			//			上传音频
			uploadAudio(file) {
				this.upload(file);
			},
			//			上传图片
			uploadImage(file) {
				this.upload(file);
			},
			//			文件移除时
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			//			点击文件列表中已上传的文件
			handlePreview(file) {
				console.log(file);
			},
			//			上一步
			submitForm() {
				this.$router.push({
					path: '/shiftEditing'
				})
			},
			//			上传提交
			submit(formName) {
				let that = this;
//				新增时上传
				this.formArr.forEach(function(item, index) {
					that.fileImage.forEach(function(items, index) {
						if(item.uid == items.uid) {
							item.title = items.name;
						}
					})
				})
//				编辑时上传
//				let form = this.res.map(function(item){
//					return{
//						nodeType:item.type,
//						title:item.name,
//						filePath:item.filePath,
//						suffixName:item.suffixName,
//						uid:item.uid
//					}
//				})
//				let data;
//				if(form.length == 0){
//					data = this.formArr;
//				}else if(this.formArr == 0){				
//					data = form;
//				}else{
//					var forms = form.concat(this.formArr)								
//					data = forms;
//				}
				if(this.formArr.length == 0){
					this.$router.push({
						path: '/curriculumCenter'
					})
				}else{
					this.$api.CourseApi.courseSections(this.id,this.formArr,result => {
						console.log(result)
						if(result.success == true){
							this.$router.push({
								path: '/curriculumCenter'
							})
						}else{
							return false
						}
					})
				}
			},
			//			文件超出个数限制时
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 5个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			handleExceedAudio(files, fileList) {
				this.$message.warning(`当前限制选择 3个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			handleExceedImage(files, fileList) {
				this.$message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			//			删除文件之前
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			beforeRemoveVideo(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			beforeRemoveAudio(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			beforeRemoveImage(file, fileList) {
				console.log(fileList)
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			//			上传文件之前
			beforeAvatarUpload(file) {
				var fileName = new Array();
				fileName = file.name.split('.');
				const extension = fileName[fileName.length - 1] === 'doc';
				const extension2 = fileName[fileName.length - 1] === 'docx';
				const extension3 = fileName[fileName.length - 1] === 'ppt';
				const extension4 = fileName[fileName.length - 1] === 'pptx';
				const extension5 = fileName[fileName.length - 1] === 'xls';
				const extension6 = fileName[fileName.length - 1] === 'xlsx';
				const extension7 = fileName[fileName.length - 1] === 'pdf';

				const isLt2M = file.size / 1024 / 1024 < 50;
				if(!extension && !extension2 && !extension3 && !extension4 && !extension5 && !extension6 && !extension7) {
					this.$message({
						message: '上传模板只能是doc、docx、ppt、pptx、xls、xlsx、pdf格式!',
						type: 'warning'
					})

				}
				if(!isLt2M) {
					this.$message({
						message: '上传课件大小不能超过50M',
						type: 'warning'
					})
				}
				if(extension || extension2 || extension3 || extension4 || extension5 || extension6 || extension7 && isLt2M == true) {

				}
			},
			beforeAvatarVideo(file) {
				var fileName = new Array();
				fileName = file.name.split('.');
				const extension = fileName[fileName.length - 1] === 'flv';
				const extension2 = fileName[fileName.length - 1] === 'f4v';
				const extension3 = fileName[fileName.length - 1] === 'mp4';
				const extension4 = fileName[fileName.length - 1] === 'm3u8';

				const isLt2M = file.size / 1024 / 1024 < 500;
				if(!extension && !extension2 && !extension3 && !extension4) {
					this.$message({
						message: '视频文件格式支持：flv,f4v,mp4,m3u8!',
						type: 'warning'
					})

				}
				if(!isLt2M) {
					this.$message({
						message: '上传视频大小不能超过500M',
						type: 'warning'
					})
				}
			},
			beforeAvatarAudio(file) {
				var fileName = new Array();
				fileName = file.name.split('.');
				const extension = fileName[fileName.length - 1] === 'mp3';
				const extension2 = fileName[fileName.length - 1] === 'wma';
				const extension3 = fileName[fileName.length - 1] === 'ape';
				const extension4 = fileName[fileName.length - 1] === 'wav';
				const extension5 = fileName[fileName.length - 1] === 'midi';
				const isLt2M = file.size / 1024 / 1024 < 500;
				if(!extension && !extension2 && !extension3 && !extension4 && !extension5) {
					this.$message({
						message: '音频文件格式支持：mp3,wma,ape,wav,midi!',
						type: 'warning'
					})

				}
				if(!isLt2M) {
					this.$message({
						message: '上传音频大小不能超过500M',
						type: 'warning'
					})
				}
			},
			beforeAvatarImage(file) {
				var fileName = new Array();
				fileName = file.name.split('.');
				const extension = fileName[fileName.length - 1] === 'jpg';
				const extension2 = fileName[fileName.length - 1] === 'png';
				const extension3 = fileName[fileName.length - 1] === 'jpeg';
				const extension4 = fileName[fileName.length - 1] === 'gif';
				const isLt2M = file.size / 1024 / 1024 < 500;
				if(!extension && !extension2 && !extension3 && !extension4) {
					this.$message({
						message: '图片文件格式支持：jpg,png,jpeg,gif!',
						type: 'warning'
					})

				}
				if(!isLt2M) {
					this.$message({
						message: '上传图片大小不能超过500M',
						type: 'warning'
					})
				}
			},
		},
		watch: {
			// 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
			'$route': 'getParams'
		}

	}
</script>

<style>
	.shift {
		margin: auto;
		margin-top: 30px;
		background: #FFFFFF;
		width: 70%;
	}
	
	.list {
		margin: 0 4%;
		min-height: 60px;
		line-height: 60px;
		border-bottom: 1px solid #E0E0DD;
		text-align: left;
	}
	
	.cont {
		display: flex;
		padding: 2%;
	}
	
	.demo-ruleForm {
		margin: auto;
		width: 60%;
	}
	
	.upload {
		display: flex;
	}
	
	.el-upload__tip p {
		margin-top: 0;
		margin-left: 10px;
		color: rgba(0, 0, 0, 0.54);
		font-size: 12px;
		line-height: 1.5;
		text-align: left;
	}
	
	.materials {
		background: #3DC1FF;
		height: 50px;
	}
	
	.materials:hover {
		background: #3DC1FF;
		height: 50px;
	}
	
	.materials:focus {
		background: #3DC1FF;
		height: 50px;
	}
	
	.previous {
		background: #cfcfcf;
	}
	
	.previous:hover {
		background: #cfcfcf;
	}
	
	.previous:focus {
		background: #cfcfcf;
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
	
	.el-tree-node__content {
		height: 40px;
		border-bottom: 1px solid #EDEFFB;
	}
</style>