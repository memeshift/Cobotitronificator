var elements = document.getElementsByTagName('*');

var sourceWordsToTargetWords = [
    [['robot'], 'blue penguin from Kreuzberg'],
    [['robots'], 'blue penguins from Kreuzberg'],
    [['robotic'], 'cobotic'],
    [['robotics'], 'cobotics'],
    [['ro·bot'], 'co·bot'],
    [['industrial'], 'coworking'],
    [['factory'], 'coworking space'],
    [['process'], 'mind-numbingly repetetive workflows'],
    [['automate'], 'cobotify'],
    [['automated'], 'complicated'],    
    [['automates'], 'cobotifies'],
    [['automation'], 'mind-numbingly repetitive workflows'],
    [['Automation'], 'Mind-numbingly repetitive workflows'],
    [['automating'], 'outsourcing mind-numbingly repetitive workflows to'],
    [['programming'], 'cobotting'],
    [['humans'], 'frustrated community managers'],
    [['employees'], 'frustrated community managers (who have pulled their hair out to the point that they are bald)'],
    [['human being'], 'rogue community manager'],
    [['human beings'], 'lone community managers'],
    [['human'], 'lone community manager'],
    [['employee'], 'rogue community manager'],
    [['technology'], 'penguin-shaped metal parts'],
    [['hardware'], 'penguinware'],
    [['software'], 'cobotware'],
    [['programmed'], 'cobotified'],
    [['computer'], 'good old Nokia 3310'],    
    [['computers'], 'Nokias'],
    [['ease'], 'complicate'],
    [['streamline'], 'complicate'],
    [['business'], 'space'],
    [['businesses'], 'spaces'],
    [['environments'], 'coworking spaces'],
    [['environment'], 'coworking space'],

];

function makeRegex(sourceWords) {
    return new RegExp('\\b' + sourceWords.join('\\b|\\b') + '\\b', 'g');
};

function identity(string) {
    return string;
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

function toUpperCase(string) {
    return string.toUpperCase();
};

function makeRegexToTargetWords(sourceWordsToTargetWords, modifyWords) {
    return sourceWordsToTargetWords.map(function(sourceAndTarget) {
        var [source,target] = sourceAndTarget;
        source = source.map(modifyWords);
        target = modifyWords(target);
        return [makeRegex(source), target];
    });
};

var sourceRegexToTargetWords = makeRegexToTargetWords(sourceWordsToTargetWords, identity).concat(makeRegexToTargetWords(sourceWordsToTargetWords, capitalizeFirstLetter)).concat(makeRegexToTargetWords(sourceWordsToTargetWords, toUpperCase));

function replaceTextWithRegexes(text, sourceRegexToTargetWords) {
    for (var k = 0; k < sourceRegexToTargetWords.length; k++) {
        var [regex, targetWord] = sourceRegexToTargetWords[k];
        var replacedText = text.replace(regex, targetWord);
        text = replacedText
    }
    return text;
};

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            replacedText = replaceTextWithRegexes(text, sourceRegexToTargetWords);

            if (replacedText !== text) {
                console.log('replaced');
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}
