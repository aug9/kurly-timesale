export default function KurlyBanKeyword({ $target, initialState, params }) {
  this.state = initialState;
  const onInput =
    params && typeof params.onInput === "function" ? params.onInput : () => {};

  const $form = document.createElement("form");
  $form.className = "ban-keyword-div";
  $target.appendChild($form);

  this.render = () => {
    $form.innerHTML = `<input class='input-keyword'></input><input type='submit' class='keyword-button' value='add ban'></input>`;
  };

  $form.addEventListener("submit", function (e) {
    e.preventDefault();

    const $inputTarget = document.querySelector(".input-keyword");
    onInput($inputTarget.value);
    $inputTarget.value = "";
  });

  this.setState = (nextState) => {};

  this.render();
}
