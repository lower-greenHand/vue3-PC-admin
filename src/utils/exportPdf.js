import html2Canvas from 'html2canvas';
import JsPDF from 'jspdf';
var noTableHeight = 0; // table外的元素高度

export const htmlPdf = (title, html, type) => {
  html2Canvas(html, {
    allowTaint: false,
    taintTest: false,
    logging: false,
    useCORS: true,
    dpi: window.devicePixelRatio * 3,
    scale: 3, // 按比例增加分辨率
  }).then((canvas) => {
    var pdf = new JsPDF('p', 'pt', 'a4'); // A4纸，纵向
    var ctx = canvas.getContext('2d');
    var a4w = type ? 831.89 : 582.28;
    var a4h = type ? 582.28 : 831.89; // A4大小，592.28 x 841.89，四边各保留10mm的边距，
    var imgHeight = Math.floor((a4h * canvas.width) / a4w) + 20; // 按A4显示比例换算一页图像的像素高度
    var renderedHeight = 0;
    while (renderedHeight < canvas.height) {
      var page = document.createElement('canvas');
      page.width = canvas.width;
      page.height = Math.min(imgHeight, canvas.height - renderedHeight); // 可能内容不足一页

      // 用getImageData剪裁指定区域，并画到前面创建的canvas对象中
      page
        .getContext('2d')
        .putImageData(
          ctx.getImageData(
            0,
            renderedHeight,
            canvas.width,
            Math.min(imgHeight, canvas.height - renderedHeight)
          ),
          0,
          0
        );
      pdf.addImage(
        page.toDataURL('image/jpeg', 1.0),
        'JPEG',
        6,
        5,
        a4w,
        Math.min(a4h, (a4w * page.height) / page.width)
      ); // 添加图像到页面，保留10mm边距

      renderedHeight += imgHeight;
      if (renderedHeight < canvas.height) {
        pdf.addPage(); // 如果后面还有内容，添加一个空页
      }
      // delete page;
    }
    // 保存文件
    pdf.save(title + '.pdf');
  });
};
