const { MongoClient } = require('mongodb');

const url = 'mongodb://root:password@18.162.71.8:27017/';

MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  if (err) throw err;
  const dbo = db.db('frontend');
  // const whereStr = { name: '' }; // 查询条件
  const whereStr = {};
  dbo.collection('data').find(whereStr).toArray((error, result) => {
    if (error) throw err;
    console.log(result);
    db.close();
  });
});
