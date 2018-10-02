const  questions = [
    "Your mind is always buzzing with unexplored ideas and plans.",
    "Generally speaking, you rely more on your experience than your imagination.",
    "You find it easy to stay relaxed and focused even when there is some pressure.",
    "You rarely do something just out of sheer curiosity.",
    "People can rarely upset you.",
    "It is often difficult for you to relate to other people’s feelings.",
    "In a discussion, truth should be more important than people’s sensitivities.",
    "You rarely get carried away by fantasies and ideas.",
    "You think that everyone’s views should be respected regardless of whether they are supported by facts or not.",
    "You feel more energetic after spending time with a group of people."
];
maxScale = 5;


for (quest in questions) {
    const mainDiv = $(`<div>`);
    const questionHead = $(`<h3><strong>Question ${parseInt(quest) + 1}</strong></h3>`)
    $(mainDiv).append(questionHead);

    const questionDiv = $(`<h4>`);
    $(questionDiv).text(questions[quest]);
    $(mainDiv).append(questionDiv);

    const selectorOption = $(`<select>`)
        $(selectorOption).addClass("chosen-select");
        $(selectorOption).attr("id",`q${parseInt(quest) + 1}`);

        for(let range = 0; range <= maxScale; range++ ) {
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
    
};

// Chosen CSS
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