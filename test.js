const request = require('superagent');

request.post('http://ec2-52-65-73-16.ap-southeast-2.compute.amazonaws.com/tokens')
  .type('json')
  .set('authorization', '4xPLRntTp7A3r3AK')
  .send({
    username: 'JA004288462',
    password: 'Alorica8462',
  })
  .then(res => {
    return request.get('http://ec2-52-65-73-16.ap-southeast-2.compute.amazonaws.com/user')
      .set('authorization', `Bearer ${res.body.access_token}`)
  })
.then(console.log)
.catch(console.log)
