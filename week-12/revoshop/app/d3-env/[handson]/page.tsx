import HandsOn1 from "../hands-on-1"
import HandsOn2 from "../hands-on-2"
import HandsOn3 from "../hands-on-3";
import HandsOn4 from "../hands-on-4";

const pages = {
    'hands-on-1': HandsOn1,
    'hands-on-2': HandsOn2,
    'hands-on-3': HandsOn3,
    'hands-on-4': HandsOn4,
}

export default async function Page({params}: {params: Promise<{handson: string}>}) {
    const { handson } = await params;
    const Component = pages[handson as keyof typeof pages];

    return Component ? <Component/> : <p>Not Found</p>
}