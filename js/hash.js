/*
 * Hash  v0.6.9
 * Copyright 2023 HashHackCode, LLP.
 */

function Hash(config) {
    this.config = config;
    this.worksheetResults = {};
    this.init();
}

Hash.prototype.init = function() {
    var _this = this;
    var lastClickedRefClass;
    var lastClickedRef;

    $(document).ready(function() {
    // Initialize worksheet results object
    $('section.worksheet').each(function() {
        var classList = $(this).attr('class').split(' ');
        var worksheetId = classList.find(function(className) {
            return /^w\d+$/.test(className);
        });
       
        if (!worksheetId) {
            console.error("No worksheet ID found for element:", this);
            return; // Skip this worksheet
        }
        
        _this.worksheetResults[worksheetId] = {
            questions: {},
            correctAnswers: 0,
            incorrectAnswers: 0
        };
    });

        $('.ans-select, .ans-image, .ans-fill').click(function() {
            $(this).siblings().removeClass('selected');
            $(this).addClass('selected');
        });

        $('.ans-ref').click(function() {
            lastClickedRefClass = $(this).attr('class').split(' ').find(c => c.startsWith('match-'));
            lastClickedRef = $(this);
            $(this).addClass('selected');
        });

        $('.ans-match').click(function() {
            if (lastClickedRef && lastClickedRefClass) {
                // Check if this ans-match already has a match class associated with a different ans-ref
                var previousMatchClass = $(this).data('previousMatchClass');
                var isChangingMatch = previousMatchClass && previousMatchClass !== lastClickedRefClass;
        
                // Remove previousMatchClass from all ans-match elements
                if (previousMatchClass) {
                    $('.ans-match.' + previousMatchClass).removeClass(previousMatchClass);
                    // If changing match, remove 'selected' from the associated ans-ref
                    if (isChangingMatch) {
                        $('.ans-ref.' + previousMatchClass).removeClass('selected');
                    }
                }
        
                // Remove any existing match-* class from this ans-match element
                $(this).removeClass(function(index, className) {
                    return (className.match(/\bmatch-\S+/g) || []).join(' ');
                });
        
                // Add the new match class to this ans-match element and update its previousMatchClass data
                $(this).addClass(lastClickedRefClass).data('previousMatchClass', lastClickedRefClass);
                

            }
        });

        $('#submit').click(function() {
            _this.checkAnswers();
        });
    });
};


