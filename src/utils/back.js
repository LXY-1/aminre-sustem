/*
返回功能封装
*/
export var backPage = function (vThis) {
  console.log(vThis);
  vThis.$confirm('是否确认返回?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    vThis.$router.back(-1);
  }).catch(() => {

  });
}
