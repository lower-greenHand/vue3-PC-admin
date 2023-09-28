// 获取一段文字内容的宽度
export function getElementTextWidth(text, font) {
  // 创建一个 span 元素
  const span = document.createElement('span');
  span.style.fontSize = font;
  span.style.visibility = 'hidden';
  span.style.position = 'absolute';
  // 插入文本
  span.appendChild(document.createTextNode(text));
  // 插入 span 元素到网页中
  document.body.appendChild(span);
  // 获取文本宽度
  const width = span.offsetWidth;
  // 删除 span 元素
  span.parentNode.removeChild(span);
  return width;
}

// 防抖
export const debounceEvent = (fn, delay = 500) => {
  let timeD = null;
  return function (...args) {
    if (timeD) {
      clearTimeout(timeD);
    }
    timeD = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};
