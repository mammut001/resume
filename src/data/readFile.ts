export const readProjectFromFile = async (): Promise<{[key: string]: boolean}> => {
  try {
    const response = await fetch('/objects.json')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    const keys = Object.keys(data)
    let dic: {[key: string]: boolean} = {}
    let bool = false;

    keys.forEach(key => {
      console.log(key)
      dic[key] = bool
    });
    return dic;
  } catch (error) {
    console.error('Failed to fetch JSON file:', error)
    return {}
  }
};

