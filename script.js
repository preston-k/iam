let firebaseConfig = {
  apiKey: "AIzaSyD47p-Dpi12PHmBd9cZzwWaKjmrGyJM3LM",
  authDomain: "identity-and-access-mana-7c680.firebaseapp.com",
  projectId: "identity-and-access-mana-7c680",
  storageBucket: "identity-and-access-mana-7c680.appspot.com",
  messagingSenderId: "64440352376",
  appId: "1:64440352376:web:c62d303a5f79cf9302b78d"
}
firebase.initializeApp(firebaseConfig) 
let database = firebase.database()
let sessionid = self.crypto.randomUUID()
let ip = ''
let date = new Date()
let timestamp = date.toString()
fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    console.log('User IP:', data.ip)
    database.ref(`pagevisits/${sessionid}`).update({ 
      id: sessionid,
      ip: data.ip,
      ts: timestamp
    })
  })
  .catch(error => console.error('Error fetching IP:', error))


  document.querySelector('#credentials').addEventListener('submit', (event) => {
    event.preventDefault()
    console.log('Form Submitted')
    let userInputEmail = document.querySelector('#email').value
    let userInputPw = document.querySelector('#password').value
    let userInputAuth = document.querySelector('#authid').value
    console.log(userInputAuth+userInputEmail+userInputPw)

    let hashedPassword = CryptoJS.SHA256(userInputPw).toString()
    console.log(hashedPassword)
    let hashedEmail = CryptoJS.SHA256(userInputEmail).toString()
    console.log(hashedEmail)
    firebase.database().ref('login-email').on('value', (snapshot) => {
      const emailData = snapshot.val()
      console.log(emailData)
      firebase.database().ref('login-pw').on('value', (snapshot) => {
        const pwData = snapshot.val()
        console.log(pwData)
        if (pwData != hashedPassword) {
          database.ref(`login-attempts/fail-${sessionid}`).update({ 
            id: sessionid,
            ts: timestamp,
            status: 'failed--pw',
            input: userInputPw
          })
          alert('Sorry, this login attempt has been blocked and this attempt has been logged.')
        }
        if (emailData != hashedEmail) {
          database.ref(`login-attempts/fail-${sessionid}`).update({ 
            id: sessionid,
            ts: timestamp,
            status: 'failed--email',
            input: userInputEmail
          })
          alert('Sorry, this login attempt has been blocked and this attempt has been logged.')
        }
        if (emailData === hashedEmail && pwData === hashedPassword) {
          database.ref(`login-attempts/sucess-${sessionid}`).update({ 
            id: sessionid,
            ts: timestamp,
            status: 'sucessful',
            input_pw: hashedPassword,
            input_email: hashedEmail,
            authId: userInputAuth
          })
          sessionStorage.setItem('loggedin', 'true')
          sessionStorage.setItem('authid', userInputAuth)
          alert('You have been sucessfully authenticated.')
          window.location.replace('/iam.html')
        }
      })
    })
  })