Hash.prototype.checkAnswers = function() {
    var _this = this;

      
    $('.worksheet').each(function() {
        var classList = $(this).attr('class').split(' ');
        var worksheetId = classList.find(function(className) {
            return /^w\d+$/.test(className);
        });

        if (!_this.worksheetResults[worksheetId]) {
            console.error("Worksheet ID not found in worksheetResults:", worksheetId);
            return; // Skip this iteration
        }

        var totalQuestionsInWorksheet = $(this).find('.question').length;
        _this.worksheetResults[worksheetId].totalQuestions = totalQuestionsInWorksheet;


        $(this).find('.question').each(function() {
            var classList = $(this).attr('class').split(' ');
            var questionId = classList.find(function(className) {
                return /^q\d+$/.test(className);
            });
            if (!questionId) {
                console.error("No question ID found for element:", this);
                return; // Skip this question if no ID found
            } 
            var questionType = $(this).data('question');
            var isCorrect = false;
            var allMatchesCorrect = true;
            var totalMatches = 0;
            var correctMatchAnswers = 0;
            
            // Declare correctAnswer variable
            var correctAnswer = ''; // Default value

            if (questionType !== 'match') {
                correctAnswer = $(this).find('.answer').data('answer') ? $(this).find('.answer').data('answer').toString().toLowerCase() : "";
            }

            switch (questionType) {
                case 'select':
            case 'image':
                var userAnswer = $(this).find('.selected').text().toLowerCase().trim() || $(this).find('.selected').attr('alt');
                isCorrect = userAnswer === correctAnswer;
                break;
        
            case 'fill':
                userAnswer = $(this).find('.ans-fill').text().toLowerCase().trim();
                isCorrect = userAnswer === correctAnswer;
                break;

            case 'match':
                totalMatches = $(this).find('.ans-ref').length;
                $(this).find('.ans-ref').each(function() {
                    var refMatchClass = $(this).attr('class').split(' ').find(c => c.startsWith('match-'));
                    var refMatchValue = $(this).data('match');
                    var matchedElement = $('.ans-match.' + refMatchClass);

                    if (matchedElement.length && matchedElement.data('match') === refMatchValue) {
                        correctMatchAnswers++;
                        $(this).addClass('correct').removeClass('incorrect');
                        matchedElement.addClass('correct').removeClass('incorrect');
                    } else {
                        allMatchesCorrect = false;  
                        $(this).addClass('incorrect').removeClass('correct');
                        if (matchedElement.length) {
                            matchedElement.addClass('incorrect').removeClass('correct');
                        }
                    }
                });
                isCorrect = allMatchesCorrect;
                break;

                default:
                    // Handle unknown question types or do nothing
                    break;
            }
   
            // Counting correct and incorrect answers
            if (isCorrect) {
                $(this).addClass('correct').removeClass('incorrect');
                _this.worksheetResults[worksheetId].correctAnswers++;
            } else {
                $(this).addClass('incorrect').removeClass('correct');
                _this.worksheetResults[worksheetId].incorrectAnswers++;
            }

            // Storing the result for each question
            _this.worksheetResults[worksheetId].questions[questionId] = {
                isCorrect: isCorrect,
                correctAnswer: correctAnswer,
                totalMatches: totalMatches, // Relevant for 'match' type questions
                correctMatchAnswers: correctMatchAnswers // Relevant for 'match' type questions
            };
            console.log("Worksheet Results after population:", _this.worksheetResults);

        });
    });

    this.displayResult();
};

Hash.prototype.displayResult = function() {
    var _this = this;

    $('.worksheet').each(function() {
        var classList = $(this).attr('class').split(' ');
        var worksheetId = classList.find(function(className) {
            return /^w\d+$/.test(className);
        });

        var result = _this.worksheetResults[worksheetId];
        if (!result) {
            console.error("Result not found for worksheet:", worksheetId);
            return; // Skip this worksheet if no result found
        }
        console.log("Accessing results for worksheet:", worksheetId, result);

        var worksheetMessage = _this.config.customResultDisplay[worksheetId].message
            .replace('${correctWorksheet}', result.correctAnswers)
            .replace('${totalWorksheet}', result.totalQuestions);
        $(this).find('.w-msg').text(worksheetMessage);

        $(this).find('.question').each(function() {
            var classList = $(this).attr('class').split(' ');
            var questionId = classList.find(function(className) {
                return /^q\d+$/.test(className);
            });
            if (!questionId) {
                console.error("No question ID found for element:", this);
                return; // Skip this question if no ID found
            }
            var questionResult = result.questions[questionId];
            
            if (!questionResult) {
                console.error("Result not found for question:", questionId, "in worksheet:", worksheetId);
                return; // Skip this question if no result found
            }  
            if (!questionResult.isCorrect) {
                var questionConfig = _this.config.customResultDisplay[worksheetId][questionId];

                // Append .q-msg and .h-msg divs if they don't exist
                if ($(this).find('.h-msg').length === 0) {
                    $(this).prepend('<div class="h-msg"></div>');
                }
                if ($(this).find('.q-msg').length === 0) {
                    $(this).prepend('<div class="q-msg"></div>');
                }

                var questionMessage = questionConfig.message
                    .replace('${correctAnswer}', questionResult.correctAnswer)
                    .replace('${match}', questionResult.correctMatchAnswers || 0)
                    .replace('${totalMatch}', questionResult.totalMatches || 0);
                var hintMessage = questionConfig.hint || '';

                $(this).find('.q-msg').text(questionMessage);
                $(this).find('.h-msg').text(hintMessage);
            }
        });
    });
};

