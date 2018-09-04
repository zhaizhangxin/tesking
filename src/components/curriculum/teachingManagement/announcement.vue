<template>

		<el-main style="padding: 0;">
			<div class="cert">
				<el-row :gutter="24">
					<el-col :span="12" style="text-align: left;">
						<p>公告</p>
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="primary" @click="creatMent">创建公告</el-button>
					</el-col>
				</el-row>
				
				<el-dialog title="创建公告" :visible.sync="createAnnnoun" width="50%" center>
					<el-form :model="formData">
						<el-form-item>
							<el-row :gutter="24">
								<el-col :span="4" style="text-align: right;">
									<p>公告标题：</p>
								</el-col>
								<el-col :span="16">
									<el-input v-model="formData.title" maxlength="30"></el-input>
									<p style="font-size: 12px;color: #999999;">公告标题最多为30字</p>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<el-row :gutter="24">
								<el-col :span="4" style="text-align: right;">
									<p>公告内容：</p>
								</el-col>
								<el-col :span="16">
									<div class='tinymce'>
										<editor class="editor" v-model="formData.content" :setting="editorSetting" @input="(content)=> content = content"></editor>
									</div>
								</el-col>
							</el-row>
						</el-form-item>
					</el-form>
					<span slot="footer" class="dialog-footer">
						<el-button type="primary" @click="finishedCreate">确定</el-button>
						<el-button @click="createAnnnoun = false" type="text" style="color: #B5C0FF;">取消</el-button>
					</span>
				</el-dialog>
				
				<div class="line_s"></div>
				<div v-for="item in annouce" style="padding: 2%;border-bottom: 1px solid #E0E0DD;">
					<el-col :span='24'>{{item.title}}</el-col>
					<el-row :gutter="24">
						<el-col :span="6" style="font-size: 14px;">
							<p>发布时间：{{item.createTime|moment("YYYY-MM-DD")}}</p>
							<p>发布人：{{item.userName}}</p>
							<!--<p>班级：{{item.class}}</p>-->
							<p>已读：{{item.readUserNums}}/{{item.allUserNums}}</p>							
						</el-col>
						<el-col :span="14">
							<div style="color: #999999;font-size: 12px;">
								<span>内容：</span>
								<p style="color: #999999;font-size: 12px;display: inline-block;" v-html="item.content"></p>								
							</div>
							<!--<p style="color: #999999;font-size: 12px;">内容：{{item.content}}</p>-->
						</el-col>
						<el-col :span="2" style="text-align: right;">
							<el-button icon="el-icon-delete" type="text" style="color: #B5C0FF;font-size: 16px;" @click="deletes(item.id)"></el-button>
						</el-col>
					</el-row>
				</div>
				
				<el-dialog title="删除" :visible.sync="deleteAnnou" width="40%" center>
					<span>确定删除该公告吗？</span>
					<span slot="footer" class="dialog-footer">
						<el-button type="primary" @click="finished">确定</el-button>
						<el-button @click="deleteAnnou = false" type="text" style="color: #B5C0FF;">取消</el-button>
					</span>
				</el-dialog>
					
			</div>

		</el-main>

</template>
<script>
	import editor from '@/components/ue'

	export default {
		data() {
			return {
				id:'',
				createAnnnoun:false,//创建公告
				formData:{
					title:'',
					content:''
				},
				deleteAnnou:false,//删除公告
				deleteId:'',
				annouce:[],
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
			}
		},
		created(){
			this.id = localStorage.getItem('id');
			this.announcement();
		},
		methods: {
			announcement(){
				this.$api.TeaAnnounce.announcement(this.id,result => {
					console.log(result)
					if(result.success == true){
						this.annouce = result.data.AnnounceDtoList
					}else{
						console.log(result.errors)
					}
				})
			},
//			删除公告
			deletes(id){
				this.deleteId = id;
				this.deleteAnnou = true;
			},
//			确认删除
			finished(){
				this.$api.TeaAnnounce.deleteAnnounce(this.deleteId,result => {
					if(result.success == true){
						this.deleteAnnou = false;
						this.announcement();
					}else{
						console.log(result.errors)
					}
				})
				
			},
//			创建公告
			creatMent(){
				this.createAnnnoun = true;
			},
//			确认创建公告
			finishedCreate(){
				this.$api.TeaAnnounce.announce(this.id,this.formData,result => {
					if(result.success == true){
						this.createAnnnoun = false;
						this.announcement();
						this.formData = {
							title:'',
							content:''
						}
					}else{
						console.log(result.errors)
					}
				})
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
	
	li {
		display: inline-block;
		/*margin: 0 10px;*/
	}
	
	a {
		color: #42b983;
	}
	
	.grid-content {
		line-height: 30px;
	}
	
	.cert {
		padding: 20px;
		background-color: #fff;
		text-align: left;
	}
	
	.list {
		text-align: left;
	}
	.line_s {
		margin: 8px 0;
		width: 100%;
		height: 1px;
		background-color: #E9E9E9;
	}
</style>