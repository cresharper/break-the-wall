console.log('front end scripts')

const urlButton = document.getElementById('submitUrl')
const input = document.getElementById('url')
const submitError = document.getElementById('error')
const contentDiv = document.getElementById('content-area')
const loadingRing = document.getElementById('loading-ring')

const baseUrl = 'http://localhost:8000/'

urlButton.addEventListener('click', submitUrl)

input.addEventListener('keyup', function() {
    // console.log(this.style.borderColor)
    if(this.style.borderColor != '') {
        this.style.borderColor = '';
        submitError.innerHTML = '';
    }
})

async function getArticle() {
    const res = await fetch(baseUrl + 'info/connor?key=hello', {
        method: 'GET'
    })
    const data = await res.json()
    console.log(data.info)
    loadingRing.style.display = 'none'
    contentDiv.innerHTML = data.info
}

async function submitUrl(e) {
    e.preventDefault()
    if (input.value == '') {
        input.style.borderColor = 'red'
        submitError.innerHTML = 'Please enter a URL'
        return
    }
    if(input.value.indexOf('seekingalpha.com') === -1) {
        input.style.borderColor = 'red'
        submitError.innerHTML = 'The URL needs to be Seeking Alpha'
        return
    }
    input.style.color = 'gray'
    loadingRing.style.display = 'block'
    const res = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            wantedUrl: input.value
        })
    })
    setTimeout(() => {
        getArticle()
    }, 2500)
}