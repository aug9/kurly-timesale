export default function KurlyTimeSaleRefresh({ $target, initialState, params }) {
    this.state = initialState;

    const $kurlyRefreshDiv = document.createElement('div');
    $target.appendChild($kurlyRefreshDiv);

    const $kurlyRefreshButton = document.createElement('button');
    $kurlyRefreshButton.className = 'refresh-button';
    $kurlyRefreshButton.innerText = "refresh";
    $kurlyRefreshDiv.appendChild($kurlyRefreshButton);

    $kurlyRefreshButton.addEventListener('click', () => {
        if (params && params.refreshItems) params.refreshItems();
    });
    
    const $kurlyRefreshDate = document.createElement('div');
    $kurlyRefreshDate.className = 'refresh-div';
    $kurlyRefreshDiv.appendChild($kurlyRefreshDate);

    this.render = () => {
        $kurlyRefreshDate.innerHTML = `최종 변경 시각 : ${this.state.lastestCrawlDate}`;
    }

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.setVisible = (isVisible) => {
        $kurlyRefreshDiv.className = isVisible ? '' : 'hidden';
    }
}
