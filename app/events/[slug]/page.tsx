import { getSimilarEventBySlug } from "@/app/actions/event.actions";
import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";
import { get } from "http";
import Image from "next/image";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const EventDetailItem = ({ icon, alt, label }: { icon: string; alt: string; label: string; }) => (
    <div className="flex-row-gap-2 items-center">
        <Image src={icon} alt={alt} width={17} height={17} />
        <p>{label}</p>
    </div>
)


const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
    <div className="agenda">
        <h2>Agenda</h2>
        <ul>
            {agendaItems.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    </div>
)

const EventTags = ({ tags }: { tags: string[] }) => (
    <div className="flex flex-row gap-1.5 flex-wrap">
        {tags.map((tag) => (
            <div className="pill" key={tag}>{tag}</div>
        ))}
    </div>
)



const EventDetailsPage =  async ({params } : {params: Promise<{slug: string}>}) => {
const { slug } = await params;
 const request = await fetch(`${BASE_URL}/api/events/${slug}`);
 const { event:{description,image,location,title,date,time,audience,tags,overview,mode,agenda,organizer  }} = await request.json();
   
 let Booking =10;

  if(!description)  return notFound();

  const similarEvent:IEvent[] = await getSimilarEventBySlug(slug);

  console.log("Similar Events:", similarEvent);

 
  return (
     <section id='event'>
        <div className="header">
           <h1>Event Description</h1>
           <p>{description}</p>
        </div>

        <div className="details">
            {/* { left side} */}
              <div className="content">
                  <img src={image} alt = "Event Banner" width={800} height={800} className="banner" />

               <section className="flex-col-gap-2">
                   <h2>Overview</h2>
                   <p>{overview}</p>
               </section>
                  
                  <section className="flex-col-gap-2">
                     <h2>Event Details</h2>
                     <EventDetailItem icon="/icons/calendar.svg" alt="date" label={date} />
                     <EventDetailItem icon="/icons/clock.svg" alt="time" label={time} />
                     <EventDetailItem icon="/icons/pin.svg" alt="location" label={location} />
                     <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />
                     <EventDetailItem icon="/icons/audience.svg" alt="audience" label={audience} />
                  </section>

               <EventAgenda agendaItems={agenda} />
               
               <section className="flex-col-gap-2">
                        <h2>About the Organizer</h2>
                        <p>{organizer}</p>
                    </section>

               <EventTags tags={tags} />

              </div>
            {/* { right side} */}   
            <aside className="booking">
                 <div className="signup-card">
                    <h2>Book Your Spot</h2>
                     { Booking  > 0 ? (
                        <p>{Booking} people have booked this event.</p>
                     ) : (
                        <p>Be the first to book your spot for this event!</p>
                     ) }

                     <BookEvent />
                 </div>
            </aside>
        </div>
      
      <div className="flex w-full flex-col gap-4 pt-20">
            <h2>Similar Events</h2>
            <div className="events">
                {similarEvent.length > 0 && similarEvent.map((similarEvent: IEvent)=> (
                    <EventCard key={similarEvent.title} {...similarEvent} />
                ))}
                 
            </div>
      </div>
     </section>
  )
}


export default EventDetailsPage
