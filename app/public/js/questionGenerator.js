// List of questions
const questions = [
    "The wilderness is a nice place to visit, but I wouldn't want to live there.",
    "You find it easy to stay relaxed and focused even when there is some pressure.",
    "You rarely do something just out of sheer curiosity.",
    `How would you rate "Star Wars - The Last Jedi?`,
    "Your mind is always buzzing with unexplored ideas and plans.",
    "There's a right way to do things and a wrong way to do things.",
    "If you want to make a lot of money, it is important to be educated.",
    "You rarely get carried away by fantasies and ideas.",
    "You think it would be interesting to have a supernatural experience.",
    "You feel more energetic after spending time with a group of people."
];
// Max value for our questionaire scale
// i.e. 5 means a number between 1-5
const maxScale = 5;

if (localStorage.getItem("submitted")) {
    $.get(`/api/friends`, function (req, res) {
        const friendPosition = parseInt(localStorage.getItem("place"))
        const yourPosition = parseInt(localStorage.getItem("uPosition"))

        // Checks if your positon is still there, if not reset your local and make user resubmit
        if (req[yourPosition] === undefined) {
            localStorage.clear();
            displayQuestions();

        }
        else {
            // Start second validation
            // Create get Sum again
            function getSum(total, num) {
                return parseInt(total) + parseInt(num);
            }
            // Check your spots positions current score values
            let yourSpotCheck = req[yourPosition].scores.reduce(getSum);

            if (yourSpotCheck != parseInt(localStorage.getItem("valueCheck"))) {
                localStorage.clear();
                displayQuestions();
            }
            else {
                // Hide and show specific HTML if you have already submitted a profile
                $(`#name`).addClass("hideMe");
                $(`#photo`).addClass("hideMe");
                $(`#submit`).addClass("hideMe");
                $(`#submittedName`).removeClass(`hideMe`);
                $(`#submittedName`).html(`${req[yourPosition].name}`)
                $(`#submittedPhoto`).removeClass(`hideMe`);
                $(`#submittedPhoto`).attr("src", req[yourPosition].photo);
                $(`#reset`).removeClass(`hideMe`);

                const alreadyCompleted = $(`<div>`);

                const bestMatch = $(`<h3><strong> Best Match </strong></h3>`);
                $(alreadyCompleted).append(bestMatch);

                const mainFriend = $(`<h5> ${req[friendPosition].name}</h5>`);
                $(alreadyCompleted).append(mainFriend);

                const mainFriendPhoto = $(`<img src="${req[friendPosition].photo}">`)
                $(alreadyCompleted).append(mainFriendPhoto);


                $(`#questionsDisplay`).append(alreadyCompleted);
            };
        };
    });
}
else {
    displayQuestions();
}

// Chosen CSS
function chosenCSS() {
    const config = {
        ".chosen-select": {},
        ".chosen-select-deselect": {
            allow_single_deselect: true
        },
        ".chosen-select-no-single": {
            disable_search_threshold: 10
        },
        ".chosen-select-no-results": {
            no_results_text: "Oops, nothing found!"
        },
        ".chosen-select-width": {
            width: "95%"
        }
    };

    for (let selector in config) {
        $(selector).chosen(config[selector]);
    }
};

function displayQuestions() {
    for (quest in questions) {
        const mainDiv = $(`<div>`);
        const questionHead = $(`<h3><strong>Question ${parseInt(quest) + 1}</strong></h3>`)
        $(mainDiv).append(questionHead);

        const questionDiv = $(`<h5>`);
        $(questionDiv).text(questions[quest]);
        $(mainDiv).append(questionDiv);

        const selectorOption = $(`<select>`)
        $(selectorOption).addClass("chosen-single chosen-select");
        $(selectorOption).attr("id", `q${parseInt(quest) + 1}`);

        for (let range = 0; range <= maxScale; range++) {
            const option = $(`<option>`)

            switch (range) {
                case 0:
                    $(option).attr("value", "");
                    $(selectorOption).append(option);
                    break;
                case 1:
                    $(option).attr("value", `${range}`);
                    $(option).text(`${range} (Strongly Disagree)`);
                    $(selectorOption).append(option);
                    break;
                case maxScale:
                    $(option).attr("value", `${range}`);
                    $(option).text(`${range} (Strongly Agree)`);
                    $(selectorOption).append(option);
                    break;
                default:
                    $(option).attr("value", `${range}`);
                    $(option).text(`${range}`);
                    $(selectorOption).append(option);
                    break;
            };
        };

        $(mainDiv).append(selectorOption);

        $(`#questionsDisplay`).append(mainDiv);

    }
    chosenCSS();
};