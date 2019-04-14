// alert('connected');
$('#add-btn').on('click', (event) => {
    event.preventDefault();

    let newFriend = {
        name: $('#name').val().trim(),
        photo: $('#image').val().trim(),
        q1: $('#q1').val().trim(),
        q2: $('#q2').val().trim(),
        q3: $('#q3').val().trim(),
        q4: $('#q4').val().trim(),
        q5: $('#q5').val().trim()
    }
    // Question: What does this code do??
    $.get('/api/tables', function(data) {
        if (data.length <= 4) {
            $.post("/api/tables", tableRes)
            .then(function(data) {
            console.log(data);
            alert("Reservation Added!");
            });
        } else {
            $.post("/api/waitlist", tableRes)
            .then(function(data) {
            console.log(data);
            alert("Reservations are full. However, you're on the waitlist.");
            });
        }
    })
})



checkAriaExpanded = () => {
    console.log($('#dropdown-button-check').attr('aria-expanded'));
    if ($('#dropdown-button-check').attr('aria-expanded') === 'false') {
        $('#bottom-nav').removeClass('bg-transparent');
        $('#bottom-nav').addClass('bg-dark');
    } else if ($('#dropdown-button-check').attr('aria-expanded') === 'true') {
        $('#bottom-nav').removeClass('bg-dark');
        $('#bottom-nav').addClass('bg-transparent'); 
    }
}

$('#dropdown-button-check').on('click', checkAriaExpanded);