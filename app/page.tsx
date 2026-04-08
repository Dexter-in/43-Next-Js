import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import {IEvent} from "@/database";
import {cacheLife} from "next/cache";
import { getPublicBaseUrl } from "@/lib/base-url";


const BASE_URL = getPublicBaseUrl();

const Page = async () => {
    'use cache';
    cacheLife('hours')
    const response = await fetch(new URL('/api/events', BASE_URL), {
        next: { revalidate: 60 }
    });

    if (!response.ok) {
        const body = await response.text().catch(() => '');
        console.error('Failed to fetch /api/events:', response.status, body);
        return (
            <section>
                <h1 className="text-center">The Hub for Every Dev <br /> Event You Can't Miss</h1>
                <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All in One Place</p>
                <p className="text-center mt-5">Events failed to load ({response.status}).</p>
            </section>
        )
    }

    const { events } = await response.json();

    return (
        <section>
            <h1 className="text-center">The Hub for Every Dev <br /> Event You Can't Miss</h1>
            <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All in One Place</p>

            <ExploreBtn />

            <div className="mt-20 space-y-7">
                <h3>Featured Events</h3>

                <ul className="events">
                    {events && events.length > 0 && events.map((event: IEvent) => (
                        <li key={event.title} className="list-none">
                            <EventCard {...event} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Page;
