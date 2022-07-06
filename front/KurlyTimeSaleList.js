export default function KurlyTimeSaleList({ $target, initialState, params }) {
  this.state = initialState;

  const $kurlyTimeSaleList = document.createElement("div");
  $kurlyTimeSaleList.className = "kurly-list-body";
  $target.appendChild($kurlyTimeSaleList);

  $target.addEventListener("click", function (e) {
    const $element = e.target.closest("li");
    if (!$element) return;

    const id = $element.dataset.id;

    if (e.target.className === "remove-button") {
      e.stopPropagation();
      if (params && params.onRemove) params.onRemove(id);
    }
  });

  this.render = () => {
    const kurlyTimeSaleData = this.state.kurlyTimeSaleData;
    const contextHtml = `
            ${kurlyTimeSaleData
              .map(
                (item) =>
                  `<li data-id="${item.no}">
                <a href='https://www.kurly.com/shop/goods/goods_view.php?&goodsno=${
                  item.no
                }' target="blank" rel="noopener noreferrer">
                <img src=${item.img} loading="lazy" class="img">
                <span class="item-name">${item.name}</span>
                <span class="item-price">${addCommaToDecimal(item.price)}</span>
                <span class="item-discount-percent">(${
                  item.discount_percent
                }%)</span>
                <span>${item.sticker}</span></a>
                <button class="remove-button">ban</button></li>`
              )
              .join("")}`;
    $kurlyTimeSaleList.innerHTML = `<ul>${contextHtml}</ul>`;
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const addCommaToDecimal = (number) => {
    return number.toLocaleString("ko-KR");
  };
}
