"use client"

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PopupWindow from "@/components/ui/popup-window";
import { useTriggerPopupStore } from "@/store/useTriggerPopupStore";
import { useEffect } from "react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { RESUME_DATA } from "@/data/resume-data";
import { FolderIcon } from "lucide-react";

interface Props {
    index: number
    title: string;
    description: string;
    tags: readonly string[];
    link?: string;
    status: number;
}

export function ProjectCard({ index, title, description, tags, link, status }: Props) {
    const { toggleTrigger, dics, loadProjectDic } = useTriggerPopupStore(state => ({
        toggleTrigger: state.toggleTrigger,
        dics: state.projectDic,
        loadProjectDic: state.loadProjectDic,
    }))
    const languageName = useLanguageStore(state => state.name)

    useEffect(() => {
        if (!dics) {
            loadProjectDic().then(r => console.log('success', r));
        }
    }, [dics, loadProjectDic]);

    const handlePopUp = () => {
        if (languageName !== "english") {
            toggleTrigger(RESUME_DATA.projects[index].title)
        } else {
            toggleTrigger(title)
        }
    }

    return (
        <Card
            onClick={handlePopUp}
            className="group cursor-pointer flex flex-col overflow-hidden border border-border/50 bg-card transition-all hover:bg-accent/5 hover:border-accent hover:shadow-lg"
        >
            <CardHeader className="p-4">
                <PopupWindow title={title?.toString()!} projectIndex={index} />
                <div className="space-y-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <FolderIcon className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            <span>{title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {status === 1 ? (
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                            ) : (
                                <span className="h-2 w-2 rounded-full bg-orange-500" />
                            )}
                        </div>
                    </CardTitle>
                    <CardDescription className="font-mono text-sm leading-relaxed text-muted-foreground/90">
                        {description}
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="mt-auto flex p-4 pt-0">
                <div className="flex flex-wrap gap-1">
                    {tags.map((tag) => (
                        <Badge
                            className="px-1.5 py-0.5 text-[10px] font-mono font-medium opacity-80 group-hover:opacity-100 transition-opacity"
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
