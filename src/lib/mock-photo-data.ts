export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface Photo {
  id: string;
  url: string;
  title: string;
  tags: string[];
  likes: number;
  downloads: number;
  views: number;
  photographer?: string;
  dateTaken?: string;
  comments?: Comment[];
}

export const mockPhotos: Photo[] = [
  {
    id: '1',
    url: '/placeholder-1.jpg',
    title: 'Sunset Landscape',
    tags: ['landscape', 'sunset', 'nature'],
    likes: 124,
    downloads: 45,
    views: 1205,
    photographer: 'John Doe',
    dateTaken: '2024-01-15',
    comments: [
      { id: 'c1-1', author: 'alice', text: 'Absolutely stunning colors! 🌅', timestamp: '2024-01-16T08:30:00Z' },
      { id: 'c1-2', author: 'bob_photo', text: 'Where was this taken?', timestamp: '2024-01-16T09:15:00Z' },
      { id: 'c1-3', author: 'nature_lover', text: 'One of my favorite shots of yours!', timestamp: '2024-01-17T14:00:00Z' },
    ]
  },
  {
    id: '2',
    url: '/placeholder-2.jpg',
    title: 'Portrait Study',
    tags: ['portrait', 'studio', 'professional'],
    likes: 89,
    downloads: 23,
    views: 892,
    photographer: 'Jane Smith',
    dateTaken: '2024-01-10',
    comments: [
      { id: 'c2-1', author: 'portrait_fan', text: 'Incredible lighting! ✨', timestamp: '2024-01-11T10:00:00Z' },
      { id: 'c2-2', author: 'mike_art', text: 'The composition is perfect.', timestamp: '2024-01-12T11:30:00Z' },
    ]
  },
  {
    id: '3',
    url: '/placeholder-3.jpg',
    title: 'Architecture',
    tags: ['architecture', 'building', 'city'],
    likes: 156,
    downloads: 67,
    views: 1543,
    photographer: 'Mike Johnson',
    dateTaken: '2024-01-08',
    comments: [
      { id: 'c3-1', author: 'arch_enthusiast', text: 'Love the symmetry in this shot!', timestamp: '2024-01-09T08:00:00Z' },
    ]
  },
  {
    id: '4',
    url: '/placeholder-4.jpg',
    title: 'Nature Close-up',
    tags: ['macro', 'nature', 'flowers'],
    likes: 203,
    downloads: 89,
    views: 2134,
    photographer: 'Sarah Wilson',
    dateTaken: '2024-01-05',
    comments: [
      { id: 'c4-1', author: 'macro_master', text: 'The detail is insane! 🌸', timestamp: '2024-01-06T07:00:00Z' },
      { id: 'c4-2', author: 'garden_girl', text: 'What lens did you use for this?', timestamp: '2024-01-06T09:30:00Z' },
      { id: 'c4-3', author: 'flora_fan', text: 'Beautiful macro work!', timestamp: '2024-01-07T13:00:00Z' },
      { id: 'c4-4', author: 'sarah_fan', text: 'Your best shot yet 😍', timestamp: '2024-01-07T16:00:00Z' },
    ]
  },
  {
    id: '5',
    url: '/placeholder-5.jpg',
    title: 'Street Photography',
    tags: ['street', 'candid', 'urban'],
    likes: 91,
    downloads: 34,
    views: 765,
    photographer: 'Alex Brown',
    dateTaken: '2024-01-03',
    comments: [
      { id: 'c5-1', author: 'street_walker', text: 'Captured a real moment here!', timestamp: '2024-01-04T12:00:00Z' },
    ]
  },
  {
    id: '6',
    url: '/placeholder-6.jpg',
    title: 'Wedding Moment',
    tags: ['wedding', 'love', 'ceremony'],
    likes: 267,
    downloads: 112,
    views: 3421,
    photographer: 'Emma Davis',
    dateTaken: '2024-01-01',
    comments: [
      { id: 'c6-1', author: 'wedding_lover', text: 'So beautiful and emotional! 💕', timestamp: '2024-01-02T10:00:00Z' },
      { id: 'c6-2', author: 'happy_couple', text: 'Thank you Emma for capturing this!', timestamp: '2024-01-02T11:00:00Z' },
      { id: 'c6-3', author: 'photo_critic', text: 'Perfect timing on the shot.', timestamp: '2024-01-03T08:00:00Z' },
    ]
  },
  {
    id: '7',
    url: '/placeholder-7.jpg',
    title: 'Mountain Vista',
    tags: ['landscape', 'mountain', 'adventure'],
    likes: 189,
    downloads: 78,
    views: 1876,
    photographer: 'David Chen',
    dateTaken: '2023-12-28',
    comments: [
      { id: 'c7-1', author: 'hiker_pro', text: "I've been here! Amazing view 🏔️", timestamp: '2023-12-29T09:00:00Z' },
      { id: 'c7-2', author: 'adventure_seeker', text: 'Adding this to my bucket list!', timestamp: '2023-12-30T14:00:00Z' },
    ]
  },
  {
    id: '8',
    url: '/placeholder-8.jpg',
    title: 'Urban Nightscape',
    tags: ['night', 'city', 'lights'],
    likes: 234,
    downloads: 95,
    views: 2543,
    photographer: 'Lisa Martinez',
    dateTaken: '2023-12-25',
    comments: [
      { id: 'c8-1', author: 'night_owl', text: 'The light trails are amazing! 🌃', timestamp: '2023-12-26T01:00:00Z' },
      { id: 'c8-2', author: 'city_fan', text: 'Long exposure?', timestamp: '2023-12-26T10:00:00Z' },
    ]
  },
  {
    id: '9',
    url: '/placeholder-9.jpg',
    title: 'Wildlife Portrait',
    tags: ['wildlife', 'nature', 'animal'],
    likes: 312,
    downloads: 143,
    views: 4321,
    photographer: 'Tom Anderson',
    dateTaken: '2023-12-20',
    comments: [
      { id: 'c9-1', author: 'wild_watcher', text: 'Incredible encounter! How close were you? 🦁', timestamp: '2023-12-21T08:00:00Z' },
      { id: 'c9-2', author: 'safari_guide', text: 'Remarkable patience to get this shot!', timestamp: '2023-12-21T11:00:00Z' },
      { id: 'c9-3', author: 'animal_lover', text: 'The eyes are so expressive 😍', timestamp: '2023-12-22T15:00:00Z' },
    ]
  }
];
