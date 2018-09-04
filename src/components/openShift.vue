<template>
	<div class="shift">
		<div class="list">
			<el-row>
			  <el-col :span="24">
			  	<p class="grid">填写课程信息</p>
			  </el-col>
			</el-row>
		</div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			
			<el-form-item label="课程分类" style="text-align: left;" required>
				<el-col :span="11">
					<el-form-item prop="categoryId">
					  <el-select v-model="ruleForm.categoryId" placeholder="分类" style="width: 100%;"  @change="firstCate" @visible-change="firstCategories">
					    <el-option
					      v-for="item in pager"
					      :key="item.id"
					      :label="item.label"
					      :value="item.id">
					    </el-option>					
					  </el-select>
					</el-form-item>
				</el-col>
				<el-col :span="11" style="margin-left: 8%;">
					<el-form-item prop="courseId">
					  <el-select v-model="ruleForm.courseId" placeholder="课程" style="width: 100%;"  @visible-change="secondCategories">
					    <el-option
					      v-for="item in secondpager"
					      :key="item.id"
					      :label="item.label"
					      :value="item.id">
					    </el-option>
					  </el-select>					
					</el-form-item>
				</el-col>
			</el-form-item>
			
			<el-form-item label="课程名称" prop="openName" style="text-align: left;">
				 <el-input v-model="ruleForm.openName"></el-input>
			</el-form-item>
			
			<el-form-item label="课程封面" prop="openCover" style="text-align: left;">
				<el-upload class="avatar-uploader" :http-request="uploadImg" action="#" :show-file-list="false" :before-upload="shiftCoverUpload">
					<el-button type="primary">上传图片</el-button>					
					<span style="color: #999999;font-size: 12px;">建议尺寸800*800px</span>
				</el-upload>
				
				<img v-if="ruleForm.openCover" :src="ruleForm.openCover" class="avatar">
				
			</el-form-item>
			
			<el-form-item label="课程关键词" prop="keyWord" style="text-align: left;">
			    <el-input v-model="ruleForm.keyWord"></el-input>
			    <p style="color: #999999;font-size: 12px;">关键字之间用“；”隔开，最多支持5个关键字</p>
			</el-form-item>
			
			<el-form-item label="课程价格" prop="openFree" style="text-align: left;">
				<el-radio-group v-model="ruleForm.openFree">
					<el-radio :label="1" style="float: left;">免费</el-radio>
					<el-radio :label="2" style="float: left;" disabled>收费</el-radio>
					<el-col :span="10" style="margin-left: 4%;overflow: hidden;height: 18px;">
						<span style="color: #999999;font-size: 12px;float: left;">￥</span>
						<el-col :span="8">
							<el-input :disabled="true" style="height: 18px;line-height: 18px;"></el-input>
						</el-col>
						<span style="color: #999999;font-size: 12px;margin-left: 1%;">元</span>
					</el-col>
				</el-radio-group>
			</el-form-item>
			
			<el-form-item label="授课老师" prop="teacherId" style="text-align: left;">
				<el-col :span="14" v-if="this.$route.query.id">
						<el-select value-key="id" v-model="teachers" multiple style="width: 100%;" @change="teach" @visible-change="visiChange">
							<el-option v-for="item in courseTeacherList" :key="item.id" :label="item.teacherName" :value="item.id"></el-option>
						</el-select>
				</el-col>
				<el-col :span="14" v-else>
						<el-select v-model="ruleForm.teacherId" multiple style="width: 100%;" @change="teach" @visible-change="visiChange">
							<el-option v-for="item in courseTeacherList" :key="item.id" :label="item.teacherName" :value="item.id"></el-option>
						</el-select>
				</el-col>
				<el-col :span="6" style="text-align: right;">
					<el-button type="primary" @click="teacher = true">创建授课老师</el-button>
				</el-col>

				<el-dialog title="创建授课老师" :visible.sync="teacher" center>
					<el-form ref="form" :model="form">
						<el-form-item>
							<el-row :gutter="24" style="text-align: left;">
								<el-col :span="6" style="text-align: right;">
									<p>名师照片：</p>
								</el-col>
								<el-col :span="14">
									<el-upload class="avatar-uploader" :http-request="uploadHead" action="#" :show-file-list="false" :before-upload="shiftCoverUpload">
										<el-button type="primary">上传图片</el-button>
										<span style="color: #999999;font-size: 12px;">請长传不小于15KB的jpg或png图片</span>
									</el-upload>
									<img v-if="form.teacherAvatar" :src="form.teacherAvatar" class="avatars">
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<el-row :gutter="24" style="margin-top: 2%;">
								<el-col :span="6" style="text-align: right;">
									<p>老师姓名：</p>
								</el-col>
								<el-col :span="14">
									<el-input v-model="form.teacherName"></el-input>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<el-row :gutter="24" style="margin-top: 2%;">
								<el-col :span="6" style="text-align: right;">
									<p>老师头衔：</p>
								</el-col>
								<el-col :span="14">
									<el-input v-model="form.teacherType"></el-input>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<el-row :gutter="24" style="margin-top: 2%;">
								<el-col :span="6" style="text-align: right;">
									<p>老师介绍：</p>
								</el-col>
								<el-col :span="14">
									<el-input type="textarea" v-model="form.teacherInfo"></el-input>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<el-row :gutter="24" style="margin-top: 2%;">
								<el-col :span="6" style="text-align: right;">
									<p>新浪微博：</p>
								</el-col>
								<el-col :span="14">
									<el-input v-model="form.micoBlog"></el-input>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<el-row :gutter="24" style="margin-top: 2%;">
								<el-col :span="6" style="text-align: right;">
									<p>微信：</p>
								</el-col>
								<el-col :span="14">
									<el-input v-model="form.weChat"></el-input>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<el-row :gutter="24" style="margin-top: 2%;">
								<el-col :span="6" style="text-align: right;">
									<p>标签：</p>
								</el-col>
								<el-col :span="14" >
									<el-input v-model="form.type"></el-input>
									<p style="color: #999999;font-size: 12px;">多个标签以";"隔开</p>
								</el-col>
							</el-row>
						</el-form-item>
					</el-form>
					<span slot="footer" class="dialog-footer">
						<el-button type="primary" @click="finished">完成</el-button>
						<el-button @click="resetForm" type="text" style="color: #B5C0FF;">取消</el-button>
					</span>
				</el-dialog>

			</el-form-item>
				
			<el-form-item label="教学老师" prop="userId" style="text-align: left;">
				<el-col :span="14" v-if="this.$route.query.id">
						<el-select value-key="id" v-model="teachingTeach" multiple style="width: 100%;" @visible-change="visibleChange">
							<el-option v-for="item in courseTeachering" :key="item.id" :label="item.userName" :value="item.id"></el-option>
						</el-select>
				</el-col>
				<el-col :span="14" v-else>
						<el-select v-model="ruleForm.userId" multiple style="width: 100%;" @visible-change="visibleChange">
							<el-option v-for="item in courseTeachering" :key="item.id" :label="item.userName" :value="item.id"></el-option>
						</el-select>
				</el-col>
				
			</el-form-item>	
				
			<el-form-item label="课程介绍" prop="openIntroduce">
				<el-col :span="20">
					<div class='tinymce'>
						<editor class="editor" v-model="ruleForm.openIntroduce" :setting="editorSetting" @input="(content)=> content = content"></editor>
					</div>
				</el-col>
			</el-form-item>	
			
			<el-collapse style="margin-top: 4%;border-top: 0;">
				<el-collapse-item style="text-align: left;">
					<template slot="title">
						高级设置<i class="el-icon-arrow-down el-icon--right"></i>
					</template>
					<el-row :gutter="24" style="border-top: 1px solid #ebeef5;line-height: 40px;">
						<el-col :span="20" style="text-align: left;">
							<p>课程信息</p>
						</el-col>
						<el-col :span="4" style="text-align: right;">
							<el-button type="text" size="mini" @click="course = true">设置</el-button>
						</el-col>
					</el-row>
					<el-row :gutter="24" style="border-top: 1px solid #ebeef5;line-height: 40px;">
						<el-col :span="20" style="text-align: left;">
							<p>教学模式</p>
						</el-col>
						<el-col :span="4" style="text-align: right;">
							<el-button type="text" size="mini" @click="teachMode = true">设置</el-button>
						</el-col>
					</el-row>
					<el-row :gutter="24" style="border-top: 1px solid #ebeef5;line-height: 40px;">
						<el-col :span="20" style="text-align: left;">
							<p>成绩考核</p>
						</el-col>
						<el-col :span="4" style="text-align: right;">
							<el-button type="text" size="mini" @click="assessSeeting">设置</el-button>
						</el-col>
					</el-row>
					<el-row :gutter="24" style="border-top: 1px solid #ebeef5;line-height: 40px;">
						<el-col :span="20" style="text-align: left;">
							<p>学习授权</p>
						</el-col>
						<el-col :span="4" style="text-align: right;">
							<el-button type="text" size="mini" @click="authorization = true">设置</el-button>
						</el-col>
					</el-row>
				</el-collapse-item>
			</el-collapse>
			
			<el-dialog title="课程信息" :visible.sync="course" width="50%" center>
				<el-form :model="ruleForm">
					<el-form-item>
						<el-row :gutter="24">
							<el-col :span="4" style="text-align: right;">
								<p>一句话介绍：</p>
							</el-col>
							<el-col :span="16">
								<el-input type="textarea" v-model="ruleForm.simpleInfo"></el-input>
							</el-col>
						</el-row>
					</el-form-item>
					<el-form-item>
						<el-row :gutter="24">
							<el-col :span="4" style="text-align: right;">
								<p>教学安排：</p>
							</el-col>
							<el-col :span="16">
								<div class='tinymce'>
									<editor class="editor" v-model="ruleForm.openArrange" :setting="editorSetting" @input="(content)=> content = content"></editor>
								</div>
							</el-col>
						</el-row>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="finishCourse">完成</el-button>
					<el-button @click="course = false" type="text" style="color: #B5C0FF;">取消</el-button>
				</span>
			</el-dialog>
			
			<el-dialog title="教学模式" :visible.sync="teachMode" width="700px" center>
				<el-form :model="ruleForm">
					<el-form-item style="margin-bottom: 0;">
						<el-row :gutter="24" style="border-bottom: 1px solid #EDEFFB;">
							<el-col :span="4" style="text-align: right;">
								<p>学习模式：</p>
							</el-col>
							<el-col :span="16" style="text-align: left;">
								<el-radio-group v-model="ruleForm.studyMode">
									<el-radio :label="10">开放学习</el-radio>
									<el-radio :label="20">传统学习</el-radio>
									<el-radio :label="30">顺序学习</el-radio>
								</el-radio-group>
							</el-col>
						</el-row>
					</el-form-item>
					<el-form-item style="margin-bottom: 0;">
						<el-row :gutter="24" style="border-bottom: 1px solid #EDEFFB;height: 50px;line-height: 50px;">
							<el-col :span="4" style="text-align: right;">
								<p>课程学分：</p>
							</el-col>
							<el-col :span="16" style="text-align: left;">
								<el-col :span="6">
									<el-input v-model="ruleForm.courseCredit"></el-input>
								</el-col>
								学分
							</el-col>
						</el-row>
					</el-form-item>
					<el-form-item style="margin-bottom: 0;">
						<el-row :gutter="24"  style="border-bottom: 1px solid #EDEFFB;height: 50px;line-height: 50px;">
							<el-col :span="4" style="text-align: center;">
								<p>总成绩公布:</p>
							</el-col>
							<el-col :span="16" style="text-align: left;">
								<el-col :span="3" style="padding-right: 0;">
									<p>结课</p>
								</el-col>
								<el-col :span="6" style="padding-left: 0;">
									<el-input v-model="ruleForm.studyHour"></el-input>
								</el-col>
								天后
							</el-col>
						</el-row>
					</el-form-item>
					<el-form-item style="margin-bottom: 0;">
						<el-row :gutter="24"  style="border-bottom: 1px solid #EDEFFB;height: 50px;line-height: 50px;">
							<el-col :span="4" style="text-align: center;">
								<p>总课时:</p>
							</el-col>
							<el-col :span="8" style="text-align: left;">
								<el-col :span="4" style="padding-right: 0;">
									<p>共</p>
								</el-col>
								<el-col :span="8" style="padding-left: 0;">
									<el-input v-model="ruleForm.scoreDay"></el-input>
								</el-col>
								课时
							</el-col>
							<el-col :span="12" style="text-align: right;">
								<p style="color: #999999;font-size: 12px;">一课时相当于一堂课的时间，用于评估学生的学习量</p>
							</el-col>
						</el-row>
					</el-form-item>
					<el-form-item style="margin-bottom: 0;">
						<el-row :gutter="24"  style="height: 50px;line-height: 50px;">
							<el-col :span="4" style="text-align: center;">
								<p>试学章节:</p>
							</el-col>
							<el-col :span="8" style="text-align: left;">
								<el-col :span="4" style="padding-right: 0;">
									<p>前</p>
								</el-col>
								<el-col :span="8" style="padding-left: 0;">
									<el-input v-model="ruleForm.previewVideo"></el-input>
								</el-col>
								个视频
							</el-col>
							<el-col :span="12" style="text-align: right;">
								<p style="color: #999999;font-size: 12px;">用户可以预览试学章节的视频内容，无需选课</p>
							</el-col>
						</el-row>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="finishTeach">完成</el-button>
					<el-button @click="teachMode = false" type="text" style="color: #B5C0FF;">取消</el-button>
				</span>
			</el-dialog>
			
			<el-dialog title="成绩考核" :visible.sync="assessment" width="900px" center>
				<el-form :model="ruleForm">
					<el-form-item>
						<el-row :gutter="24">
							<el-col :span="16">
								<el-col :span="6">
									<p>满分：100</p>
								</el-col>
								<el-col :span="16">
									<p>最终得分 = A+B+C+D+E+F</p>
								</el-col>
							</el-col>
							<el-col :span="8" style="text-align: right;font-size: 12px;">
								<p style="color: #999999;">·单项考核权重为0则不计入成绩!</p>
							</el-col>
						</el-row>
					</el-form-item>
					<el-form-item>
						<div style="width: 650px;border: 1px solid #EDEFFB;">
							<div style="display: flex;justify-content: space-around;border-bottom: 1px solid #EDEFFB;height: 50px;line-height: 50px">
								<p>评分项</p>
								<p>视频</p>
								<p>测验</p>
								<p>作业</p>
								<p>讨论</p>
								<p>考试</p>
								<p>线下</p>
							</div>
							<div style="display: flex;justify-content: space-around;height: 50px;line-height: 50px;border-bottom: 1px solid #EDEFFB;">
								<p>权重共100%</p>
								<el-col :span="3" style="margin-left: 6%;">
									<el-col :span="16">
										<el-input v-model="ruleForm.openSetDto.videoPercent" v-on:blur="changeCount(value)"></el-input>
									</el-col>
									%
								</el-col>
								<el-col :span="3" style="margin-left: 1%;">
									<el-col :span="16">
										<el-input v-model="ruleForm.openSetDto.quizPercent" v-on:blur="changeCount(value)"></el-input>
									</el-col>
									%
								</el-col>
								<el-col :span="3" style="margin-left: 1%;">
									<el-col :span="16">
										<el-input  v-model="ruleForm.openSetDto.assignmentPercent" v-on:blur="changeCount(value)"></el-input>
									</el-col>
									%
								</el-col>
								<el-col :span="3" style="margin-left: 1%;">
									<el-col :span="16">
										<el-input v-model="ruleForm.openSetDto.topicPercent" v-on:blur="changeCount(value)"></el-input>
									</el-col>
									%
								</el-col>
								<el-col :span="3" style="margin-left: 1%;">
									<el-col :span="16">
										<el-input v-model="ruleForm.openSetDto.examPercent" v-on:blur="changeCount(value)"></el-input>
									</el-col>
									%
								</el-col>
								<el-col :span="3" style="margin-left: 1%;">
									<el-col :span="16">
										<el-input v-model="ruleForm.openSetDto.offlinePercent" v-on:blur="changeCount(value)"></el-input>
									</el-col>
									%
								</el-col>
							</div>
							<div style="display: flex;justify-content: space-around;height: 50px;line-height: 50px;">
								<p>单项分数</p>
								<button class="assess assessA">A</button>
								<button class="assess assessB">B</button>
								<button class="assess assessC">C</button>
								<button class="assess assessD">D</button>
								<button class="assess assessE">E</button>
								<button class="assess assessF">F</button>
							</div>
						</div>
					</el-form-item>
					<el-form-item>
						<el-row :gutter="24">
							<el-col :span="3" style="padding-right: 0;">
								<p style="color: #999999;">视频完成度：</p>
							</el-col>
							<el-col :span="14" style="text-align: left;padding-left: 0;">
								<el-col :span="7" style="padding-right: 0;">观看完单个视频的</el-col>
								<el-col :span="4" style="text-align: right;padding: 0;">
									<el-input v-model="ruleForm.openSetDto.integrity"></el-input>										
								</el-col>
								<el-col :span="12" style="padding-left: 0;"> %,即可计为学生已学完该视频。</el-col>									
								<el-col :span="20" style="font-size: 12px;">(请身中设置，一旦有学生已开始学习，完成度规则将无法再更改)</el-col>
							</el-col>
						</el-row>
					</el-form-item>
					<div class="chart" id="myChart" ref="chartOne" :style="{width: '154px', height: '154px'}"></div>
					
					<div style="border: 1px solid #EDEFFB;">
						<p style="border-bottom: 1px solid #EDEFFB;padding: 2% 4%;">单项评分标准</p>
						<div style="padding: 2% 4%;">
							<div style="display: flex;">
								<div style="width: 50%;">
									<button class="assess assessA">A</button>
									= 完整观看视频数/总视频数*100分*{{ruleForm.openSetDto.videoPercent}}%									
								</div>
								<div style="width: 50%;">
									<button class="assess assessB">B</button>
									= 测验得分总和/测验次数*100分*{{ruleForm.openSetDto.quizPercent}}%									
								</div>
							</div>
							<div style="display: flex;margin-top: 2%;">
								<div style="width: 50%;">
									<button class="assess assessC">C</button>
									= 作业得分总和/作业次数*100分*{{ruleForm.openSetDto.assignmentPercent}}%									
								</div>
								<div style="width: 50%;">
									<button class="assess assessD">D</button>
									= 获得分数的讨论书/讨论次数*100分*{{ruleForm.openSetDto.topicPercent}}%									
								</div>
							</div>
							<div style="display: flex;margin-top: 2%;">
								<div style="width: 50%;">
									<button class="assess assessE">E</button>
									= 考试得分*{{ruleForm.openSetDto.examPercent}}%									
								</div>
								<div style="width: 50%;">
									<button class="assess assessF">F</button>
									= 线下得分*{{ruleForm.openSetDto.offlinePercent}}%									
								</div>
							</div>
						</div>
					</div>
					
				</el-form>
				
				
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="finishSet">完成</el-button>
					<el-button @click="assessment = false" type="text" style="color: #B5C0FF;">取消</el-button>
				</span>
			</el-dialog>
			

			
			<el-dialog title="学习授权" :visible.sync="authorization" width="50%" center>
				<el-form :model="ruleForm">
					<el-form-item>
						<el-row :gutter="24">
							<el-col :span="4" style="text-align: right;">
								<p>开放范围：</p>
							</el-col>
							<el-col :span="16" style="text-align: left;">
								<el-radio-group v-model="ruleForm.openMode">
									<el-radio :label="20">本校用户</el-radio>
									<el-radio :label="10">选课名单用户</el-radio>
									<el-radio :label="30">全部用户</el-radio>
								</el-radio-group>
							</el-col>
						</el-row>
					</el-form-item>
					<el-form-item>
						<el-row :gutter="24">
							<el-col :span="4" style="text-align: right;">
								<p>退课权限：</p>
							</el-col>
							<el-col :span="16" style="text-align: left;">
								<el-checkbox v-model="ruleForm.dropCourse">允许退课</el-checkbox>
							</el-col>
						</el-row>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="finishAuth">完成</el-button>
					<el-button @click="authorization = false" type="text" style="color: #B5C0FF;">取消</el-button>
				</span>
			</el-dialog>
			
			
			<el-form-item style="margin-top: 6%;">
				<el-button type="primary"  @click="returns">取消编辑   返回</el-button>
				<el-button type="primary"  @click="submitForm('ruleForm')">上传班课  提交审核</el-button>
			</el-form-item>
		</el-form>
	</div>

