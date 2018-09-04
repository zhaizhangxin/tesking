<template>
		
		<el-main style="padding: 0;"> 
			
			<div class="certs">
				<el-row>
					<el-col :span="24">
						<p>章节内容</p>
					</el-col>
				</el-row>
				<div class="line"></div>
				<el-row style="width: 80%;margin: auto;" class="el_row">
					<el-col :span="24">
						<span style="color: #001380;">教学模式</span>
						<el-radio class="suff" v-model="radio" label="1" style="margin-left: 4%;">开放学习</el-radio>
						<el-radio class="suff" v-model="radio" label="2">传统学习</el-radio>
						<el-radio class="suff" v-model="radio" label="3">顺序学习</el-radio>
						<el-radio class="suff" v-model="radio" label="4">条件闯关</el-radio>
						<el-button type="primary" style="float: right;">发布</el-button>
					</el-col>
				</el-row>
				
				<div class="line"></div>
				
				<!--添加节-->
				<el-dialog title="添加节" :visible.sync="selections" width="50%" center>
					<el-form :model="addSections">
						<el-form-item>
							<el-row :gutter="24">
								<el-col :span="4" style="text-align: right;">
									<p>所属章</p>
								</el-col>
								<el-col :span="16">
									<el-select v-model="addSections.selectOption" placeholder="请选择" style="width: 100%;">
										<el-option v-for="item in selectOptions" :key="item.id" :label="item.label" :value="item.id"></el-option>								
									</el-select>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<el-row :gutter="24">
								<el-col :span="4" style="text-align: right;">
									<p>节标题</p>
								</el-col>
								<el-col :span="16">
									<el-input v-model="addSections.title"></el-input>								
								</el-col>
							</el-row>
						</el-form-item>
					</el-form>
					
					
					<div slot="footer" style="text-align: center;">
						<el-button type="primary">确定</el-button>
						<el-button type="text" @click="selections = false" style="color: #999999;">取消</el-button>
					</div>
				</el-dialog>
				
				<el-row style="width: 80%;margin: auto;">
					<el-col :span="24">
						<el-button class="prim" type="primary" @click="chapter = true">添加章</el-button>
						<el-button class="prim" type="primary" style="margin-left: 0;" @click="selections = true">添加节</el-button>
						<div style="display: inline-block;position: relative;">
							<el-button class="prim" type="primary" @click="addArrow">
								添加内容<i class="el-icon-arrow-down el-icon--right"></i>
							</el-button>
							<ul class="prims" v-if="primShow">
								<li @click="videoSection">视频</li>
								<li @click="testSection">测验</li>
								<li>作业</li>
								<li @click="discussSection">讨论</li>
								<li @click="courseSelect">课件</li>
								<li style="border-bottom: 0;">页面</li>
							</ul>
						</div>
						<div class="demo">
							<span style="font-size: 14px;">筛选：</span>
							<el-select v-model="value" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</div>
					</el-col>
				</el-row>
				
				<!--添加视频（章里面添加视频）-->
				<el-dialog title="添加视频" :visible.sync="addVideoChapter" width="50%" center>
					<el-form :model="videoForm">
						<el-form-item>
							<el-row :gutter="24">
								<el-col :span="3" style="text-align: right;">所属章</el-col>
								<el-col :span="8">
									<el-select v-model="videoForm.videoValue" placeholder="点击选择">
										<el-option v-for="item in videoOptions" :key="item.id" :label="item.label" :value="item.id"></el-option>
									</el-select>
								</el-col>
								<el-col :span="3" style="text-align: right;">所属节</el-col>
								<el-col :span="8">
									<el-select v-model="videoForm.videoSelect" placeholder="点击选择">
										<el-option v-for="item in videoOption" :key="item.id" :label="item.label" :value="item.id"></el-option>
									</el-select>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<el-row :gutter="24">
								<el-col :span="3" style="text-align: right;">视频标题</el-col>
								<el-col :span="19">
									<el-input v-model="videoForm.title"></el-input>
									<p style="color: #bec2c9;font-size: 12px;">建议命名格式，如：“第一讲 计算机基础知识”</p>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<el-row :gutter="24">
								<el-col :span="3" style="text-align: right;">添加视频</el-col>
								<el-col :span="19" style="text-align: left;">
									<el-button type="primary" @click="addVideo">添加视频</el-button>
									<p style="display: inline-block;color: #bec2c9;font-size: 12px;">仅支持单个视频</p>
									
									<el-checkbox-group v-model="videoForm.checkList">
										<el-checkbox label="1">片头</el-checkbox>
										<el-checkbox label="2">片尾</el-checkbox>
										<el-checkbox label="3">LOGO</el-checkbox>
									</el-checkbox-group>
								</el-col>
							</el-row>
						</el-form-item>
						
					</el-form>
					<div slot="footer" style="text-align: center;">
						<el-button type="primary">确定</el-button>
						<el-button type="text" @click="addVideoChapter = false" style="color: #999999;">取消</el-button>
					</div>
				</el-dialog>
				<!--添加视频按钮-->
				<el-dialog title="添加视频" :visible.sync="add_Video" width="50%" center>
					<el-tabs>
						<el-tab-pane label="资源库导入">
							<div style="text-align: center;margin-bottom: 2%;">
								<el-cascader width="60%" :options="optionsValue" v-model="selectedOptions" @change="handleChange"></el-cascader>																
							</div>
							
							<el-tree :data="treeDate" show-checkbox node-key="id" :expand-on-click-node="false">
								<span class="custom-tree-node" slot-scope="{node,data}">
									<span>{{node.label}}</span>
									<span>
										<el-button type="text" style="color: #101010;">{{node.times}}</el-button>
									</span>
								</span>
							</el-tree>
						</el-tab-pane>
						<el-tab-pane label="手动添加">
							<div style="display: flex;justify-content: space-around;">
								<div style="width: 40%;">
									<el-button type="primary" style="margin-top: 10%;">上传视频</el-button>
									<p style="margin-top: 2%;color: #999999;font-size: 12px;">请上传格式为mp4或flv格式，且小于2GB的视频</p>
									<el-button type="primary" style="margin-top: 10%;">上传视频字幕</el-button>
									<p style="margin-top: 2%;margin-bottom: 10%;color: #999999;font-size: 12px;">请上传str格式的字幕</p>
								</div>
								<div style="width: 40%;">
									<div class="videos"></div>
									<p style="margin-top: 2%;width: 90%;text-align: center;color: #999999;font-size: 12px;">视频预览</p>
								</div>
							</div>
						</el-tab-pane>
					</el-tabs>
					<div slot="footer" style="text-align: center;">
						<el-button type="primary" @click="finishVideo">确定</el-button>
						<el-button type="text" @click="exitVideo" style="color: #999999;">取消</el-button>
					</div>
				</el-dialog>
				
				<!--添加测验（章里面添加）-->
				<el-dialog title="添加测验" :visible.sync="addTestChapter" width="50%" center>
					<el-form :model="testChapter">
						<el-form-item>
							<el-row :gutter="24">
								<el-col :span="3" style="text-align: right;">所属章</el-col>
								<el-col :span="8">
									<el-select v-model="testChapter.videoValue" placeholder="点击选择">
										<el-option v-for="item in videoOptions" :key="item.id" :label="item.label" :value="item.id"></el-option>
									</el-select>
								</el-col>
								<el-col :span="3" style="text-align: right;">所属节</el-col>
								<el-col :span="8">
									<el-select v-model="testChapter.videoSelect" placeholder="点击选择">
										<el-option v-for="item in videoOption" :key="item.id" :label="item.label" :value="item.id"></el-option>
									</el-select>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<el-row :gutter="24">
								<el-col :span="3" style="text-align: right;">测验标题:</el-col>
								<el-col :span="19">
									<el-input v-model="testChapter.title"></el-input>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<el-row :gutter="24">
								<el-col :span="3" style="text-align: right;">添加题目:</el-col>
								<el-col :span="6" style="text-align: left;">
									<el-button type="primary" @click="addText">添加题目</el-button>
								</el-col>
							</el-row>
						</el-form-item>
					</el-form>
					<div slot="footer" style="text-align: center;">
						<el-button type="primary">确定</el-button>
						<el-button type="text" @click="addTestChapter = false" style="color: #999999;">取消</el-button>
					</div>
				</el-dialog>
				<!--添加题目按钮-->
				<el-dialog title="添加测验" :visible.sync="add_Test" width="50%" center>
					<el-tabs>
						<el-tab-pane label="题库导入">
							<el-cascader width="60%" :options="optionsValue" v-model="selectedOptions" @change="handleChange"></el-cascader>																
							
							<el-tree :data="treeDate" style="margin-top: 2%;" show-checkbox node-key="id" :expand-on-click-node="false">
								<span class="custom-tree-node" slot-scope="{node,data}">
									<span>{{node.label}}</span>
									<span>
										<el-button type="text" style="color: #101010;">{{node.times}}</el-button>
									</span>
								</span>
							</el-tree>
						</el-tab-pane>
						<el-tab-pane label="手动添加">
							<div style="display: flex;justify-content: space-around;">
								<el-button type="primary" @click="question">创建单选题</el-button>
								<el-button type="primary" @click="questions">创建多选题</el-button>
								<el-button type="primary" @click="judgment">创建判断题</el-button>
							</div>
							<div style="margin-top: 2%;">
								<p>{{title}}</p>
							</div>
						</el-tab-pane>
					</el-tabs>
					<div slot="footer" style="text-align: center;">
						<el-button type="primary" @click="finishText">确定</el-button>
						<el-button type="text" @click="exitText" style="color: #999999;">取消</el-button>
					</div>
				</el-dialog>
				<!--添加作业-->
				<el-dialog title="添加作业" :visible.sync="addJobChapter" width="50%" center>
					<!--<el-form :model="jobForm">
						<el-form-item>
							<el-row :gutter="24">
								<el-col :span="3" style="text-align: right;">所属章:</el-col>
								
							</el-row>
						</el-form-item>
					</el-form>-->
					<div slot="footer" style="text-align: center;">
						<el-button type="primary">确定</el-button>
						<el-button type="text" @click="addJobChapter = false" style="color: #999999;">取消</el-button>
					</div>
				</el-dialog>
				<!--添加讨论-->
				<el-dialog title="添加讨论" :visible.sync="addDiscussChapter" width="50%" center>
					<el-form :model="discussForm">
						<el-form-item>
							<el-row :gutter="24">
								<el-col :span="3" style="text-align: right;">所属章:</el-col>
								<el-col :span="8">
									<el-select v-model="discussForm.videoValue" placeholder="点击选择">
										<el-option v-for="item in videoOptions" :key="item.id" :label="item.label" :value="item.id"></el-option>
									</el-select>
								</el-col>
								<el-col :span="3" style="text-align: right;">所属节:</el-col>
								<el-col :span="8">
									<el-select v-model="discussForm.videoSelect" placeholder="点击选择">
										<el-option v-for="item in videoOption" :key="item.id" :label="item.label" :value="item.id"></el-option>
									</el-select>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<el-row :gutter="24">
								<el-col :span="3" style="text-align: right;">讨论标题:</el-col>
								<el-col :span="19">
									<el-input v-model="discussForm.title"></el-input>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<el-row :gutter="24">
								<el-col :span="3" style="text-align: right;">讨论内容:</el-col>
								<el-col :span="19">
									<div class='tinymce'>
										<editor class="editor" v-model="discussForm.courseIntroduction" :setting="editorSetting" @input="(content)=> content = content"></editor>
									</div>
								</el-col>
							</el-row>
						</el-form-item>
						<el-collapse v-model="activeDiscuss" style="margin: auto;width: 98%;">
							<el-collapse-item title="高级设置" name="1">
								<el-form-item>
									<el-row :gutter="24">
										<el-col :span="4" style="text-align: right;">开始提交:</el-col>
										<el-col :span="8">
											<el-date-picker style="width: 100%;" v-model="discussForm.valueDate" type="date" placeholder="请选择开始日期"></el-date-picker>
										</el-col>
										<el-col :span="4" style="text-align: right;">截止提交:</el-col>
										<el-col :span="8">
											<el-date-picker style="width: 100%;" v-model="discussForm.valueEndDate" type="date" placeholder="请选择截止时间"></el-date-picker>
										</el-col>
									</el-row>
								</el-form-item>
								<el-form-item> 
									<el-row :gutter="24">
										<el-col :span="4" style="text-align: right;">成绩公布:</el-col>
										<el-col :span="8">
											<el-date-picker style="width: 100%;" v-model="discussForm.valueStartDate" type="date" placeholder="请选择成绩公布时间"></el-date-picker>
										</el-col>
									</el-row>
								</el-form-item>
							</el-collapse-item>
						</el-collapse>
					</el-form>
					<div slot="footer" style="text-align: center;">
						<el-button type="primary">确定</el-button>
						<el-button type="text" @click="addDiscussChapter = false" style="color: #999999;">取消</el-button>
					</div>
				</el-dialog>
				<!--添加课件（章里面添加）-->
				<el-dialog title="添加课件" :visible.sync="courseware" width="50%" center>
					<el-form :model="courseForm">
						<el-form-item>
							<el-row :gutter="24">
								<el-col :span="3" style="text-align: right;">所属章:</el-col>
								<el-col :span="8">
									<el-select v-model="courseForm.courseValue" placeholder="点击选择">
										<el-option v-for="item in courseOptions" :key="item.id" :label="item.label" :value="item.id"></el-option>
									</el-select>
								</el-col>
								<el-col :span="3" style="text-align: right;">所属节:</el-col>
								<el-col :span="8">
									<el-select v-model="courseForm.courseSelect" placeholder="点击选择">
										<el-option v-for="item in courseOption" :key="item.id" :label="item.label" :value="item.id"></el-option>
									</el-select>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<el-row :gutter="24">
								<el-col :span="3">课件标题:</el-col>
								<el-col :span="19">
									<el-input v-model="courseForm.title" maxlength="30"></el-input>
									<p style="color: #999999;font-size: 12px;">课件标题最多可输入30字</p>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<el-row :gutter="24">
								<el-col :span="3">课件描述:</el-col>
								<el-col :span="19">
									<div class='tinymce'>
										<editor class="editor" v-model="courseForm.courseIntroduction" :setting="editorSetting" @input="(content)=> content = content"></editor>
									</div>			
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<el-row :gutter="24">
								<el-col :span="3">上传附件:</el-col>
								<el-col :span="19" style="text-align: left;">
									<el-button type="primary" @click="add_Course">课程资源导入</el-button>
									<el-button type="primary">手动上传</el-button>
								</el-col>
							</el-row>
						</el-form-item>
					</el-form>
					<div slot="footer" style="text-align: center;">
						<el-button type="primary">确定</el-button>
						<el-button type="text" @click="courseware = false" style="color: #999999;">取消</el-button>
					</div>
				</el-dialog>
				
				<!--课程资源导入按钮-->
				<el-dialog title="添加课件" :visible.sync="coustTest" width="50%" center>
					<div width="100%">
						<el-cascader width="100%" :options="optionsValue" v-model="selectedOptions" @change="handleChange"></el-cascader>						
					</div>
					<el-tree :data="treeDate" style="margin-top: 2%;" show-checkbox node-key="id" :expand-on-click-node="false">
						<span class="custom-tree-node" slot-scope="{node,data}">
							<span>{{node.label}}</span>
							<span>
								<el-button type="text" style="color: #101010;">{{node.times}}</el-button>
							</span>
						</span>
					</el-tree>
					<div slot="footer" style="text-align: center;">
						<el-button type="primary" @click="finishCourse">确定</el-button>
						<el-button type="text" @click="exitCourse" style="color: #999999;">取消</el-button>
					</div>
				</el-dialog>
				
				<div class="line"></div>
				
				<el-collapse v-for="(item,index) in collapseDate" accordion style="width: 80%;margin: auto;border-top: 0;">
					<el-collapse-item>
						<template slot="title" class="first">{{item.title}}</template>
						<div v-for="(collapseItem,collapseKey) in item.collapse" style="padding: 2%;">
							<div style="color: #001380;font-size: 12px;">{{collapseItem.des}}</div>
							<el-row :gutter="24" style="padding: 2%;">
								<el-col :span="2">
									<el-button type="primary" :data-id="collapseId" style="background: #3DC1FF;" @click="plusShow(index,collapseKey)" circle>
										<i class="el-icon-plus" v-show="downIcon"></i>
										<i class="el-icon-close" v-show="!downIcon"></i>
									</el-button>
								</el-col>
								<el-col :span="20" style="text-align: left;">
									<p v-show="downIcon" style="line-height: 38px;color: #3DC1FF;font-size: 12px;">添加新内容</p>
									<el-col :span="24" v-show="!downIcon">
										<el-button type="primary" class="plusButton" style="background: #ff8f93;padding-left: 8px;" circle>视频</el-button>
										<el-button type="primary" class="plusButton" style="background: #95d79a;padding-left: 8px;" circle>测验</el-button>
										<el-button type="primary" class="plusButton" style="background: #91a2ff;padding-left: 8px;" circle>作业</el-button>
										<el-button type="primary" class="plusButton" style="background: #ffd287;padding-left: 8px;" circle>讨论</el-button>
										<el-button type="primary" class="plusButton" style="background: #ff81ac;padding-left: 8px;" circle>课件</el-button>
										<el-button type="primary" class="plusButton" style="background: #81c5ff;padding-left: 8px;" circle>页面</el-button>										
									</el-col>
								</el-col>
							</el-row>	
								
						</div>
						<el-button type="primary" class="hapter" style="width: 62%;" @click="add_section(item.id)">添加节</el-button>
						
					</el-collapse-item>
				</el-collapse>
				
				<div class="line"></div>
				
				<el-button type="primary" class="hapter" @click="chapter = true">添加章</el-button>
				
				<el-dialog title="添加章" :visible.sync="chapter" width="50%" center>
					<el-row :gutter="24">
						<el-col :span="24" style="padding: 0 10%;">
							<el-input placeholder="请输入要添加的章标题" v-model="addChapter"></el-input>
						</el-col>
					</el-row>
					<div slot="footer" style="text-align: center;">
						<el-button type="primary">确定</el-button>
						<el-button type="text" @click="chapter = false" style="color: #999999;">取消</el-button>
					</div>
				</el-dialog>
				<!--添加节(每章里面的添加)-->
				<el-dialog title="添加节" :visible.sync="section" width="50%" center>
					<el-row :gutter="24">
						<el-col :span="24" style="padding: 0 10%;">
							<el-input placeholder="请输入要添加的节名称" v-model="addSection"></el-input>						
						</el-col>
					</el-row>
					<div slot="footer" style="text-align: center;">
						<el-button type="primary" @click="finishedSection">确定</el-button>
						<el-button type="text" @click="section = false" style="color: #999999;">取消</el-button>
					</div>
				</el-dialog>
				
			</div>
			
		</el-main>
