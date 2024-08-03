import React, { FC, useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { useTriggerPopupStore } from "@/store/useTriggerPopupStore";
import { RESUME_DATA } from "@/data/resume-data";
import { useLanguageStore } from "@/store/useLanguageStore";
import { Language } from "@/store/useLanguageStore";


interface Commit {
  date: string;
  author: string;
  message: string;
}

interface ProjectCardProp {
  title: string;
  projectIndex: number
}

const PopupWindow: FC<ProjectCardProp> = ({ title,projectIndex }) => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const language = useLanguageStore(state => state.name);

  const statusDictionary = useTriggerPopupStore(state => state.projectDic)

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        console.log("lang "+language)
        if(language !== "english"){
          const response = await fetch(`/${RESUME_DATA.projects[projectIndex].title}.json`)
          console.log(`/${RESUME_DATA.projects[projectIndex].title}.json`)
          const data = await response.json();
          setCommits(data);
        }
        else{
          const response = await fetch(`/${title}.json`)
          const data = await response.json();
          setCommits(data);
        }

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

  const popupStatus =()=>{
    const key = language !== "english" ? RESUME_DATA.projects[projectIndex].title : title;
    return statusDictionary ? statusDictionary[key] || false : false;
  };

  return (

    <Popup open={popupStatus()}trigger={<button></button>} position="right center">
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
