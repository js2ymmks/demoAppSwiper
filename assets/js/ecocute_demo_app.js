
// 無効ボタンをクリックしたときの処理
function showDemoAppRestrictionMessage() {
  alert('デモアプリではこのボタンは操作できません。');
}

/******************************************
 * モーダル ハンバーガーメニュー
 ******************************************/
function madalHamburgerMenu() {
  const hamburgerMenu = document.getElementById('modalHamburgerMenu');

}

/******************************************
 * ボタン
 ******************************************/
const showHotWater1 = () => {
  document.getElementById('amount-of-hot-water-01').style.display = 'block';
  document.getElementById('amount-of-hot-water-02').style.display = 'none';
};

const showHotWater2 = () => {
  document.getElementById('amount-of-hot-water-01').style.display = 'none';
  document.getElementById('amount-of-hot-water-02').style.display = 'block';
};

// エレメントを表示
const showElement = (id) => {
  const element = document.getElementById(id);
  element ? (element.style.display = "block") : null;
};

// エレメントを非表示
const hideElement = (id) => {
  const element = document.getElementById(id);
  element ? (element.style.display = "none") : null;
};


// モーダルウインドウを非表示
const hideModal = (element) => {
  const modal = element.closest(".modal-container");
  if (modal) {
    modal.style.display = "none";
  } else {
    // エラー処理
    showAlert("E102：モーダルウインドウの非表示に失敗しました");
  }
}

/******************************************
 * JSON
 ******************************************/
// プロパティの値を取得
function getJsonValue(path) {
  const jsonData = sessionStorage.getItem("ecoCuteDemoApp");
  const obj = JSON.parse(jsonData);
  if (!obj) return undefined;

  return path.split('.').reduce((acc, key) => {
    if (acc && key in acc) {
      return acc[key];
    } else {
      return undefined;
    }
  }, obj);
}

// プロパティの値を設定
function setJsonValue(path, value) {
  const jsonData = sessionStorage.getItem("ecoCuteDemoApp");
  const obj = JSON.parse(jsonData);
  if (!obj) {
    alert("セッションストレージにデータがありません");
    return false;
  }

  const keys = path.split('.');
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    if (!(keys[i] in current)) {
      alert(`"${keys[i]}" が存在しないため更新できません`);
      return false;
    }
    current = current[keys[i]];
  }

  const lastKey = keys[keys.length - 1];
  if (!(lastKey in current)) {
    alert(`"${lastKey}" が存在しないため更新できません`);
    return false;
  }

  current[lastKey] = value;
  sessionStorage.setItem("ecoCuteDemoApp", JSON.stringify(obj));
  return true;
}

function updateJsonButtonFileName(path, elementButton) {
  const jsonData = sessionStorage.getItem("ecoCuteDemoApp");
  const obj = JSON.parse(jsonData);
  
  if (!obj) {
    alert("セッションストレージにデータがありません");
    return false;
  }

  const keys = path.split('.');
  let current = obj;

  // 指定されたパスのオブジェクトを辿る
  for (let i = 0; i < keys.length - 1; i++) {
    if (!(keys[i] in current)) {
      alert(`"${keys[i]}" が存在しないため更新できません`);
      return false;
    }
    current = current[keys[i]];
  }

  const lastKey = keys[keys.length - 1];
  if (!(lastKey in current)) {
    alert(`"${lastKey}" が存在しないため更新できません`);
    return false;
  }

  // 現在の値を取得
  const currentValue = current[lastKey];

  // 新しい値を決定
  let newValue;
  if (currentValue.endsWith('_on.png')) {
    newValue = currentValue.replace('_on.png', '_off.png');
  } else if (currentValue.endsWith('_off.png')) {
    newValue = currentValue.replace('_off.png', '_on.png');
  } else {
    alert(`"${currentValue}" は無効なファイル名です`);
    return false;
  }

  // 値を更新
  current[lastKey] = newValue;
  sessionStorage.setItem("ecoCuteDemoApp", JSON.stringify(obj));

  // ボタンの画像を更新
  elementButton.src = "../assets/img/" + newValue;

  return true;
}

function elementClassUpdate(elementId, propertyValue) {
  const jsonData = sessionStorage.getItem("ecoCuteDemoApp");
  const dataObj = JSON.parse(jsonData);

  if (!dataObj || !dataObj.baseUrl) {
    console.warn("セッションストレージにbaseUrl情報がありません");
    return;
  }

  const element = document.getElementById(elementId);
  const newClass = getJsonValue(propertyValue);

  // d-block が設定されている場合は削除し、d-none を追加
  if (element.classList.contains('d-block')) {
    element.classList.remove('d-block');
    element.classList.add('d-none');
  } else {
    // d-none が設定されている場合は削除し、新しいクラスを追加
    element.classList.remove('d-none');
    element.classList.add(newClass);
  }
}

// 要素のsrcを更新
function elementSrcUpdate(elementId, path) {
  const element = document.getElementById(elementId);
  const newSrc = getJsonValue(path);
  element.src = getJsonValue('baseUrl') + newSrc;
}

// 要素のdisplayを更新
function elementDisplayUpdate(elementId, path) {
  const element = document.getElementById(elementId);
  element.style.display = getJsonValue(path);
}

