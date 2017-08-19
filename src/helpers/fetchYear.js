export class fetchYear {
  constructor(year) {
    this.year = year;
    this.baseUrl = "http://ergast.com/api/f1/";
    this.url =  this.baseUrl + this.year ;
    console.log(this.url);
    // this.data = this.fetchData();
  // /  this.data  = this.fetchData();
    // console.log(this.data);
  }

  async fetchAsync() {
    // await response of fetch call
    //
    let response = await fetch(this.baseUrl + this.year  + ".json" );
    // only proceed once promise is resolved
    let data = await response.json();
    // only proceed once second promise is resolved
    return data;
  }

  async getData(){
    // let data = await (await (fetch(this.url)
    //   .then(res => {
    //     console.log(JSON.stringify(res.json()));
    //     return res.json()
    //   })
    //   .catch(err => {
    //     console.log('Error: ', err)
    //   })
    // ))

    let response = await fetch(this.url);
    // only proceed once promise is resolved
    let data = await response.json();
    // only proceed once second promise is resolved
    return data;
  }



  get data(){
      return this.getData();
    }
}
