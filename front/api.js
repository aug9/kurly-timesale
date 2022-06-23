const END_POINT = "http://localhost:8011/kurly";
const REFRESH_END_POINT = "http://localhost:8011/kurly-refresh";
const BAN_END_POINT = "http://localhost:8011/kurly-ban";

export function fetchTimeSaleData(params) {
  const url = END_POINT + (params ? "?" + new URLSearchParams(params) : "");

  return fetch(url, { method: "GET" })
    .then((response) => response.json())
    .catch((e) => {
      console.log(e);
    });
}

export function deleteTimeSaleData(no) {
  const url = END_POINT + ("?no=" + no);

  return fetch(url, { method: "DELETE" })
    .then((response) => response.json())
    .catch((e) => {
      console.log(e);
    });
}

export function refreshKurlyItems() {
  const url = REFRESH_END_POINT;

  return fetch(url, { method: "POST" })
    .then((response) => response.json())
    .catch((e) => {
      console.log(e);
    });
}

export function insertBanKeyword(keyword) {
  const url = BAN_END_POINT;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ban_keyword: keyword,
    }),
  })
    .then((response) => response.json())
    .catch((e) => {
      console.log(e);
    });
}
