import { ContentId, contents } from "../data/contents"

interface ContentProps {
    activeSideBar: ContentId
}

export function Content({activeSideBar}: ContentProps) {
    const content = contents[activeSideBar];

    return (
        <main className="col-span-3 w-full border border-gray-500 rounded-lg p-4">
            <div className="flex flex-col gap-5">
                <h1>{content.title}</h1>
                <p>{content.description}</p>
            </div>
        </main>
    )
}