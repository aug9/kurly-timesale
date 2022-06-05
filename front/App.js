import KurlyTimeSaleList from './KurlyTimeSaleList.js'
import { deleteTimeSaleData, fetchTimeSaleData, refreshKurlyItems } from './api.js'

export default function App({ $target }) {
    this.state = {
        kurlyTimeSaleData: null,
        lastestCrawlDate: null
    };

    this.onRemove = async (id) => {
        const result = await deleteTimeSaleData(id);
        this.state.kurlyTimeSaleData = this.state.kurlyTimeSaleData.filter(item => item.no != id);
        setState(this.state);
    }
    
    const $kurlyRefreshButton = document.createElement('button');
    $kurlyRefreshButton.className = 'refresh-button';
    $kurlyRefreshButton.innerText = "refresh";
    $kurlyRefreshButton.addEventListener('click', () => {
        refreshItems();
    });
    $target.appendChild($kurlyRefreshButton);

    const $kurlyRefreshDiv = document.createElement('div');
    $kurlyRefreshDiv.className = 'refresh-div';
    $target.appendChild($kurlyRefreshDiv);
    
    const kurlyTimeSaleList = new KurlyTimeSaleList({ $target, initialState:this.state, params:{onRemove:this.onRemove} });

    const initialize = async () => {
        const timeSaleData = await fetchTimeSaleData();
        setState(JSON.parse(timeSaleData));
    }

    const refreshItems = async () => {
        this.state.kurlyTimeSaleData = this.state.kurlyTimeSaleData.filter(item => false);
        setState(this.state);

        const result = await refreshKurlyItems();
        initialize();
    }

    const setState = (newState) => {
        this.state.kurlyTimeSaleData = newState.kurlyTimeSaleData;
        kurlyTimeSaleList.setState(newState.kurlyTimeSaleData);

        this.state.lastestCrawlDate = newState.lastestCrawlDate;        
        $kurlyRefreshDiv.innerHTML = "최종 갱신 시각 : " + newState.lastestCrawlDate.replace(/[.].+/, "");
    }

    initialize();
}
