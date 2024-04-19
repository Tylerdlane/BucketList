// crUd update
$('ul').on('click','li', function (){
    $(this).toggleClass('completed')
})
// cruD delete
$('ul').on('click','span', function(){
    $(this).parent().remove();
})
// Crud
//Create if the user types enter
$('input').keypress(function(event) {
    if(event.which === 13){
        let inputVar = $(this).val().trim().substring(0,30);
        // append a new li
        $('ul').append(
        `<li>
            ${inputVar}
            <span>
            <i class="fa-regular fa-trash-can"></i>
            </span>
        </li>`
        )
        //empty out the input field
        $(this).val("")
    }
})