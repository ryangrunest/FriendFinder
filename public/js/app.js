// add background color to navbar menu when dropdown button clicked
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
// THIS DOESNT WORK YET AND IDK WHY
validateForm = () => {
    let x = document.forms["survey-form"]["image"].value;
    console.log(x);
    let imageArray = x.split('.');
    console.log(imageArray);
    if (imageValue[imageValue.length - 1] != "jpg") {
      alert("Must be a URL ending with .jpg");
      return false;
    }
  }
indexOfMin = (arr) => {
    if (arr.length === 0) {
        return -1;
    }
    let min = arr[0];
    let minIndex = 0;
    for (var q = 1; q < arr.length; q++) {
        if (arr[q] < min) {
            minIndex = q;
            min = arr[q];
        }
    }
    return minIndex;
}
loadNewFriend = (newFriendIndex) =>  {
    $.get('/api', (data) => {
        console.log(data[newFriendIndex]);
    }).then((data) => {
        $('#modalTitle').text(data[newFriendIndex].name);
        let friendPicURL = data[newFriendIndex].photo;
        let picture = $('<img>').attr('src', friendPicURL).addClass('modalPic');
        $('#modalBody').append(picture);
        $('#myModal').modal('toggle');
    })
}
checkFriends = (data, currentUser) => {
    // create an array for current user obj
    let userArray = Object.values(currentUser);
    let compareArray = [];
    // loop through other users
    for (var i = 1; i < data.length; i++) {
        // create array for data object
        let pulledArray = Object.values(data[i])
        // loop through other user's values
        let totalDifference = 0;
        for (var a = 2; a < pulledArray.length; a++) {
            // compare diff of each value
            let comparedNum = userArray[a] - pulledArray[a];
            // if num is negative, make positived
            if (comparedNum < 0) {
                comparedNum *= -1;
            }
            // add difference to totalDifference
            totalDifference += comparedNum;
        }
        // push totaldiff of user to array to compare vals to. 
        compareArray.push(totalDifference);
    }
    console.log(compareArray);
    let friendIndex = indexOfMin(compareArray);
    console.log(friendIndex);
    loadNewFriend(friendIndex);
}
$('#submit-btn').on('click', (event) => {
    
    event.preventDefault();
    // console.log($('button').attr('type'));
    let newFriend = {
        name: $('#name').val().trim(),
        photo: $('#image').val().trim(),
        q1: $('#q1').val().trim(),
        q2: $('#q2').val().trim(),
        q3: $('#q3').val().trim(),
        q4: $('#q4').val().trim(),
        q5: $('#q5').val().trim()
    };
    $.post("/api", newFriend).then(function(data) {
    // console.log(data);
    });
    $.get('/api', (data) => {
        checkFriends(data, newFriend);
    });
});


// function to run when dropdown button is clicked
$('#dropdown-button-check').on('click', checkAriaExpanded);