const express = require('express');
const app = express();
const AWS = require('aws-sdk');
const fs = require('fs');


AWS.config.update({
  accessKeyId: 'AKIAT6DNUNA4WELGVDO2',
  secretAccessKey: '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',
  region: 'ap-northeast-2'
});

const s3 = new AWS.S3();
/*const params = {
  Bucket: 'yaoteam8',
  Key: 'WAITAO.obj'
};*/
app.get('/get-obj/:fileName', (req, res) => {
  const fileName = req.params.fileName; // 获取 URL 中传递的文件名参数
  const params = {
    Bucket: 'yaoteam8',
    Key: fileName // 使用传递的文件名参数
  };

  s3.getObject(params, (err, data) => {
    if (err) {
      console.error(err, err.stack);
      res.status(500).send('Error fetching object from S3');
    } else {
      res.send(data.Body);
    }
  });
});


app.listen(3000, () => {
  console.log('Server running on port 3000');
});

