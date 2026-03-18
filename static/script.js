document.addEventListener('DOMContentLoaded', () => {
    let currentN1 = null;
    let currentN2 = null;
    const display = document.getElementById('problem-display');
    const answerDisplay = document.getElementById('answer-display');
    const showAnswerBtn = document.getElementById('show-answer-btn');

    function fetchProblem() {
        display.textContent = '...';
        answerDisplay.style.display = 'none';
        showAnswerBtn.disabled = false;
        fetch('/number')
            .then(res => {
                if (!res.ok) throw new Error('Network error');
                return res.json();
            })
            .then(nums => {
                if (typeof nums === 'object' && nums !== null && 'n1' in nums && 'n2' in nums) {
                    currentN1 = nums.n1;
                    currentN2 = nums.n2;
                    display.textContent = `${nums.n1} × ${nums.n2}`;
                } else {
                    display.textContent = '?';
                    currentN1 = null;
                    currentN2 = null;
                }
            })
            .catch(() => {
                display.textContent = '😢';
                currentN1 = null;
                currentN2 = null;
            });
    }

    showAnswerBtn.addEventListener('click', () => {
        if (currentN1 !== null && currentN2 !== null) {
            fetch(`/answer?n1=${currentN1}&n2=${currentN2}`)
                .then(res => {
                    if (!res.ok) throw new Error('Network error');
                    return res.json();
                })
                .then(data => {
                    if (typeof data === 'object' && data !== null && 'answer' in data) {
                        answerDisplay.textContent = data.answer;
                        answerDisplay.style.display = 'flex';
                        showAnswerBtn.disabled = true;
                    } else {
                        answerDisplay.textContent = '?';
                        answerDisplay.style.display = 'flex';
                    }
                })
                .catch(() => {
                    answerDisplay.textContent = '😢';
                    answerDisplay.style.display = 'flex';
                });
        }
    });

    fetchProblem();
    document.getElementById('new-number-btn').addEventListener('click', fetchProblem);
});
