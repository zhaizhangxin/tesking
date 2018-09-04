<template>
	<el-main style="padding: 0;">
		<div class="cert">
			<p class="grid-content" style="text-align: left;">投票</p>
			<div class="line"></div>
			
			<div v-for="item in progress" style="margin-top: 2%;">
				<p class="grid-content" style="text-align: left;font-size: 12px;">{{item.title}}
					<el-button icon="el-icon-delete" type="text" style="margin-left: 2%;color: #B5C0FF;font-size: 16px;" @click="deletes(item.id)"></el-button>
				</p>
				<el-row :gutter="24" v-for="(items,index) in item.children" style="margin-top: 1%;">
					<el-col :span="2" style="text-align: right;">
						<p style="font-size: 12px;">{{items.name}}</p>
					</el-col>
					<el-col :span="16" style="text-align: left;">
						<el-progress :percentage="items.num" color="#b5c0ff" style="margin-left: 1%;line-height: 30px;"></el-progress>
					</el-col>
					<el-col :span="2" style="text-align: left;">
						<p style="font-size: 12px;">{{items.ticket}}票</p>
					</el-col>
				</el-row>
			</div>
			
			<el-dialog title="删除" :visible.sync="votes" width="40%" center>
				<span>确定删除该投票吗？</span>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="finished">确定</el-button>
					<el-button @click="votes = false" type="text" style="color: #B5C0FF;">取消</el-button>
				</span>
			</el-dialog>
			
		</div>
	</el-main>
</template>

<script>
	export default{
		data(){
			return{
				votes:false,
				progress:[
					{
						title:'数学课的种类多吗?',
						id:1,
						children:[
							{name:'很多',num:80,ticket:'118'},
							{name:'一般',num:54,ticket:'56'},
							{name:'很少',num:16,ticket:'27'},
						]
					}
				]
			}
		},
		methods:{
//			删除投票
			deletes(id){
				this.deleteId = id;
				this.votes = true;
			},
//			确认删除
			finished(){
				this.votes = false;
				console.log(this.deleteId)
			}
		}
	}
</script>

<style>
	.cert {
		padding: 20px;
		background-color: #fff;
		text-align: left;
	}
	.line{
		margin-top: 2%;
		width: 100%;
		height: 1px;
		background: #E0E0DD;
	}
</style>