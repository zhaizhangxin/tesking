let OSS = require('ali-oss');
let co = require('co');

let client = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAIZsHOKiz23lz7',
  accessKeySecret: 'f3T9brhGBYiZuXBrG8giojj6ixesbg',
//bucket: 'tskedu-course'
});

//async function put () {
//try {
//  let result = await client.put('object-key', 'build/logo.png');
//  console.log(result);
// } catch (err) {
//   console.log (err);
// }
//}
//put();
//co(function* () {
//  client.useBucket('tskedu-course');
//  var result = yield client.put('object-key', 'build/logo.png');
//  console.log(result);
//}).catch(function (err) {
//  console.log(err);
//});