let inputText = ''; // 儲存輸入的文字
let slider; // 滑桿
let button; // 按鈕
let isShaking = false; // 文字是否在抖動
let offsets = []; // 每個文字的垂直偏移量
let dropdown; // 下拉式選單
let iframe; // iframe 元素
let closeButton; // 關閉按鈕

function setup() {
  createCanvas(windowWidth, windowHeight); // 設置畫布大小為視窗大小
  let input = createInput(); // 創建輸入框
  input.position(10, 10); // 設置輸入框位置
  input.size(200, 40); // 設置輸入框大小
  input.value('淡江大學教科系'); // 設置輸入框預設文字
  input.style('font-size', '25px'); // 設置輸入框文字大小
  input.input(updateText); // 當輸入框內容改變時，調用 updateText 函數
  updateText.call(input); // 初始化輸入框內容

  slider = createSlider(10, 50, 32); // 創建滑桿，範圍從10到50，初始值為32
  slider.position(input.x + input.width + 100, 10); // 設置滑桿位置，向右移動

  let sliderLabel = createDiv('文字大小'); // 創建文字標籤
  sliderLabel.position(slider.x - 80, 10); // 設置文字標籤位置在滑桿左邊
  sliderLabel.style('color', 'white'); // 設置文字顏色為白色
  sliderLabel.style('font-size', '20px'); // 設置文字大小

  button = createButton('文字跳動'); // 創建按鈕，設置按鈕文字為'文字跳動'
  button.position(slider.x + slider.width + 20, 10); // 設置按鈕位置
  button.style('font-size', '20px'); // 設置按鈕文字大小
  button.style('padding', '11px 20px'); // 設置按鈕大小
  button.mousePressed(toggleShake); // 當按鈕被按下時，調用 toggleShake 函數

  dropdown = createSelect(); // 創建下拉式選單
  dropdown.position(button.x + button.width + 60, 10); // 設置下拉式選單位置，向右移動
  dropdown.style('font-size', '25px'); // 設置下拉式選單文字大小
  dropdown.style('padding', '10px'); // 設置下拉式選單大小
  dropdown.option('第三周作品'); // 添加選項
  dropdown.option('第二周'); // 添加選項
  dropdown.option('第三周講義'); // 添加選項
  dropdown.changed(handleDropdownChange); // 當選項改變時，調用 handleDropdownChange 函數

  iframe = createElement('iframe'); // 創建 iframe 元素
  iframe.position(100, 100); // 設置 iframe 位置
  iframe.size(windowWidth - 200, windowHeight - 200); // 設置 iframe 大小
  iframe.style('border', 'none'); // 移除邊框

  closeButton = createButton('關閉視窗'); // 創建關閉按鈕
  closeButton.position(iframe.x + iframe.width - 100, iframe.y - 40); // 設置關閉按鈕位置
  closeButton.style('font-size', '20px'); // 設置按鈕文字大小
  closeButton.style('padding', '10px 20px'); // 設置按鈕大小
  closeButton.mousePressed(closeIframe); // 當按鈕被按下時，調用 closeIframe 函數
  closeButton.hide(); // 初始化時隱藏關閉按鈕
}

function draw() {
  background(0); // 設置背景顏色為黑色
  fill(255); // 設置文字顏色為白色
  textAlign(CENTER, CENTER); // 設置文字對齊方式
  textSize(slider.value()); // 設置文字大小為滑桿的值
  let repeatedText = inputText.split('').join(' '); // 將輸入的文字用空格分隔
  for (let y = 100; y < height; y += 40) { // 垂直方向從 y 座標 100 開始重複文字
    for (let x = 0; x < width; x += textWidth(repeatedText) + 20) { // 水平方向重複文字
      let offsetY = isShaking ? sin(frameCount * 0.2 + (x + y) * 0.05) * 10 : 0; // 計算垂直偏移量，增加頻率
      let offsetX = isShaking ? cos(frameCount * 0.2 + (x + y) * 0.05) * 10 : 0; // 計算水平偏移量
      text(repeatedText, x + offsetX, y + offsetY); // 繪製文字
    }
  }
}

function updateText() {
  inputText = this.value(); // 更新輸入的文字
  offsets = Array.from({ length: inputText.length }, () => random(-5, 5)); // 初始化每個文字的垂直偏移量
}

function toggleShake() {
  isShaking = !isShaking; // 切換文字抖動狀態
  button.html(isShaking ? '停止跳動' : '文字跳動'); // 更新按鈕文字
}

function handleDropdownChange() {
  let selected = dropdown.value(); // 獲取選中的選項
  if (selected === '第三周作品') {
    iframe.attribute('src', 'https://wei920204.github.io/20250303/'); // 嵌入第一周網址
  } else if (selected === '第二周') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw'); // 嵌入第二周網址
  } else if (selected === '第三周講義') {
    iframe.attribute('src', 'https://hackmd.io/km0t5I6bRLexPdWSIWymOg'); // 嵌入第三周網址
  }
  iframe.show(); // 顯示 iframe
  closeButton.show(); // 顯示關閉按鈕
}

function closeIframe() {
  iframe.hide(); // 隱藏 iframe
  closeButton.hide(); // 隱藏關閉按鈕
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時，調整畫布大小
  iframe.size(windowWidth - 200, windowHeight - 200); // 調整 iframe 大小
  closeButton.position(iframe.x + iframe.width - 100, iframe.y - 40); // 調整關閉按鈕位置
}
