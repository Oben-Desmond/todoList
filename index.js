let app;

const listElement = document.getElementById(`list`)
const inputElement = document.getElementById(`task`)
const loadingElement = document.getElementById(`loading`)
const emptyElement = document.getElementById(`empty`)

let list = [

]



function main() {

    const config = {
        apiKey: "AIzaSyDl-gDSQF6_7ESjmn4kMpyzeiABrCiIEIo",
        authDomain: "todo-7a953.firebaseapp.com",
        projectId: "todo-7a953",
        storageBucket: "todo-7a953.appspot.com",
        messagingSenderId: "984838943565",
        appId: "1:984838943565:web:752cca856329fd271c7d04",
        measurementId: "G-HB1L67Y96R"
    }

    app = firebase.initializeApp(config)


    retrieveList()

}

async function addToList() {
    const title = inputElement.value
    const database = app.database();

    const timestamp = Date.now()
    showLoading(true)
    await database.ref(`list`).child(timestamp).set({
        title,
        id: timestamp,
        timestamp
    })
    showLoading(false)
    inputElement.value = ``

}


async function deleteItem(id) {
    const database = app.database();
    console.log(id)
    showLoading(true)

    await database.ref(`list`).child(id).remove()
    showLoading(false)

}


function retrieveList() {

    const database = app.database();

    showLoading(true)
    database.ref(`/list`).orderByChild(`timestamp`).on(`value`, (snapshot) => {
        const value = snapshot.val();
        list = value?Object.values(value):[];
         
        if (list.length <= 0) {
            showLoading(false)
            emptyElement.innerHTML= (`
              <h3>No Items in Database</h3>
        `);
        }else{
            emptyElement.innerHTML=``
        }

        listElement.innerHTML = list.map((item) => {
            return (`
            <div class="list-item">
            <div  class="label">${item.title}</div>
            <button onclick="deleteItem(${item.id})" class="delete">delete</button>
        </div>
            `)
        })
        showLoading(false)


    })



}


function showLoading(value) {

    loadingElement.style.display = value ? `block` : `none`;
}

