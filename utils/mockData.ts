import { IPost, IComment, IGalleryImage } from '@/types';

// 목업 게시물 데이터
export const mockPosts: IPost[] = [
  {
    postId: '1',
    imageURL: 'https://picsum.photos/400/400?random=1',
    userName: '김철수',
    likes: 150,
    comments: 23,
    isLiked: false,
    prompt: '우주를 나는 고양이',
    createdAt: '2024-03-15T09:00:00Z',
    userProfile: null
  },
  {
    postId: '2',
    imageURL: 'https://picsum.photos/400/400?random=2',
    userName: '하호',
    likes: 110,
    comments: 23,
    isLiked: false,
    prompt: '미래도시의 풍경',
    createdAt: '2024-02-15T09:00:00Z',
    userProfile: null
  },
  {
    postId: '3',
    imageURL: 'https://picsum.photos/400/400?random=3',
    userName: '박지민',
    likes: 89,
    comments: 15,
    isLiked: true,
    prompt: '환상적인 숲속 요정',
    createdAt: '2024-03-14T15:30:00Z',
    userProfile: null
  },
  {
    postId: '4',
    imageURL: 'https://picsum.photos/400/400?random=4',
    userName: '이하늘',
    likes: 234,
    comments: 45,
    isLiked: false,
    prompt: '바다 속 인어공주',
    createdAt: '2024-03-13T10:20:00Z',
    userProfile: null
  },
  {
    postId: '5',
    imageURL: 'https://picsum.photos/400/400?random=5',
    userName: '정다운',
    likes: 167,
    comments: 28,
    isLiked: false,
    prompt: '사이버펑크 로봇',
    createdAt: '2024-03-12T18:45:00Z',
    userProfile: null
  },
  {
    postId: '6',
    imageURL: 'https://picsum.photos/400/400?random=6',
    userName: '강산들',
    likes: 321,
    comments: 56,
    isLiked: true,
    prompt: '마법사의 연구실',
    createdAt: '2024-03-11T09:15:00Z',
    userProfile: null
  },
  {
    postId: '7',
    imageURL: 'https://picsum.photos/400/400?random=7',
    userName: '한별빛',
    likes: 198,
    comments: 34,
    isLiked: false,
    prompt: '은하수가 흐르는 밤',
    createdAt: '2024-03-10T20:30:00Z',
    userProfile: null
  },
  {
    postId: '8',
    imageURL: 'https://picsum.photos/400/400?random=8',
    userName: '송하나',
    likes: 145,
    comments: 19,
    isLiked: false,
    prompt: '꽃으로 가득한 정원',
    createdAt: '2024-03-09T14:20:00Z',
    userProfile: null
  },
  {
    postId: '9',
    imageURL: 'https://picsum.photos/400/400?random=9',
    userName: '임우주',
    likes: 267,
    comments: 41,
    isLiked: true,
    prompt: '스팀펑크 기차역',
    createdAt: '2024-03-08T11:40:00Z',
    userProfile: null
  },
  {
    postId: '10',
    imageURL: 'https://picsum.photos/400/400?random=10',
    userName: '최하린',
    likes: 189,
    comments: 27,
    isLiked: false,
    prompt: '동화 속 성',
    createdAt: '2024-03-07T16:50:00Z',
    userProfile: null
  }
];

// 목업 댓글 데이터
export const mockComments: IComment[] = [
  {
    id: '1',
    postId: '1',
    userName: '홍길동',
    content: '정말 멋진 작품이네요!',
    createdAt: '2024-03-15T10:00:00Z',
    userProfile: null
  },
  {
    id: '2',
    postId: '1',
    userName: '김민지',
    content: '고양이가 너무 귀여워요',
    createdAt: '2024-03-15T11:30:00Z',
    userProfile: null
  },
  {
    id: '3',
    postId: '2',
    userName: '이서준',
    content: '미래도시의 분위기가 잘 표현되었네요',
    createdAt: '2024-03-14T09:20:00Z',
    userProfile: null
  },
  {
    id: '4',
    postId: '3',
    userName: '박하은',
    content: '색감이 너무 예뻐요!',
    createdAt: '2024-03-14T16:40:00Z',
    userProfile: null
  },
  {
    id: '5',
    postId: '4',
    userName: '정도현',
    content: '인어공주의 표정이 인상적이에요',
    createdAt: '2024-03-13T12:15:00Z',
    userProfile: null
  }
];

export const mockStyleOptions = {
  artStyles: [
    { value: 'digital-art', label: '디지털아트' },
    { value: 'watercolor', label: '수채화' },
    { value: 'oil-painting', label: '유화' },
    { value: 'pen-drawing', label: '펜화' },
    { value: 'pencil-sketch', label: '연필화' }
  ],
  colorTones: [
    { value: 'bright', label: '밝은' },
    { value: 'dark', label: '어두운' },
    { value: 'pastel', label: '파스텔' },
    { value: 'black-and-white', label: '흑백' },
    { value: 'colorful', label: '컬러풀' }
  ]
};

export const mockGeneratedImage = {
  imageUrl: 'https://picsum.photos/800/600',
  prompt: '바다 위로 떠오르는 아름다운 일출',
  styleOptions: {
    artStyle: 'digital-art',
    colorTone: 'bright'
  }
};

// 갤러리 목업 데이터
export const mockGalleryImages: IGalleryImage[] = [
  {
    id: '1',
    imageUrl: 'https://picsum.photos/400/400?random=1',
    prompt: '우주를 나는 고양이',
    styleOptions: {
      artStyle: 'digital-art',
      colorTone: 'bright'
    },
    category: '동물',
    tags: ['고양이', '우주', '판타지'],
    createdAt: '2024-03-15T09:00:00Z',
    isPublic: true
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/400/400?random=2',
    prompt: '미래도시의 풍경',
    styleOptions: {
      artStyle: 'pen-drawing',
      colorTone: 'dark'
    },
    category: '풍경',
    tags: ['도시', '미래', '야경'],
    createdAt: '2024-03-14T15:30:00Z',
    isPublic: true
  },
  {
    id: '3',
    imageUrl: 'https://picsum.photos/400/400?random=3',
    prompt: '환상적인 숲속 요정',
    styleOptions: {
      artStyle: 'watercolor',
      colorTone: 'pastel'
    },
    category: '인물',
    tags: ['요정', '숲', '판타지'],
    createdAt: '2024-03-13T10:20:00Z',
    isPublic: true
  },
  {
    id: '4',
    imageUrl: 'https://picsum.photos/400/400?random=4',
    prompt: '바다 속 인어공주',
    styleOptions: {
      artStyle: 'oil-painting',
      colorTone: 'colorful'
    },
    category: '인물',
    tags: ['인어', '바다', '판타지'],
    createdAt: '2024-03-12T18:45:00Z',
    isPublic: false
  }
]; 