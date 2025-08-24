const ecoCuteDemoApp = {
  jsonName: "EcocuteDemoApp",
  version: "1.0.1",
  baseUrl: "../assets/img/",
  footerSrcOfSettings: null,
  tank: {
    tankOperationMode: "00",
    tankStatus: "none",
    tankMantanWakimashiBtnSrc: "btn-tank-mantan-wakimashi_on.png",
    tankMantanWakimashiPopup_on: "none",
    tankMantanWakimashiPopup_off: "none",
    tankWakiageBtnSrc: "btn-tank-wakiage_on.png",
    tankWakiagePopup_on: "none",
    tankWakiagePopup_off: "none",
  },
  bath: {
    bathOperationMode: "000",
    bathAutoBtnSrc: "btn-bath-auto_on.png",
    bathReheatBtnSrc: "btn-bath-reheat_on.png",
    bathKirariyuBtnSrc: "btn-bath-kirariyu_on.png",
    bathAutoPopup_on: "none",
    bathAutoPopup_off: "none",
    bathReheatPopup_on: "none",
    bathReheatPopup_off: "none",
    bathKirariyuPopup_on: "none",
    bathKirariyuPopup_off: "none",
    bathStatusImage: "bath-img-none.png",
    bathAutoStatus: "none",
    bathReheatStatus: "none",
    bathKirariyuStatus: "none",
  },
  settings: {
    headerNav01: "d-block",
    headerNav02: "d-none",
    headerNav03: "d-none",
  },
};

function storeJsonData() {
  try {
    sessionStorage.setItem("ecoCuteDemoApp", JSON.stringify(ecoCuteDemoApp));
    // リダイレクト先に移動
    window.location.href = "./home/tank.html";
  } catch (error) {
    showAlert("JSONデータの保存に失敗しました。", "error");
  }
}

storeJsonData();