</template>
<script>
	import editor from '@/components/ue'
	
	
	export default {
		data() {
			return {
				chapter:false,
				section:false,
				selections:false,
				title:'',//测试创建题型 
				classList: [
					"el-icon-message",
					"el-icon-menu",
					"el-icon-setting",
					"el-icon-setting"
				],
				editorSetting: {
					height: 200,
					encoding: 'html'
				},
				downIcon:true,//添加内容按钮
				addVideoChapter:false,//添加视频（章里面添加视频）
				videoForm:{
					videoValue:'',
					videoSelect:'',
					title:'',
					checkList:[]
				},
//				添加视频按钮
				add_Video:false,
				treeDate:[{
					id:1,
					label:'计算机',
					times:'2018-6-15 08:00',
					children:[{
						id:3,
						label:'计算机网络',
						times:'2019-02-04 12:05'
					}]
				},{
					id:2,
					label:'计算机',
					times:'2018-6-15 08:00',
					children:[{
						id:4,
						label:'计算机应用技术',
						times:'2018-06-08 05:20'
					}]
				}
				],
				optionsValue:[{
					value:'zhinan',
					label:'指南',
					id:1,
					children:[{
						id:4,
						value:'sheji',
						label:'设计原则'
					}]
				},{
					value:'zujian',
					label:'组件',
					id:2,
					children:[{
						id:3,
						value:'color',
						label:'色彩'
					}]
				}],
				selectedOptions:[],
//				添加测验(章里面添加)
				addTestChapter:false,
				testChapter:{
					videoValue:'',
					videoSelect:'',
					title:'',
				},
//				添加测验按钮
				add_Test:false,
//				添加作业
				addJobChapter:false,
				
//				添加讨论
				addDiscussChapter:false,
				discussForm:{
					videoValue:'',
					videoSelect:'',
					title:'',
					courseIntroduction:'',
					valueDate:'',
					valueEndDate:'',
					valueStartDate:''
				},
				activeDiscuss:['1'],
				
				courseware:false,//添加课件（章里面添加视频）
				courseForm:{
					courseValue:'',
					courseSelect:'',
					title:'',
					courseIntroduction:''
				},
				videoOptions:[
					{id:1,label:'第一章'},
					{id:2,label:'第二章'},
					{id:3,label:'第三章'}
				],
				videoOption:[
					{id:1,label:'第一节'},
					{id:2,label:'第二节'},
					{id:3,label:'第三节'}
				],
				courseOptions:[
					{id:1,label:'第一章'},
					{id:2,label:'第二章'},
					{id:3,label:'第三章'}
				],
				courseOption:[
					{id:1,label:'第一节'},
					{id:2,label:'第二节'},
					{id:3,label:'第三节'}
				],
				coustTest:false,//导入课件按钮
				addChapter:'',
				addSection:'',
				addSections:{
					selectOption:'',//添加节(选择所属章) 
					title:''
				},//添加节（所属章）
				sectionId:'',
				course:'计算机网络',
				radio:'1',
				input:'',
				value:'',
				plusId:'',//点击节里面的添加内容的当前id
				collapseId:'',
				options:[
					{value:'选项1',label:'全部'},
					{value:'选项2',label:'视频'},
				],
				selectOptions:[
					{id:'1',label:'计算机'},
					{id:'2',label:'C#语言基础'}
				],
				collapseDate:[{
						title:'计算机的起源',
						collapse:[
							{des:'与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；',id:33},
						],
						id:1
					},{
						title:'计算机的起源',
						collapse:[
							{des:'与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；',id:22},
							{des:'与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；',id:24},
						],
						id:2
					}
				],
				primShow:false
			}
		},
		methods:{
//			添加内容的隐藏与显示
			addArrow(){
				this.primShow =! this.primShow
			},
//			添加节(每章里面的添加)
			add_section(value){
				console.log(value);
				this.sectionId = value;
				this.section = true;
			},
//			确认添加节(每章里面的添加)
			finishedSection(){
				console.log(this.addSection);
				this.section = false;
				this.addSection = '';
				console.log(this.sectionId)
			},
//			添加内容的隐藏与显示(每节里面的)
			plusShow(index,key){
				this.downIcon =! this.downIcon;
			},
//			添加视频(每个章里面添加)
			videoSection(){
				this.addVideoChapter = true;
			},
//			添加视频按钮
			addVideo(){
				this.addVideoChapter = false;
				this.add_Video = true;
			},
//			确认添加视频
			finishVideo(){
				this.add_Video = false;
				this.addVideoChapter = true;
			},
//			取消添加视频
			exitVideo(){
				this.add_Video = false;
				this.addVideoChapter = true;
			},
//			添加测验(章里面添加)
			testSection(){
				this.addTestChapter = true;
			},
//			添加测验按钮
			addText(){
				this.addTestChapter = false;
				this.add_Test = true;
			},
//			确定添加
			finishText(){
				this.addTestChapter = true;
				this.add_Test = false;
			},
//			取消添加
			exitText(){
				this.addTestChapter = true;
				this.add_Test = false;
			},
//			测验创建单选题
			question(){
				this.title = '单选题';
			},
//			创建多选题
			questions(){
				this.title = '多选题';
			},
//			创建判断题
			judgment(){
				this.title = '判断题';
			},
//			添加讨论(章下面添加)
			discussSection(){
				this.addDiscussChapter = true;
			},
//			添加课件(每个章里面添加)
			courseSelect(){
				this.courseware = true;
			},
//			导入课件按钮
			add_Course(){
				this.courseware = false;
				this.coustTest = true;
			},
//			确定导入
			finishCourse(){
				this.courseware = true;
				this.coustTest = false;
			},
//			取消导入
			exitCourse(){
				this.courseware = true;
				this.coustTest = false;
			},
//			联级选择器
			handleChange(value){
				console.log(value)
			}
		},
		components: {
			//使用编辑器
			'editor': editor
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
	.certs{
		padding: 4%;
		background-color: #fff;
		text-align: left;
	}
	.line{
		margin: 2% 0;
		width: 100%;
		height: 1px;
		background-color: #E9E9E9;
	}
	.prim{
		margin-left: 0;
		margin-right: 2%;
		background-color: rgba(255,152,0,0.2);
		border: 1px solid #FF9800;
		color: #ff9800;
	}
	.prim:hover{
		margin-left: 0;
		margin-right: 2%;
		background-color: rgba(255,152,0,0.2);
		border: 1px solid #FF9800;
		color: #ff9800;
	}
	.prim:focus{
		margin-left: 0;
		margin-right: 2%;
		background-color: rgba(255,152,0,0.2);
		border: 1px solid #FF9800;
		color: #ff9800;
	}
	.prims{
		position: absolute;
		border: 1px solid #FF9800;
		width: 115px;
		text-align: center;
		z-index: 10;
	}
	.prims li{
		height: 30px;
		line-height: 30px;
		color: #FF9800;
		border-bottom: 1px solid #FF9800;
		font-size: 14px;
		background: #FFFFFF;
	}
	.prims li:hover{
		cursor: pointer;
	}
	.demo{
		display: inline-block;
	}
	.demo span{
		color: #001380;
	}
	
	.hapter{
		margin: auto;
		margin-top: 4%;
		margin-bottom: 2%;
		display: block;
		width:50%;
		background-color: rgba(255,152,0,0.2);
		border: 1px solid #FF9800;
		color: #ff9800;
	}
	.hapter:hover{
		background-color: rgba(255,152,0,0.2);
		border: 1px solid #FF9800;
		color: #ff9800;
	}
	.hapter:focus{
		background-color: rgba(255,152,0,0.2);
		border: 1px solid #FF9800;
		color: #ff9800;
	}
	.suff{
		line-height: 40px;
	}
	.plusButton{
		font-size: 12px;
		width: 38px;
		height: 38px;
	}
	.el-checkbox__label{
		font-size: 12px;
	}
	.custom-tree-node{
		flex:1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 12px;
	}
	.videos{
		width: 90%;
		height: 90%;
		background: #E5E5E5;
		border: 1px solid #E5E5E5;
	}
</style>
