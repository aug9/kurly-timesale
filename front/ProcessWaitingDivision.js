export default function ProcessWaitingDivision({ $target, initialState }) {
    this.state = initialState;
    
    const WAITING_PHRASE = "컬리 세일 상품을 가져오는 중입니다";
    let timer = null;
    
    const $processWaitingDiv = document.createElement('div');
    $target.appendChild($processWaitingDiv);

    this.setVisible = (isVisible) => {
        this.state = isVisible;

        if (isVisible) {
            $processWaitingDiv.className = 'refresh-process-div';
            $processWaitingDiv.innerText = WAITING_PHRASE;
            timer = setInterval(timeElapsed, 500);
        } else {
            $processWaitingDiv.className = 'refresh-process-div hidden';
            clearInterval(timer);
        }
    };

    const timeElapsed = () => {
        $processWaitingDiv.innerText = $processWaitingDiv.innerText + ".";
    }
}
