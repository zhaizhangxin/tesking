<template>
		
		<el-main>
			<div class="cert">
				<p class="grid-content" style='text-align: left;'>学校配置</p>
				
				<el-tabs style="margin-top: 20px;">
					<el-tab-pane label="选择模板">
					</el-tab-pane>
					<el-tab-pane label="平台信息">
						<div class="partner">
							<el-form ref="part" :model="part" style="width: 80%;margin: auto;">
								<el-form-item label="简介名称">
									<el-input v-model="part.name" maxlength="36" style="width: 80%;"></el-input>
									<p class="prompt">字数请限制在36个汉字以内</p>
								</el-form-item>
								<el-form-item label="学校简介" style="margin-top: 50px;">
									<el-input type="textarea" maxlength="520" v-model="part.desc" style="width: 80%;"></el-input>
									<p class="prompt">字数请限制在520个汉字以内</p>
								</el-form-item>
								<el-form-item label="白色背景LOGO">
									<el-row :gutter="18">
										<el-col :span="12" style="text-align: left;">
											<el-upload style="text-align: left;" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
												<img v-if="imageUrl" :src="imageUrl" class="avatar">
												 <i v-else class="el-icon-plus avatar-uploader-icon"></i>
												<el-button size="small" type="primary" class="editpriy">编辑LOGO</el-button>
											</el-upload>
										</el-col>
										<el-col :span="8" style="text-align: left;">
											<p style="color: rgba(0,0,0,0.54);">由于各学校Logo形状差异过大，具体长宽尺寸请自行把握。Logo周边留白越少效果越好。</p>
										</el-col>
									</el-row>
								</el-form-item>
								<el-form-item label="黑色背景LOGO">
									<el-row :gutter="18">
										<el-col :span="12" style="text-align: left;">
											<el-upload style="text-align: left;" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatar" :before-upload="beforeAvatarUpload">
												<img v-if="imageUrls" :src="imageUrls" class="avatar">
												 <i v-else class="el-icon-plus avatar-uploader-icon"></i>
												<el-button size="small" type="primary" class="editpriy">编辑LOGO</el-button>
											</el-upload>
										</el-col>
										<el-col :span="8" style="text-align: right;">
											<el-button type="primary" style="margin-top: 50px;">保存</el-button>
										</el-col>
									</el-row>
								</el-form-item>
							</el-form>
						</div>
					</el-tab-pane>
					<el-tab-pane label="轮播图">
						<el-row :gutter="20" style="line-height: 38px;">
							<el-col :span="8" style="text-align: left;">
								<p class="grid-content">轮播图列表
									<span class="titles" style="margin-left: 20px;">最多上传5张轮播图</span>
								</p>
							</el-col>
							<el-col :span="16" style="text-align: right;">
								<el-button type="primary" @click="addto = true">添加</el-button>
								
								<el-dialog title="" :visible.sync="addto">
									<el-form ref="addtos" :model='addtos'>
										<el-form-item label="图片名称" style="text-align: left;">
											<el-input v-model="addtos.name" style="width: 60%;"></el-input>
											<el-upload style="display: inline-block;" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvataradd" :before-upload="beforeAvatarUpload">
												<el-button size="small" type="primary" class="publis">选择图片</el-button>
											</el-upload>
										</el-form-item>
										<el-form-item label="图片预览" style="text-align: left;">
											<el-upload style="display: inline-block;" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvataradd" :before-upload="beforeAvatarUpload">
												<img v-if="imagesadd" :src="imagesadd" style="width: 286px;height: 164px;">
												 <i v-else class="el-icon-plus avatar-uploader-icon" style="width: 286px;height: 164px;line-height: 164px;"></i>
											</el-upload>
											<el-upload style="display: inline-block;margin-left: 30px;" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvataradd" :before-upload="beforeAvatarUpload">
												<img v-if="imagesadd" :src="imagesadd" style="width: 205px;height: 116px;">
												 <i v-else class="el-icon-plus avatar-uploader-icon" style="width: 205px;height: 116px;line-height: 116px;"></i>
											</el-upload>
										</el-form-item>
										<el-form-item label="PC跳转" style="text-align: left;">
											<el-input v-model="addtos.pc" style="width: 80%;"></el-input>
										</el-form-item>
										<el-form-item label="APP跳转" style="text-align: left;">
											<el-input v-model="addtos.app" style="width: 80%;"></el-input>
										</el-form-item>
										<el-form-item style="text-align: center;">
											<el-button @click="addto = false" type="text" class="select">取消</el-button>
											<el-button type="primary">保存</el-button>												
										</el-form-item>
									</el-form>
								</el-dialog>
								
							</el-col>
						</el-row>
						<el-table :data="picList" stripe border style="width: 100%;margin-top: 20px;">
							<el-table-column type="index" label="序号" align="center"> </el-table-column>
							<el-table-column prop="picname" label="图片名称" align="center"> </el-table-column>
							<el-table-column label="缩略图" align="center">
								<template slot-scope="scope">
									<img :src="scope.row.thumbnail" style="width: 20%;height: 20%;"/>
								</template>
							</el-table-column>
							<el-table-column prop="pcjump" label="PC跳转" align="center"> </el-table-column>
							<el-table-column prop="appjump" label="APP跳转" align="center"> </el-table-column>
							<el-table-column label="操作" align="center">
								<template slot-scope="scope">
									<el-button type="text" size="small" class="select">删除</el-button>
									<el-button type="text" size="small" class="select" @click="banner = true">编辑</el-button>
									
									<el-dialog title="" :visible.sync="banner">
										<el-form ref="banners" :model='banners'>
											<el-form-item label="图片名称" style="text-align: left;">
												<el-input v-model="banners.name" style="width: 60%;"></el-input>
												<el-upload style="display: inline-block;" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatars" :before-upload="beforeAvatarUpload">
													<el-button size="small" type="primary" class="publis">选择图片</el-button>
												</el-upload>
											</el-form-item>
											<el-form-item label="图片预览" style="text-align: left;">
												<el-upload style="display: inline-block;" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatars" :before-upload="beforeAvatarUpload">
													<img v-if="images" :src="images" style="width: 286px;height: 164px;">
													 <i v-else class="el-icon-plus avatar-uploader-icon" style="width: 286px;height: 164px;line-height: 164px;"></i>
												</el-upload>
												<el-upload style="display: inline-block;margin-left: 30px;" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatars" :before-upload="beforeAvatarUpload">
													<img v-if="images" :src="images" style="width: 205px;height: 116px;">
													 <i v-else class="el-icon-plus avatar-uploader-icon" style="width: 205px;height: 116px;line-height: 116px;"></i>
												</el-upload>
											</el-form-item>
											<el-form-item label="PC跳转">
												<el-input v-model="banners.pc" style="width: 80%;"></el-input>
											</el-form-item>
											<el-form-item label="APP跳转">
												<el-input v-model="banners.app" style="width: 80%;"></el-input>
											</el-form-item>
											<el-form-item>
												<el-button @click="banner = false" type="text" class="select">取消</el-button>
												<el-button type="primary">保存</el-button>												
											</el-form-item>
										</el-form>
									</el-dialog>
									
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
					<el-tab-pane label="精品课程">
						<el-row :gutter="20" style="line-height: 38px;">
							<el-col :span="8" style="text-align: left;">
								<p class="grid-content">精品课程
									<span class="titles" style="margin-left: 20px;">请选择12门班次在门户首页进行展示</span>
								</p>
							</el-col>
							<el-col :span="16" style="text-align: right;">
								<span class="titles">标题名称</span>
								<div class="active">
									<el-input placeholder="精品课程" prefix-icon="el-icon-search" style="width: 54%;"></el-input><el-button type="primary">编辑标题</el-button>
								</div>
								<el-button type="primary">添加</el-button>
							</el-col>
						</el-row>
						<div style="background: #FFFFFF;margin-top: 20px;">
							<el-table :data="tableData" stripe border style="width: 100%;">
								<el-table-column type="index" label="序号" align="center"> </el-table-column>
								<el-table-column prop="title" label="班次ID" align="center"> </el-table-column>
								<el-table-column prop="courses" label="班次名称" align="center"> </el-table-column>
								<el-table-column prop="teacher" label="授课老师" align="center"> </el-table-column>
								<el-table-column label="操作" align="center">
									<template slot-scope="scope">
										<el-button type="text" size="small" class="select" @click="reselect=true">重新选择</el-button>
										<el-button type="text" size="small" class="select">编辑</el-button>
										
										<el-dialog title="重新选择" :visible.sync="reselect">
											<el-row :gutter="20" style="line-height: 38px;">
												<el-col :span="8" style="text-align: left;">
													<p class="grid-content">所有班次
														<span class="titles" style="margin-left: 20px;">共{{number}}个班次</span>
													</p>
												</el-col>
												<el-col :span="16" style="text-align: right;">
													<div class="active">
														<el-input prefix-icon="el-icon-search" style="width: 68%;"></el-input><el-button type="primary">搜索</el-button>
													</div>
												</el-col>
											</el-row>
											
											<el-table :data="gridData" border stripe style="margin:auto;width: 80%;margin-top: 30px;">
												<el-table-column label="选择" align="center">
													<template scope="scope">
														<el-radio :label="scope.$index" v-model="radio" @change.native="getTemplateRow(scope.$index)">&nbsp;</el-radio>
													</template>
												</el-table-column>
												<el-table-column prop="shiftID" label="班次ID" align="center"></el-table-column>
												<el-table-column prop="shiftname" label="班次名称" align="center"></el-table-column>
											</el-table>
											
											<!--<div class="block">
											    <el-pagination background="true" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 50, 100]" pager-count="10" :page-size="10" layout="prev,pager,next,total, jumper" :total="100">
											    
											    </el-pagination>
											</div>-->
											
											<el-button @click="reselect = false" type="text" class="select">取消</el-button>
											<el-button type="primary">确定</el-button>
										</el-dialog>
										
									</template>
								</el-table-column>
							</el-table>
							<!--<div class="block">
							    <el-pagination background="true" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 50, 100]" pager-count="10" :page-size="10" layout="prev,pager,next,total, jumper" :total="100">
							    
							    </el-pagination>
							</div>-->
						</div>
					</el-tab-pane>
					<el-tab-pane label="名师风采">
						<el-row :gutter="20" style="line-height: 38px;">
							<el-col :span="8" style="text-align: left;">
								<p class="grid-content">名师风采
									<span class="titles" style="margin-left: 20px;">请置顶5位老师在门户首页进行展示</span>
								</p>
							</el-col>
							<el-col :span="16" style="text-align: right;">
								<span class="titles">标题名称</span>
								<div class="active">
									<el-input placeholder="名师风采" prefix-icon="el-icon-search" style="width: 54%;"></el-input><el-button type="primary">编辑标题</el-button>
								</div>
								<el-button type="primary">添加</el-button>
							</el-col>
						</el-row>
						<div style="background: #FFFFFF;margin-top: 20px;">
							<el-table :data="dataList" stripe border style="width: 100%;">
								<el-table-column type="index" label="序号" align="center"> </el-table-column>
								<el-table-column label="老师头像" align="center">
									<template slot-scope="scope">
										<img :src="scope.row.headPic" style="width: 20%;height: 20%;"/>
									</template>
								</el-table-column>
								<el-table-column prop="username" label="老师姓名" align="center"> </el-table-column>
								<el-table-column prop="teacher" label="老师头衔" align="center"> </el-table-column>
								<el-table-column label="操作" align="center">
									<template slot-scope="scope">
										<el-button type="text" size="small" class="select" @click="teachreselect = true">重新选择</el-button>
										
										<el-dialog title="重新选择" :visible.sync="teachreselect">
											<el-row :gutter="20" style="line-height: 38px;">
												<el-col :span="8" style="text-align: left;">
													<p class="grid-content">所有老师
														<span class="titles" style="margin-left: 20px;">共{{number}}个</span>
													</p>
												</el-col>
												<el-col :span="16" style="text-align: right;">
													<div class="active">
														<el-input prefix-icon="el-icon-search" style="width: 68%;"></el-input><el-button type="primary">搜索</el-button>
													</div>
												</el-col>
											</el-row>
											
											<el-table :data="gridData" border stripe style="margin:auto;width: 80%;margin-top: 30px;">
												<el-table-column label="选择" align="center">
													<template scope="scope">
														<el-radio :label="scope.$index" v-model="radios" @change.native="getTemplateRow(scope.$index)">&nbsp;</el-radio>
													</template>
												</el-table-column>
												<el-table-column prop="shiftID" label="老师ID" align="center"></el-table-column>
												<el-table-column prop="teachname" label="老师名称" align="center"></el-table-column>
											</el-table>
											
											<!--<div class="block">
											    <el-pagination background="true" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 50, 100]" pager-count="10" :page-size="10" layout="prev,pager,next,total, jumper" :total="100">
											    
											    </el-pagination>
											</div>-->
											
											<el-button @click="teachreselect = false" type="text" class="select">取消</el-button>
											<el-button type="primary">确定</el-button>
										</el-dialog>
										
									</template>
								</el-table-column>
							</el-table>
							<!--<div class="block">
							    <el-pagination background="true" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 50, 100]" pager-count="10" :page-size="10" layout="prev,pager,next,total, jumper" :total="100">
							    
							    </el-pagination>
							</div>-->
						</div>
						
					</el-tab-pane>
					<el-tab-pane label="合作伙伴">
						<div class="partner">
							<el-form ref="form" :model="form" style="width: 80%;margin: auto;">
								<el-form-item label="简介名称">
									<el-input v-model="form.name" maxlength="36" style="width: 80%;"></el-input>
									<p class="prompt">字数请限制在36个汉字以内</p>
								</el-form-item>
								<el-form-item label="学校简介" style="margin-top: 50px;">
									<el-input type="textarea" maxlength="520" v-model="form.desc" style="width: 80%;"></el-input>
									<p class="prompt">字数请限制在520个汉字以内</p>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" style="margin-top: 50px;">保存</el-button>
								</el-form-item>
							</el-form>
						</div>
					</el-tab-pane>
					<el-tab-pane label="精彩公开课">
						<el-row :gutter="20" style="line-height: 38px;">
							<el-col :span="8" style="text-align: left;">
								<p class="grid-content">校园风采图列表
									<span class="titles" style="margin-left: 20px;">请上传2张风采图</span>
								</p>
							</el-col>
							<el-col :span="16" style="text-align: right;">
								<span class="titles">标题名称</span>
								<div class="active">
									<el-input placeholder="精彩公开课" prefix-icon="el-icon-search" style="width: 54%;"></el-input><el-button type="primary">编辑标题</el-button>
								</div>
								<el-button type="primary">添加</el-button>
							</el-col>
						</el-row>
						<div style="background: #FFFFFF;margin-top: 20px;">
							<el-table :data="schoolList" stripe border style="width: 100%;">
								<el-table-column type="index" label="序号" align="center"> </el-table-column>
								<el-table-column prop="picname" label="图片名称" align="center"> </el-table-column>
								<el-table-column label="缩略图" align="center">
									<template slot-scope="scope">
										<img :src="scope.row.headPic" style="width: 20%;height: 20%;"/>
									</template>
								</el-table-column>
								<el-table-column label="操作" align="center">
									<template slot-scope="scope">
										<el-button type="text" size="small" class="select" @click="publicClass = true">编辑</el-button>
										<el-button type="text" size="small" class="select">删除</el-button>
										
										<el-dialog title="" :visible.sync="publicClass">
											<el-form ref="publics" :model='publics'>
												<el-form-item label="图片名称" style="text-align: left;">
													<el-input v-model="publics.name" style="width: 60%;"></el-input>
													<el-upload style="display: inline-block;" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handlepublic" :before-upload="beforeAvatarUpload">
														<el-button size="small" type="primary" class="publis">选择图片</el-button>
													</el-upload>
												</el-form-item>
												<el-form-item label="图片预览" style="text-align: left;">
													<el-upload style="display: inline-block;" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handlepublic" :before-upload="beforeAvatarUpload">
														<img v-if="publicimages" :src="publicimages" style="width: 286px;height: 164px;">
														 <i v-else class="el-icon-plus avatar-uploader-icon" style="width: 286px;height: 164px;line-height: 164px;"></i>
													</el-upload>
													<el-upload style="display: inline-block;margin-left: 30px;" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handlepublic" :before-upload="beforeAvatarUpload">
														<img v-if="publicimages" :src="publicimages" style="width: 205px;height: 116px;">
														 <i v-else class="el-icon-plus avatar-uploader-icon" style="width: 205px;height: 116px;line-height: 116px;"></i>
													</el-upload>
												</el-form-item>
												<el-form-item>
													<el-button @click="publicClass = false" type="text" class="select">取消</el-button>
													<el-button type="primary">保存</el-button>												
												</el-form-item>
											</el-form>
										</el-dialog>
										
									</template>
								</el-table-column>
							</el-table>
							<!--<div class="block">
							    <el-pagination background="true" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 50, 100]" pager-count="10" :page-size="10" layout="prev,pager,next,total, jumper" :total="100">
							    
							    </el-pagination>
							</div>-->
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
		
		</el-main>
			
		</el-main>

