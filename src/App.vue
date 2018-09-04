<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
	
  export default {
    name: 'app'
  }
</script>


<style>
  body {
    overflow-x: hidden;
    background-color: rgba(237, 239, 251, 0.5);
  }

  html,
  body,
  div,
  ul,
  li,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  dl,
  dt,
  dd,
  ol,
  form,
  input,
  textarea,
  th,
  td,
  select {
    margin: 0;
    padding: 0;
    font-family: "Microsoft YaHei";
    list-style: none;
  }

  html,
  body {
    height: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: normal;
  }

  ul,
  ol {
    list-style: none;
  }

  input,
  textarea {
    outline: none;
    border: none;
  }

  img {
    border: none;
    vertical-align: middle;
  }

  a {
    text-decoration: none;
    /*color: #232323*/
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*height: 100%;*/
  }
  /*头部导航*/
	.head {
    background-color: #101010;
  }

  .logo {
    width: 270px;
    height: 42px;
  }

  .el-dropdown-link {
    /*color: #E5E5E5;*/
    cursor: pointer;
  }

  .headPic {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  /*侧边栏*/
 .el-container{
 	height: 100%;
 }
 
 /*button按钮*/
.el-button--primary {
    border-radius: 0px;
    background-color: #FF9800;
    border: #FF9800;
  }

  .el-button--primary:hover {
    background-color: #FF9800;
    border: #FF9800;
  }

  .el-button--primary:focus {
    background-color: #FF9800;
    border: #FF9800;
  }
  
  .buttonText{
  	color: #FF9800;
  }
  .buttonText:hover{
  	color: #FF9800;
  }
  .buttonText:focus{
  	color: #FF9800;
  }
</style>
