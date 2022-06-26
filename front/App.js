import KurlyTimeSaleList from "./KurlyTimeSaleList.js";
import KurlyTimeSaleRefresh from "./KurlyTimeSaleRefresh.js";
import ProcessWaitingDivision from "./ProcessWaitingDivision.js";
import KurlyBanKeyword from "./KurlyBanKeyword.js";
import {
  deleteTimeSaleData,
  fetchTimeSaleData,
  refreshKurlyItems,
  insertBanKeyword,
} from "./api.js";

export default function App({ $target }) {
  this.state = {
    kurlyTimeSaleData: null,
    lastestCrawlDate: null,
  };

  this.removeItem = async (id) => {
    const result = await deleteTimeSaleData(id);
    this.state.kurlyTimeSaleData = this.state.kurlyTimeSaleData.filter(
      (item) => item.no != id
    );
    setState(this.state);
  };

  this.insertBanKeyword = async (keyword) => {
    const result = await insertBanKeyword(keyword);
    this.state.kurlyTimeSaleData = this.state.kurlyTimeSaleData.filter(
      (item) => item.name.indexOf(keyword) < 0
    );

    setState(this.state);
  };

  this.refreshItems = async () => {
    removeAllItems();
    processWaitingDivision.setVisible(true);
    kurlyTimeSaleRefresh.setVisible(false);

    await refreshKurlyItems();
    getKurlySaleData();
    processWaitingDivision.setVisible(false);
    kurlyTimeSaleRefresh.setVisible(true);
  };

  const kurlyBanKeyword = new KurlyBanKeyword({
    $target,
    initialState: {},
    params: { onInput: this.insertBanKeyword },
  });

  const kurlyTimeSaleRefresh = new KurlyTimeSaleRefresh({
    $target,
    initialState: this.state,
    params: { refreshItems: this.refreshItems },
  });

  const kurlyTimeSaleList = new KurlyTimeSaleList({
    $target,
    initialState: this.state,
    params: { onRemove: this.removeItem },
  });

  const processWaitingDivision = new ProcessWaitingDivision({
    $target,
    initialState: null,
  });

  const getKurlySaleData = async () => {
    const timeSaleData = await fetchTimeSaleData();
    const timeSaleJsonData = JSON.parse(timeSaleData);
    timeSaleJsonData.lastestCrawlDate = removeMillisecondString(
      timeSaleJsonData.lastestCrawlDate
    );

    setState(timeSaleJsonData);

    function removeMillisecondString(date) {
      return typeof date === "string" ? date.replace(/[.].+/, "") : date;
    }
  };

  const setState = (newState) => {
    this.state.kurlyTimeSaleData = newState.kurlyTimeSaleData;
    this.state.lastestCrawlDate = newState.lastestCrawlDate;

    kurlyTimeSaleList.setState(this.state);
    kurlyTimeSaleRefresh.setState(this.state);
  };

  const removeAllItems = () => {
    this.state.kurlyTimeSaleData = this.state.kurlyTimeSaleData.filter(
      (item) => false
    );
    setState(this.state);
  };

  getKurlySaleData();
}
