const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
describe('Testing posting comments', function () {
    this.timeout(100000);
    it('Tests if the db can save comments successfully', async () => {
        const result = await chai.request('https://us-central1-my-awesome-project-86da3.cloudfunctions.net')
            .post('/postcomment')
            .set('content-type', 'application/json')
            .send({ data : {handle: 'TestEnda', comment: 'Test comment from Enda'} } );
    });
});