// タンクポップアップの表示
function showTankPopup(pathMode, pathPopup, sourceButton) {
  // オペレーションモードを取得
  const elementOperationMode = getJsonValue(pathMode);
  // ポップアップのパスを取得
  const elementPopupStatus_on = pathPopup + "_on";
  const elementPopupStatus_off = pathPopup + "_off";
  // ポップアップのIDを取得
  const elementPopupStatusId_on = elementPopupStatus_on.split('.')[1];
  const elementPopupStatusId_off = elementPopupStatus_off.split('.')[1]; 

  // 満タンわき増しoff　わき上げoff
  if ((elementOperationMode === "00")) {
    // 満タンわき増し ポップアップ
    if (sourceButton === 'MantanWakimashi') {
      setJsonValue(elementPopupStatus_on, "block");
      elementDisplayUpdate(elementPopupStatusId_on, elementPopupStatus_on);
    // わき上げ ポップアップ
    } else if (sourceButton === 'Wakiage') {
      setJsonValue(elementPopupStatus_on, "block");
      elementDisplayUpdate(elementPopupStatusId_on, elementPopupStatus_on);
    }

  // 満タンわき増しon　わき上げoff
  } else if (elementOperationMode === "10") {
    if (sourceButton === 'MantanWakimashi') {
      setJsonValue(elementPopupStatus_off, "block");
      elementDisplayUpdate(elementPopupStatusId_off, elementPopupStatus_off);
    // わき上げ ポップアップ
    } else if (sourceButton === 'Wakiage') {
      setJsonValue(elementPopupStatus_on, "block");
      elementDisplayUpdate(elementPopupStatusId_on, elementPopupStatus_on);
    }

  // 満タンわき増しoff　わき上げon
  } else if (elementOperationMode === "01") {
    if (sourceButton === 'MantanWakimashi') {
      setJsonValue(elementPopupStatus_on, "block");
      elementDisplayUpdate(elementPopupStatusId_on, elementPopupStatus_on);
    // わき上げ ポップアップ
    } else if (sourceButton === 'Wakiage') {
      setJsonValue(elementPopupStatus_off, "block");
      elementDisplayUpdate(elementPopupStatusId_off, elementPopupStatus_off);
    }
  }
}

// ふろポップアップの表示
function showBathPopup(pathMode, pathPopup, sourceButton) {
  // オペレーションモードを取得
  const elementOperationMode = getJsonValue(pathMode);
  // ポップアップのパスを取得
  const elementPopupStatus_on = pathPopup + "_on";
  const elementPopupStatus_off = pathPopup + "_off";
  // ポップアップのIDを取得
  const elementPopupStatusId_on = elementPopupStatus_on.split('.')[1];
  const elementPopupStatusId_off = elementPopupStatus_off.split('.')[1]; 

  // ふろ自動off　追いだきoff　キラリユoff
  if ((elementOperationMode === "000")) {
    // ふろ自動 ポップアップ
    if (sourceButton === 'auto') {
      setJsonValue(elementPopupStatus_on, "block");
      elementDisplayUpdate(elementPopupStatusId_on, elementPopupStatus_on);
    // 追いだき ポップアップ
    } else if (sourceButton === 'reheat') {
      setJsonValue(elementPopupStatus_on, "block");
      elementDisplayUpdate(elementPopupStatusId_on, elementPopupStatus_on);
    // キラリユ ポップアップ
    } else if (sourceButton === 'kirariyu') {
      setJsonValue(elementPopupStatus_on, "block");
      elementDisplayUpdate(elementPopupStatusId_on, elementPopupStatus_on);
    }

  // ふろ自動on　追いだきoff　キラリユoff
  } else if (elementOperationMode === "100") {
    // 満タンわき増し ポップアップ
    // ふろ自動 ポップアップ
    if (sourceButton === 'auto') {
      setJsonValue(elementPopupStatus_off, "block");
      elementDisplayUpdate(elementPopupStatusId_off, elementPopupStatus_off);
    // 追いだき ポップアップ
    } else if (sourceButton === 'reheat') {
      setJsonValue(elementPopupStatus_on, "block");
      elementDisplayUpdate(elementPopupStatusId_on, elementPopupStatus_on);
    // キラリユ ポップアップ
    } else if (sourceButton === 'kirariyu') {
      setJsonValue(elementPopupStatus_on, "block");
      elementDisplayUpdate(elementPopupStatusId_on, elementPopupStatus_on);
    }

  // ふろ自動off　追いだきon　キラリユoff
  } else if (elementOperationMode === "010") {
    // ふろ自動 ポップアップ
    if (sourceButton === 'auto') {
      setJsonValue(elementPopupStatus_on, "block");
      elementDisplayUpdate(elementPopupStatusId_on, elementPopupStatus_on);
    // 追いだき ポップアップ
    } else if (sourceButton === 'reheat') {
      setJsonValue(elementPopupStatus_off, "block");
      elementDisplayUpdate(elementPopupStatusId_off, elementPopupStatus_off);
    // キラリユ ポップアップ
    } else if (sourceButton === 'kirariyu') {
      setJsonValue(elementPopupStatus_on, "block");
      elementDisplayUpdate(elementPopupStatusId_on, elementPopupStatus_on);
    }

  // ふろ自動off　追いだきoff　キラリユon
  } else if (elementOperationMode === "001") {
    // ふろ自動 ポップアップ
    if (sourceButton === 'auto') {
      setJsonValue(elementPopupStatus_on, "block");
      elementDisplayUpdate(elementPopupStatusId_on, elementPopupStatus_on);
    // 追いだき ポップアップ
    } else if (sourceButton === 'reheat') {
      setJsonValue(elementPopupStatus_on, "block");
      elementDisplayUpdate(elementPopupStatusId_on, elementPopupStatus_on);
    // キラリユ ポップアップ
    } else if (sourceButton === 'kirariyu') {
      setJsonValue(elementPopupStatus_off, "block");
      elementDisplayUpdate(elementPopupStatusId_off, elementPopupStatus_off);
    }
  }
}

