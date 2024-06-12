function ipSend(event) {
  event.preventDefault()
  console.log('IP BLOCK INITIATED')
  if (window.supabase) {
    const supabaseUrl = 'https://ettzkxqykheylpckmsue.supabase.co'
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0dHpreHF5a2hleWxwY2ttc3VlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyMTcyMzQsImV4cCI6MjAzMzc5MzIzNH0.cXg_8de7LNzuESXvGdcSqPvBVIy7iVF3jCN0LLYpFPw'
    
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)

    async function uploadData(ip, reason, ts, length) {
        const { data, error } = await supabase
            .from('IP-BLOCKS')
            .insert([
                { ip: ip, reason: reason, ts: ts, length: length }
            ])

        if (error) {
            console.error('Error uploading data:', error)
        } else {
            console.log('Data uploaded successfully:', data)
        }
    }

    const ip = document.querySelector('#ipblock-ip').value
    const reason = document.querySelector('#ipblock-reason').value
    const ts = new Date().toString()
    const length = document.querySelector('#ipblock-length').value

    uploadData(ip, reason, ts, length)
    document.querySelector('#ipblock-ip').value = ''
    document.querySelector('#ipblock-reason').value = ''
    document.querySelector('#ipblock-length').value = ''
  } else {
    console.error('Supabase library not loaded')
    alert('Supabase library not loaded')
  }
}

function blockIp() {
  let current = document.querySelector('#restricted').innerHTML
  let update = current
  update += `<form id='blockform'><input type='text' placeholder='IP to block' id='ipblock-ip'><input type='text' placeholder='Reason' id='ipblock-reason'><input type='text' placeholder='Length' id='ipblock-length'><button type='submit'>Block</button></form>`
  document.querySelector('#restricted').innerHTML = update

  document.querySelector('#blockform').addEventListener('submit', ipSend)
}