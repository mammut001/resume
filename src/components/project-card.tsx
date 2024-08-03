import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import PopupWindow from "@/components/ui/popup-window";
import { useTriggerPopupStore } from "@/store/useTriggerPopupStore";
import { useEffect } from "react";

interface Props {
  title: string;
  description: string;
  tags: readonly string[];
  link?: string;
  status: number;
}


export function ProjectCard({ title, description, tags, link, status}: Props) {
  const {toggleTrigger,dics,loadProjectDic } = useTriggerPopupStore(state => ({
    toggleTrigger: state.toggleTrigger,
    dics: state.projectDic,
    loadProjectDic:state.loadProjectDic,
  }))


  useEffect(() => {
    if (!dics) {
      loadProjectDic().then(r => console.log('success', r));
    }
  }, [dics, loadProjectDic]);
  const handlePopUp = ()=>{
    toggleTrigger(title)
    console.log(123)
    console.log(dics)
    console.log(456)
    console.log(title)
  }
  return (

    <Card onClick={handlePopUp} className="cursor-pointer flex flex-col overflow-hidden border border-muted p-3">
      <CardHeader className="">
        <PopupWindow name={title?.toString()!}></PopupWindow>
        <div className="space-y-1">
          <CardTitle className="text-base">
            {link ? (
              <a
                href={link}
                target="_blank"
                className="inline-flex items-center gap-1 hover:underline"
              >
                {title}{" "}
                {status == 1 ? <span className="size-1 rounded-full bg-green-500"></span> : <span className="size-1 rounded-full bg-orange-500"></span>}
              </a>
            ) : (
              title
            )}
          </CardTitle>
          <div className="hidden font-mono text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <CardDescription className="font-mono text-xs print:text-[10px]">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex">
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge
              className="px-1 py-0 text-[10px] print:px-1 print:py-0.5 print:text-[8px] print:leading-tight"
              variant="secondary"
              key={tag}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
