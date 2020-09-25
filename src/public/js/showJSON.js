function showJSON() {
    let ajax = new XMLHttpRequest()
    ajax.open('GET', 'data.json')
    ajax.onreadystatechange = function() {

        console.log(ajax.status)
    }
    console.log(ajax.status)
    ajax.send()
}

showJSON()