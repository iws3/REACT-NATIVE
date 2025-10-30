// src/data/leaguesData.js

// This is our central database for the app
// Think of this like a library catalog - everything organized and easy to find

export const leaguesData = [
  {
    id: 'ucl',
    name: 'UEFA Champions League',
    icon: 'https://i.ibb.co/kgpxnTyv/ball.jpg',
    color: '#003399',
    players: [
      {
        id: 'ucl_1',
        name: 'Cristiano Ronaldo',
        team: 'Al Nassr',
        position: 'Forward',
        image: 'https://i.ibb.co/pBzw5tj8/cr7.jpg',
        achievements: '5x Champions League Winner',
        goals: 140
      },
      {
        id: 'ucl_2',
        name: 'Lionel Messi',
        team: 'Inter Miami',
        position: 'Forward',
        image: 'https://i.ibb.co/qLw42GMF/messi.jpg',
        achievements: '4x Champions League Winner',
        goals: 129
      },
      {
        id: 'ucl_3',
        name: 'Karim Benzema',
        team: 'Al Ittihad',
        position: 'Forward',
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400',
        achievements: '5x Champions League Winner',
        goals: 90
      },
      {
        id: 'ucl_4',
        name: 'Robert Lewandowski',
        team: 'Barcelona',
        position: 'Forward',
        image: 'https://i.ibb.co/TM7q14Lc/lewa.jpg',
        achievements: 'Champions League Winner',
        goals: 94
      },
      {
        id: 'ucl_5',
        name: 'Thomas Müller',
        team: 'Bayern Munich',
        position: 'Midfielder',
        image: 'https://i.ibb.co/G4M8K1cR/muller.jpg',
        achievements: '2x Champions League Winner',
        goals: 53
      }
    ]
  },
  {
    id: 'epl',
    name: 'Premier League',
    icon: 'https://i.ibb.co/fzw9cQYR/images-1.png',
    color: '#3D195B',
    players: [
      {
        id: 'epl_1',
        name: 'Mohamed Salah',
        team: 'Liverpool',
        position: 'Forward',
        image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400',
        achievements: 'Premier League Winner',
        goals: 185
      },
      {
        id: 'epl_2',
        name: 'Kevin De Bruyne',
        team: 'Manchester City',
        position: 'Midfielder',
        image: 'https://images.unsplash.com/photo-1563299796-17596ed6b017?w=400',
        achievements: '5x Premier League Winner',
        goals: 85
      },
      {
        id: 'epl_3',
        name: 'Harry Kane',
        team: 'Bayern Munich',
        position: 'Forward',
        image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400',
        achievements: 'Premier League Golden Boot',
        goals: 213
      },
      {
        id: 'epl_4',
        name: 'Erling Haaland',
        team: 'Manchester City',
        position: 'Forward',
        image: 'https://images.unsplash.com/photo-1614632537239-f676e3c8b5a7?w=400',
        achievements: 'Premier League Winner',
        goals: 52
      },
      {
        id: 'epl_5',
        name: 'Bukayo Saka',
        team: 'Arsenal',
        position: 'Winger',
        image: 'https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?w=400',
        achievements: 'England International',
        goals: 45
      }
    ]
  },
  {
    id: 'laliga',
    name: 'La Liga',
    icon: 'https://i.ibb.co/4RNPCm2K/laliga.jpg',
    color: '#FF4E4E',
    players: [
      {
        id: 'laliga_1',
        name: 'Vinicius Junior',
        team: 'Real Madrid',
        position: 'Winger',
        image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400',
        achievements: 'Champions League Winner',
        goals: 65
      },
      {
        id: 'laliga_2',
        name: 'Jude Bellingham',
        team: 'Real Madrid',
        position: 'Midfielder',
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400',
        achievements: 'La Liga Winner',
        goals: 23
      },
      {
        id: 'laliga_3',
        name: 'Robert Lewandowski',
        team: 'Barcelona',
        position: 'Forward',
        image: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=400',
        achievements: 'La Liga Top Scorer',
        goals: 42
      },
      {
        id: 'laliga_4',
        name: 'Antoine Griezmann',
        team: 'Atletico Madrid',
        position: 'Forward',
        image: 'https://images.unsplash.com/photo-1577223625816-7546f9f3c3c5?w=400',
        achievements: 'World Cup Winner',
        goals: 156
      },
      {
        id: 'laliga_5',
        name: 'Pedri',
        team: 'Barcelona',
        position: 'Midfielder',
        image: 'https://images.unsplash.com/photo-1563299796-17596ed6b017?w=400',
        achievements: 'Golden Boy Winner',
        goals: 18
      }
    ]
  },
  {
    id: 'seriea',
    name: 'Serie A',
    icon: 'https://i.ibb.co/rRzP5Jcy/images-2.png',
    color: '#008C45',
    players: [
      {
        id: 'seriea_1',
        name: 'Lautaro Martinez',
        team: 'Inter Milan',
        position: 'Forward',
        image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400',
        achievements: 'Serie A Winner',
        goals: 95
      },
      {
        id: 'seriea_2',
        name: 'Victor Osimhen',
        team: 'Napoli',
        position: 'Forward',
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400',
        achievements: 'Serie A Top Scorer',
        goals: 65
      },
      {
        id: 'seriea_3',
        name: 'Rafael Leão',
        team: 'AC Milan',
        position: 'Winger',
        image: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=400',
        achievements: 'Serie A Winner',
        goals: 42
      },
      {
        id: 'seriea_4',
        name: 'Paulo Dybala',
        team: 'AS Roma',
        position: 'Forward',
        image: 'https://images.unsplash.com/photo-1577223625816-7546f9f3c3c5?w=400',
        achievements: '5x Serie A Winner',
        goals: 115
      },
      {
        id: 'seriea_5',
        name: 'Khvicha Kvaratskhelia',
        team: 'Napoli',
        position: 'Winger',
        image: 'https://images.unsplash.com/photo-1563299796-17596ed6b017?w=400',
        achievements: 'Serie A Winner',
        goals: 28
      }
    ]
  },
  {
    id: 'bundesliga',
    name: 'Bundesliga',
    icon: 'https://i.ibb.co/r2dDgSyr/bundesliga.png',
    color: '#D3010C',
    players: [
      {
        id: 'bundesliga_1',
        name: 'Harry Kane',
        team: 'Bayern Munich',
        position: 'Forward',
        image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400',
        achievements: 'Bundesliga Top Scorer',
        goals: 36
      },
      {
        id: 'bundesliga_2',
        name: 'Jamal Musiala',
        team: 'Bayern Munich',
        position: 'Midfielder',
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400',
        achievements: 'Bundesliga Winner',
        goals: 32
      },
      {
        id: 'bundesliga_3',
        name: 'Florian Wirtz',
        team: 'Bayer Leverkusen',
        position: 'Midfielder',
        image: 'https://images.unsplash.com/photo-1563299796-17596ed6b017?w=400',
        achievements: 'Bundesliga Winner',
        goals: 28
      },
      {
        id: 'bundesliga_4',
        name: 'Serge Gnabry',
        team: 'Bayern Munich',
        position: 'Winger',
        image: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=400',
        achievements: 'Bundesliga Winner',
        goals: 64
      },
      {
        id: 'bundesliga_5',
        name: 'Niclas Füllkrug',
        team: 'Borussia Dortmund',
        position: 'Forward',
        image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400',
        achievements: 'Bundesliga Top Scorer',
        goals: 45
      }
    ]
  },
  {
    id: 'eredivisie',
    name:'Eredivisie',
    icon: 'https://i.ibb.co/svkmy5jB/eredivisie.png',
    color: '#FF6C00',
    players: [
      {
        id: 'eredivisie_1',
        name: 'Cody Gakpo',
        team: 'Liverpool',
        position: 'Forward',
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400',
        achievements: 'Eredivisie Top Scorer',
        goals: 55
      },
      {
        id: 'eredivisie_2',
        name: 'Steven Bergwijn',
        team: 'Ajax',
        position: 'Winger',
        image: 'https://images.unsplash.com/photo-1563299796-17596ed6b017?w=400',
        achievements: 'Eredivisie Winner',
        goals: 48
      },
      {
        id: 'eredivisie_3',
        name: 'Dusan Tadic',
        team: 'Fenerbahce',
        position: 'Midfielder',
        image: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=400',
        achievements: '2x Eredivisie Winner',
        goals: 82
      },
      {
        id: 'eredivisie_4',
        name: 'Brian Brobbey',
        team: 'Ajax',
        position: 'Forward',
        image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400',
        achievements: 'Eredivisie Winner',
        goals: 35
      },
      {
        id: 'eredivisie_5',
        name: 'Luuk de Jong',
        team: 'PSV',
        position: 'Forward',
        image: 'https://images.unsplash.com/photo-1577223625816-7546f9f3c3c5?w=400',
        achievements: 'Eredivisie Winner',
        goals: 112
      }
    ]
  },
  {
    id: 'ligue1',
    name: 'Ligue 1',
    icon: 'https://i.ibb.co/C3Wm4GXv/l1.png',
    color: '#0055A4',
    players: [
      {
        id: 'ligue1_1',
        name: 'Kylian Mbappé',
        team: 'Real Madrid',
        position: 'Forward',
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400',
        achievements: '6x Ligue 1 Winner',
        goals: 191
      },
      {
        id: 'ligue1_2',
        name: 'Neymar Jr',
        team: 'Al Hilal',
        position: 'Forward',
        image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400',
        achievements: '5x Ligue 1 Winner',
        goals: 118
      },
      {
        id: 'ligue1_3',
        name: 'Ousmane Dembélé',
        team: 'Paris Saint-Germain',
        position: 'Winger',
        image: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=400',
        achievements: 'Ligue 1 Winner',
        goals: 45
      },
      {
        id: 'ligue1_4',
        name: 'Alexandre Lacazette',
        team: 'Lyon',
        position: 'Forward',
        image: 'https://images.unsplash.com/photo-1563299796-17596ed6b017?w=400',
        achievements: 'Ligue 1 Top Scorer',
        goals: 158
      },
      {
        id: 'ligue1_5',
        name: 'Khephren Thuram',
        team: 'Nice',
        position: 'Midfielder',
        image: 'https://images.unsplash.com/photo-1577223625816-7546f9f3c3c5?w=400',
        achievements: 'France International',
        goals: 12
      }
    ]
  }
];