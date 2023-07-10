let chai=require("chai")
let chaiHttp=require("chai-http")
let expect=chai.expect
chai.use(chaiHttp)
describe("To test if base api is working fine",()=>{
    it("should succeded",(done)=>{
       chai.request("http://localhost:8590")
       .get("/")
       .then((res)=>{
        expect(res).to.have.status(200)
        done()
       })
       .catch((err)=>{
        throw err
       })
    })
})