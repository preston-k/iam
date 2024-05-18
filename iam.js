let accesscode = ''
let firebaseConfig = {} 
let apiKeySess = sessionStorage.getItem('authid')
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
  firebase.initializeApp(firebaseConfig) 
  let database = firebase.database() 
  
  database.ref('temp/').set({ sessid: self.crypto.randomUUID() })
    .then(() => {
      console.log('Write succeeded')
      document.querySelector('#code').style.display = 'none'
      document.querySelector('#last').style.display = 'block'
    })
    .catch(error => alert(error.message))

})


document.querySelector('#welcome').innerHTML = 'Welcome, Preston.'
