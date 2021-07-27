document.querySelector('#getText').addEventListener('click', getText);

document.querySelector('#getJSON').addEventListener('click', getJsonFromExternalApi)



//  getting data from the txt file using fetch
function getText(){
    fetch('static/files/sample.txt')
    .then( (resp) => resp.text())
    .then( (data) => {
        document.querySelector('#displayBox').setAttribute('style', "border: 1px solid black; padding: 5px; background:#f4f4f4");
        document.querySelector('#displayBox').innerHTML = `<p> ${data} </p>`
    })
    .catch( (err) => console.log(err))
}


// getting data from external api JSON type
function getJsonFromExternalApi() {
    const url = 'https://jsonplaceholder.typicode.com/posts';

    fetch(url)
    .then( (response) => response.json())
    .then( (data) => {
        document.querySelector('#displayBox').setAttribute('style', "border: 1px solid black; padding: 5px");
        let output = "<h1 style = 'text-align : center; font-family: seic'> POSTS </h1>";
        data.forEach(postMessage => {
            output += `<div style = "display:block;      background: #f4f4f4"; padding: 5px; margn-bottm : 20px> 
            <h5 style = "font-weight: bold; margin:5px 10px 0 10px"> ${postMessage.id}. ${postMessage.title} </h5>
            <p style = "margin: 5px 10px 10px 15px"> ${postMessage.body}</p>
        </div>`;
        document.querySelector('#displayBox')
        .innerHTML = output;
            
        });
    })
    
}


document.querySelector('#addPost').addEventListener('click', displayAddForm);


function displayAddForm() {

    document.querySelector('#addPost').remove();

    document.querySelector('#displayAddForm')
            .innerHTML = `
            <div style="width: 100%; display: block; text-align: center;">
                <form action="" id="dataForm">
                    <input type="text" id="title" style="width: 80%; margin-bottom: 10px;" placeholder="title">

                    <textarea name="" id="bodyText" style="width: 80%; display: block; margin: 0 auto 10px;" placeholder="body"></textarea> 

                    <input type="submit" value="Add Post" id="addInput" class="btn btn-secondary" >
                </form>
            </div>
            `;

    document.querySelector('#dataForm').addEventListener('submit', postDataToApi)
    
}


// posting data to external api
function postDataToApi(e) {
    console.log(e);
    e.preventDefault();
    const postTitle = document.querySelector('#title').value;
//    console.log(title);
    const postBody = document.querySelector('#bodyText').value;

    const url = 'https://jsonplaceholder.typicode.com/posts';

    addPostToApiUsingFetch(url, postTitle, postBody);


}

