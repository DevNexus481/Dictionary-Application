async function searchWord() {
    const word = document.getElementById('searchInput').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (word.trim() === '') {
        resultDiv.innerHTML = '<p>Please enter a word.</p>';
        return;
    }

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) {
            throw new Error('Word not found');
        }
        const data = await response.json();
        displayResult(data);
    } catch (error) {
        resultDiv.innerHTML = `<p>${error.message}</p>`;
    }
}

function displayResult(data) {
    const resultDiv = document.getElementById('result');
    const wordData = data[0];

    const wordElement = document.createElement('h2');
    wordElement.textContent = wordData.word;
    resultDiv.appendChild(wordElement);

    wordData.meanings.forEach(meaning => {
        const partOfSpeechElement = document.createElement('h3');
        partOfSpeechElement.textContent = meaning.partOfSpeech;
        resultDiv.appendChild(partOfSpeechElement);

        meaning.definitions.forEach(definition => {
            const definitionElement = document.createElement('p');
            definitionElement.textContent = definition.definition;
            resultDiv.appendChild(definitionElement);
        });
    });
}