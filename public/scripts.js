console.log('front end scripts')

const urlButton = document.getElementById('submitUrl')
const input = document.getElementById('url')
const contentDiv = document.getElementById('content-area')
const loadingRing = document.getElementById('loading-ring')

const baseUrl = 'http://localhost:8000/'

urlButton.addEventListener('click', submitUrl)

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
    input.style.color = 'gray'
    loadingRing.style.display = 'block'
    if (input.value == '') {
        return
    }
    if(input.value.indexOf('seekingalpha.com') === -1) {
        alert('please enter a seeking alpha article')
        return
    }
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