// posting using fetch API
function addPostToApiUsingFetch(url, postTitle, postBody) {

    fetch(url, {
        method:'POST',
        body:JSON.stringify({
            title:postTitle,
            body:postBody,
            userId:1
        }),
        headers: {
            'Accept':'application/json, text/plain, */*',
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then( (response) => response.json())
        .then( (data) => {

            document.querySelector('#displayMessage').setAttribute('style', 'border: 1px solid black; margin-top: 20px;');

            let output = "<h1 style = 'text-align : center; font-family: seic'> The Data was seccussfully posted! </h1>";
        
            output += `<div style = "display:block;      background: #f4f4f4"; padding: 5px; margn-bottm : 20px> 
            <h5 style = "font-weight: bold; margin:5px 10px 0 10px"> ${data.id}. ${data.title} </h5>
            <p style = "margin: 5px 10px 10px 15px"> ${data.body}</p>
        </div>`;

        document.querySelector('#displayMessage')
        .innerHTML = output;
            

        })
    
}


document.querySelector('#updatePost').addEventListener('click', displayForm)

function displayForm() {
    document.querySelector('#displayForm').innerHTML =`
    <form action="" id="updateForm">
        <input type="text" id="updatedId" style="width: 80%; margin-bottom: 10px; margin-top: 20px" placeholder="Id">

        <input type="text" id="updatedTitle" style="width: 80%; margin-bottom: 10px; " placeholder="Title">

        <textarea name="" id="bodyUpdatedText" style="width: 80%; display: block; margin: 0 auto 10px;" placeholder="Body"></textarea> 

        <input type="submit" value="Update Post" id="updateInput" class="btn btn-secondary" >
    </form>


    <div id="displayUpdateMessage" style="width: 100%; display: block; margin-top: 20px;">
    </div>
    `;
    document.getElementById('updatePost').remove();
    document.querySelector('#updateForm').addEventListener('submit', updatePostInExternalApi);


}

function updatePostInExternalApi(e) {
    e.preventDefault()
    const postId = document.querySelector('#updatedId').value;
    const updatedTitle = document.querySelector('#updatedTitle').value;
    const updatedBody = document.querySelector('#bodyUpdatedText').value;
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    console.log(url);
    updatePostToApiUsingFetch(url, postId, updatedTitle, updatedBody);

    
}

    
function updatePostToApiUsingFetch(url, postId, updatedTitle, updatedBody) {
    
    fetch(url, {
        method:'PUT',
        body:JSON.stringify({

            id:parseInt(postId),
            title:updatedTitle,
            body:updatedBody,
            userId:parseInt(postId),
        }),
        headers:{
            // 'Accept':'application/json, text/plain, */*',
            'Content-type':'application/json; charset=UTF-8',
        }
    })
    .then( (response) => response.json())
    .then( (data) => {

        document.querySelector('#displayUpdateMessage').setAttribute('style', 'border: 1px solid black; margin-top: 20px;');

        let output = "<h1 style = 'text-align : center; font-family: seic'> The Post was seccussfully updated! </h1>";
    
        output += `
        <div style = "display:block;      background: #f4f4f4"; padding: 5px; margn-bottm : 20px> 
            <h5 style = "font-weight: bold; margin:5px 10px 0 10px"> ${data.id}. ${data.title} </h5>
            <p style = "margin: 5px 10px 10px 15px"> ${data.body}</p>
        </div>
        `;

    document.querySelector('#displayUpdateMessage')
    .innerHTML = output;
        

    })
}

document.querySelector('#deletePost').addEventListener('click', displayDeleteForm);

function displayDeleteForm() {
    document.querySelector('#deletePost').remove();

    document.querySelector('#displayDeleteForm')
            .innerHTML = `
            <div style="width: 100%; display: block; text-align: center;">
                <form action="" id="deleteForm">
                    <input type="text" id="deleteId" style="width: 80%; display: block; margin: 0 auto 10px;" placeholder="Id">

                    <input type="submit" value="Delete Post" id="deletePost" class="btn btn-secondary" >
                </form>
            </div>
            <div id="displayDeleteMsg" style="width: 100%; display: block; margin-top: 20px; background: #f4f4f4"> 
            </div>
            `;

    document.querySelector('#deleteForm').addEventListener('submit', deletePostFromExternalApi);

}

function deletePostFromExternalApi(e) {
    e.preventDefault();
    const postId = document.querySelector('#deleteId').value;
    console.log(postId);
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

    fetch(url, {
        method:"DELETE",
    }).then( () => {
        document.querySelector('#displayDeleteMsg')
                    .innerHTML = `<h3 style="font-family: senc; text-transform: uppercase"> the Post with id of ${postId} has been DELETED! </h3>`
    })

}

document.getElementById('getApiGithub').addEventListener('click', getDataFromGithubApi)



/* 
function getDataFromGithubApi() {
    let url = 'https://api.github.com/users';
    getData(url)
}

function getData(url) {
    fetch(url)
    .then( (response) => response.json())
    .then( (data) => {
        data.forEach(user => displayUser(user))
    })
    
}



function displayUser(user) {
    // console.log(user.login);
    const divTage = document.createElement('div');
    divTage.innerHTML = `<div style="display:flex; justify-content :left; background:#f4f4f4; padding: 5px; margin: 0 0 10px 0"><div style= "width: 100px; display:flex">
    <a href= ${user.html_url} style = "text-decoration: none; color: black">  
        <img src="${user.avatar_url}" width= 100 height= 100 style = "margin: 5px">
        </a>
      </div>
    <div style= "display:flex; width: inherit; margin: auto 30px auto 30px">
        <div>
        <a href= ${user.html_url} style = "text-decoration: none; color: black"> 
         <h1 style="font-family:senc"> ${user.login} </h1>
         </a> </div>
    </div>
    </div>`
    document.querySelector('#displayBox').appendChild(divTage);
    
} */


// document.querySelector('#gitHubUsersLoader').addEventListener('click', postDataFromGithubApi);


function getDataFromGithubApi() {
    let url = 'https://api.github.com/users';

    getData(url, (response) => {
        // call back function
        // console.log(response);
        let responseApi = JSON.parse(response);
        // console.log(responseApi);

        // clear previuse data in container
        document.getElementById('displayBox')
        .innerHTML = `<h2 style="font-family:senc; width: 100%; margin-button:20px; padding: 10px;"> Github users: </h2>`;
        responseApi.forEach(user => {
            displayUser(user);
        });
    });

}

function getData(url, callback) {

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = () => {
        // console.log(xhr.status);
        if (xhr.status === 200) {
            // console.log(xhr.response);
            callback(xhr.response);
        }
    }
    xhr.send()
    
}



function displayUser(user) {
    console.log(user.login);
    const divTage = document.createElement('div');
    divTage.innerHTML = `<div style="display:flex; justify-content :left; background:#f4f4f4; padding: 5px; margin: 0 0 10px 0"><div style= "width: 100px; display:flex">
    <a href= ${user.html_url} style = "text-decoration: none; color: black">  
        <img src="${user.avatar_url}" width= 100 height= 100 style = "margin: 5px">
        </a>
      </div>
    <div style= "display:flex; width: inherit; margin: auto 30px auto 30px">
        <div>
        <a href= ${user.html_url} style = "text-decoration: none; color: black"> 
         <h1 style="font-family:senc"> ${user.login} </h1>
         </a> </div>
    </div>
    </div>`
    document.querySelector('#displayBox').appendChild(divTage);
    
}