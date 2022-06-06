import KurlyTimeSaleList from './KurlyTimeSaleList.js'
import KurlyTimeSaleRefresh from './KurlyTimeSaleRefresh.js'
import ProcessWaitingDivision from './ProcessWaitingDivision.js'
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

    this.refreshItems = async () => {
        removeAllItems();
        processWaitingDivision.setVisible(true);
        kurlyTimeSaleRefresh.setVisible(false);

        await refreshKurlyItems();
        getKurlySaleData();
        processWaitingDivision.setVisible(false);
        kurlyTimeSaleRefresh.setVisible(true);
    }

    const kurlyTimeSaleRefresh = new KurlyTimeSaleRefresh({ 
        $target, 
        initialState: { lastestCrawlDate: this.state.lastestCrawlDate },
        params: { refreshItems: this.refreshItems }
    });

    const kurlyTimeSaleList = new KurlyTimeSaleList({
        $target,
        initialState: { kurlyTimeSaleData: this.state.kurlyTimeSaleData },
        params: { onRemove: this.onRemove }
    });

    const processWaitingDivision = new ProcessWaitingDivision({
        $target,
        initialState: null
    });

    const getKurlySaleData = async () => {
        const timeSaleData = await fetchTimeSaleData();
        setState(JSON.parse(timeSaleData));
    }

    const setState = (newState) => {
        this.state.kurlyTimeSaleData = newState.kurlyTimeSaleData;
        kurlyTimeSaleList.setState(newState.kurlyTimeSaleData);

        this.state.lastestCrawlDate = newState.lastestCrawlDate;        
        kurlyTimeSaleRefresh.setState({ lastestCrawlDate: newState.lastestCrawlDate.replace(/[.].+/, "") });
    }

    const removeAllItems = () => {
        this.state.kurlyTimeSaleData = this.state.kurlyTimeSaleData.filter(item => false);
        setState(this.state);
    }

    getKurlySaleData();
}
