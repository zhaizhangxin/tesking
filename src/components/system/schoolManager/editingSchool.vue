<template>
	<el-container class="cont">
		
		<el-aside width="200px" class="left">
			<p-system></p-system>
		</el-aside>
		<el-main style="background: #f1f2f8;padding-top: 4%;">
			
			<el-header class="heads cert" style="background: #FFFFFF;border-bottom: 1px solid #E0E0DD;line-height: 60px;">
				<el-row :gutter="20" class="line">
					<el-col style="text-align: left;">
						<p>编辑学校</p>
					</el-col>
				</el-row>
			</el-header>
	
			<el-main style="background-color: #FFFFFF;" class="cert">
				<el-form ref="form" :model="form" style="width: 70%;margin: auto;" label-width="100px" class="demo-ruleForm">
					<el-form-item label="学校名称">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="学校LOGO">
						<el-upload
						  class="avatar-uploader"
						  action="https://jsonplaceholder.typicode.com/posts/"
						  :show-file-list="false"
						  :on-success="handleAvatarSuccess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="imageUrl" :src="imageUrl" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="二级域名">
						<el-input v-model="form.domain"></el-input>
					</el-form-item>
					<el-form-item label="官网网址">
						<el-input v-model="form.website"></el-input>
					</el-form-item>
					<el-form-item label="学校介绍">
						<el-input type="textarea" v-model="form.desc"></el-input>
					</el-form-item>
					<el-form-item label="国家">
						<el-input v-model="form.country"></el-input>
					</el-form-item>
					<el-form-item label="省份">
						<el-input v-model="form.province"></el-input>
					</el-form-item>
					<el-form-item label="城市">
						<el-input v-model="form.city"></el-input>
					</el-form-item>
					<el-form-item label="详细地址">
						<el-input v-model="form.address"></el-input>
					</el-form-item>
					<el-form-item label="授权开始">
						<p style="margin-left: 10%;text-align: left;">{{form.start}}</p>
					</el-form-item>
					<el-form-item label="授权结束">
						<p style="margin-left: 10%;text-align: left;">{{form.end}}</p>
					</el-form-item>
					<div class="line"></div>
					<el-form-item style="margin-top: 20px;">
						<el-button type="primary">保存</el-button>
						<el-button type="text" style="margin-left: 30px;color: #999999;">取消</el-button>
					</el-form-item>
				</el-form>
			</el-main>
			
		</el-main>

	</el-container>

</template>

<script>
	import systemManagement from '@/components/tableContents/systemManagement'
	
	export default {
		data() {
			return {
				imageUrl:'',
				form:{
					name:'',
					domain:'',
					website:'',
					desc:'',
					country:'',
					province:'',
					city:'',
					address:'',
					start:'2018-05-06',
					end:'2018-07-08'
				}
			}
		},
		methods: {
		    handleAvatarSuccess(res, file) {
		       this.imageUrl = URL.createObjectURL(file.raw);
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
		    }
		},
		components:{
			'p-system':systemManagement
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
	.el-input{
		width: 80%;
	}
	.el-textarea{
		width: 80%;
	}
	.line{
		width: 100%;
		height: 1px;
		background: #E0E0DD;
	}
	.avatar-uploader{
		margin-left: 10%;
		text-align: left;
		
	}
	.el-form-item__content{
		margin-left: 20%;
	}
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		/*background: #E5E5E5;*/
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 330px;
		height: 196px;
		line-height: 196px;
		text-align: center;
		background: #E5E5E5;
		
	}
	
	.avatar {
		width:330px;
		height: 196px;
		/*display: block;*/
	}
</style>