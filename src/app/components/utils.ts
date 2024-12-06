
export async function addMosaicToImage(url, mosaicSize = 20) {
  const img = new Image();

  return new Promise((resolve, reject) => {
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let y = 0; y < canvas.height; y += mosaicSize) {
        for (let x = 0; x < canvas.width; x += mosaicSize) {
          // 计算当前马赛克块的实际大小，避免超出边界
          const currentMosaicWidth = Math.min(mosaicSize, canvas.width - x);
          const currentMosaicHeight = Math.min(mosaicSize, canvas.height - y);

          const averageColor = getAverageColor(ctx.getImageData(x, y, currentMosaicWidth, currentMosaicHeight));

          for (let i = 0; i < currentMosaicHeight; i++) {
            for (let j = 0; j < currentMosaicWidth; j++) {
              const currentX = x + j;
              const currentY = y + i;
              const index = (currentY * canvas.width + currentX) * 4;
              data[index] = averageColor.r;
              data[index + 1] = averageColor.g;
              data[index + 2] = averageColor.b;
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      canvas.toBlob((mosaicBlob) => {
        resolve(mosaicBlob); // 返回带有马赛克效果的 Blob
      }, 'image/jpeg'); // 或其他合适的 MIME 类型
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(url); // 加载失败时释放 URL
      reject(err);
    };

    img.src = url;
  });
}

// 图片像素
const getAverageColor = (imageData) => {
  let r = 0; let g = 0; let b = 0
  const data = imageData.data
  const pixelCount = data.length / 4 // 每个像素有 4 个值 (RGBA)

  for (let i = 0; i < data.length; i += 4) {
    r += data[i]
    g += data[i + 1]
    b += data[i + 2]
  }

  return {
    r: Math.round(r / pixelCount),
    g: Math.round(g / pixelCount),
    b: Math.round(b / pixelCount)
  }
}
