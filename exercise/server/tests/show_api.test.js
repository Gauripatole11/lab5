





/* eslint-disable no-unused-vars */




const mongoose = require('mongoose');
const supertest = require('supertest');

const helper = require('./test_helper');
const app = require('../app');

const Show = require('../models/show');
const api = supertest(app);

// mostly u get buffering error -moongose error when reading from db .highspeed connection is necessary
beforeEach(async () => {
    await Show.deleteMany({});
    console.log('database cleared :ready');
    for(let show of helper.initialTasks){
        const newshow= new Show(show);
        await newshow.save();
        console.log('tasked saved to db');
    }



    // const showobjects=helper.initialTasks.map(show=>new Task(show));
    // const promiseall=showobjects.map(show=>show.save());
    // await Promise.all(promiseall);
    // console.log("all tasks saved to db");





    // helper.initialTasks.forEach(async(show)=>{
    // 	const newshow= new Task(show);

    // 	await newshow.save();
    // 	console.log("tasked saved to db");
    // });

    // let taskObject = new Task(helper.initialTasks[0]);
    // await taskObject.save();
    // //commenting
    // taskObject = new Task(helper.initialTasks[1]);
    // await taskObject.save();
});

// describe("Show ApI", async() => {});
// Watchlist tests, step2
// Write a test that verifies that the unique identifier property of the shows is named id



// 4.9*: Watchlist tests, step2
// Write a test that verifies
//  that the unique identifier property
//  of the shows is named id, by default the database names the property _id. Verifying the existence of a property is easily done
//  with Jest's toBeDefined matcher.
test('unique indentifier of show is id', async () => {
    const show=await helper.showsInDb();
    show.map(async (showto) => {
        const showid=showto.id;
        expect(showid).toBeDefined();

    });
    console.log('all shows ',show);
});

// 4.13 Watchlist expansions, step1
// Implement functionality for deleting a single show.


test('a show to delete', async () => {
    const allshows= await helper.showsInDb();
    console.log('allshows returned ',allshows);
    const showtodelete=allshows[0];
    console.log('showtodelete',showtodelete.id);
    await api.delete('/api/shows/'+showtodelete.id).expect(401);

    // const response=await api.delete("/api/shows/1");
    // expect(response.status).toBe(200);
},100000);


// 4.10: Watchlist tests, step3

test('new show is added to database', async () => {
    const response1=await api.get('/api/shows');
    console.log('data all in data bse ', response1);
    const newShow={
        title:'Warming tran',
        genre:'action',
        url:'http://localhost.com',
        likes:200

    };
    const data=await api.post('/api/shows').send(newShow);
    // console.log('data created',data);
    console.log('posted data get',data.status);
    expect(data.status).toBe(401);
    const response=await api.get('/api/shows');
    console.log('response data',response.body);
    expect(response.body.length).toBe(response1.body.length);


},100000);


// 4.11*: Watchlist tests, step4
// Write a test that verifies that if the likesproperty is missing from the request, i
// t will default to the value 0.
//  Do not test the other properties of the created shows yet.



test('missing likes default to zero', async () => {
    const response=await api.get('/api/shows');
    response.body.map(async (show) => {
        console.log('shows available',show);
        if (show.likes===undefined){
            expect(show.likes).toBe(0);
        }

    });


});
// 4.12*: Watchlist tests, step5
// Write a test related to creating new shows via the /api/shows endpoint,
// that verifies that if the titleor urlproperties are missing from the request data,
//  the backend responds to the request with the status code 400 Bad Request.
test('missing url or title', async () => {
    const newShow={
        // title:"Warming train",
        genre:'action',
        url:'http://localhost.com',
        likes:200

    };
    const data=await api.post('/api/shows').send(newShow);
    console.log('show created status',data.status);
    expect(data.status).toBe(400);


});


// 4.14 Watchlist expansions, step2
// Implement functionality for updating the information of an individual show.


test('update a single show update likes', async () => {
    const shows=await helper.showsInDb();
    const showid=shows[0].id;
    console.log('shows available data',shows);
    const newshowlikes=shows[0].likes+20;
    const { url,title,genre } = shows[0];
    console.log('details',url,title,genre);
    const data={
        url,
        title,
        genre,
        likes:newshowlikes
    };
    const updatedshow=await helper.updateShow(showid,data);
    console.log('updated show',updatedshow);
    console.log('data',data);
    // const response=await api.put("/api/shows/"+showid).send(data);

    // }
    console.log('newshow likes',newshowlikes);




});

// 4.8: Watchlist tests, step1
// Use the supertest package for writing a test that makes an HTTP GET request to the /api/show URL. Verify that the watchlist application returns the correct amount
// of streaming shows in the JSON format.


// test("length of data received equal to what was posted", async ()=>{
// 	// eslint-disable-next-line no-unused-vars


// 	const response=await api.get("/api/shows");
// 	expect(response.body.length).toBe(helper.initialTasks.length);

// });


// test("a specific task is within the returned tasks", async () => {
// 	const response = await api.get("/api/shows");

// 	const contents = response.body.map(r => r?.title);

// 	expect(contents).toContain(
// 		"Take out the trash"
// 	);
// });




// 4.8: Watchlist tests, step1
// Use the supertest package for writing a test that makes an HTTP GET request to the /api/show URL. Verify that the watchlist application returns the correct amount
//  of streaming shows in the JSON format.




test('shows are returned as json', async () => {
    await api
        .get('/api/shows')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    // const response=await api.get("/api/shows");
    // const contents = response.body.map(r =>  r.title);
    // console.log("database content",contents);
    // expect(contents).toContain("Cooling train");
},100000);



// test("show without title is not added", async () => {
// 	const newShow={
// 		// title:"Warming train",
// 		// genre:"action",
// 		// url:"http://localhost.com",
// 		likes:200

// 	};

// 	await api
// 		.post("/api/shows")
// 		.send(newShow)
// 		.expect(400);

// 	const showsAtEnd = await helper.showsInDb(); // highlight-line

// 	expect(showsAtEnd).toHaveLength(helper.initialTasks.length); // highlight-line
// });





// test("a specific show can be viewed", async () => {
// 	const showsAtStart = await helper.showsInDb();

// 	const showToView = showsAtStart[0];

// 	const resultshow = await api
// 		.get(`/api/shows/${showToView.id}`)
// 		.expect(200)
// 		.expect("Content-Type", /application\/json/);

// 	const processedshowToView = JSON.parse(JSON.stringify(showToView));

// 	expect(resultshow.body).toEqual(processedshowToView);
// });




// test("a task can be deleted", async () => {
// 	const showsAtStart = await helper.showsInDb();
// 	const showToDelete = showsAtStart[0];

// 	await api
// 		.delete(`/api/shows/${showToDelete.id}`)
// 		.expect(204);

// 	const showsAtEnd = await helper.showsInDb();

// 	expect(showsAtEnd).toHaveLength(
// 		helper.initialTasks.length - 1
// 	);

// 	const contents = showsAtEnd.map(r => r?.title);

// 	expect(contents).not.toContain(showToDelete?.title);
// });








afterAll(() => {
    mongoose.connection.close();
});

