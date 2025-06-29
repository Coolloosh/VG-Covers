// showsData.js
export const upcomingShows = [
  {
    slug: "Swim-House-5-10",
    date: "May 10, 2025",
    location: "Swim House",
    city: "Newark, DE",
    notes: "3-5pm, 49 Prospect Ave",
    poster: "swim.webp",
    ticketNote: "$5 tickets at door"
  },
  {
    slug: "Union-Fire-House",
    date: "May 10, 2025",
    location: "Union Firehouse",
    city: "Mount Holly, NJ",
    notes: "9PM Set Time, 18 Washington St",
    poster: "union.webp",
    ticketNote: "$15 tickets at door"
  },
  {
    slug: "dp-5-14",
    date: "May 14, 2025",
    location: "Deer Park BOTB",
    city: "Newark, DE",
    notes: "21+",
    poster: "dpbotb.webp",
    ticketNote: "Free Entry"
    /*soldOut: true*/
  },
  {
    slug: "Swim-House-5-10",
    date: "June 27, 2025",
    location: "Letty's",
    city: "Newark, DE",
    notes: "3-5pm, 49 Prospect Ave",
    poster: "swim.webp",
    ticketNote: "$5 tickets at door"
  },
  /*
  {
    slug: "deer-park-2-23",
    date: "February 23, 2025",
    location: "Deer Park Tavern",
    city: "Newark, DE",
    notes: "Special Show",
    poster: "VGFlyerTest2.png",
    thumbnail: "/VGFlyerTest.png"
  },
    {
      slug: "deer-park-2-25",
      date: "April 26, 2025",
      location: "Conch Island",
      city: "Rehoboth, DE",
      notes: "Free Entry",
      poster: "VGPS2.png",
      soldOut: true
    },
    {
      slug: "deer-park-2-26",
      date: "February 23, 2025",
      location: "Deer Park Tavern",
      city: "Newark, DE",
      notes: "Special Show",
      poster: "VGPS3.png",
      ticketlink: "mylink"
    }*/
];

/*
const getUpcomingShows = () => {
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return (RawupcomingShows || []).filter((show) => {
    if (!show?.date) return false;
    const showDate = new Date(show.date);
    return !isNaN(showDate) && showDate >= startOfToday;
  });
};

export const upcomingShows = getUpcomingShows();
*/