</template>
<script>

	
	import imgUrl from '@/assets/addr.png'
	export default {
		data() {
			return {
				imageUrl:'',
				imageUrls:'',
				images:'',
				imagesadd:'',
				publicimages:'',
				radio:'',
				radios:'',
				number:'200',
				reselect:false,
				teachreselect:false,
				banner:false,
				addto:false,
				publicClass:false,
				part:{
					name:'',
					desc:''
				},
				form:{
					name:'',
					desc:''
				},
				banners:{
					name:'',
					pc:'',
					app:''
				},
				publics:{
					name:''
				},
				addtos:{
					name:'',
					pc:'',
					app:''
				},
				gridData:[
					{shiftID:'12590',shiftname:'信息安全意识',teachname:'资深讲师'},
					{shiftID:'12590',shiftname:'信息安全意识',teachname:'资深讲师'},
					{shiftID:'12590',shiftname:'信息安全意识',teachname:'资深讲师'}
				],
				picList:[
					{picname:'缩略图',thumbnail:imgUrl},
					{picname:'缩略图',thumbnail:imgUrl},
					{picname:'缩略图',thumbnail:imgUrl}
				],
				tableData:[
					{title:'12590',courses:'信息安全意识',teacher:'邵明明'},
					{title:'12590',courses:'信息安全意识',teacher:'邵明明'},
					{title:'12590',courses:'信息安全意识',teacher:'邵明明'},
					{title:'12590',courses:'信息安全意识',teacher:'邵明明'},
					{title:'12590',courses:'信息安全意识',teacher:'邵明明'}
				],
				dataList:[
					{headPic:imgUrl,username:'萌萌',teacher:'资深讲师'},
					{headPic:imgUrl,username:'萌萌',teacher:'资深讲师'},
					{headPic:imgUrl,username:'萌萌',teacher:'资深讲师'},
					{headPic:imgUrl,username:'萌萌',teacher:'资深讲师'}
				],
				schoolList:[
					{picname:'环保',headPic:imgUrl},
					{picname:'环保',headPic:imgUrl},
					{picname:'环保',headPic:imgUrl},
					{picname:'环保',headPic:imgUrl},
					{picname:'环保',headPic:imgUrl}
				]
			}
		},
		methods:{
			handleAvatarSuccess(res, file) {
	        this.imageUrl = URL.createObjectURL(file.raw);
	      },
	      handleAvatar(res, file) {
	        this.imageUrls = URL.createObjectURL(file.raw);
	      },
	      handleAvatars(res, file) {
	        this.images = URL.createObjectURL(file.raw);
	      },
	      handleAvataradd(res, file) {
	        this.imagesadd = URL.createObjectURL(file.raw);
	      },
	      handlepublic(res, file) {
	        this.publicimages = URL.createObjectURL(file.raw);
	      },
	      
	      beforeAvatarUpload(file) {
	        const isJPG = file.type === 'image/jpeg';
	        const isLt2M = file.size / 1024 / 1024 < 2;
	
	        if (!isJPG) {
	          this.$message.error('上传头像图片只能是 JPG 格式!');
	        }
	        if (!isLt2M) {
	          this.$message.error('上传头像图片大小不能超过 2MB!');
	        }
	        return isJPG && isLt2M;
	      },
	      getTemplateRow(val){ //获取选中数据
			    console.log(val)
			},
		

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
		margin-top: 20px;
		width: 80%;
	}
	.titles{
		color: rgba(0,0,0,0.54);
		font-size: 12px;
	}
	.active{
		margin-right: 20px;
		display: inline-block;
		width: 54%;
	}
	.el-tab-pane{
		background-color: transparent;
	}
	.select{
		color: #FF9800;
	}
	.block{
		padding-bottom: 20px;
		padding-top: 20px;
		background: #FFFFFF;
	}
	.partner{
		padding: 10% 0;
		background: #FFFFFF;
	}
	.prompt{
		margin: auto;
		width: 72%;
		text-align: left;
		color: rgba(0,0,0,0.54);
		font-size: 12px;
		height: 20px;
		line-height: 20px;
	}
	 .avatar {
	 	width: 180px;
	 	height: 74px;
	 }
	 
	 .avatar-uploader .el-upload {
	 	border: 1px dashed #d9d9d9;
	 	border-radius: 6px;
	 	cursor: pointer;
	 	position: relative;
	 	overflow: hidden;
	 }
	 
	 .avatar-uploader .el-upload:hover {
	 	border-color: #409EFF;
	 }
	 
	 .avatar-uploader-icon {
	 	background: #E5E5E5;
	 	font-size: 28px;
	 	color: #8c939d;
	 	width: 180px;
	 	height: 74px;
	 	line-height: 74px;
	 	text-align: center;
	 }
	 
	 .editpriy {
	 	margin-left: 20px;
	 	background-color: #3DC1FF;
	 	border: #3DC1FF;
	 	width: 112px;
	 	height: 40px;
	 	vertical-align: super;
	 }
	 .publis{
	 	margin-left: 20px;
	 	background-color: #FF9800;
	 	border: #FF9800;
	 	width: 112px;
	 	height: 40px;
	 	vertical-align: super;
	 }
</style>