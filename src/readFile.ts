export const rea111dProjectFromFile = async (): Promise<{[key: string]: boolean}> => {
  try {
    // 确保文件路径可以在服务器上被访问
    const response = await fetch('/objects.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const keys = Object.keys(data);
    let dic: {[key: string]: boolean} = {};
    let bool = false;

    keys.forEach(key => {
      console.log(key); // 打印键名
      dic[key] = bool; // 为每个键分配一个索引
    });
    return dic;
  } catch (error) {
    console.error('Failed to fetch JSON file:', error);
    return {}; // 发生错误时返回空对象
  }
};

rea111dProjectFromFile().then((data)=>{
  console.log(data)
})