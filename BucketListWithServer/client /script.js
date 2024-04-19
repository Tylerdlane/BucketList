const baseURL = 'https://83yhfie1o0.execute-api.us-east-1.amazonaws.com/dev/bucket'
//  const baseURL = "http://localhost:3000/bucket"

//Read
$(document).ready(function () {
    //Once the doc is ready... make our api call
    fetch(baseURL)
        .then(response => response.json())
        .then(data => {
            //Once we have successful response empty the hardcoded li's
            $("ul").empty()
            //Iterate over our array of objects - aka each bucketitem
            data.forEach(item => {
                let completed = data.isComplete ? "completed" : ""
                //Append our li - item
                $("ul").append(`
            <li data-id="${item.id}" class="${completed}">
            ${item.description}
                <span>
                <i class="fa-regular fa-trash-can"></i>
                </span>
            </li>
            `)
            })
        })
        .catch(error => console.log(error))
})




// Crud - create

$('input').keypress((event) => {
    if (event.which === 13) {
        let inputVar = $(event.target).val().trim().substring(0, 30);
        //once the user has entered an item - and we store what they typed in

        //We make a call to our server and send the value the user typed in, in the body
        fetch(baseURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ description: inputVar })
        })
            .then(response => response.json())
            .then(data => {
                //Once we get a successful response... do we append the item
                // console.log(data)
                $('ul').append(
                    //We use the id that is coming back from the server - else our li would not have an id until we refreshed and read triggered again
                    `<li data-id="${data.id}">
                ${inputVar}
                <span>
                    <i class="fa-regular fa-trash-can"></i>
                </span>
            </li>`
                )
                // empty out the input
                $(event.target).val("")
            })
            .catch(error => console.log(error))
    }
})


// crUd - update
$("ul").on('click', 'li', function () {
    //Grab the id of the li that was clicked on
    let id = $(this).data("id")
    //Build our endpoint using the id we grabbed /bucket/:id
    let endpoint = `${baseURL}/${id}`
    fetch(endpoint, {
        method: "PUT"  
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            if (data.message === "Success") {
                $(this).toggleClass('completed')
            }
        })
        .catch(error => console.log(error))

})




// cruD - delete
$("ul").on('click', 'span', function (event) {
    //Stop from bubbling up - only want the click on the span to trigger
    event.stopPropagation();

    //Grab the id 
    let id = $(this).parent().data("id");

    let endpoint = `${baseURL}/${id}`

    fetch(endpoint, {
        method: "DELETE"
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            //ONLY if we get a success on our backend meaning it deleted there will we delete on the client
            if (data.message === "Success") {
                $(this).parent().remove();
            }
        })
        .catch(error => console.log(error))

})

