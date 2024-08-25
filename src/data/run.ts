import axios from 'axios';
import * as fs from 'fs';

const owner = 'mammut001';
const repo = 'Cash-Drawer';

const repos = ['Cash-Drawer','library_system','Coin-Web-Crawler','workout-generator','rent-wise-app',"hotel"]
const token = process.env.NEXT_PUBLIC_API_TOKEN;


let urlDic:{[key:string]:string} = {}
let commitsHistory:{[key:string]:string} = {}


// const url = `https://api.github.com/repos/${owner}/${repo}/commits`;
repos.map(repo => {
  urlDic[repo] =`https://api.github.com/repos/${owner}/${repo}/commits`
});


// [
//   'https://api.github.com/repos/mammut001/Cash-Drawer/commits',
//   'https://api.github.com/repos/mammut001/library_system/commits',
//   'https://api.github.com/repos/mammut001/Coin-Web-Crawler/commits',
//   'https://api.github.com/repos/mammut001/workout-generator/commits',
//   'https://api.github.com/repos/mammut001/rent-wise-app/commits'
// ]

// console.log(urls);


const headers = {
  'Authorization': `token ${token}`
};

interface Commits {
  commits: Commit[]
}
export interface Commit {
  sha: string;
  commit: {
    author: {
      name: string;
      date: string;
    };
    message: string;
  };
}

export const fetchCommits = async (url:string): Promise<Commit[]> => {
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

async function writeFile(path: string, data: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

Object.entries(urlDic).forEach(([name, url]) => {
  fetchCommits(url).then(async (commits) => {
    const commitData = commits.map(commit => ({
      date: commit.commit.author.date,
      author: commit.commit.author.name,
      message: commit.commit.message,
    }));

    const jsonData = JSON.stringify(commitData, null, 2);

    try {
      await writeFile(`./${name}.json`, jsonData);
      await delay(3000);
      console.log('succeeded!');
    } catch (err) {
      console.error('error', err);
    }

  });

})


// try {
//   const jsonData = JSON.stringify(urlDic, null, 2);
//
//   writeFile(`./objects.json`, jsonData).then(r => {
//     console.log('succeeded!');
//   });
// } catch (err) {
//   console.error('error', err);
// }
//