</template>
<script>
	import editor from '@/components/ue'
	
 // 引入基本模板
	  let echarts = require('echarts/lib/echarts');
	  // 引入饼图组件
	  require('echarts/lib/chart/pie');
	  // 引入提示框和图例组件
	  require('echarts/lib/component/title');
	  require('echarts/lib/component/tooltip');
	  require('echarts/lib/component/legend');
	  require("echarts/lib/component/legendScroll");

	export default {
		data() {
			return {
				courseCoverUrl:'',//课程封面
				value:'',
				values:'',
				labelID:'',
				pager: [],//一级分类
				secondpager: [],//二级分类
				showHeader:false,
				teacher: false,//创建老师
				teacherId:[],//授课老师
				teachers:[],//授课老师
				teachingTeach:[],//教学老师
				courseTeacherList:[],//授课老师
				courseTeachering:[],//教学老师
				course:false,//课程信息
				teachMode:false,//教学模式
				authorization:false,//学习授权
				authorForm:{
					opens:'',
					withdrawal:false
				},
				assessment:false,//成绩考核
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
				//创建授课老师
				form: {
					teacherAvatar: '',
					teacherName: '',
					teacherType: '',
					teacherInfo: '',
					micoBlog: '',
					weChat: '',
					type:'',
					tagName: [],

				},
				ruleForm: {
					firstCategoryId:'',
					categoryId:'',
					courseId:'',
					openName:'',
					openCover:'',
					keyWord:'',
					openFree:'',
					teacherId:[],
					userId:[],
					courseTeacherList:[],//授课老师
					courseTeachering:[],//教学老师
					teaching:[],
					openIntroduce:'',
					openArrange:'',
					simpleInfo:'',
					studyMode:'',
					courseCredit:'',
					studyHour:'',
					scoreDay:'',
					previewVideo:'',
					openMode:'',
					dropCourse:'',
					openSetDto:{
						offlinePercent:'',
						videoPercent:'',
						quizPercent:'',
						assignmentPercent:'',
						topicPercent:'',
						examPercent:''
   					}
					
				},
				options: [
					{value: '选项1',label: '艺术设计'},
					{value: '选项2',label: '哲学物理'}
				],
				option: [
					{value: '选项1',label: '艺术'},
					{value: '选项2',label: '设计'},
					{value: '选项3',label: '哲学'},
					{value: '选项4',label: '物理'}
				],
				rules: {
					
					categoryId:[{
						required: true,
						message: '请选择分类',
						trigger: 'change'
					}],
					courseId:[{
						required: true,
						message: '请选择课程',
						trigger: 'change'
					}],
					keyWord:[{
						required: true,
						message: '请输入班课关键词',
						trigger: 'blue'
					}],
					openFree: [{
						required: true,
						message: '请选择班课价格',
						trigger: 'change'
					}],
					
				}

			}

		},
		created(){
			if(this.$route.query.id){
				if(this.$route.query.name == 'currname'){
					this.open_course();					
				}else{
					this.edit_open();					
				}
				this.courses();
				this.openUser();
				this.firstCourseCate();
				
			}
		},
		methods: {
			
			
//			开班课
			open_course(){
				this.$api.CourseApi.open_course(this.$route.query.id,result => {
					console.log(result)
					if(result.success == true){
						let that = this;
						let rule = result.data.openDto;
						this.ruleForm = {
							courseStatus:rule.courseStatus,
							keyWord:rule.keyWord,
							openFree:rule.openFree,
							openIntroduce:rule.openIntroduce,
							openName:rule.openName,
							teacherNameDtoList:rule.teacherNameDtoList,
							firstCategoryId:'',
							categoryId:'',
							courseId:'',
							openCover:'',
							teacherId:[],
							userId:[],
							courseTeacherList:[],//授课老师
							courseTeachering:[],//教学老师
							teaching:[],
							openArrange:'',
							simpleInfo:'',
							studyMode:'',
							courseCredit:'',
							studyHour:'',
							scoreDay:'',
							previewVideo:'',
							openMode:'',
							dropCourse:'',
							openSetDto:{
								offlinePercent:'',
								videoPercent:'',
								quizPercent:'',
								assignmentPercent:'',
								topicPercent:'',
								examPercent:''
		   					}
						}
						
						
						let teachers = this.ruleForm.teacherNameDtoList;
						teachers.forEach(function(item,index){
							that.teachers.push(item.id)
						})	
					}
				})
			},
			edit_open(){
				this.$api.CourseApi.edit_open(this.$route.query.id,result => {
					console.log(result)
					if(result.success == true){
						let that = this;
						this.ruleForm = result.data.open;
						let teachers = this.ruleForm.openTeacherNameList;
						let teachingTeach = this.ruleForm.userDtoListById;
						teachers.forEach(function(item,index){
							that.teachers.push(item.id)
						})
						teachingTeach.forEach(function(item,index){
							that.teachingTeach.push(item.id)
						})
//						console.log(this.teacherId)						
					}
				})
			},
			
			//			选择一级分类的id
			firstCate(event){
				console.log(event)
				this.labelID = event;
			},
			//			添加一级分类
			firstCategories(event){
				if(this.$route.query.id){
					
				}else{
					if(event == true){
						this.firstCourseCate();
					}					
				}
			},
			firstCourseCate(){
				this.$api.CourseApi.firstCategories(result => {
					console.log(result)
					if(result.success == true){
						this.pager = result.data.pager;
					}else{
						console.log(result.errors)
					}
				})
			},
			//			添加二级分类
			secondCategories(event){
				if(this.$route.query.id){
					if(this.labelID != ''){
						this.secondCourse();
					}
				}else{
					if(event == true){
						this.secondCourse();
					}					
				}
			},
			secondCourse(){
				this.$api.CourseApi.secondCategories(this.labelID,result => {
					console.log(result)
					if(result.success == true){
						this.secondpager = result.data.pager;
					}else{
						console.log(result.errors)
					}
				})
			},
//			饼状图随之改变
			changeCount(value){
				this.createChart()
			},
//			设置成绩权重
			assessSeeting(){
				this.assessment = true;
				this.$nextTick(_ => {
	    			this.createChart()
				})
			},
			createChart(){
				console.log()
				let chartOne=echarts.init(this.$refs.chartOne);
		        chartOne.setOption({
		          	title: {},
		            tooltip: {},
		            series: [{
		                name: '',
		                type: 'pie',
		                radius:['50%','70%'],
		                avoidLabelOverlap: false,
		                label:{
		                	normal:{
		                		show:false,
		                		position:'center'
		                	},
		                	emphasis: {
			                    show: true,
			                    textStyle: {
			                        fontSize: '30',
			                        fontWeight: 'bold'
			                    }
			                }
		                },
		                labelLine: {
			                normal: {
			                    show: false
			                }
			            },
		                data:[
			                {value:this.ruleForm.openSetDto.videoPercent, name:'视频'},
			                {value:this.ruleForm.openSetDto.quizPercent, name:'测验'},
			                {value:this.ruleForm.openSetDto.assignmentPercent, name:'作业'},
			                {value:this.ruleForm.openSetDto.topicPercent, name:'讨论'},
			                {value:this.ruleForm.openSetDto.examPercent, name:'考试'},
			                {value:this.ruleForm.openSetDto.offlinePercent, name:'线下'},
			            ],
			            color:[
			            	'rgba(255, 101, 113, 1)','rgba(103, 194, 239, 1)','rgba(189, 234, 116, 1)','rgba(228, 147, 245, 1)','rgba(255, 163, 102, 1)','rgba(255, 192, 203, 1)'
			            ]
		            }]
		        })
			},
//			上传班课封面
			uploadImg(file) {
				let that = this;
				const uuidv1 = require('uuid/v1');
				let filename = file.file.type + "/" + uuidv1(); // ⇨ '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e'

				let OSS = require('ali-oss');
				let client = new OSS({
					region: 'oss-cn-beijing',
					accessKeyId: 'LTAIZsHOKiz23lz7',
					accessKeySecret: 'f3T9brhGBYiZuXBrG8giojj6ixesbg',
					bucket: 'tskedu-course'
				});
				async function put() {
					try {
						let result = await client.put(filename, file.file);
						that.ruleForm.openCover = result.url;
					} catch(err) {
						console.log(err);
					}
				}
				put();
			},
			//班课封面(老师照片)
			shiftCoverUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if(!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			//			下拉触发(请求授课老师接口)
			visiChange(event){
				if(this.$route.query.id){
					
				}else{
					if(event == true){
						this.courses();
					}					
				}
			},
			courses(){
				this.$api.CourseApi.open_teachers(result => {
//					console.log(result)
					if(result.success == true){
						this.courseTeacherList = result.data.pager.list;
					}else{
						console.log(result.errors)
					}
				})
			},
			//			下拉触发(请求教学老师接口)
			
			visibleChange(event){
				if(this.$route.query.id){
					
				}else{
					if(event == true){
						this.openUser();
					}					
				}
			},
			openUser(){
				this.$api.CourseApi.open_role_user(result => {
					console.log(result)
					if(result.success == true){
						this.courseTeachering = result.data.userDtoList;
					}else{
						console.log(result.errors)
					}
				})
			},
			//			多选老师失去焦点时获取
			teach(event){
//				console.log(event)
			},
			//			上传老师照片
			uploadHead(file) {
				let that = this;
				const uuidv1 = require('uuid/v1');
				let filename = file.file.type + "/" + uuidv1(); // ⇨ '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e'

				let OSS = require('ali-oss');
				let client = new OSS({
					region: 'oss-cn-beijing',
					accessKeyId: 'LTAIZsHOKiz23lz7',
					accessKeySecret: 'f3T9brhGBYiZuXBrG8giojj6ixesbg',
					bucket: 'tskedu-course'
				});
				async function put() {
					try {
						let result = await client.put(filename, file.file);
						that.form.teacherAvatar = result.url;
					} catch(err) {
						console.log(err);
					}
				}
				put();
			},
			//			确认创建老师
			finished(){
				//以分号切割标签
				let types = this.form.type;
				var paramsList = types.split(";");
				var newlist = new Array();
				for(var i = 0;i < paramsList.length;i++){
					 //判断是否包含中文分号，如果包含再次切割；
					 if(paramsList[i].indexOf("；") > -1){
						 newlist.push.apply(newlist,paramsList[i].split("；"));
					 }else{
						 //将没有中文分号的数据添加到数组中
						 newlist.push(paramsList[i]);
					 }
				}
				var numberList = newlist;
				this.form.tagName = numberList;
//				console.log(this.form)
				this.$api.CourseApi.courseTeacher(this.form, result => {
					if(result.success == true){
						this.teacher = false;
						this.form = {
							teacherAvatar: '',
							teacherName: '',
							teacherType: '',
							teacherInfo: '',
							micoBlog: '',
							weChat: '',
							type:'',
							tagName: []
						}
					}else{
						console.log(result.errors)
					}
				})
				
			},
			//			取消创建老师
			resetForm(){
				this.teacher = false;
				this.form = {
					teacherAvatar: '',
					teacherName: '',
					teacherType: '',
					teacherInfo: '',
					micoBlog: '',
					weChat: '',
					type:'',
					tagName: []
				}
			},
//			设置课程信息
			finishCourse(){
				this.course = false;
			},
//			设置教学模式
			finishTeach(){
				this.teachMode = false;
			},
//			设置考试权重
			finishSet(){
				this.assessment = false;
			},
//			设置学习授权
			finishAuth(){
				this.authorization = false;
			},
			returns(){
				this.$router.push({path:'/curriculumCenter'})
			},
			submitForm(formName) {
				
				this.$refs[formName].validate((valid) => {
					if(valid) {
						if(this.ruleForm.openFree == '1'){
							this.ruleForm.openFree = 1
						}else{
							this.ruleForm.openFree = 2
						}
						if(this.$route.query.id){
							this.ruleForm.userId = this.teachingTeach;
							this.ruleForm.teacherId = this.teachers;
						}
//						是否允许退课
						if(this.ruleForm.dropCourse == true){
							this.ruleForm.dropCourse = 1;
						}else{
							this.ruleForm.dropCourse = 0;
						}
						if(this.$route.query.id){		
							if(this.$route.query.name == 'currname'){
								this.$api.CourseApi.add_open_course(this.$route.query.id,this.ruleForm,result => {
									console.log(result)
									if(result.success == true){
										this.$router.push({
											path: '/shiftManagement/shiftsManagement'
										})
									}else{
										console.log(result.errors)
									}
								})
							}else{
	//							this.$api.CourseApi.firstEditCourse(this.ruleForm,result => {								
	//								console.log(result);
	//								if(result.success == true){
	////									console.log(result.data.course.id)
	//									this.$router.push({
	//										path: '/materials',
	//										name:'materials',
	//										query:{
	//											name:'name',
	//											id:result.data.course.id
	//										}
	//									})
	//								}else{
	//									console.log(result.errors)
	//								}
	//							})
								
							}
						}else{
							this.$api.CourseApi.firstCourse(this.ruleForm,result => {
								console.log(result)
								if(result.success == true){
//									console.log(result.data.course.id)
									this.$router.push({
										path: '/shiftManagement/shiftsManagement',
										name:'shiftManagement',
										query:{
											name:'name',
											id:result.data.course.id
										}
									})
								}else{
									console.log(result.errors)
								}
							})
							
						}
					} else {
						console.log('error submit!!');
						return false;
					}
				});
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
	.list {
		margin: 0 4%;
		min-height: 60px;
		line-height: 60px;
		border-bottom: 1px solid #E0E0DD;
		text-align: left;
	}
	
	.shift {
		margin: auto;
		margin-top: 4%;
		padding-bottom: 4%;
		background: #FFFFFF;
		width: 70%;
	}
	
	.demo-ruleForm {
		margin: auto;
		margin-top: 50px;
		width: 60%;
		color: #001380;
	}
	
	.avatar-uploader .el-upload {
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 280px;
		height: 280px;
		line-height: 280px;
		text-align: center;
	}
	.el-form-item__label{
		color: #001380;
	}
	.avatar {
		margin-top: 10px;
		width: 280px;
		height: 280px;
		display: block;
	}
	.courseCover{
		margin-top: 10px;
		width: 360px;
		height: 220px;
		display: block;
	}
	.el-collapse-item__content{
		padding-bottom: 0;
	}
	.assess{
		margin-right: 2%;
		margin-top: 2%;
		border: 0;
		border-radius: 50%;
		width: 26px;
		height: 26px;
		color: #fff;
	}
	.assessA{
		background: rgba(255, 101, 113, 1);		
	}
	.assessB{
		background: rgba(103, 194, 239, 1);
	}
	.assessC{
		background: rgba(189, 234, 116, 1);
	}
	.assessD{
		background: rgba(228, 147, 245, 1);
	}
	.assessE{
		background: rgba(255, 163, 102, 1);
	}
	.assessF{
		background: rgba(255, 192, 203, 1);
	}
	.chart{
		float: right;
		margin-right: 5%;
		margin-top: -32.8%;
		border: 1px solid #EDEFFB;
	}
</style>