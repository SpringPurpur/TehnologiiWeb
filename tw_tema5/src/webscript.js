const btn = document.getElementById('btn1')
btn.addEventListener('click', () => {
    const paragraph = document.createElement('p');
    paragraph.innerHTML = "You suck"
    document.body.appendChild(paragraph)
})