const imgPreloader = url => {
    return new Promise((resolve, reject) => {
      let image = new Image();
      image.src = url;
      image.onload = () => {
        resolve();
      };
      image.onerror = () => {
        reject();
      };
    });
  };
  export const imgsPreloader = imgs => {
    let promiseArr = [];
    imgs.forEach(element => {
      promiseArr.push(imgPreloader(element));
    });
    return Promise.all(promiseArr);
  };