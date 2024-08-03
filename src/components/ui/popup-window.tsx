import React, { FC, useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { useTriggerPopupStore } from "@/store/useTriggerPopupStore";
interface Commit {
  date: string;
  author: string;
  message: string;
}

interface ProjectCardProp {
  name: string;
}

const PopupWindow: FC<ProjectCardProp> = ({ name }) => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  const statusDictionary = useTriggerPopupStore(state => state.projectDic)

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await fetch('/output.json');
        const data = await response.json();
        setCommits(data);
      } catch (error) {
        setError('Error reading');
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const popupStatus = statusDictionary ? statusDictionary[name] : false;

  return (

    <Popup open={popupStatus}trigger={<button></button>} position="right center">
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
        <ul>
          {commits.map((commit, index) => (
            <li key={index}>
              {commit.author} - {commit.message}
            </li>
          ))}
        </ul>
      </div>
    </Popup>
  );
};

export default PopupWindow;
