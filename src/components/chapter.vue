<template>
	<el-main style="display: flex;margin: auto;width: 80%;margin-top: 4%;">
		<el-conAside style="width: 200px;"></el-conAside>
		<router-view></router-view>
	</el-main>
</template>


<script>
	import CurriculumCenters from '@/components/tableContents/curriculumCenter'
	export default{
		data(){
			return{
				
			}
		},
		components:{
			'el-conAside':CurriculumCenters
		}
	}
</script>

<style>
</style>