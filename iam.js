let accesscode = ''
let firebaseConfig = {} 
let database = ''
let apiKeySess = sessionStorage.getItem('authid')

function userDataTable() {
  let date = new Date()
  document.querySelector('#userinfotable').style.display = 'block'
  document.querySelector('#timestamp-userinfo').innerHTML = 'Generated at: '+date.toString()
  database.ref('users').once('value', snapshot => {
    const users = snapshot.val()
    const userArray = Object.keys(users).map(email => {
        // Default values if info or fields are missing
        const userInfo = users[email].info || {};
        return {
            email: email,
            id: users[email].id || 'No ID available',
            firstName: userInfo.fn || 'No first name',
            lastName: userInfo.ln || 'No last name',
            password: userInfo.pw || 'Cannot be shown'
        }
    })

    const table = document.createElement('table')
    const thead = document.createElement('thead')
    const tbody = document.createElement('tbody')
    const headerRow = document.createElement('tr')

    const headers = ['e', 'id', 'fn', 'ln', 'pw']
    headers.forEach(header => {
        const th = document.createElement('th')
        th.textContent = header
        headerRow.appendChild(th)
    })

    thead.appendChild(headerRow)
    table.appendChild(thead)

    userArray.forEach(user => {
        const tr = document.createElement('tr')

        const tdEmail = document.createElement('td')
        tdEmail.textContent = user.email
        tr.appendChild(tdEmail)

        const tdId = document.createElement('td')
        tdId.textContent = user.id
        tr.appendChild(tdId)

        const tdFirstName = document.createElement('td')
        tdFirstName.textContent = user.firstName
        tr.appendChild(tdFirstName)

        const tdLastName = document.createElement('td')
        tdLastName.textContent = user.lastName
        tr.appendChild(tdLastName)

        const tdPassword = document.createElement('td')
        tdPassword.textContent = user.password
        tr.appendChild(tdPassword)

        tbody.appendChild(tr)
    })

    table.appendChild(tbody)
    document.getElementById('userinfotable').appendChild(table)
})
}
function emails() {
  
}
document.querySelector('#code').addEventListener('submit', (event) => {
  event.preventDefault()
  let code = document.querySelector('#codeinput').value
  firebaseConfig = {
    apiKey: apiKeySess+"ZYqrpT04a5zOkB5uQYK3lE3CuMhkhC8",
    authDomain: `oauth-page-${code}.firebaseapp.com`,
    databaseURL: `https://oauth-page-${code}-default-rtdb.firebaseio.com`,
    projectId: `oauth-page-${code}`,
    storageBucket: `oauth-page-${code}.appspot.com`,
    messagingSenderId: `401481049573`,
    appId: `1:401481049573:web:f1f9ca852e96d580cf3b0c`
  } 
  console.log(firebaseConfig)
  let app = firebase.initializeApp(firebaseConfig, 'app')
  database = app.database() 
  let emaillist
  database.ref('temp/').set({ sessid: self.crypto.randomUUID() })
    .then(() => {
      console.log('Write succeeded')
      document.querySelector('#code').style.display = 'none'
      document.querySelector('#last').style.display = 'block'
      // USER IS SUCESSFULLY AUTHENTICATED: (EVERYTHING SHOULD HAPPEN IN THIS LOOP)
      let current = document.querySelector('#options')
      let add = ''
      add += `<div id=\'cardholder\'><a href=\'javascript:userDataTable()\'><div class=\'card\'><div class=\'cardimg\'><i class="fa-solid fa-user fa-8x card-fa-img"></i></div><div class=\'cardtext\'><h1 class=\'cardh1\'>Load User Data</h1><p class=\'cardp\'>Generate a list of current user data, returns as a table.</p></div></div></a><a href=\'javascript:()\'><div class=\'card\'><div class=\'cardimg\'><i class="fa-solid fa-list fa-8x card-fa-img"></i></div><div class=\'cardtext\'><h1 class=\'cardh1\'>View Recent Events</h1><p class=\'cardp\'>Generate a list of recent events that occured in the system.</p></div></div></a><a href=\'javascript:blockIp()\'><div class=\'card\'><div class=\'cardimg\'><i class="fa-solid fa-hand fa-8x card-fa-img"></i></div><div class=\'cardtext\'><h1 class=\'cardh1\'>Block an IP</h1><p class=\'cardp\'>Prevent a user from accessing all sites using their IP.</p></div></div></a></div><button id='emaillist'>Email List</button>
      <input type='text' id='emaillist-copy' placeholder='Email List to Copy'></input>`
      current.innerHTML = add
      document.querySelector('#emaillist').addEventListener('click', async () => {
        console.log('emaillist')
        await database.ref('users').on('value', (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const email = childSnapshot.child('info/e/').val()
            console.log(email)
            if (email != null) {
              emaillist += `${email},`
              document.querySelector('#emaillist-copy').value = emaillist.replace(undefined, '')
            }
            // console.log(emaillist).replace(undefined, '')
          })
        })
        
      })
      document.querySelector('#ipblock').innerHTML = `<h1>Block an IP Address</h1><form id='ipbanform'><input type='text' required placeholder='IP Address' class='longform' id='ipInput'></input><input type='text' id='reason' class='longform' required placeholder='Reason for Ban'></input><button type='submit' class='submitbut'>Block IP Address</button></form>`
    })
    .catch(error => alert(error.message))
})


document.querySelector('#welcome').innerHTML = 'Welcome, Preston.'
document.querySelector('#closeUserTable').addEventListener('click', () => {
  document.querySelector('#userinfotable').style.display = 'none'
})
